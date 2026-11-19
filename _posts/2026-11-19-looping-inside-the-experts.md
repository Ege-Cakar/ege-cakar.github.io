---
layout: post
title: "Looping Inside the Experts, and Where the Gains in Recurrent Mixture-of-Experts Models Come From"
date: 2026-11-19
description: "Letting each routed expert in an MoE loop on its token does not pay off. Where the gains come from instead: one extra attention step, more experts, and fresh context."
---

<style>
  .post-figure.lx-fig { max-width: 560px; }
  .lx-fig { position: relative; max-width: 720px; margin: 1.75rem auto 2.25rem; --lx-red: #c4553b; --lx-blue: #2266a4; --lx-gray: #8d877c; --lx-grid: #e4ddcf; }
  .lx-fig figcaption { margin-top: 0.6rem; font-size: 0.82rem; line-height: 1.5; color: var(--muted); }
  .lx-fig figcaption strong { color: var(--ink); font-weight: 600; }
  .lx-chart { width: 100%; min-height: 120px; }
  .lx-chart svg { display: block; font-size: 12.5px; }
  .lx-chart text { fill: var(--ink); }
  .lx-chart .lx-tick, .lx-chart .lx-sub, .lx-chart .lx-axis { fill: var(--muted); font-size: 11.5px; }
  .lx-chart .lx-row { font-size: 12.5px; }
  .lx-chart .lx-row.strong { font-weight: 600; }
  .lx-chart .lx-hit { outline: none; cursor: default; }
  .lx-chart .lx-hit:focus-visible { stroke: var(--ink); stroke-width: 1; stroke-dasharray: 2 2; }
  .lx-legend { display: flex; flex-wrap: wrap; gap: 0.3rem 1rem; margin: 0 0 0.5rem; font-size: 0.8rem; color: var(--ink); }
  .lx-legend span { display: inline-flex; align-items: center; gap: 0.4rem; }
  .lx-legend i { display: inline-block; width: 18px; border-top: 2.5px solid currentColor; }
  .lx-legend i.dash { border-top-style: dashed; }
  .lx-legend i.dot { width: 10px; height: 10px; border: none; border-radius: 50%; background: currentColor; }
  .lx-legend i.ring { width: 8px; height: 8px; border: 2px solid currentColor; border-radius: 50%; }
  .lx-tip { position: absolute; z-index: 2; pointer-events: none; opacity: 0; transition: opacity 0.12s ease; background: #fffdf8; color: var(--ink);
            border: 1px solid #d8d0bf; border-radius: 8px; padding: 0.45rem 0.6rem; font-size: 0.78rem; line-height: 1.45; box-shadow: 0 4px 14px rgba(43, 42, 39, 0.1); }
  .lx-tip.on { opacity: 1; }
  .lx-tip-title { color: var(--muted); margin-bottom: 0.15rem; }
  .lx-tip-row { display: flex; align-items: center; gap: 0.45rem; white-space: nowrap; }
  .lx-tip-row .key { display: inline-block; width: 14px; border-top: 2.5px solid; flex-shrink: 0; }
  .lx-tip-row .key.dash { border-top-style: dashed; }
  .lx-tip-row strong { font-weight: 600; min-width: 2.6em; }
  .lx-fig .fig-controls { margin-top: 0; margin-bottom: 0.5rem; }
  .lx-fig .fig-btn.on { border-color: var(--red); color: var(--red); }
  .lx-data { margin-top: 0.5rem; font-size: 0.8rem; color: var(--ink); }
  .lx-data summary { cursor: pointer; color: var(--muted); }
  .lx-data table { margin: 0.5rem 0 0; font-size: 0.78rem; }
  .lx-data th, .lx-data td { padding: 0.25rem 0.5rem; border-bottom: 1px solid #e0d9ca; }
  .lx-data td:not(:first-child), .lx-data th:not(:first-child) { text-align: right; font-variant-numeric: tabular-nums; }
  @media (max-width: 520px) { .lx-chart .lx-row { font-size: 11.5px; } .lx-chart .lx-sub, .lx-chart .lx-tick { font-size: 10.5px; } }
</style>

<figure class="paper-figure post-figure">
<svg viewBox="0 0 400 240" role="img" aria-label="A looped-expert MoE layer. A router sends each token to 2 of 16 experts. Inside a chosen expert, the token's state runs n loops of an attention read and an FFN, then the expert writes a normalized update back to the token." data-lx="header">
<defs>
<marker id="lxh-ink" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 1 9 5 0 9z" class="f-ink"/></marker>
<marker id="lxh-red" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 1 9 5 0 9z" class="f-red"/></marker>
<marker id="lxh-muted" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1 9 5 0 9z" style="fill:var(--muted)"/></marker>
</defs>
<text x="88" y="16" class="t-muted" font-size="10.5" text-anchor="middle">tokens in the residual stream</text>
<g data-part="tokens">
<rect x="22" y="24" width="18" height="18" rx="3" class="s f-white" data-tok="0"/>
<rect x="46" y="24" width="18" height="18" rx="3" class="s f-white" data-tok="1"/>
<rect x="70" y="24" width="18" height="18" rx="3" class="s f-white" data-tok="2"/>
<rect x="94" y="24" width="18" height="18" rx="3" class="s f-white" data-tok="3"/>
<rect x="118" y="24" width="18" height="18" rx="3" class="s f-white" data-tok="4"/>
<rect x="142" y="24" width="18" height="18" rx="3" class="s f-white" data-tok="5"/>
</g>
<line x1="79" y1="44" x2="85" y2="66" class="s" marker-end="url(#lxh-ink)" data-part="in"/>
<rect x="40" y="68" width="98" height="22" rx="5" class="s f-node" data-part="router"/>
<text x="89" y="83" font-size="11.5" text-anchor="middle">router: top-2 of 16</text>
<g data-part="routes"><line x1="89" y1="90" x2="83" y2="118" class="s" marker-end="url(#lxh-ink)"/><line x1="89" y1="90" x2="123" y2="136" class="s" marker-end="url(#lxh-ink)"/></g>
<g data-part="experts">
<rect x="18" y="120" width="13" height="13" rx="2" class="s f-white" data-exp="0"/><rect x="36" y="120" width="13" height="13" rx="2" class="s f-white" data-exp="1"/><rect x="54" y="120" width="13" height="13" rx="2" class="s f-white" data-exp="2"/><rect x="72" y="120" width="13" height="13" rx="2" class="s f-red-soft" data-exp="3"/><rect x="90" y="120" width="13" height="13" rx="2" class="s f-white" data-exp="4"/><rect x="108" y="120" width="13" height="13" rx="2" class="s f-white" data-exp="5"/><rect x="126" y="120" width="13" height="13" rx="2" class="s f-white" data-exp="6"/><rect x="144" y="120" width="13" height="13" rx="2" class="s f-white" data-exp="7"/>
<rect x="18" y="138" width="13" height="13" rx="2" class="s f-white" data-exp="8"/><rect x="36" y="138" width="13" height="13" rx="2" class="s f-white" data-exp="9"/><rect x="54" y="138" width="13" height="13" rx="2" class="s f-white" data-exp="10"/><rect x="72" y="138" width="13" height="13" rx="2" class="s f-white" data-exp="11"/><rect x="90" y="138" width="13" height="13" rx="2" class="s f-white" data-exp="12"/><rect x="108" y="138" width="13" height="13" rx="2" class="s f-white" data-exp="13"/><rect x="126" y="138" width="13" height="13" rx="2" class="s f-red-soft" data-exp="14"/><rect x="144" y="138" width="13" height="13" rx="2" class="s f-white" data-exp="15"/>
</g>
<text x="88" y="168" class="t-muted" font-size="10.5" text-anchor="middle">16 experts per layer</text>
<path d="M 164 141 C 182 141 190 128 208 128" class="s-muted dash" data-part="zoom"/>
<path d="M 14 140 C 2 120 2 60 20 36" class="s-red dash" marker-end="url(#lxh-red)" data-part="write"/>
<text x="14" y="194" class="t-red" font-size="10.5">gated write back to the token:</text>
<text x="14" y="209" class="t-red" font-size="10.5">gain · RMSNorm(h<tspan dy="3" font-size="7.5">n</tspan><tspan dy="-3"> − x)</tspan></text>
<text x="300" y="20" class="t-muted" font-size="10.5" text-anchor="middle">inside a chosen expert</text>
<rect x="210" y="28" width="180" height="200" rx="8" class="s f-white"/>
<text x="300" y="50" class="m" font-size="14" text-anchor="middle">h<tspan dy="3" font-size="9">0</tspan><tspan dy="-3"> = x</tspan></text>
<line x1="300" y1="55" x2="300" y2="68" class="s" marker-end="url(#lxh-ink)"/>
<rect x="250" y="70" width="100" height="26" rx="5" class="s f-node" data-part="attn"/>
<text x="300" y="87" font-size="11.5" text-anchor="middle">attention read</text>
<line x1="300" y1="96" x2="300" y2="112" class="s" marker-end="url(#lxh-ink)"/>
<rect x="250" y="114" width="100" height="26" rx="5" class="s f-node" data-part="ffn"/>
<text x="300" y="131" font-size="11.5" text-anchor="middle">FFN</text>
<path d="M 350 127 C 378 127 378 83 352 83" class="s-red" marker-end="url(#lxh-red)" data-part="loop"/>
<text x="367" y="110" class="m t-red" font-size="14" text-anchor="end">×n</text>
<line x1="300" y1="140" x2="300" y2="160" class="s" marker-end="url(#lxh-ink)"/>
<text x="300" y="176" class="m" font-size="14" text-anchor="middle">h<tspan dy="3" font-size="9">n</tspan></text>
<path d="M 224 212 L 224 83 L 248 83" class="s-muted dash" marker-end="url(#lxh-muted)"/>
<text x="234" y="203" class="t-muted" font-size="10">keys and values: whole</text>
<text x="234" y="216" class="t-muted" font-size="10">sequence, shared by experts</text>
</svg>
</figure>

During my work in the Pehlevan Lab this October, I tested an idea that felt like it should work: what if each expert in a mixture-of-experts (MoE) model could loop?

Looped transformers reuse the same layers several times, buying extra computation without extra parameters, and recent work like [SMELT](https://arxiv.org/abs/2609.01343) shows this can pay off even when FLOPs are matched. MoE models send each token to a few experts out of many. Putting the two together, I let each routed expert run several passes on its token: a short attention read followed by an FFN, repeated n times, with the result written back to the residual stream. Two things made this attractive. First, the router could in principle choose how many loops each token gets from each expert, so harder tokens would think longer. Second, under expert parallelism a token already travels to its expert's GPU once per layer, so every extra loop runs there with no extra communication.

I couldn't find this design in the (rather crowded) looped-MoE literature, so I spent a few weeks and around 480 training runs on it. It doesn't pay off. How it fails turned out to be more interesting than the architecture itself, so this post is about that.

### The Setup

All language-modeling runs use the same small model: 6 layers, width 384, 16 experts per layer with top-2 routing, the Mistral tokenizer, and 1B tokens of SlimPajama. Every model has 77.4M to 77.9M stored parameters; when a design adds parameters (say, attention inside the experts), I narrow its expert FFNs to keep the total equal. I report validation cross-entropy, count FLOPs per token analytically relative to the standard MoE, and use 3 seeds wherever a comparison hinges on it, since the seed-to-seed standard deviation is 0.001 to 0.008.

The baselines matter a lot here. Normalizing each expert's output with an RMSNorm and a zero-initialized gain (which turns out to be exactly [Peri-LN](https://arxiv.org/abs/2502.02732)'s output norm) is worth 0.023 for free, so the fair baseline is a standard MoE with it, at 3.3775. The looping baselines are SMELT-style looping, where the middle three of six layers run twice (3.3464 at 1.26x FLOPs; unlike the paper, I don't resize the model to match FLOPs), and block looping, where the whole stack runs twice (3.3505 at 1.53x).

### Key Results

- The original design, where each expert attends only to the tokens routed to the same expert, doesn't beat the standard MoE at any loop count, and routers never learned to give harder tokens more loops.
- Letting expert attention read the whole sequence helps (3.3354 vs 3.3775), but adding the same attention unrouted does just as well (3.3363). The gain comes from one extra attention step, and routing it into experts adds nothing.
- Looping the same expert is the worst way to spend extra expert compute. Running 4 experts once (3.2961) beats routing to 2 new experts for a second round (3.3048), which beats looping the same 2 experts with or without refreshed context (3.3109 and 3.3206).
- On a synthetic multi-hop task, a second pass that reads refreshed context chains about twice as many hops as layer looping at similar compute (38 vs 17 to 19).
- On multi-step tasks written as text, that advantage disappears: SMELT-style and block looping are the most reliable designs there.

### Attention Was Doing the Work

The first version gave each expert attention over only the tokens routed to the same expert, about an eighth of the context, so that loops never leave the expert's GPU. It doesn't beat the baseline at any loop count: n = 1, 2 and 4 land at 3.3832, 3.3732 to 3.3777, and 3.3809, against 3.3775. Letting the router choose loop counts didn't rescue it either. Whether it scored (expert, loop count) pairs or used Mixture-of-Recursions-style capacity routing, the loop counts it chose never tracked how hard a token was: on a synthetic task where I know each token's difficulty, the correlation stayed between -0.21 and +0.26. Halting gates fitted afterwards on models trained with random depth did learn difficulty on that synthetic task, but gave nothing on language modeling.

The bottleneck was the narrow attention. Giving each expert a query that reads the whole sequence, with keys and values computed once per layer and shared by all experts, brings a single pass down to 3.3354. That's a big gain, but it's the kind that needs controls, since the design now does more attention than the baseline. So I added the same attention unrouted, as a small extra attention sublayer in front of a standard MoE, along with the other obvious ways to spend the same budget.

<figure class="paper-figure lx-fig">
<div class="lx-legend"><span><i class="dot" style="color:var(--lx-red)"></i>attention inside experts</span><span><i class="dot" style="color:var(--lx-blue)"></i>same attention, unrouted</span><span><i class="dot" style="color:var(--lx-gray)"></i>other ways to spend it</span><span><i class="ring" style="color:var(--lx-gray)"></i>1 seed</span></div>
<div class="lx-chart" data-lx="attention" aria-label="Validation loss of six designs at about the same parameters and FLOPs."></div>
<figcaption><strong>Routing the attention adds nothing.</strong> Validation cross-entropy at 77.4M to 77.9M parameters; bars span ±1 SD over 3 seeds, open circles are single runs. FLOPs are relative to the standard MoE. MoA is a routed attention-only sublayer (<a href="https://arxiv.org/abs/2210.05144">Zhang et al., 2022</a>) in front of a standard MoE.</figcaption>
<details class="lx-data"><summary>Data</summary>
<table><tr><th>Design</th><th>Val CE</th><th>SD</th><th>FLOPs</th><th>Seeds</th></tr>
<tr><td>Standard MoE (normalized output)</td><td>3.3775</td><td>0.0041</td><td>1.00x</td><td>3</td></tr>
<tr><td>7-layer standard MoE</td><td>3.3537</td><td></td><td>1.08x</td><td>1</td></tr>
<tr><td>MoA sublayer + standard MoE</td><td>3.3517</td><td></td><td>1.09x</td><td>1</td></tr>
<tr><td>8-layer standard MoE</td><td>3.3487</td><td></td><td>1.09x</td><td>1</td></tr>
<tr><td>Extra attention, unrouted</td><td>3.3363</td><td>0.0023</td><td>1.12x</td><td>3</td></tr>
<tr><td>Attention inside experts (n = 1)</td><td>3.3354</td><td>0.0052</td><td>1.08x</td><td>3</td></tr>
</table></details>
</figure>

The unrouted version matches it to within noise. It also beats spending the same budget on depth, with 7- and 8-layer standard MoEs at equal parameters and FLOPs, and beats a routed attention sublayer in the style of MoA. The architecture itself is close to prior work like MoA and [UMoE](https://arxiv.org/abs/2505.07260), so the controlled comparison is the new part. The same thing shows up from the other direction: SMELT-style looping without re-running attention in its second pass loses its whole gain (3.3796, against 3.3496 with attention and 3.3775 for the standard MoE). The extra attention step over updated states is what helps.

At 4x the width and tokens, full-context experts with 4 loops still beat the normalized standard MoE by the same margin as at the base scale (0.055 at both), although I didn't run the unrouted control at that scale.

### Looping the Same Expert Is the Worst Use of Compute

With full-context attention in place, the real question for this project is what to do with a second unit of expert compute, at equal parameters and about 1.44x FLOPs. You can loop the same two experts again; loop them after rebuilding the shared keys and values from every token's updated state (I'll call this refreshed context); route the token to two new experts for a second round, as in [Chain-of-Experts](https://arxiv.org/abs/2506.18945); or just use four experts at once.

<figure class="paper-figure lx-fig">
<div class="lx-legend"><span><i class="dot" style="color:var(--lx-red)"></i>loop the same experts</span><span><i class="dot" style="color:var(--lx-blue)"></i>new or more experts</span><span><i class="dot" style="color:var(--lx-gray)"></i>reference</span><span><i class="ring" style="color:var(--lx-gray)"></i>1 seed</span></div>
<div class="lx-chart" data-lx="compute" aria-label="Validation loss of five ways to spend twice the expert compute, plus a one-pass reference."></div>
<figcaption><strong>Width first, new experts second, loops last.</strong> All designs use full-context expert attention and equal stored parameters; ±1 SD over 3 seeds. The one-pass design is the red dot from the previous figure.</figcaption>
<details class="lx-data"><summary>Data</summary>
<table><tr><th>Design</th><th>Val CE</th><th>SD</th><th>FLOPs</th><th>Seeds</th></tr>
<tr><td>One pass (n = 1)</td><td>3.3354</td><td>0.0052</td><td>1.08x</td><td>3</td></tr>
<tr><td>Same experts loop again</td><td>3.3206</td><td>0.0050</td><td>1.44x</td><td>3</td></tr>
<tr><td>10-layer standard MoE</td><td>3.3168</td><td></td><td>1.43x</td><td>1</td></tr>
<tr><td>Same experts, refreshed context</td><td>3.3109</td><td>0.0047</td><td>1.46x</td><td>3</td></tr>
<tr><td>Two new experts (re-routing)</td><td>3.3048</td><td>0.0069</td><td>1.46x</td><td>3</td></tr>
<tr><td>Four experts at once</td><td>3.2961</td><td>0.0056</td><td>1.44x</td><td>3</td></tr>
</table></details>
</figure>

Width wins, new experts come second, and looping the same expert comes last. Taking the comparison apart (same or new experts, private or shared state, stale or refreshed context, 3 seeds each), new experts beat reused ones by 0.020 to 0.025, and refreshing the context only recovers 0.007 to 0.010 of that. A plain 10-layer standard MoE at the same compute lands right next to the best same-expert variant (3.3168 vs 3.3109, though only 1 seed).

The reason the second loop does so little shows up in its geometry. With stale context, each later loop's update points almost the same way as the expert's total update, with a cosine of 0.87 to 0.95 in trained models. The loop mostly makes the same update longer, and the expert's output normalization then throws that length away.

<figure class="paper-figure post-figure lx-fig">
<svg viewBox="0 0 400 200" role="img" aria-label="Loop 1 moves the expert's state; loop 2's step points nearly the same way. After RMSNorm only the direction is kept, so one loop and two loops write almost the same update.">
<defs>
<marker id="lxv-ink" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 1 9 5 0 9z" class="f-ink"/></marker>
<marker id="lxv-red" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 1 9 5 0 9z" class="f-red"/></marker>
<marker id="lxv-muted" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1 9 5 0 9z" style="fill:var(--muted)"/></marker>
</defs>
<path d="M 172 170 A 112 112 0 0 0 151.9 106.0" class="s-muted dash"/>
<circle cx="60" cy="170" r="3.5" class="f-ink"/>
<text x="52" y="188" class="m" font-size="14">x</text>
<line x1="60" y1="170" x2="206" y2="68" class="s" marker-end="url(#lxv-ink)"/>
<text x="102" y="134" font-size="11.5" text-anchor="end">loop 1</text>
<line x1="208" y1="67" x2="314" y2="58" class="s-red" marker-end="url(#lxv-red)"/>
<text x="262" y="52" class="t-red" font-size="11.5" text-anchor="middle">loop 2</text>
<line x1="60" y1="170" x2="312" y2="60" class="s-muted dash" marker-end="url(#lxv-muted)"/>
<text x="300" y="116" class="t-muted" font-size="11" text-anchor="middle">total update h<tspan dy="3" font-size="8">2</tspan><tspan dy="-3"> − x</tspan></text>
<circle cx="151.9" cy="106.0" r="4" class="f-ink"/>
<circle cx="162.6" cy="125.5" r="4" class="f-red"/>
<text x="145" y="100" font-size="10.5" text-anchor="end">written, n = 1</text>
<text x="176" y="132" class="t-red" font-size="10.5">written, n = 2</text>
<text x="182" y="162" class="t-muted" font-size="10.5">after RMSNorm: only the</text>
<text x="182" y="175" class="t-muted" font-size="10.5">direction is written back</text>
<text x="392" y="22" font-size="10.5" class="t-muted" text-anchor="end">cos(loop 2 step, total update)</text>
<text x="392" y="36" font-size="10.5" class="t-red" text-anchor="end">0.87 to 0.95 in trained models</text>
</svg>
<figcaption><strong>Why a second loop adds little.</strong> A sketch, not data: with stale context, loop 2's step is nearly parallel to the total update (cosine 0.87 to 0.95, measured per layer and loop in trained models), so after the expert's output RMSNorm the written direction (dots) barely changes. Switching expert attention off in later loops does hurt (+0.085 cross-entropy at n = 2), so the loops aren't idle; they just mostly repeat themselves.</figcaption>
</figure>

More loops don't fix it either: four loops land at 3.3222 (2.15x), no better than two.

### Where a Refreshed Pass Does Win: Chained Lookups

Language modeling at this scale might simply not need many sequential steps, so I also trained on [k-hop induction heads](https://arxiv.org/abs/2402.09268) (Sanford, Hsu and Telgarsky, 2024). Each position has to report where a k-step pointer walk over earlier symbols lands, which takes k sequential lookups. I used 2-layer models on sequences of four independent 192-symbol segments, with k drawn uniformly from 0 to 64, and report the largest k a model solves, meaning token accuracy of at least 0.95 for every k up to it.

<figure class="paper-figure lx-fig">
<div class="lx-legend"><span><i class="dot" style="color:var(--lx-red)"></i>second pass reads refreshed context (same or new experts)</span><span><i class="dot" style="color:var(--lx-blue)"></i>layer looping (block, SMELT-style)</span><span><i class="dot" style="color:var(--lx-gray)"></i>others</span></div>
<div class="lx-chart" data-lx="khop" aria-label="Hops solved against FLOPs for 14 designs on k-hop induction heads."></div>
<figcaption><strong>A refreshed second pass chains about twice as far at about 2x compute.</strong> k-hop induction heads with k up to 64, 2-layer models at equal parameters, 1 seed each. FLOPs are relative to the 2-layer standard MoE and are not comparable to the language-model ratios.</figcaption>
<details class="lx-data"><summary>Data</summary>
<table><tr><th>Design</th><th>Solved through k</th><th>FLOPs</th></tr>
<tr><td>Standard MoE</td><td>4</td><td>1.00x</td></tr>
<tr><td>SMELT-style, layer 2 looped</td><td>8</td><td>1.49x</td></tr>
<tr><td>Same experts, refreshed, window 64 (n = 2)</td><td>38</td><td>1.87x</td></tr>
<tr><td>Block looping x2</td><td>17</td><td>1.99x</td></tr>
<tr><td>SMELT-style, both layers looped</td><td>19</td><td>1.99x</td></tr>
<tr><td>Four experts at once</td><td>15</td><td>2.62x</td></tr>
<tr><td>Same experts, stale (n = 2)</td><td>24</td><td>2.62x</td></tr>
<tr><td>Same experts, refreshed (n = 2)</td><td>44</td><td>2.70x</td></tr>
<tr><td>Two new experts (re-routing)</td><td>42</td><td>2.70x</td></tr>
<tr><td>Same experts, refreshed, window 64 (n = 4)</td><td>41</td><td>3.31x</td></tr>
<tr><td>Block looping x4</td><td>64</td><td>3.97x</td></tr>
<tr><td>Same experts, stale (n = 4)</td><td>38</td><td>4.72x</td></tr>
<tr><td>Same experts, refreshed (n = 4)</td><td>64</td><td>4.97x</td></tr>
<tr><td>Four rounds of new experts</td><td>64</td><td>4.98x</td></tr>
</table></details>
</figure>

Here the ranking flips. A second pass that reads refreshed context, whether through the same experts or new ones, chains about twice as many hops as SMELT-style or block looping at similar compute: 38 hops at 1.87x with a 64-position attention window, against 19 and 17 at 1.99x. Width does worst among the 2.6x designs, and the same experts with stale context sit in between. At around 4x compute, though, block looping solves the whole task and is the cheapest way to do so. This was the one result where looping individual experts clearly beat strong baselines, so it was the one worth stress-testing.

### ...and Where It Stops Winning: Multi-Step Text

To check whether the k-hop advantage means anything closer to real use, I built four multi-step tasks written as plain text, each with a difficulty d equal to the number of facts the answer has to chain through:

- **Variable tracking**, in the style of [RULER](https://arxiv.org/abs/2404.06654): 128 statements like "VAR x = 4721." and "VAR y = x.", then "What is the value of y?"
- **Program tracing**: 96 lines like "let y = x * 2;", then the value of a variable.
- **Multi-hop facts**: "Ann's boss is Beth. Beth lives in Rome." and so on for 36 people, then "Where does Ann's boss live?" (d = 2).
- **Graph reachability**: 128 edges like "a -> b.", then "Is there a path from s to t?"

Each language-model checkpoint was fine-tuned on all four at once for 10k steps, with 4 questions per example and the answers scored by exact match.

<figure class="paper-figure lx-fig">
<div class="fig-controls" data-lx-tasks><span class="fig-note">Task:</span><button class="fig-btn on" data-task="multihop_facts">Multi-hop facts</button><button class="fig-btn" data-task="variable_tracking">Variable tracking</button><button class="fig-btn" data-task="program_tracing">Program tracing</button><button class="fig-btn" data-task="graph_reachability">Graph reachability</button></div>
<div class="lx-legend"><span><i style="color:var(--lx-gray)"></i>standard MoE</span><span><i style="color:var(--lx-blue)"></i>SMELT-style</span><span><i class="dash" style="color:var(--lx-blue)"></i>block looping x2</span><span><i style="color:var(--lx-red)"></i>refreshed loop n = 2</span><span><i class="dash" style="color:var(--lx-red)"></i>refreshed loop n = 2, window 64</span></div>
<div class="lx-chart" data-lx="text" aria-label="Exact-match accuracy against the number of chained facts for five designs, three seeds each."></div>
<figcaption><strong>The k-hop edge doesn't transfer.</strong> Exact-match accuracy by number of chained facts d, fine-tuned from each design's language-model checkpoint. Lines are the mean over 3 seeds, shaded bands the range across seeds. Past d = 3 no design solves anything (for graphs, chance is 0.5).</figcaption>
<details class="lx-data"><summary>All 11 designs, seed 100 (accuracy at d = 2 / d = 3)</summary>
<table><tr><th>Design</th><th>FLOPs</th><th>Facts</th><th>Variables</th><th>Program, d = 2</th></tr>
<tr><td>Standard MoE</td><td>1.00x</td><td>0.14 / 0.16</td><td>0.19 / 0.19</td><td>0.04</td></tr>
<tr><td>Attention inside experts, n = 1</td><td>1.08x</td><td>0.99 / 0.28</td><td>1.00 / 0.26</td><td>0.11</td></tr>
<tr><td>Extra attention, unrouted</td><td>1.12x</td><td>1.00 / 0.34</td><td>0.99 / 0.52</td><td>0.17</td></tr>
<tr><td>SMELT-style</td><td>1.26x</td><td>1.00 / 0.51</td><td>1.00 / 0.67</td><td>0.85</td></tr>
<tr><td>Refreshed n = 2, window 64</td><td>1.36x</td><td>1.00 / 0.39</td><td>0.98 / 0.15</td><td>0.21</td></tr>
<tr><td>10-layer standard MoE</td><td>1.43x</td><td>0.68 / 0.23</td><td>0.29 / 0.19</td><td>0.04</td></tr>
<tr><td>Four experts at once</td><td>1.44x</td><td>1.00 / 0.32</td><td>0.99 / 0.21</td><td>0.08</td></tr>
<tr><td>Same experts, stale n = 2</td><td>1.44x</td><td>1.00 / 0.33</td><td>1.00 / 0.18</td><td>0.08</td></tr>
<tr><td>Refreshed n = 2</td><td>1.46x</td><td>0.56 / 0.24</td><td>0.97 / 0.17</td><td>0.07</td></tr>
<tr><td>Two new experts (re-routing)</td><td>1.46x</td><td>0.14 / 0.15</td><td>1.00 / 1.00</td><td>0.14</td></tr>
<tr><td>Block looping x2</td><td>1.53x</td><td>1.00 / 0.48</td><td>1.00 / 0.69</td><td>0.28</td></tr>
</table></details>
</figure>

Every design handles single lookups. Chaining two is where they split: the standard MoE does it on two-hop facts in only 1 of 3 seeds, while SMELT-style and block looping do it in all three and also get the furthest at d = 3. Refreshed loops sit in between and depend a lot on the seed. One seed solves variable tracking through d = 4, which nothing else does, while another stays at 0.56 on two-hop facts. The windowed refreshed variant, the cheapest k-hop winner, is the least reliable of the five. Nothing reliably goes past three hops, and the roughly 2x edge from k-hop doesn't carry over to these tasks, at least at this scale.

### A Side Lesson: Making These Tasks Learnable

Getting a 78M-parameter model to learn these tasks at all took two tries, which is maybe the most practically useful part of this post. In the first version, every example asked one question with d drawn uniformly, and in 20k steps almost no design learned even d = 1 (the one exception was a single task for a single design). The models guessed a plausible value from the context instead, which showed up in a funny way: variable-tracking accuracy went *up* with d, since longer target chains leave fewer distinct values in the context to guess from. Sampling easy questions more often fixed single lookups but not two-hop ones (0.14 on two-hop facts).

What worked was asking every kind of single lookup on its own ("Who is Ann's boss?", "What is y set to?"), so each step a longer question composes gets direct training signal, and asking 4 questions per example. Training from scratch never left the guessing stage, even then. Synthetic tasks like k-hop sidestep all of this, since every position is a training target at every k, and I think that's part of why results on them can look better than they turn out to be.

### Why This Matters

Looped models are having a moment, and a lot of the proposals in this space, mine included, start from the intuition that reusing weights is what buys extra reasoning. At least at this scale, the thing doing the work was something else: another attention step over states that had already changed. That's what full-context experts add over the baseline, what SMELT-style looping loses when it skips attention in the second pass, and what makes a refreshed second pass chain lookups. Whether that step happens inside a routed expert didn't matter in any of my comparisons.

If you're trying something similar, here's what I'd take from this:

- If you put attention inside MoE experts, compare against the same attention unrouted. In my runs it explains the whole gain.
- If you have spare expert compute, spend it on more experts per token before spending it on loops of the same expert.
- Refreshed context, not weight reuse, is what makes a second pass useful for multi-hop retrieval, and a local window keeps that cheap. But check on realistic tasks before trusting a synthetic multi-hop gain.
- Routers that pick loop counts never learned to track token difficulty, and halting gates only helped on synthetic tasks.

### Caveats

- Everything is at one base scale (78M parameters, 1B tokens) with a single 4x check, and 1 to 3 seeds per result. The k-hop numbers are single seeds.
- FLOPs are counted analytically, not measured in wall-clock time, and full-context expert attention also doubles the KV cache, which these numbers ignore.
- The text tasks use small fine-tuned models, and larger pretrained models could well behave differently.
- I haven't tested turning an existing pretrained MoE into a looping one, so these results don't say whether looping can be added to a model that was trained without it.

---

This work has been made possible in part by a gift from the Chan Zuckerberg Initiative Foundation to establish the Kempner Institute for the Study of Natural and Artificial Intelligence.

### Citation

If you use this work, please cite this post:

> Ege Çakar. *Looping Inside the Experts, and Where the Gains in Recurrent Mixture-of-Experts Models Come From.* Blog post, November 2026. [egecakar.com/blog/2026/11/19/looping-inside-the-experts](/blog/2026/11/19/looping-inside-the-experts/)

{% raw %}
```bibtex
@misc{cakar2026looping,
  title        = {Looping Inside the Experts, and Where the Gains in Recurrent Mixture-of-Experts Models Come From},
  author       = {{\c{C}}akar, Ege},
  year         = {2026},
  month        = nov,
  howpublished = {\url{https://egecakar.com/blog/2026/11/19/looping-inside-the-experts/}},
  note         = {Blog post}
}
```
{% endraw %}

{% raw %}
<script>
(function () {
  var NS = 'http://www.w3.org/2000/svg';
  var calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var COL = { red: '#c4553b', blue: '#2266a4', gray: '#8d877c', grid: '#e4ddcf', paper: '#f6f3ec', ink: '#2b2a27', muted: '#7a756b' };
  // Exact-match accuracy at d = 1..8 for seeds 100, 101, 102 (fine-tuned, 10k steps).
  var TEXT = {"standard":{"variable_tracking":[[0.996,0.193,0.193,0.178,0.17,0.156,0.145,0.127],[0.998,0.26,0.191,0.162,0.172,0.152,0.143,0.137],[0.988,0.707,0.201,0.164,0.115,0.139,0.143,0.129]],"program_tracing":[[1.0,0.035,0.037,0.039,0.041,0.039,0.039,0.057],[1.0,0.039,0.035,0.031,0.029,0.047,0.043,0.047],[1.0,0.068,0.025,0.031,0.031,0.035,0.041,0.051]],"multihop_facts":[[1.0,0.145,0.158,0.141,0.168,0.137,0.164,0.133],[1.0,0.305,0.17,0.197,0.199,0.186,0.166,0.152],[1.0,0.975,0.24,0.232,0.227,0.217,0.236,0.215]],"graph_reachability":[[0.998,0.502,0.504,0.508,0.521,0.5,0.488,0.475],[0.998,0.502,0.504,0.506,0.521,0.498,0.488,0.475],[0.996,0.502,0.504,0.506,0.521,0.498,0.488,0.473]]},"smelt":{"variable_tracking":[[1.0,0.996,0.666,0.139,0.145,0.135,0.135,0.133],[1.0,0.998,0.639,0.262,0.168,0.139,0.131,0.115],[0.998,0.975,0.686,0.355,0.283,0.164,0.143,0.121]],"program_tracing":[[1.0,0.852,0.039,0.045,0.045,0.045,0.047,0.068],[1.0,0.123,0.082,0.047,0.039,0.057,0.061,0.061],[1.0,0.422,0.125,0.053,0.041,0.047,0.061,0.053]],"multihop_facts":[[1.0,0.998,0.508,0.402,0.389,0.393,0.387,0.336],[1.0,1.0,0.469,0.416,0.336,0.369,0.363,0.359],[1.0,1.0,0.402,0.355,0.314,0.342,0.338,0.328]],"graph_reachability":[[0.975,0.846,0.496,0.504,0.523,0.504,0.48,0.482],[0.996,0.506,0.502,0.508,0.523,0.5,0.488,0.471],[0.98,0.76,0.51,0.51,0.527,0.482,0.477,0.473]]},"block":{"variable_tracking":[[1.0,1.0,0.691,0.117,0.152,0.139,0.164,0.143],[1.0,1.0,0.807,0.549,0.449,0.156,0.109,0.117],[1.0,1.0,0.268,0.168,0.158,0.123,0.125,0.105]],"program_tracing":[[1.0,0.275,0.074,0.037,0.041,0.051,0.051,0.059],[1.0,0.109,0.072,0.033,0.037,0.051,0.035,0.057],[1.0,0.891,0.039,0.045,0.055,0.049,0.057,0.059]],"multihop_facts":[[1.0,1.0,0.482,0.422,0.432,0.408,0.398,0.412],[1.0,0.998,0.533,0.48,0.455,0.455,0.438,0.432],[1.0,1.0,0.695,0.525,0.498,0.471,0.471,0.451]],"graph_reachability":[[0.506,0.537,0.51,0.514,0.508,0.512,0.482,0.492],[0.529,0.502,0.504,0.506,0.521,0.498,0.488,0.475],[0.998,0.502,0.504,0.508,0.521,0.498,0.488,0.475]]},"refreshed":{"variable_tracking":[[0.984,0.971,0.174,0.166,0.166,0.143,0.152,0.139],[0.996,0.996,0.129,0.162,0.143,0.139,0.129,0.141],[1.0,1.0,0.979,0.992,0.23,0.119,0.113,0.104]],"program_tracing":[[1.0,0.07,0.025,0.033,0.021,0.027,0.037,0.037],[1.0,0.064,0.02,0.029,0.023,0.029,0.041,0.027],[1.0,0.285,0.064,0.039,0.025,0.039,0.031,0.031]],"multihop_facts":[[1.0,0.559,0.24,0.24,0.217,0.221,0.205,0.211],[1.0,0.988,0.264,0.305,0.289,0.297,0.275,0.301],[1.0,1.0,0.312,0.338,0.299,0.33,0.328,0.324]],"graph_reachability":[[0.537,0.494,0.523,0.486,0.514,0.508,0.5,0.48],[1.0,0.5,0.504,0.506,0.521,0.498,0.488,0.475],[0.992,0.5,0.506,0.506,0.525,0.494,0.482,0.473]]},"w64":{"variable_tracking":[[0.992,0.977,0.154,0.127,0.145,0.139,0.121,0.133],[0.992,0.199,0.197,0.174,0.176,0.154,0.146,0.141],[0.994,0.209,0.225,0.203,0.186,0.141,0.15,0.113]],"program_tracing":[[1.0,0.213,0.049,0.035,0.053,0.047,0.061,0.055],[1.0,0.033,0.025,0.035,0.033,0.053,0.049,0.053],[1.0,0.027,0.025,0.033,0.039,0.037,0.045,0.043]],"multihop_facts":[[1.0,1.0,0.395,0.312,0.352,0.318,0.318,0.336],[1.0,0.166,0.145,0.156,0.162,0.146,0.156,0.129],[1.0,0.143,0.152,0.145,0.164,0.133,0.174,0.141]],"graph_reachability":[[1.0,0.5,0.506,0.504,0.521,0.496,0.486,0.475],[1.0,0.502,0.504,0.506,0.521,0.498,0.49,0.475],[1.0,0.502,0.504,0.506,0.521,0.498,0.488,0.475]]}};
  var mk = function (tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  };
  var label = function (parent, x, y, s, attrs) { var t = mk('text', Object.assign({ x: x, y: y }, attrs || {}), parent); t.textContent = s; return t; };

  // One tooltip per figure card. rows: [value, name, color, dashed]; text is set with textContent.
  var tooltip = function (card) {
    var tip = card.appendChild(document.createElement('div'));
    tip.className = 'lx-tip';
    tip.setAttribute('aria-hidden', 'true');
    return {
      show: function (ev, title, rows) {
        tip.textContent = '';
        if (title) { var h = tip.appendChild(document.createElement('div')); h.className = 'lx-tip-title'; h.textContent = title; }
        rows.forEach(function (r) {
          var row = tip.appendChild(document.createElement('div')); row.className = 'lx-tip-row';
          var key = row.appendChild(document.createElement('span')); key.className = 'key' + (r[3] ? ' dash' : ''); key.style.borderTopColor = r[2];
          row.appendChild(document.createElement('strong')).textContent = r[0];
          row.appendChild(document.createElement('span')).textContent = r[1];
        });
        var box = card.getBoundingClientRect(), t = ev.target.getBoundingClientRect();
        var x = ev.clientX != null ? ev.clientX - box.left : t.left + t.width / 2 - box.left;
        var y = ev.clientY != null ? ev.clientY - box.top : t.top + t.height / 2 - box.top;
        tip.classList.add('on');
        tip.style.left = Math.max(6, Math.min(x + 14, box.width - tip.offsetWidth - 6)) + 'px';
        tip.style.top = Math.max(6, Math.min(y + 14, box.height - tip.offsetHeight - 6)) + 'px';
      },
      hide: function () { tip.classList.remove('on'); }
    };
  };
  // Draws at the element's own pixel width, again whenever that width changes.
  var responsive = function (el, draw) {
    var w = 0, go = function () { var nw = Math.round(el.clientWidth); if (nw && nw !== w) { w = nw; el.textContent = ''; draw(w); } };
    if ('ResizeObserver' in window) new ResizeObserver(go).observe(el); else addEventListener('resize', go);
    go();
  };
  var hover = function (el, tip, fn) {
    ['pointermove', 'focus'].forEach(function (t) { el.addEventListener(t, fn); });
    ['pointerleave', 'blur'].forEach(function (t) { el.addEventListener(t, tip.hide); });
  };

  // Horizontal dot plot: one row per design, mean with a ±SD bar, an open circle for single runs.
  var dotPlot = function (el, spec) {
    var tip = tooltip(el.closest('figure'));
    responsive(el, function (W) {
      var lw = Math.min(230, W * 0.46), L = lw + 10, R = 18, T = 6, B = 42, rh = 40, H = T + spec.rows.length * rh + B;
      var svg = mk('svg', { width: W, height: H, viewBox: '0 0 ' + W + ' ' + H, role: 'group', 'aria-label': el.getAttribute('aria-label') }, el);
      var x = function (v) { return L + (v - spec.lo) / (spec.hi - spec.lo) * (W - L - R); };
      var step = spec.step;
      while (x(spec.lo + step) - x(spec.lo) < 40) step *= 2;   // keep tick labels apart on narrow screens
      for (var v = spec.lo; v <= spec.hi + 1e-9; v += step) {
        mk('line', { x1: x(v), x2: x(v), y1: T, y2: H - B + 4, stroke: COL.grid }, svg);
        label(svg, x(v), H - B + 18, v.toFixed(2), { 'text-anchor': 'middle', class: 'lx-tick' });
      }
      label(svg, W < 480 ? W / 2 : L + (W - L - R) / 2, H - 6, 'validation cross-entropy (lower is better)', { 'text-anchor': 'middle', class: 'lx-axis' });
      spec.rows.forEach(function (r, i) {
        var cy = T + i * rh + rh / 2, c = COL[r.c];
        label(svg, 0, cy - 3, r.name, { class: 'lx-row' + (r.c !== 'gray' ? ' strong' : '') });
        label(svg, 0, cy + 12, r.sub, { class: 'lx-sub' });
        if (r.sd) mk('line', { x1: x(r.v - r.sd), x2: x(r.v + r.sd), y1: cy, y2: cy, stroke: c, 'stroke-width': 2, 'stroke-linecap': 'round' }, svg);
        mk('circle', { cx: x(r.v), cy: cy, r: 5.5, fill: r.one ? COL.paper : c, stroke: r.one ? c : COL.paper, 'stroke-width': 2 }, svg);
        var hit = mk('rect', { x: 0, y: cy - rh / 2, width: W, height: rh, fill: 'transparent', tabindex: 0, class: 'lx-hit' }, svg);
        hover(hit, tip, function (ev) {
          tip.show(ev, r.name, [[r.v.toFixed(4) + (r.sd ? ' ± ' + r.sd.toFixed(4) : ''), r.sub, c]]);
        });
      });
    });
  };

  // Scatter of hops solved against FLOPs, with a few direct labels.
  var scatter = function (el, pts) {
    var tip = tooltip(el.closest('figure'));
    responsive(el, function (W) {
      var narrow = W < 480, L = 40, R = narrow ? 14 : 24, T = 14, B = 42, H = Math.round(Math.min(360, Math.max(260, W * 0.55)));
      var svg = mk('svg', { width: W, height: H, viewBox: '0 0 ' + W + ' ' + H, role: 'group', 'aria-label': el.getAttribute('aria-label') }, el);
      var x = function (v) { return L + (v - 0.8) / (5.2 - 0.8) * (W - L - R); }, y = function (v) { return T + (1 - v / 68) * (H - T - B); };
      [0, 16, 32, 48, 64].forEach(function (v) {
        mk('line', { x1: L, x2: W - R, y1: y(v), y2: y(v), stroke: COL.grid }, svg);
        label(svg, L - 8, y(v) + 4, v, { 'text-anchor': 'end', class: 'lx-tick' });
      });
      [1, 2, 3, 4, 5].forEach(function (v) { label(svg, x(v), H - B + 18, v + 'x', { 'text-anchor': 'middle', class: 'lx-tick' }); });
      label(svg, L + (W - L - R) / 2, H - 6, 'FLOPs per token vs the standard MoE', { 'text-anchor': 'middle', class: 'lx-axis' });
      label(svg, L, T - 2, 'hops solved (k)', { class: 'lx-axis' });
      pts.forEach(function (p) {
        var cx = x(p.f), cy = y(p.k), c = COL[p.c];
        mk('circle', { cx: cx, cy: cy, r: 6, fill: c, stroke: COL.paper, 'stroke-width': 2 }, svg);
        if (p.lab && !(narrow && p.wide)) label(svg, cx + p.dx, cy + p.dy, p.lab, { 'text-anchor': p.a || 'start', class: 'lx-sub', style: 'fill:' + COL.ink });
        var hit = mk('circle', { cx: cx, cy: cy, r: 14, fill: 'transparent', tabindex: 0, class: 'lx-hit' }, svg);
        hover(hit, tip, function (ev) { tip.show(ev, p.name, [['k = ' + p.k, p.f.toFixed(2) + 'x FLOPs', c]]); });
      });
    });
  };

  // Accuracy by number of chained facts: mean line and min-max band over seeds per design,
  // a crosshair that snaps to d, and task buttons. Colors follow the design, not the task.
  var accuracy = function (el, data, designs) {
    var card = el.closest('figure'), tip = tooltip(card), task = 'multihop_facts', redraw;
    var stats = function (key, t) {
      var runs = data[key][t];
      return runs[0].map(function (_, d) {
        var v = runs.map(function (r) { return r[d]; });
        return { mean: v.reduce(function (a, b) { return a + b; }) / v.length, lo: Math.min.apply(null, v), hi: Math.max.apply(null, v) };
      });
    };
    card.querySelectorAll('[data-task]').forEach(function (b) {
      b.addEventListener('click', function () {
        task = b.dataset.task;
        card.querySelectorAll('[data-task]').forEach(function (o) { o.classList.toggle('on', o === b); });
        redraw();
      });
    });
    responsive(el, redraw = function (W) {
      W = W || Math.round(el.clientWidth);
      el.textContent = '';
      var L = 40, R = 14, T = 10, B = 42, H = Math.round(Math.min(340, Math.max(240, W * 0.5))), D = 8;
      var svg = mk('svg', { width: W, height: H, viewBox: '0 0 ' + W + ' ' + H, role: 'group', 'aria-label': el.getAttribute('aria-label') }, el);
      var x = function (d) { return L + (d - 1) / (D - 1) * (W - L - R); }, y = function (v) { return T + (1 - v) * (H - T - B); };
      [0, 0.25, 0.5, 0.75, 1].forEach(function (v) {
        mk('line', { x1: L, x2: W - R, y1: y(v), y2: y(v), stroke: COL.grid }, svg);
        label(svg, L - 8, y(v) + 4, v.toFixed(2).replace(/0$/, '').replace(/\.0?$/, ''), { 'text-anchor': 'end', class: 'lx-tick' });
      });
      for (var d = 1; d <= D; d++) label(svg, x(d), H - B + 18, d, { 'text-anchor': 'middle', class: 'lx-tick' });
      label(svg, L + (W - L - R) / 2, H - 6, 'facts chained (d)', { 'text-anchor': 'middle', class: 'lx-axis' });
      if (task === 'graph_reachability') {
        mk('line', { x1: L, x2: W - R, y1: y(0.5), y2: y(0.5), stroke: COL.muted, 'stroke-width': 1 }, svg);
        label(svg, W - R, y(0.5) - 6, 'chance', { 'text-anchor': 'end', class: 'lx-sub' });
      }
      var all = designs.map(function (g) { return { g: g, s: stats(g.key, task) }; });
      all.forEach(function (o) {
        var top = o.s.map(function (p, i) { return x(i + 1) + ',' + y(p.hi); }), bot = o.s.map(function (p, i) { return x(i + 1) + ',' + y(p.lo); }).reverse();
        mk('polygon', { points: top.concat(bot).join(' '), fill: COL[o.g.c], 'fill-opacity': 0.08 }, svg);
      });
      all.forEach(function (o) {
        mk('polyline', { points: o.s.map(function (p, i) { return x(i + 1) + ',' + y(p.mean); }).join(' '), fill: 'none', stroke: COL[o.g.c], 'stroke-width': 2,
                         'stroke-dasharray': o.g.dash ? '6 4' : 'none', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, svg);
      });
      var cross = mk('line', { y1: T, y2: H - B, stroke: COL.ink, 'stroke-width': 1, opacity: 0 }, svg);
      var dots = all.map(function (o) { return mk('circle', { r: 4, fill: COL[o.g.c], stroke: COL.paper, 'stroke-width': 2, opacity: 0 }, svg); });
      var hit = mk('rect', { x: L, y: T, width: W - L - R, height: H - T - B, fill: 'transparent', tabindex: 0, class: 'lx-hit' }, svg);
      var at = 1;
      var show = function (ev, d) {
        at = Math.max(1, Math.min(D, d));
        cross.setAttribute('x1', x(at)); cross.setAttribute('x2', x(at)); cross.setAttribute('opacity', 0.35);
        dots.forEach(function (c, i) { c.setAttribute('cx', x(at)); c.setAttribute('cy', y(all[i].s[at - 1].mean)); c.setAttribute('opacity', 1); });
        tip.show(ev, 'd = ' + at + ' (mean, range over 3 seeds)', all.map(function (o) {
          var p = o.s[at - 1];
          return [p.mean.toFixed(2), o.g.name + ' (' + p.lo.toFixed(2) + ' to ' + p.hi.toFixed(2) + ')', COL[o.g.c], o.g.dash];
        }));
      };
      hit.addEventListener('pointermove', function (ev) {
        var r = svg.getBoundingClientRect();
        show(ev, Math.round((ev.clientX - r.left - L) / (W - L - R) * (D - 1)) + 1);
      });
      hit.addEventListener('focus', function (ev) { show(ev, at); });
      hit.addEventListener('keydown', function (ev) {
        if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') { ev.preventDefault(); show({ target: hit }, at + (ev.key === 'ArrowRight' ? 1 : -1)); }
      });
      ['pointerleave', 'blur'].forEach(function (t) {
        hit.addEventListener(t, function () { tip.hide(); cross.setAttribute('opacity', 0); dots.forEach(function (c) { c.setAttribute('opacity', 0); }); });
      });
    });
  };

  // Header figure: tokens take turns; each is routed to two experts, loops twice, and writes back.
  var header = function (svg) {
    if (calm) return;
    var q = function (s) { return svg.querySelector(s); }, qa = function (s) { return Array.prototype.slice.call(svg.querySelectorAll(s)); };
    var toks = qa('[data-tok]'), exps = qa('[data-exp]'), routes = q('[data-part="routes"]'), loop = q('[data-part="loop"]');
    var write = q('[data-part="write"]'), zoom = q('[data-part="zoom"]'), inLine = q('[data-part="in"]');
    var picks = [[3, 14], [5, 9], [0, 12], [7, 10], [2, 13], [4, 11]], step = 0, busy = false;
    var center = function (r) { return [+r.getAttribute('x') + 6.5, +r.getAttribute('y') + 6.5]; };
    var dot = function (path, ms, color, done) {
      var len = path.getTotalLength(), c = mk('circle', { r: 3.5, style: 'fill:' + color + ';stroke:#f6f3ec;stroke-width:1.2' }, svg), t0 = performance.now();
      requestAnimationFrame(function f(now) {
        var t = Math.min((now - t0) / ms, 1), e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2, p = path.getPointAtLength(e * len);
        c.setAttribute('cx', p.x); c.setAttribute('cy', p.y);
        if (t < 1) requestAnimationFrame(f); else { c.remove(); if (done) done(); }
      });
    };
    var run = function () {
      if (busy || document.hidden) return;
      busy = true;
      var i = step % toks.length, pick = picks[i], tok = toks[i];
      toks.forEach(function (t) { t.setAttribute('class', 's ' + (t === tok ? 'f-red-soft' : 'f-white')); });
      var tx = +tok.getAttribute('x') + 9;
      inLine.setAttribute('x1', tx); inLine.setAttribute('x2', Math.min(Math.max(tx, 50), 128));
      exps.forEach(function (e, j) { e.setAttribute('class', 's ' + (pick.indexOf(j) >= 0 ? 'f-red-soft' : 'f-white')); });
      routes.textContent = '';
      pick.forEach(function (j) {
        var c = center(exps[j]);
        mk('line', { x1: 89, y1: 90, x2: c[0], y2: c[1] - 8, class: 's', 'marker-end': 'url(#lxh-ink)' }, routes);
      });
      var first = center(exps[pick[1]]);
      zoom.setAttribute('d', 'M ' + (first[0] + 7) + ' ' + first[1] + ' C ' + (first[0] + 30) + ' ' + first[1] + ' 186 128 208 128');
      dot(loop, 900, 'var(--red)', function () {
        dot(loop, 900, 'var(--red)', function () {
          dot(write, 900, 'var(--red)', function () { step++; busy = false; });
        });
      });
    };
    var visible = !('IntersectionObserver' in window);
    if (!visible) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }, { threshold: 0.3 }).observe(svg);
    setInterval(function () { if (visible) run(); }, 3400);
  };

  var red = 'red', blue = 'blue', gray = 'gray';
  document.querySelectorAll('[data-lx]').forEach(function (el) {
    var k = el.dataset.lx;
    if (k === 'header') header(el);
    if (k === 'attention') dotPlot(el, { lo: 3.32, hi: 3.39, step: 0.01, rows: [
      { name: 'Standard MoE', sub: '1.00x FLOPs · 3 seeds', v: 3.3775, sd: 0.0041, c: gray },
      { name: '7-layer standard MoE', sub: '1.08x · 1 seed', v: 3.3537, c: gray, one: true },
      { name: 'MoA sublayer', sub: '1.09x · 1 seed', v: 3.3517, c: gray, one: true },
      { name: '8-layer standard MoE', sub: '1.09x · 1 seed', v: 3.3487, c: gray, one: true },
      { name: 'Extra attention, unrouted', sub: '1.12x · 3 seeds', v: 3.3363, sd: 0.0023, c: blue },
      { name: 'Attention inside experts', sub: '1.08x · 3 seeds', v: 3.3354, sd: 0.0052, c: red }] });
    if (k === 'compute') dotPlot(el, { lo: 3.28, hi: 3.35, step: 0.01, rows: [
      { name: 'One pass (n = 1)', sub: '1.08x FLOPs · 3 seeds', v: 3.3354, sd: 0.0052, c: gray },
      { name: 'Same experts loop again', sub: '1.44x · 3 seeds', v: 3.3206, sd: 0.0050, c: red },
      { name: '10-layer standard MoE', sub: '1.43x · 1 seed', v: 3.3168, c: gray, one: true },
      { name: '...with refreshed context', sub: '1.46x · 3 seeds', v: 3.3109, sd: 0.0047, c: red },
      { name: 'Two new experts', sub: '1.46x · 3 seeds', v: 3.3048, sd: 0.0069, c: blue },
      { name: 'Four experts at once', sub: '1.44x · 3 seeds', v: 3.2961, sd: 0.0056, c: blue }] });
    if (k === 'khop') scatter(el, [
      { name: 'Standard MoE', f: 1.00, k: 4, c: gray, lab: 'standard', dx: 9, dy: 4 },
      { name: 'SMELT-style, layer 2 looped', f: 1.49, k: 8, c: blue },
      { name: 'Same experts, refreshed, window 64 (n = 2)', f: 1.87, k: 38, c: red, lab: 'refreshed, window 64', a: 'end', dx: -10, dy: 4, wide: true },
      { name: 'Block looping x2', f: 1.99, k: 17, c: blue, lab: 'block ×2, SMELT-style', a: 'end', dx: -11, dy: 4, wide: true },
      { name: 'SMELT-style, both layers looped', f: 1.99, k: 19, c: blue },
      { name: 'Four experts at once', f: 2.62, k: 15, c: gray },
      { name: 'Same experts, stale (n = 2)', f: 2.62, k: 24, c: gray },
      { name: 'Same experts, refreshed (n = 2)', f: 2.70, k: 44, c: red, lab: 'refreshed / new experts', dx: 10, dy: -6, wide: true },
      { name: 'Two new experts (re-routing)', f: 2.70, k: 42, c: red },
      { name: 'Same experts, refreshed, window 64 (n = 4)', f: 3.31, k: 41, c: red },
      { name: 'Block looping x4', f: 3.97, k: 64, c: blue, lab: 'block ×4', a: 'end', dx: -10, dy: 4 },
      { name: 'Same experts, stale (n = 4)', f: 4.72, k: 38, c: gray },
      { name: 'Same experts, refreshed (n = 4)', f: 4.97, k: 64, c: red },
      { name: 'Four rounds of new experts', f: 4.98, k: 64, c: red }]);
    if (k === 'text') accuracy(el, TEXT, [
      { key: 'standard', name: 'standard MoE', c: gray },
      { key: 'smelt', name: 'SMELT-style', c: blue },
      { key: 'block', name: 'block looping x2', c: blue, dash: true },
      { key: 'refreshed', name: 'refreshed n = 2', c: red },
      { key: 'w64', name: 'refreshed, window 64', c: red, dash: true }]);
  });
})();
</script>
{% endraw %}
