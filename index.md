---
layout: home
title: Home
---

<div class="profile">
  <img src="/assets/img/pfp.jpg" alt="Ege Çakar" class="profile-photo">
  <div class="profile-info">
    <h1>Ege Çakar</h1>
    <p class="subtitle">Machine Learning · Computer Science · Statistics</p>
    <p>
      I'm a fourth-year (Senior) student at Harvard, pursuing a joint AB in Statistics and Physics alongside a concurrent SM in Computer Science. I'm interested in understanding the nature of intelligence and reasoning through different methods and lenses, with downstream applications of more intelligent systems to assist scientists and research.
    </p>
    <ul class="contact-links">
      <li><a href="mailto:ecakar@college.harvard.edu">Email</a></li>
      <li><a href="https://github.com/Ege-Cakar" target="_blank">GitHub</a></li>
      <li><a href="https://linkedin.com/in/egecakar" target="_blank">LinkedIn</a></li>
      <li><a href="/cv/">CV</a></li>
    </ul>
  </div>
</div>

<div class="pub-tabs">
  <div class="tab-buttons">
    <button class="tab-btn active" data-tab="publications">Peer-Reviewed Papers</button>
    <button class="tab-btn" data-tab="preprints">Preprints & Technical Reports</button>
    <span class="tab-indicator"></span>
  </div>

  <div class="tab-content active" id="publications">
    <ul class="pub-list">
      <li>
        <strong>Optimizing Against Safety Representations: Activation-Guided Adversarial Suffixes and the Geometry of Refusal</strong><br>
        <span class="pub-authors"><b>Ege Çakar</b>, Kayden Kehe, Hannah Guan</span><br>
        <span class="pub-venue">Accepted to the AAAI 2026 Summer Symposium Series: AI-Driven Resilience (Seoul, South Korea, June 2026; to appear in proceedings) and the ICLR 2026 Workshop on Representational Alignment (Re-Align) (Rio de Janeiro, Brazil, April 2026).</span><br>
        <a href="https://arxiv.org/abs/2607.08883" target="_blank">Paper</a>
      </li>
      <li>
        <strong>LASER: Low-Rank Activation SVD for Efficient Recursion</strong><br>
        <span class="pub-authors"><b>Ege Çakar</b>, Ketan Ali Raghu, Lia Zheng</span><br>
        <span class="pub-venue">Accepted to the ICLR 2026 Workshop on Latent &amp; Implicit Thinking (LIT). Rio de Janeiro, Brazil, April 2026.</span><br>
        <a href="https://arxiv.org/abs/2604.17224" target="_blank">Paper</a>
      </li>
    </ul>
  </div>

  <div class="tab-content" id="preprints">
    <ul class="pub-list">
      <li>
        <strong>Mathlib as a Geometry of Mathematics: An Empirical Study of Formal Proof Graphs</strong><br>
        <span class="pub-authors"><b>Ege Çakar</b></span><br>
        <span class="pub-venue">Technical Report, 2026</span><br>
        <span class="pub-note">Blog post and manuscript forthcoming</span>
      </li>
      <li>
        <strong>Boule or Baguette? A Study on Task Topology, Length Generalization, and the Benefit of Reasoning Traces</strong><br>
        <span class="pub-authors">William L. Tong, <b>Ege Çakar</b>, Cengiz Pehlevan</span><br>
        <span class="pub-venue">arXiv preprint arXiv:2602.14404, 2026. [Under review]</span><br>
        <a href="https://arxiv.org/abs/2602.14404" target="_blank">Paper</a>
      </li>
      <li>
        <strong>The Argument is the Explanation: Structured Argumentation for Trust in Agents</strong><br>
        <span class="pub-authors"><b>Ege Çakar</b>, Per Ola Kristensson</span><br>
        <span class="pub-venue">arXiv preprint arXiv:2510.03442, 2025</span><br>
        <a href="https://arxiv.org/abs/2510.03442" target="_blank">Paper</a> · <a href="https://github.com/Ege-Cakar/Structured-Argumentation-For-Trust" target="_blank">Code</a>
      </li>
      <li>
        <strong>In-Context Learning Without Attention: The Surprising Efficiency of MLP Mixer Architectures</strong><br>
        <span class="pub-authors"><b>Ege Çakar</b></span><br>
        <span class="pub-venue">Technical Report, 2025</span><br>
        <a href="/assets/files/MLPMixer_ICL_Report.pdf" target="_blank">Paper</a>
      </li>
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

<ul class="news-list">
  <li>
    <span class="news-date">Feb 2026</span>
    <span>Accepted into the SM in Computer Science program at Harvard GSAS.</span>
  </li>
</ul>
