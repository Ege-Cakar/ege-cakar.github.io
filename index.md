---
layout: home
title: Home
---

<div class="profile">
  <img src="/assets/img/pfp.jpg" alt="Ege Çakar" class="profile-photo">
  <div class="profile-info">
    <h1>Ege Çakar</h1>
    <p class="subtitle">Machine Learning · Physics · Statistics</p>
    <p>
      I'm a fourth-year (Senior) student at Harvard, pursuing a joint AB in Statistics and Physics alongside a concurrent SM in Computer Science. I'm interested in understanding the nature of intelligence and reasoning through different methods and lenses, with downstream applications of more intelligent systems to assist scientists and research.
    </p>
    <ul class="contact-links">
      <li><a href="mailto:ecakar@college.harvard.edu">{% include icon.html name="envelope" %}Email</a></li>
      <li><a href="https://github.com/Ege-Cakar" target="_blank">{% include icon.html name="cat" %}GitHub</a></li>
      <li><a href="https://linkedin.com/in/egecakar" target="_blank">{% include icon.html name="id-card" %}LinkedIn</a></li>
      <li><a href="/cv/">{% include icon.html name="scroll" %}CV</a></li>
    </ul>
  </div>
</div>

<div class="pub-tabs">
  <div class="tab-buttons">
    <button class="tab-btn active" data-tab="publications">{% include icon.html name="sealed-paper" %}Peer-Reviewed Papers</button>
    <button class="tab-btn" data-tab="preprints">{% include icon.html name="paper-stack" %}Preprints & Technical Reports</button>
    <span class="tab-indicator"></span>
  </div>

  <div class="tab-content active" id="publications">
    <ul class="pub-list">
      {% assign papers = site.data.papers | where: "type", "peer-reviewed" %}
      {% for p in papers %}<li class="pub-item">{% include paper.html p=p %}</li>
      {% endfor %}
    </ul>
  </div>

  <div class="tab-content" id="preprints">
    <ul class="pub-list">
      {% assign papers = site.data.papers | where: "type", "preprint" %}
      {% for p in papers %}<li class="pub-item">{% include paper.html p=p %}</li>
      {% endfor %}
    </ul>
  </div>
</div>

<script>
(function() {
  var indicator = document.querySelector('.tab-indicator');
  var buttons = document.querySelectorAll('.tab-btn');

  function moveIndicator(btn) {
    indicator.style.left = btn.offsetLeft + 'px';
    indicator.style.width = btn.offsetWidth + 'px';
  }

  // Set initial position
  moveIndicator(document.querySelector('.tab-btn.active'));

  buttons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      buttons.forEach(function(b) { b.classList.remove('active'); });
      document.querySelectorAll('.tab-content').forEach(function(c) { c.classList.remove('active'); });
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
      moveIndicator(btn);
    });
  });
})();
</script>

## News

<ol class="timeline compact">
  <li>
    <div class="tl-date">October 2026</div>
    <div class="tl-body"><a href="{% post_url 2026-10-06-mathlib-proof-graphs %}">Blog post</a> over my side project in Pehlevan Lab over Spring 2026 is up!</div>
  </li>
  <li>
    <div class="tl-date">September 2026</div>
    <div class="tl-body"><a href="https://arxiv.org/abs/2602.14404" target="_blank">Boule or Baguette?</a> was accepted to the NeurIPS 2026 Main Track!</div>
  </li>
  <li>
    <div class="tl-date">Fall 2026</div>
    <div class="tl-body">Joined the Du Lab at the Kempner Institute, working on Energy-Based Transformers.</div>
  </li>
  <li>
    <div class="tl-date">Fall 2026</div>
    <div class="tl-body">Became a Teaching Fellow for COMPSCI 2881R.</div>
  </li>
  <li>
    <div class="tl-date">Feb 2026</div>
    <div class="tl-body">Accepted into the SM in Computer Science program at Harvard GSAS.</div>
  </li>
</ol>
