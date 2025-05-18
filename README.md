# LoveIt-Lite Theme | Hugo

**LoveIt-Lite** is a fork of the [LoveIt Theme](https://github.com/dillonzq/LoveIt) with a reduced feature set and some style changes.

LoveIt-Lite is made to work with [Hugo Extended v0.145.0](https://github.com/gohugoio/hugo/releases/tag/v0.145.0) and will *not* be maintained for future versions unless required.

## Why choose LoveIt-Lite

Compared to the original LoveIt theme, the following changes have been made:

* **Added** collapsing Table of Contents based on scroll location
* **Added** colored html headings (with light/dark mode and exclude options)
* **Added** Firefox FOUC workaround fix (prevents icons loading incorrectly)
* **Added** ToC highlighting for last element when page bottom is reached
* **Reduced** miscellaneous page/text animations (most default animations removed, e.g. page titles)
* **Reduced** social link/share options (can be added back, but associated icons will need to be added manually)
* **Replaced** FontAwesome library with SVG icons and custom icon partial
* **Replaced** SimpleIcons library with SVG icons and custom icon partial
* **Replaced** header-mark ::before text with linked header text
* **Removed** all comment system support
* **Removed** Algolia search support
* **Removed** Gravatar support
* **Removed** i18n configs and lunr language/segmentit
* **Removed** Lightbox support
* **Removed** Mapbox support
* **Removed** person shortcode

LoveIt-Lite is meant to be as lightweight and secure as possible with all dynamic content generation options removed.

Some small style changes have been made including **colored headings** and **collapsing Table of Contents**.

Unfortunately, LoveIt-Lite will only have documentation and functionality updated in English, as it is intended primarily for personal use - apologies for any inconvenice. I generally recommend the original [LoveIt theme](https://github.com/dillonzq/LoveIt) unless LoveIt-Lite fits your specific use case.

## Compatibility

| LoveIt branch or version | Supported Hugo versions |
|:-------------------------|:-----------------------:|
| master(Stable)           |        ≥ 0.145.0        |

## License

LoveIt-Lite is licensed under the **MIT** license. Check the [LICENSE file](https://github.com/ic3sec/LoveIt-Lite/blob/master/LICENSE) for details.