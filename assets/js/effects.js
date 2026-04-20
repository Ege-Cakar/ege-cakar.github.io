(function () {
  'use strict';

  function rand(min, max) { return Math.random() * (max - min) + min; }
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  function getAccentColor() {
    return getComputedStyle(document.documentElement)
      .getPropertyValue('--accent').trim() || '#c2703a';
  }

  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    return {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16)
    };
  }

  // ─── METABALLS ────────────────────────────────────────────────────
  function initMetaballs() {
    var zones = document.querySelectorAll('.metaball-group');
    if (!zones.length) return;

    var accent = getAccentColor();

    zones.forEach(function (group) {
      var svg = group.closest('svg');
      var container = svg.parentElement;
      var w = container.offsetWidth;
      var h = container.offsetHeight;

      // Scale blob size and count to container height
      var maxR = Math.min(h * 0.45, 35);
      var minR = Math.max(h * 0.2, 8);
      var blobCount = 10;

      svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);

      for (var i = 0; i < blobCount; i++) {
        var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        var r = rand(minR, maxR);
        var cx = rand(r, w - r);
        var cy = rand(0, h);
        circle.setAttribute('r', r);
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('fill', accent);
        group.appendChild(circle);

        animateBlob(circle, w, h, minR, maxR);
      }
    });
  }

  function animateBlob(circle, w, h, minR, maxR) {
    function wander() {
      anime({
        targets: circle,
        cx: rand(20, w - 20),
        cy: rand(0, h),
        r: rand(minR, maxR),
        duration: rand(4000, 8000),
        easing: 'easeInOutSine',
        complete: wander
      });
    }
    setTimeout(wander, rand(0, 2000));
  }

  // ─── DOT GRAPHS ──────────────────────────────────────────────────

  // ML-relevant functions
  var graphFunctions = [
    // Sigmoid (logistic activation)
    function (t) { var x = t * 12 - 6; return { x: t, y: 1 - 1 / (1 + Math.exp(-x)) }; },
    // ReLU
    function (t) { return { x: t, y: 1 - Math.max(0, t * 2 - 0.5) }; },
    // Tanh
    function (t) { var x = t * 6 - 3; return { x: t, y: 0.5 - 0.45 * Math.tanh(x) }; },
    // Gaussian / bell curve (kernel, RBF)
    function (t) { var x = t * 6 - 3; return { x: t, y: 1 - Math.exp(-x * x / 2) }; },
    // Softplus
    function (t) { var x = t * 8 - 4; return { x: t, y: 1 - Math.log(1 + Math.exp(x)) / 5 }; },
    // Exponential decay (learning rate schedule)
    function (t) { return { x: t, y: 1 - Math.exp(-3 * t) }; },
    // GELU approximation
    function (t) { var x = t * 6 - 3; return { x: t, y: 0.5 - 0.45 * x * 0.5 * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (x + 0.044715 * x * x * x))) / 3 }; },
    // Log loss / cross-entropy shape
    function (t) { var x = Math.max(t, 0.01); return { x: t, y: -Math.log(x) / 5 }; },
    // Cosine annealing (learning rate)
    function (t) { return { x: t, y: 1 - 0.5 * (1 + Math.cos(t * Math.PI)) }; },
    // Leaky ReLU
    function (t) { var x = t * 2 - 1; return { x: t, y: 0.5 - 0.45 * (x > 0 ? x : 0.1 * x) }; },
    // Smooth step (approximated classifier decision boundary)
    function (t) { var x = (t - 0.5) * 16; return { x: t, y: 0.5 - 0.4 / (1 + Math.exp(-x)) }; }
  ];

  function initDotGraphs() {
    var canvasLeft = document.querySelector('.dot-graph-left');
    var canvasRight = document.querySelector('.dot-graph-right');
    if (!canvasLeft || !canvasRight) return;

    var dotCount = 30;
    var currentIdx = Math.floor(Math.random() * graphFunctions.length);
    var accent = getAccentColor();
    var rgb = hexToRgb(accent);
    var margin = 0.08;
    var area = 1 - margin * 2;

    function safePos(fn, t) {
      var pos = fn(t);
      return { x: clamp(pos.x, 0, 1), y: clamp(pos.y, 0, 1) };
    }

    // Shared dot state
    var dots = [];
    var graphFn = graphFunctions[currentIdx];
    for (var i = 0; i < dotCount; i++) {
      var t = i / (dotCount - 1);
      var pos = safePos(graphFn, t);
      dots.push({
        x: margin + pos.x * area,
        y: margin + pos.y * area
      });
    }

    // Setup each canvas
    function setupCanvas(canvas) {
      var ctx = canvas.getContext('2d');
      function resize() {
        var rect = canvas.getBoundingClientRect();
        var dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      resize();
      window.addEventListener('resize', resize);
      return ctx;
    }

    var ctxLeft = setupCanvas(canvasLeft);
    var ctxRight = setupCanvas(canvasRight);

    function draw() {
      var wL = canvasLeft.getBoundingClientRect().width;
      var hL = canvasLeft.getBoundingClientRect().height;
      var wR = canvasRight.getBoundingClientRect().width;
      var hR = canvasRight.getBoundingClientRect().height;
      var fillStyle = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';

      ctxLeft.clearRect(0, 0, wL, hL);
      ctxRight.clearRect(0, 0, wR, hR);

      dots.forEach(function (dot) {
        // Left: normal
        ctxLeft.beginPath();
        ctxLeft.arc(dot.x * wL, dot.y * hL, 2.5, 0, Math.PI * 2);
        ctxLeft.fillStyle = fillStyle;
        ctxLeft.fill();

        // Right: mirrored on x
        ctxRight.beginPath();
        ctxRight.arc((1 - dot.x) * wR, dot.y * hR, 2.5, 0, Math.PI * 2);
        ctxRight.fillStyle = fillStyle;
        ctxRight.fill();
      });

      requestAnimationFrame(draw);
    }

    draw();

    function morphToNext() {
      currentIdx = (currentIdx + 1) % graphFunctions.length;
      var nextFn = graphFunctions[currentIdx];

      dots.forEach(function (dot, i) {
        var t = i / (dotCount - 1);
        var pos = safePos(nextFn, t);

        anime({
          targets: dot,
          x: margin + pos.x * area,
          y: margin + pos.y * area,
          duration: anime.random(600, 1000),
          easing: 'easeInOutQuad',
          delay: i * 8
        });
      });
    }

    // Start morphing immediately
    morphToNext();
    setTimeout(function cycle() {
      morphToNext();
      setTimeout(cycle, 1800);
    }, 1800);
  }

  // ─── INIT ─────────────────────────────────────────────────────────
  function init() {
    if (typeof anime === 'undefined') {
      setTimeout(init, 50);
      return;
    }
    initMetaballs();
    initDotGraphs();
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
