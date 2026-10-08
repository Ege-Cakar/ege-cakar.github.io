// Animated research figures and the research map.
// The figures are static SVGs drawn by scripts/make_figures.py; each enhancer below reads
// the data-* attributes the generator writes. Without JS the static figures stay as drawn.
// Figures play on their own while on screen and pause during interaction; visitors who
// ask for reduced motion get still figures with the same controls.
(function () {
  var NS = 'http://www.w3.org/2000/svg';
  var calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var all = function (root, sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); };
  var svgEl = function (tag, attrs) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var ease = function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };  // cubic in-out
  // Calls fn(eased progress 0..1) every frame for dur ms, then done().
  var tween = function (dur, fn, done) {
    var t0 = performance.now();
    requestAnimationFrame(function frame(now) {
      var t = Math.min((now - t0) / dur, 1);
      fn(ease(t));
      if (t < 1) requestAnimationFrame(frame); else if (done) done();
    });
  };
  // Runs step() every `every` ms while el is on screen, the tab is visible, and nobody has
  // interacted in the last few seconds. The first run comes within 0.1 s of el coming on screen.
  // hold(ms) pauses after interaction; toggle() pauses.
  var autoplay = function (el, every, step) {
    var visible = !('IntersectionObserver' in window), paused = calm, holdUntil = 0, next = 0;
    if (!visible) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }, { threshold: 0.35 }).observe(el);
    setInterval(function () {
      var now = performance.now();
      if (visible && !paused && !document.hidden && now >= holdUntil && now >= next) { next = now + every; step(); }
    }, 100);
    return {
      hold: function (ms) { holdUntil = performance.now() + ms; },
      toggle: function () { paused = !paused; return paused; },
      paused: function () { return paused; }
    };
  };
  // A row of controls under the figure, inside its cream card.
  var controls = function (svg, html) {
    var div = document.createElement('div');
    div.className = 'fig-controls';
    div.innerHTML = html;
    svg.parentNode.appendChild(div);
    return div;
  };
  // Small seeded RNG so the illustrative SSA scores repeat on every visit.
  var rng = function (seed) {
    return function () {
      seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  // Helpers for the scripted figures (argument, laser, gcg), which find parts by data-part.
  var part = function (svg, name) { return svg.querySelector('[data-part="' + name + '"]'); };
  var parts = function (svg, prefix) { return all(svg, '[data-part^="' + prefix + '-"]'); };
  var timeline = function (steps) { steps.forEach(function (s) { setTimeout(s[1], s[0]); }); };  // [ms, fn] pairs
  // Fades elements to opacity `low` (default 0), or back to their drawn opacity.
  var show = function (els, on, low) {
    [].concat(els).forEach(function (el) {
      if (el.base == null) { el.base = el.style.opacity || 1; el.style.transition = 'opacity .45s ease'; }
      el.style.opacity = on ? el.base : low || 0;
    });
  };
  // A short eased swell about the element's center, about 5 units on its longer side.
  var pulse = function (el) {
    var b = el.getBBox(), s = 1 + Math.min(0.25, 5 / Math.max(b.width, b.height));
    el.style.transformBox = 'fill-box'; el.style.transformOrigin = 'center';
    el.animate([{ transform: 'none' }, { transform: 'scale(' + s + ')' }, { transform: 'none' }], { duration: 650, easing: 'ease-in-out' });
  };
  // A dot runs along a line or path (end to start if back), eased, then fades out.
  var travel = function (el, dur, color, done, back) {
    var len = el.getTotalLength(), at = function (t) { return el.getPointAtLength((back ? 1 - t : t) * len); }, p = at(0);
    var dot = el.ownerSVGElement.appendChild(svgEl('circle', { r: 3.5, cx: p.x, cy: p.y, style: 'fill:' + color + ';stroke:var(--paper);stroke-width:1.2' }));
    dot.animate([{ opacity: 0 }, { opacity: 1 }], 150);
    tween(dur, function (t) { var q = at(t); dot.setAttribute('cx', q.x); dot.setAttribute('cy', q.y); }, function () {
      dot.animate([{ opacity: 1 }, { opacity: 0 }], 200).onfinish = function () { dot.remove(); };
      if (done) done();
    });
  };
  // Reveals a path from its start over dur ms with the same easing as travel(), through a mask,
  // so dashes and the arrowhead keep their drawn look. The arrowhead shows as the reveal ends.
  var masks = 0;
  var draw = function (el, dur) {
    var len = el.getTotalLength(), id = 'draw-' + (++masks);
    var mask = svgEl('mask', { id: id, maskUnits: 'userSpaceOnUse', x: 0, y: 0, width: '100%', height: '100%' });
    var m = mask.appendChild(svgEl('path', { d: el.getAttribute('d'), style: 'fill:none;stroke:#fff;stroke-width:12;stroke-dasharray:' + len + ' ' + len + ';stroke-dashoffset:' + len }));
    el.ownerSVGElement.appendChild(mask);
    el.setAttribute('mask', 'url(#' + id + ')');
    tween(dur, function (t) { m.style.strokeDashoffset = len * (1 - t); }, function () { el.removeAttribute('mask'); mask.remove(); });
  };
  // Runs a dot along each leg [line or path, ms, color, element to pulse on arrival] in turn.
  var route = function (legs) {
    if (!legs.length) return;
    var l = legs[0];
    travel(l[0], l[1], l[2], function () { if (l[3]) pulse(l[3]); route(legs.slice(1)); });
  };
  var INK = 'var(--ink)', RED = 'var(--red)', MUTED = 'var(--muted)';

  var figures = {
    // SSA: chunk steps on a loop. Each step the lowest keep score among the retained chunks and
    // the candidate is evicted, the stream slides one chunk, the candidate's wire moves into the
    // freed slot, and every survivor is rescored. M = 4, w = 1. Scores are illustrative.
    ssa: function (svg) {
      var wires = all(svg, 'path[data-slot]'), bars = all(svg, 'rect[data-bar]');
      var boxes = all(svg, 'rect').filter(function (r) { return r.getAttribute('y') === '74'; });
      var lbl = function (n) { return svg.querySelector('[data-label="' + n + '"]'); };
      var evictLbl = lbl('evict'), stepLbl = lbl('step');
      var slotX = wires.map(function (w) { return +w.getAttribute('d').match(/([\d.]+) 73$/)[1]; });
      var styles = { ev: 'fill:#d4d3cc;stroke:#b9b6ad', ret: 'fill:var(--blue);stroke:var(--blue)', win: 'fill:rgba(59,106,154,.3);stroke:var(--blue)',
                     cur: 'fill:#fffdf8;stroke:var(--ink)', next: 'fill:none;stroke:var(--muted);stroke-dasharray:3 2' };
      var X = function (p) { return 30 + 26 * p; };  // left edge of stream position p
      var fade = 'transition:fill .5s ease,stroke .5s ease,opacity .5s ease;';
      bars.concat(boxes, wires).forEach(function (e) { e.style.transition = 'opacity .45s ease, fill .45s ease'; });

      // The stream is rebuilt as one rect per chunk id, so chunks can glide as the window advances.
      var stream = all(svg, 'rect[data-pos]'), layer = svgEl('g', {});
      stream[0].parentNode.insertBefore(layer, stream[0]);
      stream.forEach(function (r) { r.remove(); });
      var chunks = {}, wireAt = [], state, rand, busy = false;

      var off = function (s) { return Math.max(0, s.cur - 9); };
      var role = function (s, c) {
        return c > s.cur ? 'next' : c === s.cur ? 'cur' : c === s.cur - 1 ? 'win' : s.residents.indexOf(c) >= 0 ? 'ret' : 'ev';
      };
      var wireFrom = function (s, c) { var p = c - off(s); return p >= 0 ? X(p) + 11 : 18; };
      var lowest = function (s) { return s.scores.indexOf(Math.min.apply(null, s.scores)); };
      function setWire(k, x1, xs) {
        wireAt[k] = [+x1, +xs];
        wires[k].setAttribute('d', 'M' + x1 + ' 39 C ' + x1 + ' 56, ' + xs + ' 56, ' + xs + ' 73');
      }
      function setBars(heights, low) {
        bars.forEach(function (b, k) {
          b.setAttribute('y', 222 - heights[k]); b.setAttribute('height', heights[k]);
          b.style.fill = k === low ? '#c9c6bd' : 'var(--red)';
        });
      }
      function rect(c) {
        if (!chunks[c]) {
          chunks[c] = svgEl('rect', { y: 24, width: 22, height: 14, rx: 2 });
          chunks[c].px = 0;
          layer.appendChild(chunks[c]);
        }
        return chunks[c];
      }
      function paintChunk(s, c) { rect(c).setAttribute('style', fade + styles[role(s, c)] + ';stroke-width:1.2'); }
      // Draw a state with no animation (start and reset).
      function draw(s) {
        Object.keys(chunks).forEach(function (c) { chunks[c].remove(); delete chunks[c]; });
        for (var p = 0; p < 12; p++) {
          var c = off(s) + p, r = rect(c);
          r.px = X(p); r.setAttribute('x', r.px); paintChunk(s, c);
        }
        s.residents.concat([s.cur - 1, s.cur]).forEach(function (c, k) { setWire(k, wireFrom(s, c), slotX[k]); });
        boxes.concat(wires).forEach(function (e) { e.style.opacity = 1; });
        setBars(s.scores, lowest(s));
        evictLbl.setAttribute('x', +bars[lowest(s)].getAttribute('x') + 7);
        stepLbl.setAttribute('x', X(s.cur - off(s)) + 11);
      }
      function reset() { rand = rng(7); state = { cur: 9, residents: [1, 3, 4, 6], scores: [34, 22, 6, 18, 26] }; draw(state); }

      // One animated step: evict, slide, rewire, rescore.
      function step() {
        if (busy) return;
        busy = true;
        var s = state, low = lowest(s), victim = low === 4 ? s.cur - 1 : s.residents[low];
        // 1. the evicted chunk greys out with its slot and wire
        if (chunks[victim]) chunks[victim].setAttribute('style', fade + styles.ev + ';stroke-width:1.2');  // may have scrolled off already
        boxes[low].style.opacity = 0.25; wires[low].style.opacity = 0.15;
        setTimeout(function () {
          // 2. new state: candidate takes the freed place, window advances by one chunk
          var oldOff = off(s), residents = s.residents.slice();
          if (low < 4) { residents.splice(low, 1); residents.push(s.cur - 1); residents.sort(function (a, b) { return a - b; }); }
          var n = { cur: s.cur + 1, residents: residents, scores: s.scores };
          var newOff = off(n), lo = newOff - 1, hi = newOff + 11;
          for (var c = oldOff - 1; c <= hi + 1; c++) {
            if (c < lo || c > hi) continue;
            var r = rect(c), entering = !r.getAttribute('x');
            paintChunk(n, c);
            if (entering) { r.px = X(c - oldOff); r.setAttribute('x', r.px); r.style.opacity = 0; }
          }
          svg.getBoundingClientRect();  // commit the starting opacity so the fades below transition
          var from = {}, to = {};
          Object.keys(chunks).forEach(function (c) { from[c] = chunks[c].px; to[c] = X(c - newOff); });
          var w0 = wireAt.map(function (w) { return w.slice(); });
          var w1 = n.residents.concat([n.cur - 1, n.cur]).map(function (c, k) { return [wireFrom(n, c), slotX[k]]; });
          var s0 = +stepLbl.getAttribute('x'), s1 = X(n.cur - newOff) + 11;
          requestAnimationFrame(function () {
            Object.keys(chunks).forEach(function (c) {
              var p = +c - newOff;
              chunks[c].style.opacity = p < 0 || p > 11 ? 0 : 1;
            });
            boxes[low].style.opacity = 1; wires[low].style.opacity = 1;
          });
          tween(800, function (t) {
            Object.keys(chunks).forEach(function (c) { chunks[c].px = lerp(from[c], to[c], t); chunks[c].setAttribute('x', chunks[c].px.toFixed(1)); });
            w1.forEach(function (w, k) { setWire(k, lerp(w0[k][0], w[0], t).toFixed(1), lerp(w0[k][1], w[1], t).toFixed(1)); });
            stepLbl.setAttribute('x', lerp(s0, s1, t).toFixed(1));
          }, function () {
            Object.keys(chunks).forEach(function (c) { var p = +c - newOff; if (p < 0 || p > 11) { chunks[c].remove(); delete chunks[c]; } });
            // 3. rescore all four retained chunks and the new candidate (no ties); bars ease to them
            var used = {}, h0 = s.scores.slice();
            n.scores = h0.map(function () { var v; do { v = 6 + Math.floor(rand() * 31); } while (used[v]); used[v] = 1; return v; });
            state = n;
            var nl = lowest(n), e0 = +evictLbl.getAttribute('x'), e1 = +bars[nl].getAttribute('x') + 7;
            tween(650, function (t) {
              setBars(h0.map(function (h, k) { return lerp(h, n.scores[k], t); }), t > 0.5 ? nl : -1);
              evictLbl.setAttribute('x', lerp(e0, e1, t).toFixed(1));
            }, function () { setBars(n.scores, nl); busy = false; });
          });
        }, 550);
      }

      var ctl = controls(svg, '<button type="button" class="fig-btn" data-act="play"></button><button type="button" class="fig-btn" data-act="reset">Reset</button>');
      var playBtn = ctl.querySelector('[data-act="play"]');
      var player = autoplay(svg, 3400, step);
      var label = function () { playBtn.textContent = player.paused() ? 'Play' : 'Pause'; };
      ctl.addEventListener('click', function (e) {
        var a = e.target.closest('[data-act]');
        if (!a) return;
        if (a.dataset.act === 'reset') { if (!busy) reset(); }
        else { if (player.toggle() === false) step(); label(); }
      });
      reset(); label();
    },

    // Mathlib: drag nodes in a spring layout anchored to the drawn positions; hover shows
    // neighbors. On its own, it nudges a random node every few seconds and lights up its neighbors.
    mathlib: function (svg) {
      var nodes = all(svg, 'circle[data-n]').map(function (c) {
        var x = +c.getAttribute('cx'), y = +c.getAttribute('cy');
        return { el: c, x: x, y: y, x0: x, y0: y, vx: 0, vy: 0, nb: [] };
      });
      var edges = all(svg, 'line[data-a]').map(function (l) {
        var a = nodes[+l.dataset.a], b = nodes[+l.dataset.b];
        a.nb.push(b); b.nb.push(a);
        return { el: l, a: a, b: b, len: Math.hypot(a.x - b.x, a.y - b.y) };
      });
      var label = svg.querySelector('[data-follow]'), hub = label && nodes[+label.dataset.follow];
      var hint = svg.querySelector('[data-hint]');
      if (hint) hint.textContent = hint.dataset.hint;
      var drag = null, running = false;

      function draw() {
        nodes.forEach(function (n) { n.el.setAttribute('cx', n.x.toFixed(1)); n.el.setAttribute('cy', n.y.toFixed(1)); });
        edges.forEach(function (e) {
          e.el.setAttribute('x1', e.a.x.toFixed(1)); e.el.setAttribute('y1', e.a.y.toFixed(1));
          e.el.setAttribute('x2', e.b.x.toFixed(1)); e.el.setAttribute('y2', e.b.y.toFixed(1));
        });
        if (hub) { label.setAttribute('x', hub.x.toFixed(1)); label.setAttribute('y', (hub.y + 23).toFixed(1)); }
      }
      function tick() {
        edges.forEach(function (e) {  // springs keep each edge near its drawn length
          var dx = e.b.x - e.a.x, dy = e.b.y - e.a.y, d = Math.hypot(dx, dy) || 1, f = (d - e.len) * 0.03;
          e.a.vx += dx / d * f; e.a.vy += dy / d * f; e.b.vx -= dx / d * f; e.b.vy -= dy / d * f;
        });
        var energy = 0;
        nodes.forEach(function (n) {
          if (n === drag) { n.vx = n.vy = 0; return; }
          n.vx = (n.vx + (n.x0 - n.x) * 0.004) * 0.86;  // weak pull home, damping
          n.vy = (n.vy + (n.y0 - n.y) * 0.004) * 0.86;
          n.x = Math.min(282, Math.max(10, n.x + n.vx));
          n.y = Math.min(226, Math.max(10, n.y + n.vy));
          energy += Math.abs(n.vx) + Math.abs(n.vy);
        });
        draw();
        if (drag || energy > 0.05) requestAnimationFrame(tick); else running = false;
      }
      function wake() { if (!running) { running = true; requestAnimationFrame(tick); } }
      function toSvg(e) {
        var pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
        return pt.matrixTransform(svg.getScreenCTM().inverse());
      }
      function highlight(n) {
        svg.classList.toggle('hl', !!n);
        nodes.forEach(function (m) { m.el.classList.toggle('on', !!n && (m === n || n.nb.indexOf(m) >= 0)); });
        edges.forEach(function (e) { e.el.classList.toggle('on', !!n && (e.a === n || e.b === n)); });
      }
      var player = autoplay(svg, 2600, function () {
        var pick = nodes.filter(function (n) { return n.nb.length >= 3; });
        var n = pick[Math.floor(Math.random() * pick.length)], a = Math.random() * 2 * Math.PI;
        n.vx += 4 * Math.cos(a); n.vy += 4 * Math.sin(a);
        highlight(n); wake();
        setTimeout(function () { if (!drag) highlight(null); }, 1500);
      });
      svg.addEventListener('pointerenter', function () { player.hold(4000); });
      svg.addEventListener('pointermove', function () { player.hold(4000); });
      nodes.forEach(function (n) {
        n.el.addEventListener('pointerenter', function () { if (!drag) highlight(n); });
        n.el.addEventListener('pointerleave', function () { if (!drag) highlight(null); });
        n.el.addEventListener('pointerdown', function (e) {
          drag = n; svg.classList.add('dragging'); highlight(n); wake();
          try { n.el.setPointerCapture(e.pointerId); } catch (err) { /* keep dragging without capture */ }
        });
        n.el.addEventListener('pointermove', function (e) {
          if (drag !== n) return;
          var p = toSvg(e);
          n.x = Math.min(282, Math.max(10, p.x)); n.y = Math.min(226, Math.max(10, p.y));
        });
        var release = function () { if (drag === n) { drag = null; svg.classList.remove('dragging'); highlight(null); wake(); } };
        n.el.addEventListener('pointerup', release);
        n.el.addEventListener('pointercancel', release);
      });
    },

    // Mixer: k sweeps back and forth over the report's Fig. 1c values with an eased marker; the
    // slider takes over when touched. Hover a token to see its token-mixing lines.
    mixer: function (svg) {
      var d = JSON.parse(svg.dataset.plot);
      var X = function (i) { return d.x0 + i * (d.x1 - d.x0) / 6; };
      var Y = function (a) { return d.yb - (a - 0.2) / 0.8 * (d.yb - d.yt); };
      var at = function (arr, i) { var j = Math.floor(i), f = i - j; return j >= 6 ? arr[6] : lerp(arr[j], arr[j + 1], f); };
      var rule = svgEl('line', { y1: d.yt - 4, y2: d.yb, class: 's-red dash', style: 'stroke-width:1' });
      var dotI = svgEl('circle', { r: 3.5, style: 'fill:var(--muted)' });
      var dotC = svgEl('circle', { r: 3.5, class: 'f-blue' });
      var g = svgEl('g', {}); g.append(rule, dotI, dotC); svg.appendChild(g);
      var ctl = controls(svg, '<label>clusters <i>k</i> <input type="range" min="0" max="6" step="1" value="4" aria-label="number of clusters k"></label><output></output>');
      var slider = ctl.querySelector('input'), out = ctl.querySelector('output'), pos = 4, dir = 1;
      function place(i) {  // i may be fractional while easing between grid points
        var x = X(i);
        rule.setAttribute('x1', x); rule.setAttribute('x2', x);
        dotI.setAttribute('cx', x); dotI.setAttribute('cy', Y(at(d.iwl, i)));
        dotC.setAttribute('cx', x); dotC.setAttribute('cy', Y(at(d.icl, i)));
      }
      function readout(i) {
        out.innerHTML = '<i>k</i> = 2<sup>' + d.k[i] + '</sup>: IWL test ' + d.iwl[i].toFixed(2) + ', ICL test ' + d.icl[i].toFixed(2) + ' <span class="fig-note">(read off report Fig. 1c)</span>';
      }
      function go(i) { var from = pos; pos = i; slider.value = i; readout(i); tween(600, function (t) { place(lerp(from, i, t)); }); }
      place(pos); readout(pos);
      var player = autoplay(svg, 1500, function () {
        if (pos + dir < 0 || pos + dir > 6) dir = -dir;
        go(pos + dir);
      });
      slider.addEventListener('input', function () { player.hold(6000); go(+slider.value); });
      all(svg, 'rect[data-tok]').forEach(function (r) {
        var lines = all(svg, 'line[data-from="' + r.dataset.tok + '"]');
        r.addEventListener('pointerenter', function () { player.hold(6000); svg.classList.add('hl'); lines.forEach(function (l) { l.classList.add('on'); }); });
        r.addEventListener('pointerleave', function () { svg.classList.remove('hl'); lines.forEach(function (l) { l.classList.remove('on'); }); });
      });
    },

    // Boule or Baguette: a dot runs each reasoning trace at the same speed per step, on a loop;
    // the short trace finishes long before the long one. Qualitative, as in the paper's Fig. 3a.
    boule: function (svg) {
      var traces = all(svg, '[data-trace]').map(function (l) {
        return { pts: l.dataset.points.split(' ').map(function (p) { return p.split(',').map(Number); }),
                 result: svg.querySelector('[data-result="' + l.dataset.trace + '"]') };
      });
      var ctl = controls(svg, '<button type="button" class="fig-btn">Run the traces</button><span class="fig-note">same speed per reasoning step</span>');
      var step = 420, busy = false;
      function run() {
        if (busy) return;
        busy = true;
        var start = performance.now(), longest = 0;
        traces.forEach(function (t) {
          longest = Math.max(longest, (t.pts.length - 1) * step);
          t.dot = t.dot || svg.appendChild(svgEl('circle', { r: 5, class: 'f-red', style: 'stroke:var(--paper);stroke-width:1.5' }));
          t.done = false;
          t.result.classList.remove('flash');
        });
        (function frame(now) {
          var el = now - start;
          traces.forEach(function (t) {
            var s = Math.min(el / step, t.pts.length - 1), i = Math.floor(s), f = ease(s - i), a = t.pts[i], b = t.pts[Math.min(i + 1, t.pts.length - 1)];
            t.dot.setAttribute('cx', lerp(a[0], b[0], f));
            t.dot.setAttribute('cy', lerp(a[1], b[1], f));
            if (!t.done && s >= t.pts.length - 1) { t.done = true; t.result.classList.add('flash'); }
          });
          if (el < longest + step) requestAnimationFrame(frame); else busy = false;
        })(start);
      }
      ctl.querySelector('button').addEventListener('click', run);
      autoplay(svg, 5200, run);
    },

    // The Argument is the Explanation: the agent's output is mined into literals a1..a4, the
    // support and attack edges between them are classified, a user-supplied fact attacks a3 and
    // flags it, and the result goes back to the agents as test-time feedback. Builds up, then rests.
    argument: function (svg) {
      var p = function (n) { return part(svg, n); };
      var spans = parts(svg, 'span'), nodes = parts(svg, 'node'), edges = parts(svg, 'edge');
      autoplay(svg, 9500, function () {
        show(spans.concat(nodes, edges, p('fact'), p('ring'), p('flagged'), p('feedback')), false);
        var steps = [[1700, function () { travel(p('mine'), 600, INK); }]];
        spans.forEach(function (s, i) { steps.push([500 + 220 * i, function () { show(s, true); }]); });
        nodes.forEach(function (n, i) { steps.push([2300 + 200 * i, function () { show(n, true); pulse(n); }]); });
        edges.forEach(function (e, i) { steps.push([3200 + 600 * i, function () { show(e, true); travel(e, 500, i < 2 ? INK : RED); }]); });
        steps.push(
          [5000, function () { show(p('fact'), true); travel(p('fact'), 500, RED); }],
          [5600, function () { show([p('ring'), p('flagged')], true); pulse(p('ring')); pulse(p('flagged')); }],
          [6400, function () {  // the dot draws the feedback arrow from a3 back to the output
            draw(p('feedback'), 1400); show(p('feedback'), true);
            travel(p('feedback'), 1400, MUTED, function () { spans.forEach(pulse); });
          }]
        );
        timeline(steps);
      });
    },

    // LASER. Within one forward pass, each recursion step stores Z_i = X_i Q against the shared
    // basis Q. Across training steps, a power iteration refreshes Q_{t-1}; if the fidelity F_t
    // clears ε it becomes Q_t, otherwise the rank grows. The "no" branch plays every third cycle
    // only so both branches are seen; the figure makes no claim about how often it happens.
    laser: function (svg) {
      var p = function (n) { return part(svg, n); }, cycle = 0;
      function project(k) {  // X_k comes down through ·Q while Q comes in along its link; both meet at Z_k
        pulse(p('x-' + k)); pulse(p('q'));
        travel(p('down-' + k), 500, INK, function () { pulse(p('z-' + k)); });
        travel(p('zq-' + k), 500, RED, null, true);
      }
      autoplay(svg, 7000, function () {
        var no = ++cycle % 3 === 0;
        timeline([
          [0, function () { project(0); }],
          [700, function () { travel(p('rec-0'), 350, INK); }],
          [1050, function () { project(1); }],
          [1750, function () { route([[p('rec-1'), 300, INK], [p('rec-2'), 250, INK]]); }],
          [2300, function () { project(2); }],
          [3400, function () {
            pulse(p('qprev'));
            route([[p('pi'), 800, INK, p('gate')], no ? [p('no'), 400, MUTED, p('notext')] : [p('yes'), 600, INK, p('qt')]]);
          }]
        ]);
      });
    },

    // Activation-guided suffixes. (a) Token swaps in the suffix move the hidden state h until its
    // projection on the refusal direction is near zero. (b) Soft-GCG: each stage lowers τ and the
    // Gumbel-Softmax distribution sharpens; s̃ᵀE feeds the LLM, the CE / CW loss sends Adam steps
    // back to φ, and the final suffix is the argmax.
    gcg: function (svg) {
      var p = function (n) { return part(svg, n); };
      var suffix = parts(svg, 'suffix'), stages = parts(svg, 'stage'), boxes = parts(svg, 'box');
      function swap() {  // (a) one round: swap tokens, h moves, the loss reports, back to the suffix
        suffix.forEach(pulse);
        show(p('after'), false, 0.15);
        timeline([
          [400, function () { travel(p('move'), 900, RED, function () { show(p('after'), true); pulse(p('after')); pulse(p('loss')); }); }],
          [2000, function () { travel(p('swap'), 700, MUTED, function () { suffix.forEach(pulse); }); }]
        ]);
      }
      function stage(j) {  // (b) light stage j (τ just lowered), then one optimization pass
        stages.forEach(function (s, i) { show(s, i === j, 0.2); });
        if (j) pulse(p('tau-' + (j - 1)));
        pulse(boxes[0]);
        route([[p('flow-0'), 300, INK, boxes[1]], [p('flow-1'), 300, INK, boxes[2]], [p('adam'), 900, MUTED, boxes[0]]]);
      }
      autoplay(svg, 8000, function () {
        timeline([
          [0, swap], [3800, swap],
          [0, function () { stage(0); }], [2300, function () { stage(1); }], [4600, function () { stage(2); }],
          [6800, function () { show(stages, true); pulse(p('argmax')); }]
        ]);
      });
    }
  };

  all(document, 'svg[data-figure]').forEach(function (svg) {
    if (figures[svg.dataset.figure]) figures[svg.dataset.figure](svg);
  });

  // Research map: themes on the left, papers on the right, curves for each paper's themes.
  // Hover or focus either side to trace its links; papers link to their entries. On its own
  // it steps through the themes one at a time.
  all(document, '.research-map').forEach(function (map) {
    var svg = map.querySelector('.map-edges'), themes = {}, order = [];
    all(map, '.map-themes li').forEach(function (li) { themes[li.dataset.theme] = li; order.push(li.dataset.theme); });
    var papers = all(map, '.map-papers li');
    var mean = function (li) {
      var ids = li.dataset.themes.split(' ');
      return ids.reduce(function (s, id) { return s + order.indexOf(id); }, 0) / ids.length;
    };
    papers.sort(function (a, b) { return mean(a) - mean(b); }).forEach(function (li) { li.parentNode.appendChild(li); });
    var paths = [], drawn = false, current = [null, null], size = '';
    function draw() {
      svg.innerHTML = ''; paths = [];
      var box = map.getBoundingClientRect();
      papers.forEach(function (li) {
        var p = li.firstElementChild.getBoundingClientRect();
        li.dataset.themes.split(' ').forEach(function (id) {
          var t = themes[id].getBoundingClientRect();
          var x1 = t.right - box.left, y1 = t.top + t.height / 2 - box.top, x2 = p.left - box.left, y2 = p.top + p.height / 2 - box.top, m = (x1 + x2) / 2;
          var path = svgEl('path', { d: 'M' + x1 + ' ' + y1 + ' C ' + m + ' ' + y1 + ', ' + m + ' ' + y2 + ', ' + x2 + ' ' + y2 });
          path.theme = id; path.paper = li;
          svg.appendChild(path); paths.push(path);
          if (!drawn && !calm) {  // draw each curve in once, on first layout
            var len = path.getTotalLength();
            path.style.strokeDasharray = len;
            path.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { duration: 900, easing: 'ease-out', fill: 'backwards' });
          }
        });
      });
      drawn = true;
      focus(current[0], current[1]);
    }
    function focus(theme, paper) {
      current = [theme, paper];
      map.classList.toggle('focus', !!(theme || paper));
      paths.forEach(function (p) { p.classList.toggle('on', p.theme === theme || p.paper === paper); });
      var onThemes = {}, onPapers = [];
      paths.forEach(function (p) { if (p.classList.contains('on')) { onThemes[p.theme] = 1; onPapers.push(p.paper); } });
      order.forEach(function (id) { themes[id].classList.toggle('on', !!onThemes[id]); });
      papers.forEach(function (li) { li.classList.toggle('on', onPapers.indexOf(li) >= 0); });
    }
    var user = false, cycle = -1;
    var player = autoplay(map, 2200, function () {
      if (user) return;
      cycle = (cycle + 1) % (order.length + 1);  // each theme in turn, then a beat with nothing lit
      focus(cycle < order.length ? order[cycle] : null, null);
    });
    map.addEventListener('pointerenter', function () { user = true; });
    map.addEventListener('pointerleave', function () { user = false; player.hold(1500); focus(null, null); });
    order.forEach(function (id) {
      themes[id].addEventListener('pointerenter', function () { focus(id, null); });
      themes[id].addEventListener('pointerleave', function () { focus(null, null); });
    });
    papers.forEach(function (li) {
      var a = li.firstElementChild;
      a.addEventListener('pointerenter', function () { focus(null, li); });
      a.addEventListener('pointerleave', function () { focus(null, null); });
      a.addEventListener('focus', function () { user = true; focus(null, li); });
      a.addEventListener('blur', function () { user = false; focus(null, null); });
    });
    // Draw once fonts have settled the chip sizes, then again only when the map's size changes.
    var redraw = function () {
      var b = map.getBoundingClientRect(), s = Math.round(b.width) + 'x' + Math.round(b.height);
      if (s !== size) { size = s; draw(); }
    };
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(function () {
      redraw();
      if (window.ResizeObserver) new ResizeObserver(redraw).observe(map);
    });
  });
})();
