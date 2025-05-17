"use strict";

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Util = /*#__PURE__*/function () {
  function Util() {
    _classCallCheck(this, Util);
  }
  return _createClass(Util, null, [{
    key: "forEach",
    value: function forEach(elements, handler) {
      elements = elements || [];
      for (var i = 0; i < elements.length; i++) handler(elements[i]);
    }
  }, {
    key: "getScrollTop",
    value: function getScrollTop() {
      return document.documentElement && document.documentElement.scrollTop || document.body.scrollTop;
    }
  }, {
    key: "isMobile",
    value: function isMobile() {
      return window.matchMedia('only screen and (max-width: 680px)').matches;
    }
  }, {
    key: "isTocStatic",
    value: function isTocStatic() {
      return window.matchMedia('only screen and (max-width: 960px)').matches;
    }
  }, {
    key: "animateCSS",
    value: function animateCSS(element, animation, reserved, callback) {
      var _element$classList;
      if (!Array.isArray(animation)) animation = [animation];
      (_element$classList = element.classList).add.apply(_element$classList, ['animate__animated'].concat(_toConsumableArray(animation)));
      var _handler = function handler() {
        var _element$classList2;
        (_element$classList2 = element.classList).remove.apply(_element$classList2, ['animate__animated'].concat(_toConsumableArray(animation)));
        element.removeEventListener('animationend', _handler);
        if (typeof callback === 'function') callback();
      };
      if (!reserved) element.addEventListener('animationend', _handler, false);
    }
  }]);
}();
var Theme = /*#__PURE__*/function () {
  function Theme() {
    _classCallCheck(this, Theme);
    this.config = window.config;
    this.data = this.config.data;
    this.isDark = document.body.getAttribute('theme') === 'dark';
    this.newScrollTop = Util.getScrollTop();
    this.oldScrollTop = this.newScrollTop;
    this.scrollEventSet = new Set();
    this.resizeEventSet = new Set();
    this.switchThemeEventSet = new Set();
    this.clickMaskEventSet = new Set();
    if (window.objectFitImages) objectFitImages();
  }
  return _createClass(Theme, [{
    key: "initRaw",
    value: function initRaw() {
      var _this = this;
      Util.forEach(document.querySelectorAll('[data-raw]'), function ($raw) {
        $raw.innerHTML = _this.data[$raw.id];
      });
    }
  }, {
    key: "initSVGIcon",
    value: function initSVGIcon() {
      Util.forEach(document.querySelectorAll('[data-svg-src]'), function ($icon) {
        fetch($icon.getAttribute('data-svg-src')).then(function (response) {
          return response.text();
        }).then(function (svg) {
          var $temp = document.createElement('div');
          $temp.insertAdjacentHTML('afterbegin', svg);
          var $svg = $temp.firstChild;
          $svg.setAttribute('data-svg-src', $icon.getAttribute('data-svg-src'));
          $svg.classList.add('icon');
          var $titleElements = $svg.getElementsByTagName('title');
          if ($titleElements.length) $svg.removeChild($titleElements[0]);
          $icon.parentElement.replaceChild($svg, $icon);
        }).catch(function (err) {
          console.error(err);
        });
      });
    }
  }, {
    key: "initTwemoji",
    value: function initTwemoji() {
      if (this.config.twemoji) twemoji.parse(document.body);
    }
  }, {
    key: "initMenuMobile",
    value: function initMenuMobile() {
      var $menuToggleMobile = document.getElementById('menu-toggle-mobile');
      var $menuMobile = document.getElementById('menu-mobile');
      $menuToggleMobile.addEventListener('click', function () {
        document.body.classList.toggle('blur');
        $menuToggleMobile.classList.toggle('active');
        $menuMobile.classList.toggle('active');
      }, false);
      this._menuMobileOnClickMask = this._menuMobileOnClickMask || function () {
        $menuToggleMobile.classList.remove('active');
        $menuMobile.classList.remove('active');
      };
      this.clickMaskEventSet.add(this._menuMobileOnClickMask);
    }
  }, {
    key: "initSwitchTheme",
    value: function initSwitchTheme() {
      var _this2 = this;
      Util.forEach(document.getElementsByClassName('theme-switch'), function ($themeSwitch) {
        $themeSwitch.addEventListener('click', function () {
          if (document.body.getAttribute('theme') === 'dark') document.body.setAttribute('theme', 'light');else document.body.setAttribute('theme', 'dark');
          _this2.isDark = !_this2.isDark;
          window.localStorage && localStorage.setItem('theme', _this2.isDark ? 'dark' : 'light');
          var _iterator = _createForOfIteratorHelper(_this2.switchThemeEventSet),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var event = _step.value;
              event();
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }, false);
      });
    }
  }, {
    key: "initSearch",
    value: function initSearch() {
      var _this3 = this;
      var searchConfig = this.config.search;
      var isMobile = Util.isMobile();
      if (!searchConfig || isMobile && this._searchMobileOnce || !isMobile && this._searchDesktopOnce) return;
      var maxResultLength = searchConfig.maxResultLength ? searchConfig.maxResultLength : 10;
      var snippetLength = searchConfig.snippetLength ? searchConfig.snippetLength : 50;
      var highlightTag = searchConfig.highlightTag ? searchConfig.highlightTag : 'em';
      var suffix = isMobile ? 'mobile' : 'desktop';
      var $header = document.getElementById("header-".concat(suffix));
      var $searchInput = document.getElementById("search-input-".concat(suffix));
      var $searchToggle = document.getElementById("search-toggle-".concat(suffix));
      var $searchLoading = document.getElementById("search-loading-".concat(suffix));
      var $searchClear = document.getElementById("search-clear-".concat(suffix));
      if (isMobile) {
        this._searchMobileOnce = true;
        $searchInput.className = 'input';
        $searchInput.addEventListener('focus', function () {
          document.body.classList.add('blur');
          $header.classList.add('open');
          $searchInput.value = '';
        }, false);
        document.getElementById('search-cancel-mobile').addEventListener('click', function () {
          $header.classList.remove('open');
          document.body.classList.remove('blur');
          document.getElementById('menu-toggle-mobile').classList.remove('active');
          document.getElementById('menu-mobile').classList.remove('active');
          $searchLoading.style.display = 'none';
          $searchClear.style.display = 'none';
          $searchInput.value = '';
          if (_this3.dropdownContainer) _this3.dropdownContainer.remove();
        }, false);
        $searchClear.addEventListener('click', function () {
          $searchClear.style.display = 'none';
          $searchInput.value = '';
          if (_this3.dropdownContainer) _this3.dropdownContainer.remove();
        }, false);
        this._searchMobileOnClickMask = this._searchMobileOnClickMask || function () {
          $header.classList.remove('open');
          $searchLoading.style.display = 'none';
          $searchClear.style.display = 'none';
          $searchInput.value = '';
          if (_this3.dropdownContainer) _this3.dropdownContainer.remove();
        };
        this.clickMaskEventSet.add(this._searchMobileOnClickMask);
      } else {
        this._searchDesktopOnce = true;
        $searchToggle.addEventListener('click', function () {
          document.body.classList.add('blur');
          $header.classList.add('open');
          $searchInput.value = '';
          $searchInput.focus();
        }, false);
        $searchClear.addEventListener('click', function () {
          $searchClear.style.display = 'none';
          $searchInput.value = '';
          if (_this3.dropdownContainer) _this3.dropdownContainer.remove();
        }, false);
        this._searchDesktopOnClickMask = this._searchDesktopOnClickMask || function () {
          $header.classList.remove('open');
          $searchLoading.style.display = 'none';
          $searchClear.style.display = 'none';
          if (_this3.dropdownContainer) _this3.dropdownContainer.remove();
        };
        this.clickMaskEventSet.add(this._searchDesktopOnClickMask);
      }
      $searchInput.addEventListener('input', function () {
        if ($searchInput.value === '') $searchClear.style.display = 'none';else {
          $searchLoading.style.display = 'inline';
          $searchClear.style.display = 'none';
          var query = $searchInput.value;
          var results = lunrSearch(query);
          renderResults(results, query);
          $searchLoading.style.display = 'none';
          $searchClear.style.display = 'inline';
        }
      }, false);
      var lunrSearch = function lunrSearch(query) {
        var search = function search(query) {
          var results = {};
          _this3._index.search(query).forEach(function (_ref) {
            var ref = _ref.ref,
              metadata = _ref.matchData.metadata;
            var matchData = _this3._indexData[ref];
            var uri = matchData.uri,
              title = matchData.title,
              context = matchData.content;
            if (results[uri]) return;
            var position = 0;
            Object.values(metadata).forEach(function (_ref2) {
              var content = _ref2.content;
              if (content) {
                var matchPosition = content.position[0][0];
                if (matchPosition < position || position === 0) position = matchPosition;
              }
            });
            position -= snippetLength / 5;
            if (position > 0) {
              position += context.slice(position, position + 20).lastIndexOf(' ') + 1;
              context = '...' + context.slice(position, position + snippetLength);
            } else {
              context = context.slice(0, snippetLength);
            }
            Object.keys(metadata).forEach(function (key) {
              title = title.replace(new RegExp("(".concat(key, ")"), 'gi'), "<".concat(highlightTag, ">$1</").concat(highlightTag, ">"));
              context = context.replace(new RegExp("(".concat(key, ")"), 'gi'), "<".concat(highlightTag, ">$1</").concat(highlightTag, ">"));
            });
            results[uri] = {
              'uri': uri,
              'title': title,
              'date': matchData.date,
              'context': context
            };
          });
          return Object.values(results).slice(0, maxResultLength);
        };
        if (!_this3._index) {
          fetch(searchConfig.lunrIndexURL).then(function (response) {
            return response.json();
          }).then(function (data) {
            var indexData = {};
            _this3._index = lunr(function () {
              var _this4 = this;
              if (searchConfig.lunrLanguageCode) this.use(lunr[searchConfig.lunrLanguageCode]);
              this.ref('objectID');
              this.field('title', {
                boost: 50
              });
              this.field('tags', {
                boost: 20
              });
              this.field('categories', {
                boost: 20
              });
              this.field('content', {
                boost: 10
              });
              this.metadataWhitelist = ['position'];
              data.forEach(function (record) {
                indexData[record.objectID] = record;
                _this4.add(record);
              });
            });
            _this3._indexData = indexData;
            return search(query);
          }).catch(function (err) {
            console.error(err);
          });
        } else return search(query);
      };
      var renderResults = function renderResults(results, query) {
        _this3.dropdownContainer = document.getElementById("search-dropdown-".concat(suffix));
        if (_this3.dropdownContainer) _this3.dropdownContainer.remove();
        var dropdown = document.createElement('div');
        dropdown.id = "search-dropdown-".concat(suffix);
        var dropdownMenu = document.createElement('span');
        dropdownMenu.className = 'dropdown-menu with-search';
        dropdownMenu.setAttribute('role', 'listbox');
        var dataset = document.createElement('div');
        dataset.className = 'dataset-search';
        var suggestions = document.createElement('span');
        suggestions.className = 'suggestions';
        dataset.appendChild(suggestions);
        dropdownMenu.appendChild(dataset);
        dropdown.appendChild(dropdownMenu);
        _this3.dropdownContainer = dropdown;
        if (!results) {
          var emptyDiv = document.createElement('div');
          emptyDiv.className = 'search-empty';
          emptyDiv.innerHTML = "<div class=\"search-empty\">".concat(searchConfig.noResultsFound, ": <span class=\"search-query\">\"").concat(query, "\"</span></div>");
          dataset.appendChild(emptyDiv);
        } else {
          results.forEach(function (result, index) {
            var suggestion = document.createElement('div');
            suggestion.id = "option-".concat(index);
            suggestion.className = 'suggestion';
            suggestion.setAttribute('role', 'option');
            suggestion.onclick = function () {
              window.location.href = result.uri;
            };
            var suggestionInfo = document.createElement('div');
            suggestionInfo.style = 'white-space: normal';
            var suggestionTitle = document.createElement('span');
            suggestionTitle.className = 'suggestion-title';
            suggestionTitle.innerHTML = result.title;
            var suggestionDate = document.createElement('span');
            suggestionDate.className = 'suggestion-date';
            suggestionDate.innerHTML = result.date;
            var suggestionContext = document.createElement('div');
            suggestionContext.className = 'suggestion-context';
            suggestionContext.innerHTML = result.context;
            suggestionInfo.appendChild(suggestionTitle);
            suggestionInfo.appendChild(suggestionDate);
            suggestion.appendChild(suggestionInfo);
            suggestion.appendChild(suggestionContext);
            suggestions.prepend(suggestion);
          });
        }
        document.querySelector(".search-dropdown.".concat(suffix)).appendChild(dropdown);
      };
    }
  }, {
    key: "initDetails",
    value: function initDetails() {
      Util.forEach(document.getElementsByClassName('details'), function ($details) {
        var $summary = $details.getElementsByClassName('details-summary')[0];
        $summary.addEventListener('click', function () {
          $details.classList.toggle('open');
        }, false);
      });
    }
  }, {
    key: "initHighlight",
    value: function initHighlight() {
      Util.forEach(document.querySelectorAll('.code-block'), function ($codeBlock) {
        var $codeTitle = $codeBlock.querySelector('.code-header > .code-title');
        if ($codeTitle) {
          $codeTitle.addEventListener('click', function () {
            $codeBlock.classList.toggle('open');
          }, false);
        }
        var $ellipsis = $codeBlock.querySelector('.code-header .ellipsis');
        if ($ellipsis) {
          $ellipsis.addEventListener('click', function () {
            $codeBlock.classList.toggle('open');
          }, false);
        }
        var $copy = $codeBlock.querySelector('.code-header .copy');
        if ($copy) {
          var $code = $codeBlock.querySelector('code');
          var $icon = $copy.querySelector('.icon');
          var $iconHref = $copy.querySelector('.icon use');
          $copy.setAttribute('data-clipboard-text', $code.innerText);
          var clipboard = new ClipboardJS($copy);
          clipboard.on('success', function (_e) {
            $icon.classList.remove('copy');
            $icon.classList.remove('icon-copy');
            $icon.classList.add('check');
            $icon.classList.add('icon-check');
            $iconHref.setAttribute('href', '#icon-check');
            setTimeout(function () {
              $icon.classList.remove('check');
              $icon.classList.remove('icon-check');
              $icon.classList.add('copy');
              $icon.classList.add('icon-copy');
              $iconHref.setAttribute('href', '#icon-copy');
            }, 1500);
          });
        }
      });
    }
  }, {
    key: "initHeaderLink",
    value: function initHeaderLink() {
      for (var num = 1; num <= 6; num++) {
        Util.forEach(document.querySelectorAll('.single .content > h' + num), function ($header) {
          $header.classList.add('headerLink');
          $header.innerHTML = "<a href=\"#".concat($header.id, "\" class=\"header-mark\">").concat($header.innerHTML, "</a>");
        });
      }
    }
  }, {
    key: "initToc",
    value: function initToc() {
      var _this5 = this;
      var $tocCore = document.getElementById('TableOfContents');
      if ($tocCore === null) return;
      if (document.getElementById('toc-static').getAttribute('data-kept') || Util.isTocStatic()) {
        var $tocContentStatic = document.getElementById('toc-content-static');
        if ($tocCore.parentElement !== $tocContentStatic) {
          $tocCore.parentElement.removeChild($tocCore);
          $tocContentStatic.appendChild($tocCore);
        }
        if (this._tocOnScroll) this.scrollEventSet.delete(this._tocOnScroll);
      } else {
        var $tocContentAuto = document.getElementById('toc-content-auto');
        if ($tocCore.parentElement !== $tocContentAuto) {
          $tocCore.parentElement.removeChild($tocCore);
          $tocContentAuto.appendChild($tocCore);
        }
        var $toc = document.getElementById('toc-auto');
        var $page = document.getElementsByClassName('page')[0];
        var rect = $page.getBoundingClientRect();
        $toc.style.left = "".concat(rect.left + rect.width + 20, "px");
        $toc.style.maxWidth = "".concat($page.getBoundingClientRect().left - 20, "px");
        $toc.style.visibility = 'visible';
        var $tocLinkElements = $tocCore.querySelectorAll('a:first-child');
        var $tocLiElements = $tocCore.getElementsByTagName('li');
        var $tocTopLiElements = $tocCore.querySelectorAll(':scope > ul > li');
        var $headerLinkElements = document.getElementsByClassName('headerLink');
        var headerIsFixed = document.body.getAttribute('data-header-desktop') !== 'normal';
        var headerHeight = document.getElementById('header-desktop').offsetHeight;
        var TOP_SPACING = 20 + (headerIsFixed ? headerHeight : 0);
        var minTocTop = $toc.offsetTop;
        var minScrollTop = minTocTop - TOP_SPACING + (headerIsFixed ? 0 : headerHeight);
        this._tocOnScroll = this._tocOnScroll || function () {
          var footerTop = document.getElementById('post-footer').offsetTop;
          var maxTocTop = footerTop - $toc.getBoundingClientRect().height;
          var maxScrollTop = maxTocTop - TOP_SPACING + (headerIsFixed ? 0 : headerHeight);
          if (_this5.newScrollTop < minScrollTop) {
            $toc.style.position = 'absolute';
            $toc.style.top = "".concat(minTocTop, "px");
          } else if (_this5.newScrollTop > maxScrollTop) {
            $toc.style.position = 'absolute';
            $toc.style.top = "".concat(maxTocTop, "px");
          } else {
            $toc.style.position = 'fixed';
            $toc.style.top = "".concat(TOP_SPACING, "px");
          }
          Util.forEach($tocLinkElements, function ($tocLink) {
            $tocLink.classList.remove('active');
          });
          Util.forEach($tocLiElements, function ($tocLi) {
            $tocLi.classList.remove('has-active');
          });
          var INDEX_SPACING = 25 + (headerIsFixed ? headerHeight : 0);
          var activeTocIndex = $headerLinkElements.length - 1;
          if (!(window.innerHeight + document.documentElement.scrollTop > document.body.offsetHeight)) {
            for (var i = 0; i < $headerLinkElements.length - 1; i++) {
              var thisTop = $headerLinkElements[i].getBoundingClientRect().top;
              var nextTop = $headerLinkElements[i + 1].getBoundingClientRect().top;
              if (i === 0 && thisTop > INDEX_SPACING || thisTop <= INDEX_SPACING && nextTop > INDEX_SPACING) {
                activeTocIndex = i;
                break;
              }
            }
          }
          if (activeTocIndex !== -1) {
            $tocLinkElements[activeTocIndex].classList.add('active');
            var $parent = $tocLinkElements[activeTocIndex].parentElement;
            while ($parent !== $tocCore) {
              $parent.classList.add('has-active');
              $parent = $parent.parentElement.parentElement;
            }
          }
        };
        this._tocOnMutation = this._tocOnMutation || function () {
          $tocTopLiElements.forEach(function (li) {
            var subList = li.querySelector(':scope > ul');
            if (subList) {
              subList.style.display = li.classList.contains('has-active') ? 'block' : 'none';
            }
          });
        };
        var tocMutationObserver = new MutationObserver(this._tocOnMutation);
        $tocTopLiElements.forEach(function (li) {
          tocMutationObserver.observe(li, {
            attributes: true,
            attributeFilter: ['class']
          });
        });
        this._tocOnMutation();
        this._tocOnScroll();
        this.scrollEventSet.add(this._tocOnScroll);
      }
    }
  }, {
    key: "initMath",
    value: function initMath() {
      if (this.config.math) renderMathInElement(document.body, this.config.math);
    }
  }, {
    key: "initMermaid",
    value: function initMermaid() {
      var _this6 = this;
      this._mermaidOnSwitchTheme = this._mermaidOnSwitchTheme || function () {
        var $mermaidElements = document.getElementsByClassName('mermaid');
        if ($mermaidElements.length) {
          mermaid.initialize({
            startOnLoad: false,
            theme: _this6.isDark ? 'dark' : 'neutral',
            securityLevel: 'loose'
          });
          Util.forEach($mermaidElements, function ($mermaid) {
            mermaid.render('mermaid-svg-' + $mermaid.id, _this6.data[$mermaid.id]).then(function (_ref3) {
              var svg = _ref3.svg;
              $mermaid.innerHTML = svg;
            });
          });
        }
      };
      this.switchThemeEventSet.add(this._mermaidOnSwitchTheme);
      this._mermaidOnSwitchTheme();
    }
  }, {
    key: "initEcharts",
    value: function initEcharts() {
      var _this7 = this;
      if (this.config.echarts) {
        echarts.registerTheme('light', this.config.echarts.lightTheme);
        echarts.registerTheme('dark', this.config.echarts.darkTheme);
        this._echartsOnSwitchTheme = this._echartsOnSwitchTheme || function () {
          _this7._echartsArr = _this7._echartsArr || [];
          for (var i = 0; i < _this7._echartsArr.length; i++) {
            _this7._echartsArr[i].dispose();
          }
          _this7._echartsArr = [];
          Util.forEach(document.getElementsByClassName('echarts'), function ($echarts) {
            var chart = echarts.init($echarts, _this7.isDark ? 'dark' : 'light', {
              renderer: 'svg'
            });
            chart.setOption(JSON.parse(_this7.data[$echarts.id]));
            _this7._echartsArr.push(chart);
          });
        };
        this.switchThemeEventSet.add(this._echartsOnSwitchTheme);
        this._echartsOnSwitchTheme();
        this._echartsOnResize = this._echartsOnResize || function () {
          for (var i = 0; i < _this7._echartsArr.length; i++) {
            _this7._echartsArr[i].resize();
          }
        };
        this.resizeEventSet.add(this._echartsOnResize);
      }
    }
  }, {
    key: "initTypeit",
    value: function initTypeit() {
      var _this8 = this;
      if (this.config.typeit) {
        var typeitConfig = this.config.typeit;
        var speed = typeitConfig.speed ? typeitConfig.speed : 100;
        var cursorSpeed = typeitConfig.cursorSpeed ? typeitConfig.cursorSpeed : 1000;
        var cursorChar = typeitConfig.cursorChar ? typeitConfig.cursorChar : '|';
        Object.values(typeitConfig.data).forEach(function (group) {
          var _typeone = function typeone(i) {
            var id = group[i];
            new TypeIt("#".concat(id), {
              strings: _this8.data[id],
              speed: speed,
              lifeLike: true,
              cursorSpeed: cursorSpeed,
              cursorChar: cursorChar,
              waitUntilVisible: true,
              afterComplete: function afterComplete() {
                if (i === group.length - 1) {
                  if (typeitConfig.duration >= 0) window.setTimeout(function () {
                    instance.destroy();
                  }, typeitConfig.duration);
                  return;
                }
                instance.destroy();
                _typeone(i + 1);
              }
            }).go();
          };
          _typeone(0);
        });
      }
    }
  }, {
    key: "initCookieconsent",
    value: function initCookieconsent() {
      if (this.config.cookieconsent) cookieconsent.initialise(this.config.cookieconsent);
    }
  }, {
    key: "onScroll",
    value: function onScroll() {
      var _this9 = this;
      var $headers = [];
      if (document.body.getAttribute('data-header-desktop') === 'auto') $headers.push(document.getElementById('header-desktop'));
      if (document.body.getAttribute('data-header-mobile') === 'auto') $headers.push(document.getElementById('header-mobile'));
      var $fixedButtons = document.getElementById('fixed-buttons');
      var ACCURACY = 20,
        MINIMUM = 100;
      window.addEventListener('scroll', function () {
        _this9.newScrollTop = Util.getScrollTop();
        var scroll = _this9.newScrollTop - _this9.oldScrollTop;
        var isMobile = Util.isMobile();
        Util.forEach($headers, function ($header) {
          if (scroll > ACCURACY) {
            $header.classList.remove('animate__fadeInDown');
            Util.animateCSS($header, ['animate__fadeOutUp', 'animate__faster'], true);
          } else if (scroll < -ACCURACY) {
            $header.classList.remove('animate__fadeOutUp');
            Util.animateCSS($header, ['animate__fadeInDown', 'animate__faster'], true);
          }
        });
        if (_this9.newScrollTop > MINIMUM) {
          if (isMobile && scroll > ACCURACY) {
            $fixedButtons.classList.remove('animate__fadeIn');
            Util.animateCSS($fixedButtons, ['animate__fadeOut', 'animate__faster'], true);
          } else if (!isMobile || scroll < -ACCURACY) {
            $fixedButtons.style.display = 'block';
            $fixedButtons.classList.remove('animate__fadeOut');
            Util.animateCSS($fixedButtons, ['animate__fadeIn', 'animate__faster'], true);
          }
        } else {
          if (!isMobile) {
            $fixedButtons.classList.remove('animate__fadeIn');
            Util.animateCSS($fixedButtons, ['animate__fadeOut', 'animate__faster'], true);
          }
          $fixedButtons.style.display = 'none';
        }
        var _iterator2 = _createForOfIteratorHelper(_this9.scrollEventSet),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var event = _step2.value;
            event();
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        _this9.oldScrollTop = _this9.newScrollTop;
      }, false);
    }
  }, {
    key: "onResize",
    value: function onResize() {
      var _this10 = this;
      window.addEventListener('resize', function () {
        if (!_this10._resizeTimeout) {
          _this10._resizeTimeout = window.setTimeout(function () {
            _this10._resizeTimeout = null;
            var _iterator3 = _createForOfIteratorHelper(_this10.resizeEventSet),
              _step3;
            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var event = _step3.value;
                event();
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
            _this10.initToc();
            _this10.initMermaid();
            _this10.initSearch();
          }, 100);
        }
      }, false);
    }
  }, {
    key: "onClickMask",
    value: function onClickMask() {
      var _this11 = this;
      document.getElementById('mask').addEventListener('click', function () {
        var _iterator4 = _createForOfIteratorHelper(_this11.clickMaskEventSet),
          _step4;
        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var event = _step4.value;
            event();
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
        document.body.classList.remove('blur');
      }, false);
    }
  }, {
    key: "init",
    value: function init() {
      var _this12 = this;
      try {
        this.initRaw();
        this.initSVGIcon();
        this.initTwemoji();
        this.initMenuMobile();
        this.initSwitchTheme();
        this.initSearch();
        this.initDetails();
        this.initHighlight();
        this.initHeaderLink();
        this.initMath();
        this.initMermaid();
        this.initEcharts();
        this.initTypeit();
        this.initCookieconsent();
      } catch (err) {
        console.error(err);
      }
      window.setTimeout(function () {
        _this12.initToc();
        _this12.onScroll();
        _this12.onResize();
        _this12.onClickMask();
      }, 100);
    }
  }]);
}();
var themeInit = function themeInit() {
  var theme = new Theme();
  theme.init();
};
if (document.readyState !== 'loading') {
  themeInit();
} else {
  document.addEventListener('DOMContentLoaded', themeInit, false);
}
