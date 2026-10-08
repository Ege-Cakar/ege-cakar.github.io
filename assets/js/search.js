// Site search. Cmd/Ctrl+K, "/", or the nav magnifier opens a dialog over /search.json,
// which _plugins/search_index.rb writes at build time. Every query word must match the
// title or text; title matches rank higher.
(function () {
  var dialog = document.querySelector('.search-dialog');
  if (!dialog) return;
  var input = dialog.querySelector('input'), list = dialog.querySelector('.search-results');
  var index = null, results = [], active = 0;

  var esc = function (s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var mark = function (s, terms) {
    var out = esc(s);
    terms.forEach(function (t) { out = out.replace(new RegExp('(' + esc(t).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'), '<mark>$1</mark>'); });
    return out;
  };

  function search(q) {
    var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length || !index) return [];
    return index.map(function (e) {
      var title = e.title.toLowerCase(), text = e.text.toLowerCase(), score = 0;
      for (var i = 0; i < terms.length; i++) {
        var t = terms[i], inTitle = title.indexOf(t) >= 0;
        if (!inTitle && text.indexOf(t) < 0) return null;
        score += inTitle ? 10 + (title.indexOf(t) === 0 ? 5 : 0) : 1;
      }
      return { e: e, score: score, terms: terms };
    }).filter(Boolean).sort(function (a, b) { return b.score - a.score; }).slice(0, 8);
  }

  function snippet(text, terms) {
    var lower = text.toLowerCase(), at = -1;
    terms.forEach(function (t) { var i = lower.indexOf(t); if (i >= 0 && (at < 0 || i < at)) at = i; });
    if (at < 0) return text.slice(0, 140);
    var start = Math.max(0, at - 50);
    return (start ? '…' : '') + text.slice(start, start + 150) + (start + 150 < text.length ? '…' : '');
  }

  function render() {
    var q = input.value.trim();
    results = search(q);
    active = Math.min(active, Math.max(results.length - 1, 0));
    if (!q) { list.innerHTML = '<li class="search-empty">Type to search papers, posts, projects, and pages.</li>'; return; }
    if (!index) { list.innerHTML = '<li class="search-empty">Loading…</li>'; return; }
    if (!results.length) { list.innerHTML = '<li class="search-empty">No results for “' + esc(q) + '”.</li>'; return; }
    list.innerHTML = results.map(function (r, i) {
      return '<li' + (i === active ? ' class="active"' : '') + '><a href="' + esc(r.e.url) + '">' +
        '<span class="search-type">' + r.e.type + '</span><span class="search-title">' + mark(r.e.title, r.terms) + '</span>' +
        '<span class="search-snippet">' + mark(snippet(r.e.text, r.terms), r.terms) + '</span></a></li>';
    }).join('');
  }

  function open() {
    if (!index) fetch('/search.json').then(function (r) { return r.json(); }).then(function (d) { index = d; render(); });
    active = 0; render();
    if (!dialog.open) dialog.showModal();
    input.select();
  }
  function go(i) { if (results[i]) { dialog.close(); location.href = results[i].e.url; } }
  // Plays the closing animation (.closing in _sass/_motion.scss), then closes.
  function close() {
    if (!dialog.open || dialog.classList.contains('closing')) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return dialog.close();
    dialog.classList.add('closing');
    setTimeout(function () { dialog.classList.remove('closing'); dialog.close(); }, 160);
  }

  document.addEventListener('keydown', function (e) {
    var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) || document.activeElement.isContentEditable;
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); dialog.open ? close() : open(); }
    else if (e.key === '/' && !typing && !dialog.open) { e.preventDefault(); open(); }
  });
  document.querySelectorAll('.search-toggle').forEach(function (b) { b.addEventListener('click', open); });
  input.addEventListener('input', function () { active = 0; render(); });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      active = (active + (e.key === 'ArrowDown' ? 1 : -1) + results.length) % Math.max(results.length, 1);
      render();
    } else if (e.key === 'Enter') { e.preventDefault(); go(active); }
  });
  list.addEventListener('click', function (e) { if (e.target.closest('a')) dialog.close(); });
  dialog.addEventListener('click', function (e) { if (e.target === dialog) close(); });
  dialog.addEventListener('cancel', function (e) { e.preventDefault(); close(); });  // Esc
})();
