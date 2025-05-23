---
weight: 1
title: "Theme Documentation - Basics"
date: 2020-03-06T21:29:01+08:00
lastmod: 2025-05-20T17:22:36-08:00
draft: false
author: "Dillon/ic3sec"
authorLink: ""
description: "Discover what the Hugo - LoveIt-Lite theme is all about and the core-concepts behind it."
images: []
resources:
- name: "featured-image"
  src: "featured-image.jpg"

tags: ["installation", "configuration"]
categories: ["documentation"]

toc:
  auto: false
---

Discover what the Hugo - **LoveIt-Lite** theme is all about and the core-concepts behind it.

<!--more-->

## Requirements

Thanks to the simplicity of Hugo, [Hugo](https://gohugo.io/) is the only dependency of this theme.

Install [Hugo Extended v0.145.0](https://github.com/gohugoio/hugo/releases/tag/v0.145.0) for your OS (**Windows**, **Linux**, **macOS**).

## Installation

The following steps are here to help you initialize your new website. If you don’t know Hugo at all, we strongly suggest you learn more about it by following this [great documentation for beginners](https://gohugo.io/getting-started/quick-start/).

### Create Your Project

Hugo provides a `new` command to create a new website:

```bash
hugo new site my_website
cd my_website
```

### Install the Theme

The **LoveIt-Lite** theme's repository is: [https://github.com/ic3sec/LoveIt-Lite](https://github.com/ic3sec/LoveIt-Lite).

You can download the [master .zip file](https://github.com/ic3sec/LoveIt-Lite/archive/refs/heads/master.zip) of the theme and extract it in the `themes` directory.

Alternatively, clone this repository to the `themes` directory:

```bash
git clone https://github.com/ic3sec/LoveIt-Lite.git themes/LoveIt-Lite
```

Or, create an empty git repository and make this repository a submodule of your site directory:

```bash
git init
git submodule add https://github.com/ic3sec/LoveIt-Lite.git themes/LoveIt-Lite
```

{{< admonition note "LoveIt-Lite theme's compatibility" >}}

| LoveIt-Lite branch or version | Supported Hugo versions |
|:-------------------------|:-----------------------:|
| master(Unstable)         |         0.145.0         |

{{< /admonition >}}

### Basic Configuration {#basic-configuration}

The following is a basic configuration for the LoveIt-Lite theme:

```toml
baseURL = "http://example.org/"

# Change the default theme to be use when building the site with Hugo
theme = "LoveIt-Lite"

# website title
title = "My New Hugo Site"

# language code ["en"]
languageCode = "en"
# language name ["English"]
languageName = "English"

# Menu config
[menu]
  [[menu.main]]
    weight = 1
    identifier = "posts"
    # you can add extra information before the name (HTML format is supported), such as icons
    pre = ""
    # you can add extra information after the name (HTML format is supported), such as icons
    post = ""
    name = "Posts"
    url = "/posts/"
    # title will be shown when you hover on this menu link
    title = ""
  [[menu.main]]
    weight = 2
    identifier = "tags"
    pre = ""
    post = ""
    name = "Tags"
    url = "/tags/"
    title = ""
  [[menu.main]]
    weight = 3
    identifier = "categories"
    pre = ""
    post = ""
    name = "Categories"
    url = "/categories/"
    title = ""

# Markup related configuration in Hugo
[markup]
  # Syntax Highlighting (https://gohugo.io/content-management/syntax-highlighting)
  [markup.highlight]
    # false is a necessary configuration (https://github.com/dillonzq/LoveIt-Lite/issues/158)
    noClasses = false
```

{{< admonition >}}
When building the website, you can set a theme by using `--theme` option. However, we suggest you modify the configuration file (**hugo.toml**) and set the theme as the default.
{{< /admonition >}}

### Create Your First Post

Here is the way to create your first post:

```bash
hugo new posts/first_post.md
```

Feel free to edit the post file by adding some sample content and replacing the title value in the beginning of the file.

{{< admonition >}}
By default all posts and pages are created as a draft. If you want to render these pages, remove the property `draft: true` from the metadata, set the property `draft: false` or add `-D`/`--buildDrafts` parameter to `hugo` command.
{{< /admonition >}}

### Launching the Website Locally

Launch by using the following command:

```bash
hugo serve
```

Go to `http://localhost:1313`.

![Basic configuration preview](basic-configuration-preview.png "Basic configuration preview")

{{< admonition tip >}}
When you run `hugo serve`, when the contents of the files change, the page automatically refreshes with the changes.
{{< /admonition >}}

{{< admonition >}}
Since the theme use `.Scratch` in Hugo to implement some features,
it is highly recommended that you add `--disableFastRender` parameter to `hugo server` command for the live preview of the page you are editing.

```bash
hugo serve --disableFastRender
```

{{< /admonition >}}

### Build the Website

When your site is ready to deploy, run the following command:

```bash
hugo
```

A `public` folder will be generated, containing all static content and assets for your website. It can now be deployed on any web server.

{{< admonition tip >}}
The website can be automatically published and hosted with [Netlify](https://www.netlify.com/) (Read more about [Automated HUGO deployments with Netlify](https://www.netlify.com/blog/2015/07/30/hosting-hugo-on-netlifyinsanely-fast-deploys/)).
Alternatively, you can use [AWS Amplify](https://gohugo.io/hosting-and-deployment/hosting-on-aws-amplify/), [Github pages](https://gohugo.io/hosting-and-deployment/hosting-on-github/), [Render](https://gohugo.io/hosting-and-deployment/hosting-on-render/) and more...
{{< /admonition >}}

## Configuration

### Site Configuration {#site-configuration}

In addition to [Hugo global configuration](https://gohugo.io/overview/configuration/) and [menu configuration](#basic-configuration), **LoveIt-Lite** lets you define the following parameters in your site configuration (here is a `hugo.toml`, whose values are default).

Please open the code block below to view the complete sample configuration:

```toml
baseURL = "https://example.com"

# theme
theme = "LoveIt-Lite"
# themes directory
themesDir = "../.."

# website title
title = "LoveIt-Lite"

# determines default content language ["en"]
defaultContentLanguage = "en"
# language code ["en"]
languageCode = "en"
# language name ["English"]
languageName = "English"

# copyright description used only for seo schema
copyright = ""

# whether to use robots.txt
enableRobotsTXT = true
# whether to use git commit log
enableGitInfo = true
# whether to use emoji code
enableEmoji = true

# ignore some build errors
ignoreErrors = ["error-remote-getjson", "error-missing-instagram-accesstoken"]

# Pagination config
[pagination]
  disableAliases = false
  pagerSize = 10
  path = "page"

# Menu config
[menu]
  [[menu.main]]
    weight = 1
    identifier = "posts"
    # you can add extra information before the name (HTML format is supported), such as icons
    pre = ""
    # you can add extra information after the name (HTML format is supported), such as icons
    post = ""
    name = "Posts"
    url = "/posts/"
    # title will be shown when you hover on this menu link
    title = ""
  [[menu.main]]
    weight = 2
    identifier = "tags"
    pre = ""
    post = ""
    name = "Tags"
    url = "/tags/"
    title = ""
  [[menu.main]]
    weight = 3
    identifier = "categories"
    pre = ""
    post = ""
    name = "Categories"
    url = "/categories/"
    title = ""

[params]
  # site default theme ["auto", "light", "dark"]
  defaultTheme = "auto"
  # public git repo url only then enableGitInfo is true
  gitRepo = "https://github.com/ic3sec/LoveIt-Lite"
  # which hash function used for SRI, when empty, no SRI is used
  # ["sha256", "sha384", "sha512", "md5"]
  fingerprint = ""
  # date format
  dateFormat = "2006-01-02"
  # website title for Open Graph and Twitter Cards
  title = "LoveIt-Lite"
  # website description for RSS, SEO, Open Graph and Twitter Cards
  description = "Hugo theme - LoveIt-Lite"
  # website images for Open Graph and Twitter Cards
  images = ["/logo.png"]

  # Author config
  [params.author]
    name = "xxxx"
    email = ""
    link = ""

  # Header config
  [params.header]
    # desktop header mode ["fixed", "normal", "auto"]
    desktopMode = "fixed"
    # mobile header mode ["fixed", "normal", "auto"]
    mobileMode = "auto"
    # Header title config
    [params.header.title]
      # URL of the LOGO
      logo = ""
      # title name
      name = "LoveIt-Lite"
      # you can add extra information before the name (HTML format is supported)
      pre = ""
      # you can add extra information after the name (HTML format is supported)
      post = ""
      # whether to use typeit animation for title name
      typeit = false

  # Footer config
  [params.footer]
    enable = true
    # Custom content (HTML format is supported)
    custom = ""
    # whether to show Hugo and theme info
    hugo = true
    # whether to show copyright info
    copyright = true
    # whether to show the author
    author = true
    # site creation time
    since = 2025
    # ICP info only in China (HTML format is supported)
    icp = ""
    # license info (HTML format is supported)
    license= '<a rel="license external nofollow noopener noreffer" href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">CC BY-NC 4.0</a>'

  # Section (all posts) page config
  [params.section]
    # special amount of posts in each section page
    paginate = 20
    # date format (month and day)
    dateFormat = "01-02"
    # amount of RSS pages
    rss = 10

  # List (category or tag) page config
  [params.list]
    # special amount of posts in each list page
    paginate = 20
    # date format (month and day)
    dateFormat = "01-02"
    # amount of RSS pages
    rss = 10

  # App icon config
  [params.app]
    # optional site title override for the app when added to an iOS home screen or Android launcher
    title = "LoveIt-Lite"
    # whether to omit favicon resource links
    noFavicon = false
    # modern SVG favicon to use in place of older style .png and .ico files
    svgFavicon = ""
    # Android browser theme color
    themeColor = "#ffffff"
    # Safari mask icon color
    iconColor = "#5bbad5"
    # Windows v8-11 tile color
    tileColor = "#da532c"

  # Search config
  [params.search]
    enable = true
    # type of search engine ["lunr"]
    type = "lunr"
    # max index length of the chunked content
    contentLength = 4000
    # placeholder of the search bar
    placeholder = ""
    # max number of results length
    maxResultLength = 10
    # snippet length of the result
    snippetLength = 30
    # HTML tag name of the highlight part in results
    highlightTag = "em"
    # whether to use the absolute URL based on the baseURL in search index
    absoluteURL = false

  # Home page config
  [params.home]
    # amount of RSS pages
    rss = 10
    # Home page profile
    [params.home.profile]
      enable = true
      # URL of avatar shown in home page
      avatarURL = "/images/avatar.png"
      # title shown in home page (HTML format is supported)
      title = ""
      # subtitle shown in home page (HTML format is supported)
      subtitle = "A Clean, Elegant but Advanced Hugo Theme"
      # whether to use typeit animation for subtitle
      typeit = true
      # whether to show social links
      social = true
      # disclaimer (HTML format is supported)
      disclaimer = ""
    # Home page posts
    [params.home.posts]
      enable = true
      # special amount of posts in each home posts page
      paginate = 6
  # Social config in home page
  [params.social]
    GitHub = ""
    Linkedin = ""
    X = ""
    Instagram = ""
    Facebook = ""
    Telegram = ""
    Medium = ""
    Gitlab = ""
    Youtubelegacy = ""
    Youtubecustom = ""
    Youtubechannel = ""
    Reddit = ""
    Codepen = ""
    Bitbucket = ""
    Stackoverflow = ""
    Paypal = ""
    Hackernews = ""
    Kickstarter = ""
    Patreon = ""
    Twitch = ""
    Whatsapp = ""
    Googlescholar = ""
    Researchgate = ""
    Mastodon = ""
    Gitea = ""
    Discord = ""
    DiscordInvite = ""
    HackTheBox = ""
    RootMe= ""
    TikTok = ""
    TryHackMe = ""
    Codeberg = ""
    HuggingFace = ""
    Threads = ""
    Email = ""
    RSS = ""

  # Page global config
  [params.page]
    # whether to hide a page from home page
    hiddenFromHomePage = false
    # whether to hide a page from search results
    hiddenFromSearch = false
    # whether to enable the ruby extended syntax
    ruby = true
    # whether to enable the fraction extended syntax
    fraction = true
    # whether to show link to Raw Markdown content of the content
    linkToMarkdown = true
    # whether to show the full text content in RSS
    rssFullText = false
    # Table of the contents config
    [params.page.toc]
      # whether to enable the table of the contents
      enable = true
      # whether to keep the static table of the contents in front of the post
      keepStatic = false
      # whether to make the table of the contents in the sidebar automatically collapsed
      auto = true
    # Code config
    [params.page.code]
      # whether to show the copy button of the code block
      copy = true
      # the maximum number of lines of displayed code by default
      maxShownLines = 50
      [params.page.code.render]
        goat = true
        mermaid = true
    # KaTeX mathematical formulas config (KaTeX https://katex.org/)
    [params.page.math]
      enable = true
      # default inline delimiter is $ ... $ and \( ... \)
      inlineLeftDelimiter = ""
      inlineRightDelimiter = ""
      # default block delimiter is $$ ... $$, \[ ... \], \begin{equation} ... \end{equation} and some other functions
      blockLeftDelimiter = ""
      blockRightDelimiter = ""
      # KaTeX extension copy_tex
      copyTex = true
      # KaTeX extension mhchem
      mhchem = true
    # Social share links in post page
    [params.page.share]
      enable = true
      X = true
      Threads = true
      Facebook = true
      Linkedin = false
      Whatsapp = false
      HackerNews = true
      Reddit = true
      Telegram = true
    # Third-party library config
    [params.page.library]
      [params.page.library.css]
        # someCSS = "some.css"
        # located in "assets/"
      [params.page.library.js]
        # someJavascript = "some.js"
        # located in "assets/"
    # Page SEO config
    [params.page.seo]
      # image URL
      images = []
      # Publisher info
      [params.page.seo.publisher]
        name = "xxxx"
        logoUrl = "/images/avatar.png"

  # TypeIt config
  [params.typeit]
    # typing speed between each step (measured in milliseconds)
    speed = 100
    # blinking speed of the cursor (measured in milliseconds)
    cursorSpeed = 1000
    # character used for the cursor (HTML format is supported)
    cursorChar = "|"
    # cursor duration after typing finishing (measured in milliseconds, "-1" means unlimited)
    duration = -1

  # Site verification code for Google/Bing/Pinterest
  [params.verification]
    google = ""
    bing = ""
    pinterest = ""

  # Site SEO config
  [params.seo]
    # image URL
    image = "/images/Apple-Devices-Preview.png"
    # thumbnail URL
    thumbnailUrl = "/images/screenshot.png"

  # Analytics config
  [params.analytics]
    # Google Analytics
    [params.analytics.google]
      id = ""
      # whether to respect the browser’s “do not track” setting
      respectDoNotTrack = true
    # Fathom Analytics
    [params.analytics.fathom]
      id = ""
      # server url for your tracker if you're self hosting
      server = ""
    # Plausible Analytics
    [params.analytics.plausible]
      dataDomain = ""
      
  # Cookie consent config
  [params.cookieconsent]
    enable = true
    # text strings used for Cookie consent banner
    [params.cookieconsent.content]
      message = ""
      dismiss = ""
      link = ""

  # Compatibility config
  [params.compatibility]
    # whether to use Polyfill.io to be compatible with older browsers
    polyfill = false
    # whether to use object-fit-images to be compatible with older browsers
    objectFit = false

# Markup related configuration in Hugo
[markup]
  # Syntax Highlighting (https://gohugo.io/content-management/syntax-highlighting)
  [markup.highlight]
    anchorLineNos = false
    codeFences = true
    guessSyntax = false
    lineNos = false
    lineNumbersInTable = true
    noClasses = true
  # Goldmark is from Hugo 0.60 the default library used for Markdown
  [markup.goldmark]
    [markup.goldmark.extensions]
      definitionList = true
      footnote = true
      linkify = true
      strikethrough = true
      table = true
      taskList = true
      typographer = true
    [markup.goldmark.renderer]
      # whether to use HTML tags directly in the document
      unsafe = true
  # Table Of Contents settings
  [markup.tableOfContents]
    startLevel = 2
    endLevel = 6

# Sitemap config
[sitemap]
  changefreq = "weekly"
  filename = "sitemap.xml"
  priority = 0.5

# Permalinks config (https://gohugo.io/content-management/urls/#permalinks)
[permalinks]
  # posts = ":year/:month/:filename"
  posts = ":filename"

# Privacy config (https://gohugo.io/configuration/privacy/)
[privacy]
  # privacy of the Google Analytics (can also be configured in params.analytics.google)
  [privacy.googleAnalytics]
    # ...
  [privacy.twitter]
    # ...
  [privacy.youtube]
    # ...

# Options to make output .md files
[mediaTypes]
  [mediaTypes."text/plain"]
    suffixes = ["md"]

# Options to make output .md files
[outputFormats.MarkDown]
  mediaType = "text/plain"
  isPlainText = true
  isHTML = false

# Options to make hugo output files
[outputs]
  home = ["HTML", "RSS", "JSON"]
  page = ["HTML", "MarkDown"]
  section = ["HTML", "RSS"]
  taxonomy = ["HTML", "RSS"]

# Multilingual
[languages]
  [languages.en]
    weight = 1
    languageCode = "en"
    languageName = "English"
    hasCJKLanguage = false
    copyright = "This work is licensed under a Creative Commons Attribution-NonCommercial 4.0 International License."
    [languages.en.menu]
      [[languages.en.menu.main]]
        weight = 1
        identifier = "posts"
        pre = ""
        post = ""
        name = "Posts"
        url = "/posts/"
        title = ""
      [[languages.en.menu.main]]
        weight = 2
        identifier = "tags"
        pre = ""
        post = ""
        name = "Tags"
        url = "/tags/"
        title = ""
      [[languages.en.menu.main]]
        weight = 3
        identifier = "categories"
        pre = ""
        post = ""
        name = "Categories"
        url = "/categories/"
        title = ""
      [[languages.en.menu.main]]
        weight = 4
        identifier = "documentation"
        pre = ""
        post = ""
        name = "Docs"
        url = "/categories/documentation/"
        title = ""
      [[languages.en.menu.main]]
        weight = 5
        identifier = "about"
        pre = ""
        post = ""
        name = "About"
        url = "/about/"
        title = ""
      [[languages.en.menu.main]]
        weight = 6
        identifier = "github"
        pre = "<svg class='icon github icon-github' aria-hidden='true'><use href='#icon-github'></use></svg>"
        post = ""
        name = ""
        url = "https://github.com/ic3sec/LoveIt-Lite"
        title = "GitHub"
    [languages.en.params]
      [languages.en.params.search]
        enable = true
        type = "lunr"
        contentLength = 4000
        placeholder = ""
        maxResultLength = 10
        snippetLength = 30
        highlightTag = "em"
        absoluteURL = false
      [languages.en.params.home]
        rss = 10
        [languages.en.params.home.profile]
          enable = true
          avatarURL = "/images/avatar.png"
          title = ""
          subtitle = "A Clean, Elegant but Advanced Hugo Theme"
          typeit = true
          social = true
          disclaimer = ""
      [languages.en.params.social]
        GitHub = "xxxx"
        Youtubelegacy = "xxxx"
        RSS = true
```

{{< admonition >}}
Note that some of these parameters are explained in details in other sections of this documentation.
{{< /admonition >}}

{{< admonition note "Hugo environments" >}}
Default environments are `development` with `hugo serve` and `production` with `hugo`.

Due to limitations in the local `development` environment,
the **fingerprint** will not be enabled in the `development` environment.

You could enable these features with `hugo serve -e production`.
{{< /admonition >}}

{{< admonition tip "Tips about social Configuration" >}}
{{< version 0.2.0 >}}

You can directly set your ID to get a default social link and its icon:

```toml
[params.social]
  Mastodon = "@xxxx"
```

The social link generated is `https://mastodon.technology/@xxxx`.

Or You can set more options through a dict:

```toml
[params.social]
  [params.social.Mastodon]
    # weight when arranging icons (the greater the weight, the later the icon is positioned)
    weight = 0
    # your social ID
    id = "@xxxx"
    # prefix of your social link
    prefix = "https://mastodon.social/"
    # content hovering on the icon
    title = "Mastodon"
```

The default data of all supported social links is located in `themes/LoveIt-Lite/assets/data/social.yaml`,
which is you can refer to.
{{< /admonition >}}

![Complete configuration preview](complete-configuration-preview.png "Complete configuration preview")

### Favicons, Browserconfig, Manifest

It is recommended to put your own favicons:

* apple-touch-icon.png (180x180)
* favicon-32x32.png (32x32)
* favicon-16x16.png (16x16)
* mstile-150x150.png (150x150)
* android-chrome-192x192.png (192x192)
* android-chrome-512x512.png (512x512)

into `/static`. They’re easily created via [https://realfavicongenerator.net/](https://realfavicongenerator.net/).

Customize `browserconfig.xml` and `site.webmanifest` to set theme-color and background-color.

### Style Customization {#style-customization}

{{< version 0.2.8 changed >}}

{{< admonition note "Hugo extended version is necessary" >}}
Since Hugo need to processes SCSS to CSS,
Hugo **extended** version is necessary for the style customization.
{{< /admonition >}}

**LoveIt-Lite** theme has been built to be as configurable as possible by defining custom `.scss` style files.

The directory including the custom `.scss` style files is `assets/css` relative to **your project root directory**.

In `assets/css/_override.scss`, you can override the variables in `themes/LoveIt-Lite/assets/css/_variables.scss` to customize the style.

Here is a example:

```scss
@import url('https://fonts.googleapis.com/css?family=Fira+Mono:400,700&display=swap&subset=latin-ext');
$code-font-family: Fira Mono, Source Code Pro, Menlo, Consolas, Monaco, monospace;
```

In `assets/css/_custom.scss`, you can add some css style code to customize the style.

## Search

{{< version 0.2.0 >}}

Based on [Lunr.js](https://lunrjs.com/), searching is supported in **LoveIt-Lite** theme.

### Output Configuration

In order to generate `index.json` for searching, add `JSON` output file type to the `home` of the `outputs` part in your [site configuration](#site-configuration).

```toml
[outputs]
  home = ["HTML", "RSS", "JSON"]
```

### Search Configuration

Based on `index.json` generated by Hugo, you could activate searching.

Here is the search configuration in your [site configuration](#site-configuration):

```toml
[params.search]
  enable = true
  # type of search engine ["lunr"]
  type = "lunr"
  # max index length of the chunked content
  contentLength = 4000
  # placeholder of the search bar
  placeholder = ""
  # {{< version 0.2.1 >}} max number of results length
  maxResultLength = 10
  # {{< version 0.2.3 >}} snippet length of the result
  snippetLength = 30
  # {{< version 0.2.1 >}} HTML tag name of the highlight part in results
  highlightTag = "em"
  # {{< version 0.2.4 >}} whether to use the absolute URL based on the baseURL in search index
  absoluteURL = false
```

{{< admonition note "How to choose search engine?" >}}
The following is a comparison of two search engines:

* `lunr`: simple, no need to synchronize `index.json`, no limit for `contentLength`,
  but high bandwidth and low performance

{{< version 0.2.3 >}} The content of the post is separated by `h2` and `h3` HTML tag to improve query performance and basically implement full-text search.
`contentLength` is used to limit the max index length of the part starting with `h2` and `h3` HTML tag.
{{< /admonition >}}