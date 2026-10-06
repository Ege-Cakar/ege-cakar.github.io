---
layout: page
title: Research
permalink: /research/
---

<ol class="timeline">
  <li class="current">
  <div class="tl-date">Fall 2026</div>
  <div class="tl-body">
  <h3 class="tl-title">Pehlevan Lab & Du Lab · Kempner Institute</h3>
  <h4>Pehlevan Lab</h4>
  <ul>
    <li>Looking into efficient attention implementations and how well we can do under constant memory</li>
    <li>Interested in how automated jailbreak attacks come to be and whether we can analyze them theoretically and empirically</li>
  </ul>
  <h4>Du Lab</h4>
  <ul>
    <li>Working on Energy-Based Transformers</li>
  </ul>
  </div>
  </li>

  <li>
  <div class="tl-date">Summer 2026</div>
  <div class="tl-body">
  <h3 class="tl-title">Pehlevan Lab · Kempner Institute</h3>
  <div class="tl-split">
  <div>
  {% assign p = site.data.papers | where: "id", "ssa" | first %}
  <div class="tl-paper">{% include paper.html p=p %}</div>
  <blockquote>We introduce State Space Attention (SSA), an attention architecture that learns to maintain a bounded set of past representations and reads them using standard attention.</blockquote>
  </div>
  <figure class="paper-figure">{% include figures/ssa.svg %}</figure>
  </div>
  </div>
  </li>

  <li>
  <div class="tl-date">Spring 2026</div>
  <div class="tl-body">
  <h3 class="tl-title">Pehlevan Lab · Kempner Institute</h3>
  <div class="tl-split">
  <div>
  {% assign p = site.data.papers | where: "id", "boule-or-baguette" | first %}
  <div class="tl-paper">{% include paper.html p=p %}</div>
  <blockquote>Our findings overall identify fundamental benefits and limitations inherent in using reasoning traces.</blockquote>
  </div>
  <figure class="paper-figure">{% include figures/boule.svg %}</figure>
  </div>
  </div>
  </li>

  <li>
  <div class="tl-date">Fall 2025</div>
  <div class="tl-body">
  <h3 class="tl-title">Pehlevan Lab & Course Projects</h3>
  <h4>Pehlevan Lab</h4>
  <p class="tl-meta">KURE Fellow</p>
  <p>Exploratory work in architectures.</p>
  <h4>COMPSCI 2881R Final Project</h4>
  <div class="tl-split">
  <div>
  {% assign p = site.data.papers | where: "id", "safety-representations" | first %}
  <div class="tl-paper">{% include paper.html p=p %}</div>
  <blockquote>We introduce Activation-Guided GCG, which replaces output-based objectives with losses that directly target a model's internal refusal direction.</blockquote>
  </div>
  <figure class="paper-figure">{% include figures/gcg.svg %}</figure>
  </div>
  <h4>CS 2420 Final Project</h4>
  <div class="tl-split">
  <div>
  {% assign p = site.data.papers | where: "id", "laser" | first %}
  <div class="tl-paper">{% include paper.html p=p %}</div>
  <blockquote>We exploit this structure through LASER (Low-Rank Activation SVD for Efficient Recursion), a dynamic compression framework that maintains an evolving low-rank basis via matrix-free subspace tracking with a fidelity-triggered reset mechanism, achieving ~60% activation memory savings with no statistically significant accuracy degradation.</blockquote>
  </div>
  <figure class="paper-figure">{% include figures/laser.svg %}</figure>
  </div>
  </div>
  </li>

  <li>
  <div class="tl-date">Summer 2025</div>
  <div class="tl-body">
  <h3 class="tl-title">Kristensson Lab · Cambridge University</h3>
  <p class="tl-meta">Harvard-Cambridge Summer Fellowship Scholar (1 of 4 annually) · Cambridge, UK</p>

  <div class="tl-split">
  <div>
  <p>Worked on creating automated risk-analysis systems with agentic large language models and automatic verification of internal consistency in documents. The main contribution is a novel "source-agnostic explanatory verification" framework, treating AI systems like humans through verifiable reasoning chains.</p>

  <h4>Key Achievements</h4>
  <ul>
    <li>Achieved 94.44 F1 on AAEC literal extraction (SOTA, +5.7 over prior work) and 0.81 F1 on 3-class AMT relation classification</li>
    <li>Developed complete multi-agent SWIFT risk assessment system with hub-spoke architecture (12+ agentic LLMs)</li>
    <li>Created open-source Bipolar ABA Python package with SAT-based solver</li>
    <li>Built production-ready Docker containers (docker.io/egecakar/edu-classifier)</li>
    <li>Demonstrated ModernBERT matches GPT-4.1 performance at ~500M parameters</li>
    <li>First-author paper: <a href="https://arxiv.org/abs/2510.03442" target="_blank">arXiv:2510.03442</a></li>
  </ul>
  <div class="pub-links">
    <a class="btn" href="https://github.com/Ege-Cakar/Structured-Argumentation-For-Trust" target="_blank">{% include icon.html name="cat" %}GitHub</a>
    <a class="btn" href="https://arxiv.org/abs/2510.03442" target="_blank">{% include icon.html name="paper-stack" %}Paper</a>
  </div>
  </div>
  <figure class="paper-figure">{% include figures/argument.svg %}</figure>
  </div>
  </div>
  </li>

  <li>
  <div class="tl-date">Spring 2025</div>
  <div class="tl-body">
  <h3 class="tl-title">Pehlevan Lab · Kempner Institute</h3>
  <div class="tl-split">
  <div>
  <ul>
    <li>Benchmarked Transformers, MLPs, and MLP-Mixers on synthetic in-context learning; demonstrated in-weight to in-context learning transitions</li>
    <li>Modified MLP-Mixer architecture to enforce causality (causal hypermixer); matched GPT-2 perplexity on Shakespeare with fewer parameters</li>
  </ul>
  <div class="pub-links">
    <a class="btn" href="/assets/files/MLPMixer_ICL_Report.pdf" target="_blank">{% include icon.html name="paper-stack" %}Report</a>
    <a class="btn" href="{% post_url 2025-05-07-mlp-mixer-icl %}">{% include icon.html name="quill" %}Blog post</a>
  </div>
  </div>
  <figure class="paper-figure">{% include figures/mixer.svg %}</figure>
  </div>
  </div>
  </li>

  <li>
  <div class="tl-date">Fall 2024</div>
  <div class="tl-body">
  <h3 class="tl-title">Pehlevan Lab · Kempner Institute</h3>
  <p class="tl-meta">KURE Fellow</p>
  <p>Leveraged self-supervised learning approaches, particularly SimCLR, to assess how representations learned through SSL impact classification accuracy. Explored the relationship between unsupervised pre-training objectives and downstream task performance.</p>
  </div>
  </li>

  <li>
  <div class="tl-date">Summer 2024</div>
  <div class="tl-body">
  <h3 class="tl-title">Pehlevan Lab · Kempner Institute</h3>
  <p class="tl-meta">KRANIUM Fellow</p>
  <p>Investigated compositional Boolean calculation tasks across diverse network architectures including MLPs, LSTMs, and Transformers. Analyzed out-of-distribution performance and in-context learning capabilities. Achieved consistent performance across network widths by applying µP normalization in MLPs.</p>
  <ul>
    <li>Achieved +90% consistent performance across network widths (64–2048) on compositional Boolean tasks using µP normalization</li>
  </ul>
  </div>
  </li>
</ol>

---

## Papers

<ul class="pub-list">
  {% for p in site.data.papers %}<li class="pub-item">{% include paper.html p=p %}</li>
  {% endfor %}
</ul>

---

## Research Interests

<div class="card-grid three">
  <div class="card interest-card">
    <div class="interest-icon">{% include icon.html name="robot" %}</div>
    <h3>Machine Learning</h3>
    <ul class="chips"><li>Reasoning</li><li>Representations</li><li>Architectures</li></ul>
    <p>Exploring the capabilities and limitations of neural networks, particularly in mathematical reasoning and semantic understanding. How different architectures process and represent structured information.</p>
  </div>
  <div class="card interest-card">
    <div class="interest-icon">{% include icon.html name="chess-knight" %}</div>
    <h3>Reinforcement Learning</h3>
    <ul class="chips"><li>Multi-Agent</li><li>Robotics</li></ul>
    <p>Multi-agent systems in complex environments. How RL can supplement supervised learning and overcome its weaknesses, as well as its robotics applications.</p>
  </div>
  <div class="card interest-card">
    <div class="interest-icon">{% include icon.html name="newtons-cradle" %}</div>
    <h3>Physics & Applied Math</h3>
    <ul class="chips"><li>Modeling</li><li>Dynamical Systems</li></ul>
    <p>The intersection of physics, applied mathematics, and AI — exploring mathematical modeling, dynamical systems, and the nature of intelligence.</p>
  </div>
</div>
