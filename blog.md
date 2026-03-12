---
layout: page
title: Blog
permalink: /blog/
---

<ul class="post-list">
  <li>
    <a href="https://www.lesswrong.com/posts/xZA9cXkiRhnATpifZ/cs-2881r-week-3-adversarial-robustness-jailbreaks-prompt" class="post-title" target="_blank">Adversarial Robustness & Jailbreaks (AI Safety Class)</a>
    <span><span class="post-meta-tag">LessWrong</span></span>
  </li>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url | relative_url }}" class="post-title">{{ post.title }}</a>
      <span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
    </li>
  {% endfor %}
</ul>
