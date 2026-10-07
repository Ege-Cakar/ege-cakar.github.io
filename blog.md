---
layout: page
title: Blog
permalink: /blog/
---

{% comment %} Merge site posts and _data/external_posts.yml, newest first, via "YYYYMMDD|kind|index" sort keys. {% endcomment %}
{% assign keys = "" | split: "" %}
{% for post in site.posts %}{% assign k = post.date | date: "%Y%m%d" | append: "|p|" | append: forloop.index0 %}{% assign keys = keys | push: k %}{% endfor %}
{% for e in site.data.external_posts %}{% assign k = e.date | date: "%Y%m%d" | append: "|e|" | append: forloop.index0 %}{% assign keys = keys | push: k %}{% endfor %}
{% assign keys = keys | sort | reverse %}
<ul class="post-list">
  {% for k in keys %}{% assign parts = k | split: "|" %}{% assign i = parts[2] | plus: 0 %}
  {% if parts[1] == "p" %}{% assign post = site.posts[i] %}
    <li>
      <a href="{{ post.url | relative_url }}" class="post-title">{{ post.title }}</a>
      <span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
    </li>
  {% else %}{% assign e = site.data.external_posts[i] %}
    <li>
      <a href="{{ e.url }}" class="post-title" target="_blank" rel="noopener">{{ e.title }}</a>
      <span><span class="post-meta-tag">{{ e.source }}</span> <span class="post-date">{{ e.date | date: "%b %-d, %Y" }}</span></span>
    </li>
  {% endif %}{% endfor %}
</ul>
