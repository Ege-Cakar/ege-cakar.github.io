"""Generate the research figures (inline SVG includes) for the site.

Each figure is drawn on a 400x240 canvas. Colors come from CSS classes defined
under .paper-figure in _sass/_components.scss (s-*, f-*, t-*, m, dash).
Run from anywhere: python3 scripts/make_figures.py  (writes _includes/figures/*.svg)
"""
import math, os

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '_includes', 'figures')

def markers(p):
    """Arrowhead (ink, red, muted) and flat attack head (red), ids prefixed by figure name."""
    return f'''<defs>
<marker id="{p}-ink" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 1 9 5 0 9z" class="f-ink"/></marker>
<marker id="{p}-red" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 1 9 5 0 9z" class="f-red"/></marker>
<marker id="{p}-muted" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1 9 5 0 9z" style="fill:var(--muted)"/></marker>
<marker id="{p}-flat" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto"><path d="M8 0V10" class="s-red" style="stroke-width:2.2"/></marker>
</defs>'''

def svg(name, label, body):
    with open(os.path.join(OUT, name + '.svg'), 'w') as f:
        f.write(f'<svg viewBox="0 0 400 240" role="img" aria-label="{label}">\n{markers(name)}\n{body}\n</svg>\n')

def sub(base, s, cls='m', size=15, x=None, y=None, anchor='middle', extra=''):
    """Math-style text with a subscript, e.g. a_1."""
    return (f'<text x="{x}" y="{y}" class="{cls}" text-anchor="{anchor}" font-size="{size}" {extra}>{base}'
            f'<tspan dy="3" font-size="{int(size*0.68)}">{s}</tspan></text>')

def trim(x1, y1, x2, y2, r1, r2):
    """Segment between two circle centers, trimmed by the radii."""
    dx, dy = x2 - x1, y2 - y1
    L = math.hypot(dx, dy); ux, uy = dx / L, dy / L
    return x1 + ux * r1, y1 + uy * r1, x2 - ux * r2, y2 - uy * r2

def line(x1, y1, x2, y2, cls='s', marker=None, extra=''):
    m = f' marker-end="url(#{marker})"' if marker else ''
    return f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" class="{cls}"{m} {extra}/>'

def text(x, y, s, cls='', size=12, anchor='middle', weight=None):
    w = f' font-weight="{weight}"' if weight else ''
    return f'<text x="{x}" y="{y}" class="{cls}" font-size="{size}" text-anchor="{anchor}"{w}>{s}</text>'


# ---------------------------------------------------------------------------
# Argument paper (arXiv 2510.03442): agent text -> literals -> bipolar graph,
# a user-supplied fact attacks one literal, which is flagged and fed back.
def argument():
    P = 'argument'
    b = []
    # legend
    b.append(line(250, 18, 274, 18, 's', f'{P}-ink')); b.append(text(279, 22, 'supports', anchor='start', size=11))
    b.append(line(328, 18, 352, 18, 's-red', f'{P}-flat')); b.append(text(357, 22, 'attacks', anchor='start', size=11))
    # agent output document with highlighted literal spans
    b.append(text(60, 32, 'agent output', 't-muted', 11))
    b.append('<rect x="14" y="40" width="92" height="136" rx="4" class="s f-white"/>')
    spans = {58: (22, 70), 86: (44, 96), 114: (22, 82), 142: (34, 84)}
    for y in range(58, 170, 14):
        if y in spans:
            x1, x2 = spans[y]
            b.append(f'<rect x="{x1-2}" y="{y-5}" width="{x2-x1+4}" height="10" rx="2" class="f-blue-soft"/>')
        lens = {58: 72, 72: 64, 86: 74, 100: 58, 114: 70, 128: 66, 142: 74, 156: 48}
        b.append(line(22, y, 22 + lens[y], y, 's-muted', extra='style="stroke-width:2"'))
    # mining arrow
    b.append(line(114, 108, 160, 108, 's', f'{P}-ink'))
    b.append(text(137, 99, 'extract', 't-muted', 11)); b.append(text(137, 126, 'classify', 't-muted', 11))
    # bipolar graph of untyped literals
    N = {1: (190, 62), 2: (190, 150), 3: (262, 106), 4: (262, 192)}
    r = 14
    for a, c in [(1, 3), (2, 3)]:
        b.append(line(*trim(*N[a], *N[c], r, r + 1), 's', f'{P}-ink'))
    b.append(line(*trim(*N[4], *N[2], r, r + 1), 's-red', f'{P}-flat'))
    b.append(f'<circle cx="{N[3][0]}" cy="{N[3][1]}" r="20" class="s-red"/>')
    for k, (x, y) in N.items():
        b.append(f'<circle cx="{x}" cy="{y}" r="{r}" class="s f-node"/>')
        b.append(sub('a', k, x=x - 1, y=y + 4))
    # user-supplied fact node attacking a3 (one-way edge)
    b.append('<rect x="334" y="92" width="52" height="28" rx="3" class="s-red f-white"/>')
    b.append('<rect x="337" y="95" width="46" height="22" rx="2" class="s-red"/>')
    b.append(text(360, 110, 'fact', 't-red', 12))
    b.append(line(334, 106, 283, 106, 's-red', f'{P}-flat'))
    b.append(text(300, 136, 'flagged', 't-red', 11, 'start'))
    # test-time feedback back to the agents
    b.append(f'<path d="M282 118 C 322 146, 332 222, 282 222 L 74 222 C 62 222, 60 212, 60 182" class="s-muted dash" marker-end="url(#{P}-muted)"/>')
    b.append(text(178, 216, 'test-time feedback', 't-muted', 11))
    svg(P, 'Agent output is mined into literals and classified into a bipolar argument graph with support and attack edges. '
           'A user-supplied fact attacks one literal, which is flagged and sent back to the agents as feedback.', '\n'.join(b))


# ---------------------------------------------------------------------------
# Boule or Baguette (arXiv 2602.14404): broad+shallow vs narrow+deep tasks,
# drawn as parallel chains (breadth across, depth down) as in the paper's Fig. 3a.
def boule():
    P = 'boule'
    b = []
    # orientation key
    b.append(line(14, 20, 52, 20, 's', f'{P}-ink')); b.append(text(57, 24, 'breadth', 't-muted', 11, 'start'))
    b.append(line(14, 28, 14, 58, 's', f'{P}-ink')); b.append(text(20, 50, 'depth', 't-muted', 11, 'start'))
    # boule: wide, short loaf; many short chains
    b.append('<ellipse cx="115" cy="110" rx="88" ry="42" class="s f-node"/>')
    for i, x in enumerate([60, 82, 104, 126, 148, 170]):
        ys = [92, 110, 128]
        if i == 3:
            b.append(f'<line x1="{x}" y1="86" x2="{x}" y2="134" class="s-red" style="stroke-width:5;opacity:.35"/>')
        for y1, y2 in zip(ys, ys[1:]):
            b.append(line(x, y1 + 4, x, y2 - 4.5, 's', f'{P}-ink', 'style="stroke-width:1"'))
        for y in ys:
            b.append(f'<circle cx="{x}" cy="{y}" r="3.5" class="f-ink"/>')
    b.append(text(212, 114, 'short trace', 't-red', 11, 'start'))
    # baguette: narrow, tall loaf; few long chains
    b.append('<rect x="282" y="22" width="46" height="146" rx="23" class="s f-node"/>')
    ys = [36 + i * (154 - 36) / 6 for i in range(7)]
    for j, x in enumerate([297, 313]):
        if j == 1:
            b.append(f'<line x1="{x}" y1="{ys[0]-6}" x2="{x}" y2="{ys[-1]+6}" class="s-red" style="stroke-width:5;opacity:.35"/>')
        for y1, y2 in zip(ys, ys[1:]):
            b.append(line(x, y1 + 4, x, y2 - 4.5, 's', f'{P}-ink', 'style="stroke-width:1"'))
        for y in ys:
            b.append(f'<circle cx="{x}" cy="{y:.1f}" r="3.5" class="f-ink"/>')
    b.append(text(336, 98, 'long trace', 't-red', 11, 'start'))
    # captions
    for x, name, shape, splits, res, cls in [(115, 'boule', 'broad · shallow', 'Full, Imply', 'RT &gt; DP', 't-red'),
                                             (305, 'baguette', 'narrow · deep', 'Or, PHP', 'DP &gt; RT', '')]:
        b.append(text(x, 186, name, '', 13, weight=600))
        b.append(text(x, 201, shape, 't-muted', 11))
        b.append(text(x, 215, splits, 't-muted', 11))
        b.append(text(x, 233, res, cls, 13, weight=700))
    svg(P, 'Two task shapes. A boule is broad and shallow: many short chains, where models trained on reasoning traces (RT) '
           'length-generalize better than direct prediction (DP). A baguette is narrow and deep: few long chains, where DP does better.',
        '\n'.join(b))


# ---------------------------------------------------------------------------
# MLP Mixer ICL report: token strip (x_i, y_i ... x_q) -> token-mixing MLP across
# positions -> channel-mixing MLP per token -> avg pool -> label of x_q;
# plus a sketch of the report's Fig. 1c (IWL -> ICL transition as k grows).
def mixer():
    P = 'mixer'
    b = []
    names = ['x1', 'y1', 'x2', 'y2', None, 'xL', 'yL', 'xq']
    tint = {'x1': '#d9c7a7', 'x2': '#b7c7d8', 'xL': '#c6d3b4', 'xq': '#b7c7d8'}
    xs, x = [], 14
    for n in names:
        xs.append(x); x += 14 if n is None else 21
    def strip(y, labels):
        out = []
        for n, x in zip(names, xs):
            if n is None:
                out.append(text(x + 6, y + 13, '⋯', '', 12)); continue
            if n.startswith('x'):
                out.append(f'<rect x="{x}" y="{y}" width="18" height="18" rx="2" class="s" style="fill:{tint[n]}"/>')
            else:
                out.append(f'<rect x="{x}" y="{y}" width="18" height="18" rx="2" class="s f-white"/>')
            if labels:
                base, s = n[0], {'1': '1', '2': '2', 'L': 'L', 'q': 'q'}[n[1]]
                out.append(sub(base, s, size=13, x=x + 8, y=y - 6))
        return out
    top, mid, bot = 38, 98, 142
    b += strip(top, True)
    centers = [x + 9 for n, x in zip(names, xs) if n]
    for c1 in centers:
        for c2 in centers:
            b.append(f'<line x1="{c1}" y1="{top+18}" x2="{c2}" y2="{mid}" class="s-red" style="stroke-width:.7;opacity:.55"/>')
    b += strip(mid, False)
    for c in centers:
        b.append(line(c, mid + 18, c, bot - 1, 's', f'{P}-ink', 'style="stroke-width:1"'))
    b += strip(bot, False)
    b.append(text(182, 70, 'token-mixing', 't-red', 11, 'start')); b.append(text(182, 82, 'across', 't-muted', 10, 'start'))
    b.append(text(182, 93, 'positions', 't-muted', 10, 'start'))
    b.append(text(182, 131, 'channel-', '', 11, 'start')); b.append(text(182, 143, 'mixing', '', 11, 'start'))
    b.append(text(182, 155, 'per token', 't-muted', 10, 'start'))
    # average pool -> logits
    for c in centers:
        b.append(f'<line x1="{c}" y1="{bot+18}" x2="90" y2="184" class="s-muted" style="stroke-width:.8"/>')
    b.append('<rect x="64" y="184" width="52" height="16" rx="3" class="s f-node"/>')
    b.append(text(90, 196, 'avg pool', '', 10))
    b.append(line(90, 200, 90, 214, 's', f'{P}-ink'))
    b.append(text(90, 228, '4 logits → label of', '', 10))
    b.append(sub('x', 'q', size=12, x=150, y=228))
    # mini plot of Fig. 1c
    x0, x1, yt, yb = 280, 388, 40, 168
    k = list(range(5, 12))
    X = lambda i: x0 + i * (x1 - x0) / 6
    Y = lambda a: yb - (a - 0.2) / 0.8 * (yb - yt)
    b.append(f'<path d="M{x0} {yt-6} V{yb} H{x1+4}" class="s" style="stroke-width:1"/>')
    for a in (0.2, 0.6, 1.0):
        b.append(text(x0 - 4, Y(a) + 4, f'{a:g}', 't-muted', 9, 'end'))
    b.append(text(x0, yt - 12, 'accuracy', 't-muted', 10, 'start'))
    iwl = [1.00, 1.00, 0.99, 0.98, 0.84, 0.33, 0.26]
    icl = [0.29, 0.25, 0.26, 0.25, 0.31, 0.77, 1.00]
    pts = lambda v: ' '.join(f'{X(i):.1f},{Y(a):.1f}' for i, a in enumerate(v))
    b.append(f'<polyline points="{pts(iwl)}" class="s-muted dash" style="stroke-width:1.6"/>')
    b.append(f'<polyline points="{pts(icl)}" class="s-blue"/>')
    for i, a in enumerate(icl):
        b.append(f'<circle cx="{X(i):.1f}" cy="{Y(a):.1f}" r="2.2" class="f-blue"/>')
    b.append(text(X(0) + 4, Y(1.0) + 15, 'IWL test', 't-muted', 10, 'start'))
    b.append(text(X(6) - 4, Y(1.0) - 6, 'ICL test', 't-blue', 10, 'end'))
    b.append(text(x0, yb + 13, '2<tspan dy="-5" font-size="8">5</tspan>', 't-muted', 10))
    b.append(text(x1, yb + 13, '2<tspan dy="-5" font-size="8">11</tspan>', 't-muted', 10))
    b.append(text((x0 + x1) / 2, yb + 15, 'clusters <tspan class="m" font-size="12">k</tspan>', 't-muted', 10))
    b.append(text((x0 + x1) / 2, yb + 34, 'sketch of report Fig. 1c', 't-muted', 9))
    svg(P, 'A one-layer MLP Mixer reads a sequence of context exemplars and labels plus a query. A token-mixing MLP mixes across '
           'positions, a channel-mixing MLP acts per token, and average pooling gives the query label. As the number of clusters grows, '
           'in-weight accuracy falls and in-context accuracy rises.', '\n'.join(b))


# ---------------------------------------------------------------------------
# arXiv 2607.08883, two separate methods (the paper never combines them):
# (a) Activation-Guided GCG: the suffix is optimized so hidden states at every layer
#     and position have ~zero projection on the fixed refusal direction ("All", Eq. 9).
# (b) Soft-GCG: per suffix position, Gumbel-Softmax over the vocabulary (Eq. 11) is
#     annealed from flat to ~one-hot while optimizing an output loss (CE / CW,
#     Eqs. 13-15) with Adam; the suffix is the final argmax (Eq. 17). ~33x faster.
def gcg():
    P = 'gcg'
    b = []
    b.append('<line x1="203" y1="8" x2="203" y2="232" class="s-muted dash" style="stroke-width:.8"/>')
    # (a) activation-guided GCG
    b.append(text(10, 18, '(a) activation-guided GCG', '', 10.5, 'start', 600))
    b.append('<rect x="12" y="40" width="84" height="80" rx="6" class="s f-node"/>')
    b.append(text(16, 34, 'LLM', 't-muted', 10, 'start'))
    cols = [26, 40, 54, 68, 82]
    for y in (58, 80, 102):
        b.append(f'<line x1="18" y1="{y}" x2="90" y2="{y}" class="s-muted" style="stroke-width:.7"/>')
        for x in cols:
            b.append(f'<circle cx="{x}" cy="{y}" r="2" class="f-ink"/>')
    for k, x in enumerate(cols):
        fill = 'f-white' if k < 3 else ''
        st = '' if k < 3 else ' style="fill:rgba(196,85,59,.35)"'
        b.append(f'<rect x="{x-6}" y="134" width="12" height="12" rx="2" class="s {fill}"{st}/>')
    b.append(line(54, 132, 54, 122, 's', f'{P}-ink'))
    b.append(text(40, 160, 'instr.', 't-muted', 9)); b.append(text(75, 160, 'suffix', 't-red', 9))
    b.append(line(98, 80, 114, 80, 's', f'{P}-ink')); b.append(text(106, 74, 'h', 'm', 13))
    ox, oy = 134, 142
    d = (0.819, -0.574); p = (-0.574, -0.819)
    b.append(f'<line x1="{ox-p[0]*28:.1f}" y1="{oy-p[1]*28:.1f}" x2="{ox+p[0]*48:.1f}" y2="{oy+p[1]*48:.1f}" class="s-muted dash"/>')
    b.append(line(ox, oy, ox + d[0] * 64, oy + d[1] * 64, 's', f'{P}-ink', 'style="stroke-width:1.6"'))
    b.append(f'<text x="{ox + d[0]*64 - 2:.1f}" y="{oy + d[1]*64 + 22:.1f}" class="m" font-size="13" text-anchor="middle">'
             '<tspan font-weight="bold">d</tspan><tspan dy="3" font-size="8">refusal</tspan></text>')
    bx, by = ox + d[0] * 46 + p[0] * 24, oy + d[1] * 46 + p[1] * 24
    fx, fy = ox + d[0] * 46, oy + d[1] * 46
    ax, ay = ox + p[0] * 24, oy + p[1] * 24
    b.append(line(bx, by, fx, fy, 's-muted dash'))
    b.append(f'<path d="M{bx-5:.1f} {by:.1f} Q {(bx+ax)/2:.1f} {min(by,ay)-14:.1f} {ax+5:.1f} {ay-4:.1f}" class="s-red" marker-end="url(#{P}-red)"/>')
    b.append(f'<circle cx="{bx:.1f}" cy="{by:.1f}" r="4" class="s-muted f-white"/>')
    b.append(f'<circle cx="{ax:.1f}" cy="{ay:.1f}" r="4" class="f-red"/>')
    b.append(text(bx + 7, by - 4, 'before', 't-muted', 9, 'start'))
    b.append(text(ax - 6, ay + 14, 'after', 't-red', 9, 'end'))
    b.append(f'<text x="150" y="190" font-size="12" text-anchor="middle"><tspan class="m">(</tspan><tspan class="m" font-weight="bold">h</tspan>'
             '<tspan class="m">·</tspan><tspan class="m" font-weight="bold">d̂</tspan><tspan class="m">)</tspan>'
             '<tspan dy="-5" font-size="8">2</tspan><tspan dy="5"> → 0</tspan></text>')
    b.append(text(150, 203, 'all layers, positions', 't-muted', 9))
    b.append(f'<path d="M108 186 C 100 182, 96 164, 92 149" class="s-muted dash" marker-end="url(#{P}-muted)"/>')
    b.append(text(58, 186, 'token swaps', 't-muted', 9))
    # (b) Soft-GCG
    b.append(text(212, 18, '(b) Soft-GCG', '', 10.5, 'start', 600))
    b.append('<text x="302" y="40" class="m" font-size="12" text-anchor="middle">s̃ = softmax((φ + g) / τ)</text>')
    b.append(text(302, 53, 'one suffix position, over the vocabulary', 't-muted', 8.5))
    stages = [(214, [9, 11, 8, 10, 12, 9, 10, 11]), (280, [5, 7, 4, 26, 9, 5, 6, 4]), (346, [1, 1, 1, 40, 1, 1, 1, 1])]
    base = 106
    for x0, hs in stages:
        for k, h in enumerate(hs):
            b.append(f'<rect x="{x0 + k*5.3:.1f}" y="{base-h}" width="4" height="{h}" class="f-blue"/>')
        b.append(f'<line x1="{x0-2}" y1="{base}" x2="{x0+43}" y2="{base}" class="s-muted" style="stroke-width:.8"/>')
    for x in (260, 326):
        b.append(line(x, 86, x + 16, 86, 's', f'{P}-ink'))
        b.append(f'<text x="{x+8}" y="79" font-size="10" text-anchor="middle"><tspan class="m" font-size="11">τ</tspan> ↓</text>')
    b.append(f'<text x="235" y="120" font-size="9" text-anchor="middle" class="t-muted"><tspan class="m" font-size="10">τ</tspan> high</text>')
    b.append(text(367, 120, '≈ one-hot', 't-muted', 9))
    # soft tokens feed the LLM; an output loss (CE / CW) updates the logits with Adam
    for x, w, label in [(212, 40, 's̃ᵀE'), (268, 34, 'LLM'), (318, 70, 'CE / CW loss')]:
        b.append(f'<rect x="{x}" y="140" width="{w}" height="20" rx="3" class="s f-white"/>')
        cls = 'm' if label == 's̃ᵀE' else ''
        b.append(text(x + w / 2, 154, label, cls, 11 if cls else 9.5))
    b.append(line(253, 150, 266, 150, 's', f'{P}-ink')); b.append(line(303, 150, 316, 150, 's', f'{P}-ink'))
    b.append(f'<path d="M353 162 C 350 184, 240 184, 232 163" class="s-muted dash" marker-end="url(#{P}-muted)"/>')
    b.append(f'<text x="292" y="191" font-size="9" text-anchor="middle" class="t-muted">Adam on <tspan class="m" font-size="11">φ</tspan></text>')
    b.append(text(302, 210, 'final suffix = argmax', 't-muted', 9.5))
    b.append(text(302, 228, '≈33× faster than GCG', 't-blue', 11, weight=600))
    svg(P, 'Two methods. (a) Activation-guided GCG: an adversarial suffix is optimized so that hidden states at every layer and position '
           'have near-zero projection on a fixed refusal direction. (b) Soft-GCG: each suffix position is a Gumbel-Softmax distribution over '
           'the vocabulary that sharpens to nearly one-hot as the temperature is lowered, trained on an output loss and discretized by argmax; '
           'about 33 times faster than GCG.', '\n'.join(b))


# ---------------------------------------------------------------------------
# LASER (arXiv 2604.17224): within a forward pass, each recursion step stores
# coefficients Z_i = X_i Q against one shared basis Q (per site) instead of X_i;
# across training steps, Q is updated by power iteration and checked for fidelity.
def laser():
    P = 'laser'
    b = []
    b.append(text(14, 16, 'within one forward pass', 't-muted', 10, 'start'))
    b.append(text(390, 16, '≈60% less activation memory', 't-red', 10, 'end'))
    cols = [(46, '1'), (124, '2'), (234, 'n')]
    for cx, i in cols:
        b.append(text(cx, 36, f'step {i}', 't-muted', 10))
        b.append(f'<rect x="{cx-28}" y="42" width="56" height="22" rx="2" class="s-muted dash f-white"/>')
        b.append(sub('X', i, cls='m', size=13, x=cx - 2, y=58, extra='style="fill:var(--muted)"'))
        b.append(line(cx, 66, cx, 84, 's', f'{P}-ink', 'style="stroke-width:1"'))
        b.append(text(cx + 5, 79, '·Q', 'm', 11, 'start'))
        b.append(f'<rect x="{cx-7}" y="86" width="14" height="22" rx="2" class="s f-node"/>')
        b.append(sub('Z', i, cls='m', size=12, x=cx - 1, y=122))
    b.append(line(76, 53, 94, 53, 's', f'{P}-ink')); b.append(line(154, 53, 172, 53, 's', f'{P}-ink'))
    b.append(text(188, 57, '⋯', '', 13)); b.append(line(196, 53, 204, 53, 's', f'{P}-ink'))
    # one shared basis per site, used by every step
    b.append('<rect x="318" y="44" width="16" height="70" rx="2" class="s-red" style="fill:rgba(196,85,59,.25)"/>')
    b.append(text(326, 38, 'shared', 't-red', 10)); b.append(text(326, 128, 'basis', 't-red', 10))
    b.append(f'<text x="344" y="84" class="m" font-size="15">Q</text>')
    b.append(f'<text x="344" y="100" font-size="9" class="t-muted">D×k</text>')
    for cx, _ in cols:
        b.append(f'<path d="M{cx+8} 97 C {cx+60} 97, 290 {79}, 316 {79}" class="s-red" style="stroke-width:.8;opacity:.6"/>')
    # across training steps: power iteration + fidelity check
    b.append('<line x1="14" y1="140" x2="390" y2="140" class="s-muted" style="stroke-width:.6"/>')
    b.append(text(14, 158, 'across training steps', 't-muted', 10, 'start'))
    b.append('<rect x="22" y="170" width="44" height="24" rx="3" class="s f-node"/>')
    b.append(sub('Q', 't−1', size=13, x=42, y=187))
    b.append(line(68, 182, 146, 182, 's', f'{P}-ink')); b.append(text(107, 175, 'power iteration', 't-muted', 9))
    b.append('<path d="M190 166 L 228 182 L 190 198 L 152 182 Z" class="s f-white"/>')
    b.append(f'<text x="190" y="186" font-size="11" text-anchor="middle"><tspan class="m" font-size="12">F</tspan><tspan dy="3" font-size="8" class="m">t</tspan><tspan dy="-3"> ≥ </tspan><tspan class="m" font-size="12">ε</tspan></text>')
    b.append(line(230, 182, 296, 182, 's', f'{P}-ink')); b.append(text(262, 175, 'yes', 't-muted', 9))
    b.append('<rect x="298" y="170" width="44" height="24" rx="3" class="s f-node"/>')
    b.append(sub('Q', 't', size=13, x=318, y=187))
    b.append(line(190, 200, 190, 214, 's-muted dash', f'{P}-muted'))
    b.append(text(190, 230, 'no: grow rank; after p misses, SVD reset', 't-muted', 10))
    svg(P, 'Each recursion step stores small coefficients Z_i = X_i Q against one shared low-rank basis Q instead of the full activation X_i. '
           'Across training steps, Q is updated by a power iteration; if fidelity drops below a threshold the rank grows, '
           'and repeated misses trigger an SVD reset.', '\n'.join(b))


# ---------------------------------------------------------------------------
# State Space Attention (Sec. 3.1, Fig. 1): the stream is chunked; the reader attends
# over a bounded accessible set S_t (M retained chunks, w window chunks, the current
# chunk). A learned scorer rescores all residents plus the candidate leaving the
# window and evicts the lowest keep score. Drawn before eviction at step t.
def ssa():
    P = 'ssa'
    b = []
    roles = {0: 'ev', 1: 'ret', 2: 'ev', 3: 'ret', 4: 'ret', 5: 'ev', 6: 'ret', 7: 'ev', 8: 'win', 9: 'cur', 10: 'next', 11: 'next'}
    style = {'ev': 'fill:#d4d3cc;stroke:#b9b6ad', 'ret': 'fill:var(--blue);stroke:var(--blue)',
             'win': 'fill:rgba(59,106,154,.3);stroke:var(--blue)', 'cur': 'fill:#fffdf8;stroke:var(--ink)',
             'next': 'fill:none;stroke:var(--muted);stroke-dasharray:3 2'}
    cx = lambda i: 30 + 26 * i
    for i, r in roles.items():
        b.append(f'<rect x="{cx(i)}" y="24" width="22" height="14" rx="2" style="{style[r]};stroke-width:1.2"/>')
    b.append(text(352, 35, '⋯', 't-muted', 12))
    b.append(f'<text x="{cx(9)+11}" y="16" font-size="10" text-anchor="middle" class="t-muted">step <tspan class="m" font-size="12">t</tspan></text>')
    # accessible set S_t: residents in chunk order, then window, then current
    boxes = {1: 72, 3: 112, 4: 152, 6: 192, 8: 236, 9: 286}
    for i, x in boxes.items():
        b.append(f'<path d="M{cx(i)+11} 39 C {cx(i)+11} 56, {x+17} 56, {x+17} 73" class="s-muted" style="stroke-width:.9"/>')
        b.append(f'<rect x="{x}" y="74" width="34" height="22" rx="2" style="{style[roles[i]]};stroke-width:1.2"/>')
        for k in (1, 2, 3):
            tick = '#fffdf8' if roles[i] == 'ret' else 'var(--muted)'
            b.append(f'<line x1="{x+k*8.5:.1f}" y1="76" x2="{x+k*8.5:.1f}" y2="94" style="stroke:{tick};stroke-width:.6;opacity:.7"/>')
    b.append(sub('𝒮', 't', cls='m', size=17, x=34, y=90))
    def brace(x1, x2, y, label):
        m = (x1 + x2) / 2
        return (f'<path d="M{x1} {y} q 0 5 5 5 H {m-4} q 4 0 4 5 q 0 -5 4 -5 H {x2-5} q 5 0 5 -5" class="s-muted" style="stroke-width:1"/>'
                + text(m, y + 22, label, 't-muted', 10))
    b.append(brace(72, 226, 100, '<tspan class="m" font-size="12">M</tspan> retained'))
    b.append(brace(236, 270, 100, '<tspan class="m" font-size="12">w</tspan> window'))
    b.append(brace(286, 320, 100, 'current'))
    b.append(f'<path d="M72 132 q 0 5 5 5 H 192 q 4 0 4 5 q 0 -5 4 -5 H 315 q 5 0 5 -5" class="s-muted" style="stroke-width:1"/>')
    b.append(f'<text x="196" y="156" font-size="10" text-anchor="middle" class="t-muted">reader sees <tspan class="m" font-size="12">R = (M+w+1)C</tspan> tokens</text>')
    # reader: ordinary softmax attention over all of S_t
    b.append(line(322, 85, 328, 85, 's', f'{P}-ink'))
    b.append('<rect x="330" y="68" width="66" height="34" rx="4" class="s f-white"/>')
    b.append(text(363, 82, 'reader', '', 11)); b.append(text(363, 95, 'softmax attention', 't-muted', 7.5))
    # learned scorer: rescores every resident and the candidate, evicts the lowest
    b.append('<rect x="8" y="178" width="54" height="28" rx="4" class="s-red f-white"/>')
    b.append(text(35, 196, 'scorer', 't-red', 11, weight=600))
    b.append(line(64, 192, 78, 192, 's-red', f'{P}-red'))
    base = 222
    heights = {1: 34, 3: 22, 4: 6, 6: 18, 8: 26}
    for i, h in heights.items():
        x = boxes[i] + 10
        cls = 'f-red' if i != 4 else ''
        st = '' if i != 4 else ' style="fill:#c9c6bd"'
        b.append(f'<rect x="{x}" y="{base-h}" width="14" height="{h}" rx="1.5" class="{cls}"{st}/>')
    b.append(f'<line x1="78" y1="{base}" x2="330" y2="{base}" class="s-muted" style="stroke-width:.8"/>')
    b.append(text(boxes[4] + 17, base + 13, 'evict', 't-muted', 10))
    b.append(text(boxes[8] + 17, base + 13, 'candidate', 't-red', 10))
    b.append(text(boxes[9] + 17, base + 13, 'context', 't-muted', 10))
    b.append(text(84, 180, 'keep scores', 't-red', 10, 'start'))
    svg(P, 'The input is split into chunks. At step t the reader attends with ordinary softmax attention over a bounded set: '
           'M retained chunks, w window chunks, and the current chunk, at most R = (M+w+1)C tokens. A learned scorer gives keep scores '
           'to every retained chunk and to the candidate leaving the window, and the lowest score is evicted.', '\n'.join(b))


# ---------------------------------------------------------------------------
# Mathlib proof graphs (technical report, 2026). Illustrative layout, not real data:
# tree-like communities around hubs, one large shared hub (heavy-tailed degree),
# sparse links between communities, next to the report's headline numbers
# (Tables 1 and 3).
def mathlib():
    import random
    P = 'mathlib'
    rng = random.Random(7)
    colors = ['var(--blue)', 'var(--red)', '#5f8a5a', '#b8893a']
    centers = [(78, 66), (214, 58), (86, 178), (220, 176)]
    nodes, edges = [], []  # nodes: [x, y, community or None]; edges: (i, j)
    def add(x, y, c):
        nodes.append([x, y, c]); return len(nodes) - 1
    hubs = []
    for c, (cx, cy) in enumerate(centers):
        hub = add(cx, cy, c); hubs.append(hub)
        base = rng.uniform(0, 2 * math.pi)
        for k in range(6):  # children of the hub, each with a few leaves: locally tree-like
            a = base + k * 2 * math.pi / 6 + rng.uniform(-0.25, 0.25)
            r1 = rng.uniform(24, 30)
            ch = add(cx + r1 * math.cos(a), cy + r1 * math.sin(a), c); edges.append((hub, ch))
            for _ in range(rng.choice([0, 1, 2, 2, 3])):
                b = a + rng.uniform(-0.6, 0.6); r2 = rng.uniform(13, 19)
                lf = add(nodes[ch][0] + r2 * math.cos(b), nodes[ch][1] + r2 * math.sin(b), c); edges.append((ch, lf))
    core = add(150, 118, None)  # the shared infrastructure hub
    for h in hubs:
        edges.append((core, h))
    for c in range(4):  # a few more declarations from every community cite the shared hub
        members = [i for i, n in enumerate(nodes) if n[2] == c and i not in hubs]
        for i in rng.sample(members, 5):
            edges.append((core, i))
    edges += [(hubs[0], hubs[1]), (hubs[2], hubs[3])]  # sparse links between communities
    deg = [0] * len(nodes)
    for i, j in edges:
        deg[i] += 1; deg[j] += 1
    b = []
    for i, j in edges:
        (x1, y1, c1), (x2, y2, c2) = nodes[i], nodes[j]
        same = c1 is not None and c1 == c2
        style = f'stroke:{colors[c1]};stroke-width:.8;opacity:.55' if same else 'stroke:var(--muted);stroke-width:.6;opacity:.45'
        b.append(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" style="{style}"/>')
    for i, (x, y, c) in enumerate(nodes):
        r = 1.6 + 0.9 * math.sqrt(deg[i])
        fill = 'var(--ink)' if c is None else colors[c]
        b.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r:.1f}" style="fill:{fill};stroke:var(--paper);stroke-width:.8"/>')
    b.append('<text x="150" y="141" font-size="8.5" text-anchor="middle" class="t-muted" '
             'style="paint-order:stroke;stroke:var(--paper);stroke-width:3">shared hub</text>')
    b.append(text(12, 234, 'illustrative layout', 't-muted', 8.5, 'start'))
    # headline numbers from the report
    stats = [('138,333', 'declarations'), ('309,396', 'dependency edges'),
             ('240', 'communities, Q = 0.592'), ('2.37', 'degree-tail exponent')]
    b.append('<line x1="292" y1="20" x2="292" y2="222" class="s-muted" style="stroke-width:.6"/>')
    for k, (v, label) in enumerate(stats):
        y = 44 + k * 50
        b.append(text(302, y, v, '', 15, 'start', 600))
        b.append(text(302, y + 13, label, 't-muted', 8.5, 'start'))
    svg(P, 'Illustrative layout of Mathlib\'s theorem-dependency graph: four tree-like communities grown around hubs, one large shared hub '
           'that all communities cite, and sparse links between communities. Beside it, the report\'s numbers: 138,333 declarations, '
           '309,396 dependency edges, 240 communities with modularity 0.592, and a degree-tail exponent of 2.37.', '\n'.join(b))


for f in (argument, boule, mixer, gcg, laser, ssa, mathlib):
    f()
print('wrote', sorted(os.listdir(OUT)))
