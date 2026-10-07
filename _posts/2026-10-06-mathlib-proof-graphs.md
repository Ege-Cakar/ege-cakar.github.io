---
layout: post
title: "Mathlib as a Geometry of Mathematics: An Empirical Study of Formal Proof Graphs"
date: 2026-10-06
---

<figure class="paper-figure post-figure">{% include figures/mathlib.svg %}</figure>

During my work in the Pehlevan Lab over the Spring 2026 semester, I studied whether Mathlib, Lean's library of formalized mathematics, has a measurable geometry, and whether that geometry tells AI theorem provers anything useful.

Mathematicians already talk about their field geometrically: some subjects are close together, some lemmas are central, some definitions are bottlenecks every later argument has to pass through. In a formal library, part of that language becomes data. Theorems cite other theorems, and tactics turn goals into subgoals. Barkeshli, Douglas, and Freedman recently proposed describing mathematics with proof hypergraphs, and I wanted to see what a real one looks like.

### The Setup

I built two graphs based on different notions of geometry from LeanDojo's traces of Mathlib. The first is a theorem-dependency graph: an edge B → A means some tactic in B's proof uses A as a premise. For Mathlib specifically, that comes around to a massive 138,333 nodes and 309,396 unique edges. The second is a state-tactic hypergraph, where nodes are proof states and each edge is a tactic taking one goal to its subgoals.

I then asked three questions: what the large-scale structure looks like, whether graph features predict properties of individual theorems, and whether paths through proof states can capture the idea that one theorem reduces to another.

### Key Results

- The dependency graph is highly structured. Its degree distribution is heavy-tailed (power-law tail exponent 2.37), Louvain finds 240 communities with modularity 0.592, and 50,191 of 61,544 traced proofs are linear. Locally, the graph looks tree-like and hub-driven.
- Local structure predicts proof length. Degree alone gets R² = 0.483 on log tactic count, and adding a node2vec embedding raises that to 0.555.
- Spectral coordinates are weak. They get R² = 0.003 on proof length, and predicting a theorem's Mathlib area with spectral plus degree features gets 0.177 accuracy against a 0.165 majority baseline. The theorem's namespace alone gets 0.737.
- As such, funnily enough, there's an "autoformalization" problem here, where the same concepts can be expressed in many different ways in Lean, and it's nontrivial to merge the true positives together.

The degree result is less impressive than it looks, since a longer proof has more chances to cite distinct premises. The node2vec gain on top of degree is the more interesting number. The pathfinding failure has a clear cause: `rw`, `simp`, and instantiation use a theorem without its statement ever becoming the current goal, so matching printed goals misses most real dependencies.

### Why This Matters

Before an AI system searches for proofs or proposes new lemmas inside Mathlib, it helps to know which parts of the library are central and which features track proof complexity. Graph geometry works as that kind of measurement. Theorem discovery from the graph will need a finer object, though: one that exposes what tactics like `rw` and `simp` do internally (matched subterms, instantiated lemmas, side goals), so that repeated proof transformations become visible and can be compressed into new lemmas.

As models get better at theorem discovery and autoformalization, in light of the many advances in this area in the last few months, being able to determine where in our understanding new proofs live, as well as more principled automatic discovery methods (such as, for example, exploring the sparsely populated regions of this graph) to point the LLMs towards become more and more valuable, and I hope this brings us one step closer to rigorous automatic science.

---

## Citation

If you use this work, please cite the report:

> Ege Çakar. *Mathlib as a Geometry of Mathematics: An Empirical Study of Formal Proof Graphs.* Technical report, Harvard University, May 2026. [egecakar.com/assets/files/Mathlib_Proof_Graphs_Report.pdf](/assets/files/Mathlib_Proof_Graphs_Report.pdf)

{% raw %}
```bibtex
@techreport{cakar2026mathlib,
  title       = {Mathlib as a Geometry of Mathematics: An Empirical Study of Formal Proof Graphs},
  author      = {{\c{C}}akar, Ege},
  institution = {Harvard University},
  year        = {2026},
  month       = may,
  url         = {https://egecakar.com/assets/files/Mathlib_Proof_Graphs_Report.pdf}
}
```
{% endraw %}

## Read the Full Report Below

[Download PDF](/assets/files/Mathlib_Proof_Graphs_Report.pdf){:target="_blank"}

Code: [github.com/Ege-Cakar/mathlib_analysis](https://github.com/Ege-Cakar/mathlib_analysis){:target="_blank"}

<iframe title="Mathlib Proof Graphs Report" src="/assets/files/Mathlib_Proof_Graphs_Report.pdf" width="100%" height="900" style="border: 1px solid var(--border); border-radius: 6px;"></iframe>
