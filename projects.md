---
layout: page
title: Projects
permalink: /projects/
---

<ul class="pub-list">

  <li class="pub-item" id="spectral-profiling-gnns">
    <div class="pub-title">Spectral Label Profiles for GNN Architecture Selection</div>
    <div class="pub-authors">Graph Neural Networks · Spectral Graph Theory · Node Classification</div>
    <div class="pub-venue">Introduces the spectral label profile (SLP) — the cumulative distribution of label energy across the normalized-Laplacian spectrum — as a diagnostic for choosing a GNN architecture for node classification. Computes and efficiently estimates the SLP on synthetic and production graphs, then compares its predictive power against homophily baselines for selecting between spatial and spectral GNNs and their architectural parameters. Finds SLP most useful for deciding whether graph structure helps at all and whether a high- or low-pass spectral filter is beneficial.</div>
    <div class="pub-links"><a href="https://github.com/kaydenkehe/spectral-profiling-gnns" target="_blank">GitHub</a></div>
  </li>

  <li class="pub-item" id="memory-optimized-trms">
    <div class="pub-title">LASER: Memory-Optimized TRMs</div>
    <div class="pub-authors">CS2420 Final Project · Efficient Training · Activation Compression · PyTorch</div>
    <div class="pub-venue">A dynamic activation-compression framework for training Tiny Recursive Models (TRMs) with substantially lower memory usage. Uses fast-subspace tracking for approximating SVD and a fidelity-triggered "safetynet" reset. Achieves ~60% activation memory reduction with negligible accuracy and speed impact.</div>
    <div class="pub-links"><a href="https://github.com/Ege-Cakar/Memory-Optimized-TRMs" target="_blank">GitHub</a></div>
    <p><strong>Expanded into paper later.</strong></p>
  </li>

  <li class="pub-item" id="proofgoat">
    <div class="pub-title">ProofGOAT: OT-Based Proof Generation</div>
    <div class="pub-authors">CS2840 Final Project · Optimal Transport · Lean · NLP</div>
    <div class="pub-venue">Neural Optimal Transport framework aligning natural-language proofs with formal Lean proofs at the token level. Introduces a void-token mechanism for variable-length sequences in balanced OT. ~80% cosine alignment between NL→Lean transported tokens.</div>
    <div class="pub-links"><a href="https://github.com/Ege-Cakar/ProofGOAT" target="_blank">GitHub</a></div>
  </li>

  <li class="pub-item" id="improving-gcg">
    <div class="pub-title">Improving GCG: Soft-GCG + Activation Objectives</div>
    <div class="pub-authors">CS2881R Final Project · AI Safety · Adversarial Attacks · Efficiency</div>
    <div class="pub-venue">Continuous relaxation of Greedy Coordinate Gradient via Gumbel-Softmax achieving ~43x speedup over standard GCG with negligible loss in attack success. Also explores activation-guided objectives targeting refusal directions in the residual stream.</div>
    <div class="pub-links"><a href="https://github.com/Ege-Cakar/ImprovingGCG" target="_blank">GitHub</a></div>
    <p><strong>Expanded into paper later.</strong></p>
  </li>

  <li class="pub-item" id="eco-civilization">
    <div class="pub-title">Eco-Civilization MDP</div>
    <div class="pub-authors">Reinforcement Learning · Multi-Agent · PettingZoo · PyTorch</div>
    <div class="pub-venue">Adapts the Civilization game to explore sustainable development strategies using Multi-Agent Proximal Policy Optimization (MAPPO). Introduces environmental penalties, challenging agents to balance growth with sustainability. 3000+ line codebase by a 3-person team.</div>
    <div class="pub-links"><a href="https://github.com/Ege-Cakar/Eco-Civilization-MDP" target="_blank">GitHub</a></div>
  </li>

  <li class="pub-item" id="focus-caption">
    <div class="pub-title">FocusCaption</div>
    <div class="pub-authors">Computer Vision · Image Captioning · CNN · TranSalNet</div>
    <div class="pub-venue">Image captioning method using 2 CNNs in parallel with a saliency prediction model to extract extra information from where the image "should be focused." Shows improvements in counting subjects and detailing finer features.</div>
    <div class="pub-links"><a href="https://github.com/Ege-Cakar/FocusCaption" target="_blank">GitHub</a></div>
  </li>

  <li class="pub-item" id="butler">
    <div class="pub-title">BUTLER</div>
    <div class="pub-authors">Anthropic Harvard Hackathon Finalist (1 of 4) · RAG · Automation · Voice</div>
    <div class="pub-venue">AI personal assistant combining retrieval-augmented chat with automation — file organization, calendar, email, and voice control via Whisper and Eleven Labs. Built with React, TypeScript, Vite, and Tailwind CSS.</div>
    <div class="pub-links"><a href="https://github.com/Ege-Cakar/BUTLER" target="_blank">GitHub</a></div>
  </li>

  <li class="pub-item" id="macos-computer-use">
    <div class="pub-title">MacOS-Computer-Use</div>
    <div class="pub-authors">VNC · Automation · Virtualization · Claude</div>
    <div class="pub-venue">Remote control and automation tool for macOS VMs via VNC. An MCP server exposes VNC capabilities while a client uses Claude AI to interpret natural-language requests — clicking, typing, screenshots, SSH commands.</div>
    <div class="pub-links"><a href="https://github.com/Ege-Cakar/MacOS-VM-Computer-Use" target="_blank">GitHub</a></div>
  </li>

  <li class="pub-item" id="policivilization">
    <div class="pub-title">Policivilization MDP</div>
    <div class="pub-authors">RL · LLMs · Interpretability · Simulation</div>
    <div class="pub-venue">Extension of Eco Civilization MDP with greater realism — realistic terrain/resources, population, dissent/riots, government types. Swaps RNN agents with LLM agents for interpretability. Will be utilized at Harvard Kennedy School for teaching.</div>
    <div class="pub-links"><a href="https://github.com/Ege-Cakar/HCS-AI-RL-Project" target="_blank">GitHub</a></div>
  </li>

  <li class="pub-item" id="talk-to-me">
    <div class="pub-title">Talk To Me</div>
    <div class="pub-authors">Audio · Speech-to-Text · LaTeX · AI</div>
    <div class="pub-venue">Desktop app combining audio recording, transcription, and LaTeX conversion for academic content. Speak mathematical equations and get proper LaTeX. Supports offline Whisper and cloud APIs.</div>
    <div class="pub-links"><a href="https://github.com/Ege-Cakar/talkToMe" target="_blank">GitHub</a></div>
  </li>

  <li class="pub-item" id="mistral-ocr">
    <div class="pub-title">Mistral OCR</div>
    <div class="pub-authors">OCR · PDF · Markdown · Open Source</div>
    <div class="pub-venue">Wrapper for the Mistral OCR API converting PDF files to Markdown with in-app viewing (plain text, Markdown, browser for LaTeX). Standalone application built with PyInstaller.</div>
    <div class="pub-links"><a href="https://github.com/Ege-Cakar/MistralOCR" target="_blank">GitHub</a></div>
  </li>

</ul>
