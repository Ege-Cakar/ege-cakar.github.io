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
