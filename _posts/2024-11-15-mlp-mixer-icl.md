---
layout: post
title: "In-Context Learning Without Attention: MLP Mixers as an Alternative to Transformers"
date: 2024-11-15
---

During my work in the Pehlevan Lab over the Spring 2025 semester, I investigated whether you really need attention mechanisms for in-context learning (ICL)—the ability of models to learn from examples in their input without updating parameters.

The prevailing wisdom says yes: attention seems essential for comparing information across positions. But recent work from Tong and Pehlevan showed even vanilla MLPs could learn in-context under certain conditions. This made me wonder about MLP Mixers, which achieve global information transfer through token-mixing operations rather than attention.

### The Experiment

I used synthetic classification tasks based on Gaussian mixture models. Models had to infer cluster-to-label mappings from context examples and apply them to a query point. By varying the number of clusters (k) from 32 to 2048, I forced a transition from memorization to true in-context learning—with enough clusters, memorization becomes impossible.

### Key Results

- MLP Mixers matched Transformer performance while using 3x fewer parameters. My best Mixer had only 3,389 parameters compared to the Transformer's 9,508.
- The Mixer showed a sharp transition from memorization to ICL around 2^9 clusters.

However, the Transformer results were unexpected and somewhat concerning—it showed minimal improvement in ICL performance even at high cluster counts. This likely indicates the Transformer needed more parameters or different training dynamics, but it deserves deeper investigation before drawing strong conclusions.

### What's Next

I'm currently working on several follow-up directions:

- Retraining with decoder-only Transformers to see if the architecture makes a difference
- Comparing Mixer behavior to what Transformers actually do and what Gautam Reddy's work predicts they should do
- Borrowing methods from Reddy's papers for more rigorous mechanistic analysis
- Testing whether one layer and one head is sufficient for these tasks

The mechanistic interpretability remains elusive. Activation analysis suggests the Mixer focuses on context rather than query tokens, and attribution flows through limited channels, but the full picture of how information routes through the model needs more work.

### Why This Matters

If Mixers can achieve comparable ICL with fewer parameters, that opens new architectural possibilities—especially important as training costs and energy consumption bottleneck large language models. The results suggest in-context learning might be more general than we thought, not intrinsically tied to attention mechanisms.

But the Transformer underperformance is a puzzle that needs solving before making strong claims.

---

## Full Report

[Download PDF](/assets/files/MLPMixer_ICL_Report.pdf){:target="_blank"}

<iframe title="MLP Mixer ICL Report" src="/assets/files/MLPMixer_ICL_Report.pdf" width="100%" height="900" style="border: 1px solid var(--border); border-radius: 6px;"></iframe>
