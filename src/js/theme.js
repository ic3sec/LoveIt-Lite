class Util {
    static forEach(elements, handler) {
        elements = elements || [];
        for (let i = 0; i < elements.length; i++) handler(elements[i]);
    }

    static getScrollTop() {
        return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    }

    static isMobile() {
        return window.matchMedia('only screen and (max-width: 680px)').matches;
    }

    static isTocStatic() {
        return window.matchMedia('only screen and (max-width: 960px)').matches;
    }
}

class Theme {
    constructor() {
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

    initRaw() {
        Util.forEach(document.querySelectorAll('[data-raw]'), $raw => {
            $raw.innerHTML = this.data[$raw.id];
        });
    }

    initSVGIcon() {
        Util.forEach(document.querySelectorAll('[data-svg-src]'), $icon => {
            fetch($icon.getAttribute('data-svg-src'))
                .then(response => response.text())
                .then(svg => {
                    const $temp = document.createElement('div');
                    $temp.insertAdjacentHTML('afterbegin', svg);
                    const $svg = $temp.firstChild;
                    $svg.setAttribute('data-svg-src', $icon.getAttribute('data-svg-src'));
                    $svg.classList.add('icon');
                    const $titleElements = $svg.getElementsByTagName('title');
                    if ($titleElements.length) $svg.removeChild($titleElements[0]);
                    $icon.parentElement.replaceChild($svg, $icon);
                })
                .catch(err => { console.error(err); });
        });
    }

    initMenuMobile() {
        const $menuToggleMobile = document.getElementById('menu-toggle-mobile');
        const $menuMobile = document.getElementById('menu-mobile');
        $menuToggleMobile.addEventListener('click', () => {
            document.body.classList.toggle('blur');
            $menuToggleMobile.classList.toggle('active');
            $menuMobile.classList.toggle('active');
        }, false);
        this._menuMobileOnClickMask = this._menuMobileOnClickMask || (() => {
            $menuToggleMobile.classList.remove('active');
            $menuMobile.classList.remove('active');
        });
        this.clickMaskEventSet.add(this._menuMobileOnClickMask);
    }

    initSwitchTheme() {
        Util.forEach(document.getElementsByClassName('theme-switch'), $themeSwitch => {
            $themeSwitch.addEventListener('click', () => {
                if (document.body.getAttribute('theme') === 'dark') document.body.setAttribute('theme', 'light');
                else document.body.setAttribute('theme', 'dark');
                this.isDark = !this.isDark;
                window.localStorage && localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
                for (let event of this.switchThemeEventSet) event();
            }, false);
        });
    }

    initSearch() {
        const searchConfig = this.config.search;
        const isMobile = Util.isMobile();
        if (!searchConfig || isMobile && this._searchMobileOnce || !isMobile && this._searchDesktopOnce) return;

        const maxResultLength = searchConfig.maxResultLength ? searchConfig.maxResultLength : 10;
        const snippetLength = searchConfig.snippetLength ? searchConfig.snippetLength : 50;
        const highlightTag = searchConfig.highlightTag ? searchConfig.highlightTag : 'em';

        const suffix = isMobile ? 'mobile' : 'desktop';
        const $header = document.getElementById(`header-${suffix}`);
        const $searchInput = document.getElementById(`search-input-${suffix}`);
        const $searchToggle = document.getElementById(`search-toggle-${suffix}`);
        const $searchLoading = document.getElementById(`search-loading-${suffix}`);
        const $searchClear = document.getElementById(`search-clear-${suffix}`);
        if (isMobile) {
            this._searchMobileOnce = true;
            $searchInput.className = 'input';
            $searchInput.addEventListener('focus', () => {
                document.body.classList.add('blur');
                $header.classList.add('open');
                $searchInput.value = '';
            }, false);
            document.getElementById('search-cancel-mobile').addEventListener('click', () => {
                $header.classList.remove('open');
                document.body.classList.remove('blur');
                document.getElementById('menu-toggle-mobile').classList.remove('active');
                document.getElementById('menu-mobile').classList.remove('active');
                $searchLoading.style.display = 'none';
                $searchClear.style.display = 'none';
                $searchInput.value = '';
                if (this.dropdownContainer) this.dropdownContainer.remove();
            }, false);
            $searchClear.addEventListener('click', () => {
                $searchClear.style.display = 'none';
                $searchInput.value = '';
                if (this.dropdownContainer) this.dropdownContainer.remove();
            }, false);
            this._searchMobileOnClickMask = this._searchMobileOnClickMask || (() => {
                $header.classList.remove('open');
                $searchLoading.style.display = 'none';
                $searchClear.style.display = 'none';
                $searchInput.value = '';
                if (this.dropdownContainer) this.dropdownContainer.remove();
            });
            this.clickMaskEventSet.add(this._searchMobileOnClickMask);
        } else {
            this._searchDesktopOnce = true;
            $searchToggle.addEventListener('click', () => {
                document.body.classList.add('blur');
                $header.classList.add('open');
                $searchInput.value = '';
                $searchInput.focus();
            }, false);
            $searchClear.addEventListener('click', () => {
                $searchClear.style.display = 'none';
                $searchInput.value = '';
                if (this.dropdownContainer) this.dropdownContainer.remove();
            }, false);
            this._searchDesktopOnClickMask = this._searchDesktopOnClickMask || (() => {
                $header.classList.remove('open');
                $searchLoading.style.display = 'none';
                $searchClear.style.display = 'none';
                if (this.dropdownContainer) this.dropdownContainer.remove();
            });
            this.clickMaskEventSet.add(this._searchDesktopOnClickMask);
        }
        $searchInput.addEventListener('input', () => {
            if ($searchInput.value === '') 
                $searchClear.style.display = 'none';
            else {
                $searchLoading.style.display = 'inline';
                $searchClear.style.display = 'none';
                const query = $searchInput.value;
                const results = lunrSearch(query);
                renderResults(results, query);
                $searchLoading.style.display = 'none';
                $searchClear.style.display = 'inline';
            }
        }, false);

        const lunrSearch = (query) => {
            const search = (query) => {
                const results = {};
                this._index.search(query).forEach(({ ref, matchData: { metadata } }) => {
                    const matchData = this._indexData[ref];
                    let { uri, title, content: context } = matchData;
                    if (results[uri]) return;
                    let position = 0;
                    Object.values(metadata).forEach(({ content }) => {
                        if (content) {
                            const matchPosition = content.position[0][0];
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
                    Object.keys(metadata).forEach(key => {
                        title = title.replace(new RegExp(`(${key})`, 'gi'), `<${highlightTag}>$1</${highlightTag}>`);
                        context = context.replace(new RegExp(`(${key})`, 'gi'), `<${highlightTag}>$1</${highlightTag}>`);
                    });
                    results[uri] = {
                        'uri': uri,
                        'title' : title,
                        'date' : matchData.date,
                        'context' : context,
                    };
                });
                return Object.values(results).slice(0, maxResultLength);
            };
            
            if (!this._index) {
                fetch(searchConfig.lunrIndexURL)
                    .then(response => response.json())
                    .then(data => {
                        const indexData = {};
                        this._index = lunr(function () {
                            if (searchConfig.lunrLanguageCode) this.use(lunr[searchConfig.lunrLanguageCode]);
                            this.ref('objectID');
                            this.field('title', { boost: 50 });
                            this.field('tags', { boost: 20 });
                            this.field('categories', { boost: 20 });
                            this.field('content', { boost: 10 });
                            this.metadataWhitelist = ['position'];
                            data.forEach((record) => {
                                indexData[record.objectID] = record;
                                this.add(record);
                            });
                        });
                        this._indexData = indexData;
                        return search(query);
                    }).catch(err => {
                        console.error(err);
                    });
            } else return search(query);
        };

        const renderResults = (results, query) => {
            this.dropdownContainer = document.getElementById(`search-dropdown-${suffix}`);

            if (this.dropdownContainer) this.dropdownContainer.remove();

            const dropdown = document.createElement('div');
            dropdown.id = `search-dropdown-${suffix}`;
            
            const dropdownMenu = document.createElement('span');
            dropdownMenu.className = 'dropdown-menu with-search';
            dropdownMenu.setAttribute('role', 'listbox');

            const dataset = document.createElement('div');
            dataset.className = 'dataset-search';

            const suggestions = document.createElement('span');
            suggestions.className = 'suggestions';

            dataset.appendChild(suggestions);
            dropdownMenu.appendChild(dataset);
            dropdown.appendChild(dropdownMenu);

            this.dropdownContainer = dropdown;

            if (!results) {
                const emptyDiv = document.createElement('div');
                emptyDiv.className = 'search-empty';
                emptyDiv.innerHTML = `<div class="search-empty">${searchConfig.noResultsFound}: <span class="search-query">"${query}"</span></div>`;
                dataset.appendChild(emptyDiv);
            } else {
                results.forEach((result, index) => {
                    const suggestion = document.createElement('div');
                    suggestion.id = `option-${index}`
                    suggestion.className = 'suggestion';
                    suggestion.setAttribute('role', 'option');
                    suggestion.onclick = () => {
                        window.location.href = result.uri;
                    }

                    const suggestionInfo = document.createElement('div');
                    suggestionInfo.style = 'white-space: normal';

                    const suggestionTitle = document.createElement('span');
                    suggestionTitle.className = 'suggestion-title';
                    suggestionTitle.innerHTML = result.title;

                    const suggestionDate = document.createElement('span');
                    suggestionDate.className = 'suggestion-date';
                    suggestionDate.innerHTML = result.date;

                    const suggestionContext = document.createElement('div');
                    suggestionContext.className = 'suggestion-context';
                    suggestionContext.innerHTML = result.context;

                    suggestionInfo.appendChild(suggestionTitle);
                    suggestionInfo.appendChild(suggestionDate);

                    suggestion.appendChild(suggestionInfo);
                    suggestion.appendChild(suggestionContext);

                    suggestions.prepend(suggestion);
                });
            }

            document.querySelector(`.search-dropdown.${suffix}`).appendChild(dropdown);
        };
    }

    initDetails() {
        Util.forEach(document.getElementsByClassName('details'), $details => {
            const $summary = $details.getElementsByClassName('details-summary')[0];
            $summary.addEventListener('click', () => {
                $details.classList.toggle('open');
            }, false);
        });
    }

    initHighlight() {
        Util.forEach(document.querySelectorAll('.code-block'), $codeBlock => {
            const $codeTitle = $codeBlock.querySelector('.code-header > .code-title');
            if ($codeTitle) {
                $codeTitle.addEventListener('click', () => {
                    $codeBlock.classList.toggle('open');
                }, false);
            }
            const $ellipsis = $codeBlock.querySelector('.code-header .ellipsis');
            if ($ellipsis) {
                $ellipsis.addEventListener('click', () => {
                    $codeBlock.classList.toggle('open');
                }, false);
            }
            const $copy = $codeBlock.querySelector('.code-header .copy');
            if ($copy) {
                const $code = $codeBlock.querySelector('code');
                const $icon = $copy.querySelector('.icon');
                const $iconHref = $copy.querySelector('.icon use');
                $copy.setAttribute('data-clipboard-text', $code.innerText);
                const clipboard = new ClipboardJS($copy);
                clipboard.on('success', _e => {
                    $icon.classList.remove('copy');
                    $icon.classList.remove('icon-copy');
                    $icon.classList.add('check');
                    $icon.classList.add('icon-check');
                    $iconHref.setAttribute('href', '#icon-check');
                    
                    setTimeout(() => {
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

    initHeaderLink() {
        for (let num = 1; num <= 6; num++) {
            Util.forEach(document.querySelectorAll('.single .content > h' + num), $header => {
                $header.classList.add('headerLink');
                $header.innerHTML = `<a href="#${$header.id}" class="header-mark">${$header.innerHTML}</a>`;
            });
        }
    }

    initToc() {
        const $tocCore = document.getElementById('TableOfContents');
        if ($tocCore === null) return;
        if (document.getElementById('toc-static').getAttribute('data-kept') || Util.isTocStatic()) {
            const $tocContentStatic = document.getElementById('toc-content-static');
            if ($tocCore.parentElement !== $tocContentStatic) {
                $tocCore.parentElement.removeChild($tocCore);
                $tocContentStatic.appendChild($tocCore);
            }
            if (this._tocOnScroll) this.scrollEventSet.delete(this._tocOnScroll);
        } else {
            const $tocContentAuto = document.getElementById('toc-content-auto');
            if ($tocCore.parentElement !== $tocContentAuto) {
                $tocCore.parentElement.removeChild($tocCore);
                $tocContentAuto.appendChild($tocCore);
            }
            const $toc = document.getElementById('toc-auto');
            const $page = document.getElementsByClassName('page')[0];
            const rect = $page.getBoundingClientRect();
            $toc.style.left = `${rect.left + rect.width + 20}px`;
            $toc.style.maxWidth = `${$page.getBoundingClientRect().left - 20}px`;
            $toc.style.visibility = 'visible';
            const $tocLinkElements = $tocCore.querySelectorAll('a:first-child');
            const $tocLiElements = $tocCore.getElementsByTagName('li');
            const $tocTopLiElements = $tocCore.querySelectorAll(':scope > ul > li');
            const $headerLinkElements = document.getElementsByClassName('headerLink');
            const headerIsFixed = document.body.getAttribute('data-header-desktop') !== 'normal';
            const headerHeight = document.getElementById('header-desktop').offsetHeight;
            const TOP_SPACING = 20 + (headerIsFixed ? headerHeight : 0);
            const minTocTop = $toc.offsetTop;
            const minScrollTop = minTocTop - TOP_SPACING + (headerIsFixed ? 0 : headerHeight);
            this._tocOnScroll = this._tocOnScroll || (() => {
                const footerTop = document.getElementById('post-footer').offsetTop;
                const maxTocTop = footerTop - $toc.getBoundingClientRect().height;
                const maxScrollTop = maxTocTop - TOP_SPACING + (headerIsFixed ? 0 : headerHeight);
                if (this.newScrollTop < minScrollTop) {
                    $toc.style.position = 'absolute';
                    $toc.style.top = `${minTocTop}px`;
                } else if (this.newScrollTop > maxScrollTop) {
                    $toc.style.position = 'absolute';
                    $toc.style.top = `${maxTocTop}px`;
                } else {
                    $toc.style.position = 'fixed';
                    $toc.style.top = `${TOP_SPACING}px`;
                }

                Util.forEach($tocLinkElements, $tocLink => { $tocLink.classList.remove('active'); });
                Util.forEach($tocLiElements, $tocLi => { $tocLi.classList.remove('has-active'); });
                const INDEX_SPACING = 25 + (headerIsFixed ? headerHeight : 0);
                let activeTocIndex = $headerLinkElements.length - 1;
                if (!(window.innerHeight + document.documentElement.scrollTop > document.body.offsetHeight)) {
                    for (let i = 0; i < $headerLinkElements.length - 1; i++) {
                        const thisTop = $headerLinkElements[i].getBoundingClientRect().top;
                        const nextTop = $headerLinkElements[i + 1].getBoundingClientRect().top;
                        if ((i === 0 && thisTop > INDEX_SPACING)
                        || (thisTop <= INDEX_SPACING && nextTop > INDEX_SPACING)) {
                            activeTocIndex = i;
                            break;
                        }
                    }
                }
                if (activeTocIndex !== -1) {
                    $tocLinkElements[activeTocIndex].classList.add('active');
                    let $parent = $tocLinkElements[activeTocIndex].parentElement;
                    while ($parent !== $tocCore) {
                        $parent.classList.add('has-active');
                        $parent = $parent.parentElement.parentElement;
                    }
                }
            });
            this._tocOnMutation = this._tocOnMutation || (() => {
                $tocTopLiElements.forEach(li => {
                    const subList = li.querySelector(':scope > ul');

                    if (subList) {
                        subList.style.display = li.classList.contains('has-active') ? 'block' : 'none';
                    }
                });
            });
            const tocMutationObserver = new MutationObserver(this._tocOnMutation);
            $tocTopLiElements.forEach(li => {
                tocMutationObserver.observe(li, {attributes: true, attributeFilter: ['class']});
            });
            this._tocOnMutation();
            this._tocOnScroll();
            this.scrollEventSet.add(this._tocOnScroll);
        }
    }

    initMath() {
        if (this.config.math) renderMathInElement(document.body, this.config.math);
    }

    initMermaid() {
        this._mermaidOnSwitchTheme = this._mermaidOnSwitchTheme || (() => {
            const $mermaidElements = document.getElementsByClassName('mermaid');
            if ($mermaidElements.length) {
                mermaid.initialize({startOnLoad: false, theme: this.isDark ? 'dark' : 'neutral', securityLevel: 'loose'});
                Util.forEach($mermaidElements, $mermaid => {
                    mermaid.render('mermaid-svg-' + $mermaid.id, this.data[$mermaid.id])
                        .then(({ svg }) => {
                            $mermaid.innerHTML = svg;
                        });
                });
            }
        });
        this.switchThemeEventSet.add(this._mermaidOnSwitchTheme);
        this._mermaidOnSwitchTheme();
    }

    initEcharts() {
        if (this.config.echarts) {
            echarts.registerTheme('light', this.config.echarts.lightTheme);
            echarts.registerTheme('dark', this.config.echarts.darkTheme);
            this._echartsOnSwitchTheme = this._echartsOnSwitchTheme || (() => {
                this._echartsArr = this._echartsArr || [];
                for (let i = 0; i < this._echartsArr.length; i++) {
                    this._echartsArr[i].dispose();
                }
                this._echartsArr = [];
                Util.forEach(document.getElementsByClassName('echarts'), $echarts => {
                    const chart = echarts.init($echarts, this.isDark ? 'dark' : 'light', {renderer: 'svg'});
                    chart.setOption(JSON.parse(this.data[$echarts.id]));
                    this._echartsArr.push(chart);
                });
            });
            this.switchThemeEventSet.add(this._echartsOnSwitchTheme);
            this._echartsOnSwitchTheme();
            this._echartsOnResize = this._echartsOnResize || (() => {
                for (let i = 0; i < this._echartsArr.length; i++) {
                    this._echartsArr[i].resize();
                }
            });
            this.resizeEventSet.add(this._echartsOnResize);
        }
    }

    initTypeit() {
        if (this.config.typeit) {
            const typeitConfig = this.config.typeit;
            const speed = typeitConfig.speed ? typeitConfig.speed : 100;
            const cursorSpeed = typeitConfig.cursorSpeed ? typeitConfig.cursorSpeed : 1000;
            const cursorChar = typeitConfig.cursorChar ? typeitConfig.cursorChar : '|';
            Object.values(typeitConfig.data).forEach(group => {
                const typeone = (i) => {
                    const id = group[i];
                    new TypeIt(`#${id}`, {
                        strings: this.data[id],
                        speed: speed,
                        lifeLike: true,
                        cursorSpeed: cursorSpeed,
                        cursorChar: cursorChar,
                        waitUntilVisible: true,
                        afterComplete: () => {
                            if (i === group.length - 1) {
                                if (typeitConfig.duration >= 0) window.setTimeout(() => {
                                    instance.destroy();
                                }, typeitConfig.duration);
                                return;
                            }
                            instance.destroy();
                            typeone(i + 1);
                        },
                    }).go();
                };
                typeone(0);
            });
        }
    }

    initCookieconsent() {
        if (this.config.cookieconsent) cookieconsent.initialise(this.config.cookieconsent);
    }

    onScroll() {
        const $headers = [];
        if (document.body.getAttribute('data-header-desktop') === 'auto') $headers.push(document.getElementById('header-desktop'));
        if (document.body.getAttribute('data-header-mobile') === 'auto') $headers.push(document.getElementById('header-mobile'));
        const $fixedButtons = document.getElementById('fixed-buttons');
        const ACCURACY = 20, MINIMUM = 100;
        window.addEventListener('scroll', () => {
            this.newScrollTop = Util.getScrollTop();
            const scroll = this.newScrollTop - this.oldScrollTop;
            const isMobile = Util.isMobile();
            Util.forEach($headers, $header => {
                if (scroll > ACCURACY) {
                    $header.classList.remove('fade-in-down');
                    $header.classList.add('fade-out-up');
                } else if (scroll < - ACCURACY) {
                    $header.classList.remove('fade-out-up');
                    $header.classList.add('fade-in-down');
                }
            });
            if (this.newScrollTop > MINIMUM) {
                if (isMobile && scroll > ACCURACY) {
                    $fixedButtons.classList.remove('fade-in-down');
                    $fixedButtons.classList.add('fade-out-up');
                } else if (!isMobile || scroll < - ACCURACY) {
                    $fixedButtons.style.display = 'block';
                    $fixedButtons.classList.remove('fade-out-up');
                    $fixedButtons.classList.add('fade-in-down');
                }
            } else {
                if (!isMobile) {
                    $fixedButtons.classList.remove('fade-in-down');
                    $fixedButtons.classList.add('fade-out-up');
                }
                $fixedButtons.style.display = 'none';
            }
            for (let event of this.scrollEventSet) event();
            this.oldScrollTop = this.newScrollTop;
        }, false);
    }

    onResize() {
        window.addEventListener('resize', () => {
            if (!this._resizeTimeout) {
                this._resizeTimeout = window.setTimeout(() => {
                    this._resizeTimeout = null;
                    for (let event of this.resizeEventSet) event();
                    this.initToc();
                    this.initMermaid();
                    this.initSearch();
                }, 100);
            }
        }, false);
    }

    onClickMask() {
        document.getElementById('mask').addEventListener('click', () => {
            for (let event of this.clickMaskEventSet) event();
            document.body.classList.remove('blur');
        }, false);
    }

    init() {
        try {
            this.initRaw();
            this.initSVGIcon();
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

        window.setTimeout(() => {
            this.initToc();
            this.onScroll();
            this.onResize();
            this.onClickMask();
        }, 100);
    }
}

const themeInit = () => {
    const theme = new Theme();
    theme.init();
};

if (document.readyState !== 'loading') {
    themeInit();
} else {
    document.addEventListener('DOMContentLoaded', themeInit, false);
}
