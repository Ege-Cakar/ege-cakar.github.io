---
layout: page
title: Research
permalink: /research/
---

<div class="research-position">
  <h2 style="margin-top:0;">The Kempner Institute for the Study of Natural and Artificial Intelligence</h2>
  <p class="position-meta">Student Researcher · Pehlevan Lab · June 2024 – Present · Cambridge, MA<br>
  KRANIUM Fellow (Summer 2024) · KURE Fellow (Fall 2024, Fall 2025)</p>

  <h3>Current Focus</h3>
  <ul>
    <li>Analyzing the dependency graph of mathematics — studying how mathematical concepts and theorems relate to and build upon each other</li>
    <li>Investigating recursive latent space reasoning, its advantages and scaling, in mathematical reasoning tasks</li>
  </ul>

  <h3>Summer 2024 (KRANIUM Fellow)</h3>
  <p>Investigated compositional Boolean calculation tasks across diverse network architectures including MLPs, LSTMs, and Transformers. Analyzed out-of-distribution performance and in-context learning capabilities. Achieved consistent performance across network widths by applying µP normalization in MLPs.</p>

  <h3>Fall 2024 (KURE Fellow)</h3>
  <p>Leveraged self-supervised learning approaches, particularly SimCLR, to assess how representations learned through SSL impact classification accuracy. Explored the relationship between unsupervised pre-training objectives and downstream task performance.</p>

  <h3>Key Achievements</h3>
  <ul>
    <li>Achieved +90% consistent performance across network widths (64–2048) on compositional Boolean tasks using µP normalization</li>
    <li>Benchmarked Transformers, MLPs, and MLP-Mixers on synthetic in-context learning; demonstrated in-weight to in-context learning transitions</li>
    <li>Modified MLP-Mixer architecture to enforce causality (causal hypermixer); matched GPT-2 perplexity on Shakespeare with fewer parameters</li>
    <li>Ran large-scale experiments on the Kempner High Performance Cluster</li>
    <li>Presented in lab meetings and a poster session</li>
  </ul>
</div>

<div class="research-position">
  <h2 style="margin-top:0;">Cambridge University — Kristensson Lab</h2>
  <p class="position-meta">Student Researcher · Harvard-Cambridge Summer Fellowship Scholar (1 of 4 annually) · June 2025 – August 2025 · Cambridge, UK</p>

  <p>Worked on creating automated risk-analysis systems with agentic large language models and automatic verification of internal consistency in documents. The main contribution is a novel "source-agnostic explanatory verification" framework, treating AI systems like humans through verifiable reasoning chains.</p>

  <h3>Key Achievements</h3>
  <ul>
    <li>Achieved 94.44 F1 on AAEC literal extraction (SOTA, +5.7 over prior work) and 0.81 F1 on 3-class AMT relation classification</li>
    <li>Developed complete multi-agent SWIFT risk assessment system with hub-spoke architecture (12+ agentic LLMs)</li>
    <li>Created open-source Bipolar ABA Python package with SAT-based solver</li>
    <li>Built production-ready Docker containers (docker.io/egecakar/edu-classifier)</li>
    <li>Demonstrated ModernBERT matches GPT-4.1 performance at ~500M parameters</li>
    <li>First-author paper: <a href="https://arxiv.org/abs/2510.03442" target="_blank">arXiv:2510.03442</a></li>
  </ul>
  <p><a href="https://github.com/Ege-Cakar/Structured-Argumentation-For-Trust" target="_blank">GitHub</a> · <a href="https://arxiv.org/abs/2510.03442" target="_blank">Paper</a></p>
</div>

---

## Papers

<ul class="pub-list">
  <li>
    <strong>Accelerating Adversarial Suffix Optimization via Continuous Relaxation and Activation-Guided Objectives</strong><br>
    <span class="pub-authors"><b>Ege Çakar</b>, Kayden Kehe, Hannah Guan</span><br>
    <span class="pub-venue">Accepted to the AAAI 2026 Summer Symposium Series: AI-Driven Resilience. Seoul, South Korea, June 2026.</span><br>
    <span class="pub-note">To appear in proceedings</span>
  </li>
  <li>
    <strong>Accelerating Adversarial Suffix Optimization via Continuous Relaxation and Activation-Guided Objectives</strong><br>
    <span class="pub-authors"><b>Ege Çakar</b>, Kayden Kehe, Hannah Guan</span><br>
    <span class="pub-venue">Accepted to the ICLR 2026 Workshop on Representational Alignment (Re-Align). Rio de Janeiro, Brazil, April 2026.</span><br>
    <span class="pub-note">Paper forthcoming</span>
  </li>
  <li>
    <strong>LASER: Low-Rank Activation SVD for Efficient Recursion</strong><br>
    <span class="pub-authors"><b>Ege Çakar</b>, Ketan Ali Raghu, Lia Zheng</span><br>
    <span class="pub-venue">Accepted to the ICLR 2026 Workshop on Latent &amp; Implicit Thinking (LIT). Rio de Janeiro, Brazil, April 2026.</span><br>
    <span class="pub-note">Paper forthcoming</span>
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

---

## Research Interests

**Machine Learning** — Exploring the capabilities and limitations of neural networks, particularly in mathematical reasoning and semantic understanding. How different architectures process and represent structured information.

**Reinforcement Learning** — Multi-agent systems in complex environments. How RL can supplement supervised learning and overcome its weaknesses, as well as its robotics applications.

**Physics & Applied Math** — The intersection of physics, applied mathematics, and AI — exploring mathematical modeling, dynamical systems, and the nature of intelligence.
