# Project Plan: Make Theming More Generic

## Addendum: Deployment (GitHub Pages / SPA)
- [x] Configure SPA fallback by copying build/index.html to build/404.html in postbuild
- [x] Deploy to standard gh-pages branch and point GitHub Pages to it
- [ ] Optional: Switch homepage back to custom domain (egecakar.com) after DNS/CNAME verified
- [ ] Optional: Add CI workflow to run deploy on push to main

## Addendum: Page Transitions & Depth Effects
- [x] Page-to-page transition animation:
  - [x] Implement a route transition wrapper keyed by `location` to animate on navigation
  - [x] Apply smooth fade + slight translateY; optional gradient mask overlay during enter/exit
  - [x] Use `theme.motion.duration.normal|slow` and `theme.motion.easing.emphasized` for enter/exit
  - [x] Respect `prefers-reduced-motion` (disable or shorten animations)
- [x] Depth micro-interactions:
  - [x] Cards hover: subtle lift with `transform: translateY(-1px to -2px)` and medium box-shadow
  - [x] Buttons/links hover: slight lift and shadow; keep focus ring visible and accessible
  - [x] Social buttons: same pattern, maintain border color change for affordance
- [ ] Testing:
  - [ ] Verify transitions on all routes (Home, Projects, Research, Resume, About, Contact) on mobile and desktop
  - [ ] Check performance (opacity/transform only; no layout thrash)
  - [ ] Ensure reduced-motion setting disables animations appropriately

## Addendum: Content Updates
- [x] Home hero title: change "Welcome" to "Welcome!"
- [x] Update current research focus on Research and Home pages (synthetic reasoning ablation studies)
- [x] Remove current research focus from Home page hero card
- [x] Research page RL text: remove "sustainable development strategies"; add robotics applications interest
- [x] Resume page: rename "Detailed CV" section to "PDF CV"
- [x] Add "View in Google Docs" button linking to the document
- [x] Add a subtle, non-intrusive banner linking to LessWrong post on homepage/site (https://www.lesswrong.com/posts/xZA9cXkiRhnATpifZ/cs-2881r-week-3-adversarial-robustness-jailbreaks-prompt)
- [x] Update coursework entries to include class numbers and instructors in the format: "Title (NUMBER) by Instructor" (e.g., "Optimal Transport for ML (COMPSCI 2840) by David Alvarez-Melis")
- [ ] Resume content refresh based on latest resume:
  - [ ] Contact header: Cambridge, MA 02138 • ecakar@college.harvard.edu • 857-757-9725 • Website: egecakar.com • GitHub: https://github.com/Ege-Cakar
  - [ ] Education: Harvard AB joint Stat+Phys, pursuing SM in CS, GPA 3.91/4.0, updated coursework and John Harvard Scholar (2023–2024)
  - [ ] Relevant Experience: Kempner/Pehlevan Lab (KRANIUM/KURE), Cambridge-CHIA Kristensson Lab (IAAI-26 submission), Harvard CA (QM1), HCS AI Group leadership
  - [ ] Technical Skills & Projects: update stacks and projects (Eco Civilization MDP, Policivilization MDP, FocusCaption, BUTLER, Open Source)
- [ ] Validate formatting and consistency across devices/breakpoints
- [ ] Proofread for clarity and typos

## Notes for Implementation
- Keep changes minimal and easily reversible (no new dependencies)
- Use styled-components for transitions; no intrusive rewrites
- Consider a dedicated `RouteTransition` wrapper around `<Routes>` or page content container to control enter/exit animations

## Overview
Minimize and neutralize the website’s visual theming to look more generic and broadly appealing with minimal, low-risk changes. Focus on borders, accent usage, radii, and subtle hover/focus states while keeping layout and content identical.

## Features & Requirements
- [x] Neutral palette adjustments (light, subtle borders; near-black text; toned-down accents)
- [x] Softer avatar/profile borders (reduce thickness, use neutral color from theme)
- [x] Normalize radii to standard values (6–8px) across interactive elements and cards
- [x] Preserve accessibility (visible focus states, adequate contrast)
- [x] Keep layout, spacing, and content unchanged
- [x] Avoid new dependencies and keep changes easily reversible
- [x] Smooth transitions across the site (200–300ms, standard easing), with prefers-reduced-motion support

## Technical Architecture
- [ ] Technology stack decisions
- [ ] Database design (if applicable)
- [ ] API design (if applicable)
- [ ] File structure setup

Notes:
- Uses styled-components with a centralized theme in `src/styles/theme.js` and global resets in `src/styles/GlobalStyle.js`.
- Components reference theme tokens extensively; aim to modify tokens first, then adjust component-level exceptions where necessary (e.g., hardcoded border thickness).
- Likely touched files: `src/styles/theme.js`, `src/styles/GlobalStyle.js`, `src/components/UIComponents.js`, `src/components/Header.js`, `src/components/Navigation.js`, `src/pages/About.js`, `src/components/Footer.js`.

## Implementation Checklist
### Phase 1: Foundation
- [ ] Set up project structure
- [ ] Configure dependencies
- [ ] Create base files

Implementation notes for this project:
- Structure and dependencies already exist; this step serves as verification.
- Confirm presence of theme tokens used across components.

### Phase 2: Core Features
- [x] Update theme tokens to neutral palette in `src/styles/theme.js`
      - Border: change from strong black to a light gray (e.g., #e5e7eb or #d1d5db)
      - Text: use near-black for readable contrast (e.g., #111827)
      - Accent alias (e.g., `flame`): remap to a neutral or text-aligned value to reduce heavy accents
      - Ensure gray scale tokens support subtle hover backgrounds
- [x] Reduce thick profile/avatar borders (e.g., from 4px to 2px) and use theme border color
- [x] Normalize border-radius usage to 6–8px in buttons, links, cards, and social buttons
- [x] Keep transitions and hover fills subtle (retain focus rings and visible hover differentiation)
- [x] Introduce motion tokens in theme (durations, easing)
- [x] Apply smooth transitions to links, buttons, nav links, cards, social buttons, and form inputs/focus states
- [x] Add prefers-reduced-motion media query to reduce/disable non-essential animation

### Phase 3: Testing & Polish
- [ ] Unit tests
- [ ] Integration tests
- [ ] Documentation
- [ ] Final review
- [ ] Verify reduced motion behavior (system setting + browser devtools)
- [ ] Performance sanity check (limit to opacity/transform/background-color; no jank)
- [ ] Basic cross-browser check (Chrome, Safari, Firefox)

Testing notes for this project:
- Manual visual QA on Home, Projects, Research, Resume, About, Contact pages
- Verify focus visibility (keyboard navigation), hover states, and contrast ratios
- Check mobile breakpoints (<= 768px) for any regressions

## Files to Create
- [x] plan.md - Work plan and progress tracking for minimal, generic theming changes

## Potential Challenges
- Over-neutralization reducing affordance clarity: Use visible focus outlines and maintain slight hover background contrast to preserve interactivity cues.
- Contrast compliance risks if text/border colors are too light: Use near-black text and ensure `:focus` outlines remain visible with sufficient contrast against backgrounds.