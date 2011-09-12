desc "Partially compile index.html into a theme layout. Doesn't yank out content for layout."
task :compile_theme do
  content = File.read File.join('public', 'index.html')

  content.gsub! %r{<link .*href="(?<href>.*)".*>}, "{{ '\\k<href>' | asset_url | stylesheet_tag }}"
  content.gsub! %r{<script .*src="(?<src>.*)".*>}, "{{ '\\k<src>' | asset_url | script_tag }}"
  content.gsub! '</head>', "\n  {{ content_for_header }}\n</head>"

  content.gsub! %r{&copy; \d+}, '&copy; {{ "now" | date: "%Y" }}'

  write_theme content
end

desc 'Copy over js (excluding less.js), css, and png assets into the theme.'
task :copy_assets do
  assets = Dir.glob('public/*.{js,css,png}') - [ 'public/less.js' ]

  FileUtils.cp assets, File.join('theme', 'assets')
end

desc 'Update asset paths in css to use liquid template.'
task :update_css_asset_paths do
  styles_path = File.join('theme', 'assets', 'styles.css')

  if File.exists? styles_path
    content = File.read styles_path

    content.gsub! %r{url\(['"](?<href>[^'"]*)['"]\)}, "url({{ '\\k<href>' | asset_url }})"

    File.open styles_path, 'w' do |style|
      style.write content
    end

    FileUtils.mv styles_path, "#{ styles_path }.liquid"
  end
end

def write_theme(content)
  File.open(File.join('theme', 'layout', 'theme.liquid'), 'w') do |theme|
    theme.write content
  end
end

task :default => [ :compile_theme, :copy_assets, :update_css_asset_paths ]
