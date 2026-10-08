# Writes search.json into the built site after every build, for the Cmd/Ctrl+K search
# (assets/js/search.js): the main text of each rendered page and post, plus one entry per
# paper and project from _data so results can link straight to them.
require 'cgi'
require 'json'

Jekyll::Hooks.register :site, :post_write do |site|
  plain = lambda do |html|
    main = html.to_s[%r{<main[^>]*>(.*)</main>}m, 1].to_s
    main = main.gsub(%r{<(script|style|svg|button)\b.*?</\1>}m, ' ').gsub(%r{<div class="pub-links">.*?</div>}m, ' ').gsub(/<[^>]+>/, ' ')
    CGI.unescapeHTML(main).gsub(/\s+/, ' ').strip
  end
  pages = site.pages.select { |p| p.output_ext == '.html' && p.data['title'] && !p.data['robots'].to_s.include?('noindex') }
  entries = (pages + site.posts.docs).map do |d|
    { title: d.data['title'], url: d.url, type: d.is_a?(Jekyll::Document) ? 'Post' : 'Page', text: plain.call(d.output)[0, 8000] }
  end
  entries += site.data['papers'].map do |p|
    { title: p['title'], url: "/research/#paper-#{p['id']}", type: 'Paper', text: [p['authors'], p['venue']].join(' · ') }
  end
  entries += site.data['projects'].map do |p|
    { title: p['title'], url: "/projects/##{p['id']}", type: 'Project', text: [p['tags'].join(', '), p['description']].join(' · ') }
  end
  File.write(File.join(site.dest, 'search.json'), JSON.generate(entries))
end
