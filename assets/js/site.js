// Timeline dots fill in as their entry scrolls into view (styles in _sass/_motion.scss).
(function () {
  var items = document.querySelectorAll('.timeline > li');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (li) { li.classList.add('seen'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('seen'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  items.forEach(function (li) { io.observe(li); });
})();

// Reading progress bar on blog posts (.read-progress in _layouts/post.html).
(function () {
  var bar = document.querySelector('.read-progress');
  if (!bar) return;
  var update = function () {
    var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(h.scrollTop / max, 1) : 0) + ')';
  };
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  update();
})();

// Copy to clipboard: Cite buttons (BibTeX in data-bibtex) and a Copy button on each
// code block in blog posts. The button label reads "Copied" for a moment afterwards.
(function () {
  function copy(text, btn) {
    var label = btn.querySelector('span') || btn, old = label.textContent;
    var done = function () { label.textContent = 'Copied'; setTimeout(function () { label.textContent = old; }, 1500); };
    var fallback = function () { window.prompt('Copy:', text); };
    navigator.clipboard ? navigator.clipboard.writeText(text).then(done, fallback) : fallback();
  }
  document.querySelectorAll('.cite-btn').forEach(function (b) {
    b.addEventListener('click', function () { copy(b.dataset.bibtex, b); });
  });
  document.querySelectorAll('article div.highlighter-rouge').forEach(function (block) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'copy-code'; b.textContent = 'Copy';
    b.addEventListener('click', function () { copy(block.querySelector('pre').innerText.replace(/\n$/, ''), b); });
    block.appendChild(b);
  });
})();
