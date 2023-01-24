"use strict";
var orzBlogFrame;
(function (orzBlogFrame) {
    var Utils;
    (function (Utils) {
        class File {
            constructor() {
                return;
            }
            ;
            async get(urlPath) {
                var result = { data: '', isExist: false };
                await fetch(urlPath)
                    .then(response => {
                    result.isExist = response.ok;
                    return response.text();
                })
                    .then(text => result.data = text);
                return result;
            }
        }
        Utils.File = File;
        ;
    })(Utils = orzBlogFrame.Utils || (orzBlogFrame.Utils = {}));
})(orzBlogFrame || (orzBlogFrame = {}));
;
var orzBlogFrame;
(function (orzBlogFrame) {
    var Utils;
    (function (Utils) {
        class Log4ts {
            inited = false;
            logFormat = '[{HH}:{MM}:{SS} {status}]:{log}';
            withColor = false;
            history = '====== Logger Inited ======';
            constructor(logFormat = '[{HH}:{MM}:{SS} {status}]:{log}', withColor = false) {
                this.inited = true;
                this.logFormat = logFormat.trim();
                this.withColor = withColor;
                this.log('DEBUG', 'orzBlogFrame.Utils@Log4ts Init!');
            }
            ;
            log(status, ...log) {
                let formatText = this.format(status, ...log);
                this.history += `\n${formatText}`;
                console.log(formatText);
            }
            ;
            send(status, ...log) {
                console.log(this.format(status, ...log));
            }
            ;
            save() {
                return this.history;
            }
            format(status, ...log) {
                var fullLog = '', format = '';
                log.forEach((value, index) => {
                    switch (typeof value) {
                        case 'bigint':
                        case 'number':
                        case 'symbol':
                        case 'boolean':
                            fullLog += ` ${value.toString()}`;
                            break;
                        case 'function':
                            fullLog += ` Function@${value.name || '<Anonymous>'}(<${value.length} arg(s)>...)`;
                            break;
                        case 'object':
                            if (value.constructor == Array)
                                fullLog += ` Array@[${value.toString().replace(',', ', ')}]`;
                            else
                                fullLog += ' [object]';
                            break;
                        case 'string':
                            fullLog += ` ${value}`;
                            break;
                        default:
                            fullLog += `\n __orzBlogFrame.Utils@Log4ts.format: log${index} is undefined __`;
                            break;
                    }
                });
                {
                    let currentDate = new Date(), year = currentDate.getFullYear().toString(), month = (currentDate.getMonth() + 1).toString(), day = currentDate.getDay().toString(), hour = currentDate.getHours().toString(), minute = currentDate.getMinutes().toString(), second = currentDate.getSeconds().toString();
                    format = this.logFormat
                        .replace(/\{y+\}/g, year)
                        .replace(/\{m+\}/g, month.length == 1 ? `0${month}` : month)
                        .replace(/\{d+\}/g, day.length == 1 ? `0${day}` : day)
                        .replace(/\{H+\}/g, hour.length == 1 ? `0${hour}` : hour)
                        .replace(/\{M+\}/g, minute.length == 1 ? `0${minute}` : minute)
                        .replace(/\{S+\}/g, second.length == 1 ? `0${second}` : second);
                }
                ;
                {
                    format = format
                        .replace('{status}', status)
                        .replace('{log}', fullLog || ' null');
                }
                ;
                return format;
            }
            ;
            caller() {
                var regexMatches;
                var stack = '';
                try {
                    stack = (new Error()).stack.split('\n')[1];
                }
                catch { }
                ;
                regexMatches = /at [^\/]*((?:(?:[a-zA-Z]+:)|(?:[\/])|(?:\\\\))(?:.+)):(\d+):(\d+)/.exec(stack);
                if (regexMatches || regexMatches == 4) {
                    return {
                        script: regexMatches[1],
                        line: Number(regexMatches[2]),
                        column: Number(regexMatches[3])
                    };
                }
                ;
            }
            ;
        }
        Utils.Log4ts = Log4ts;
        ;
        let ELogStatus;
        (function (ELogStatus) {
            ELogStatus[ELogStatus["INFO"] = 0] = "INFO";
            ELogStatus[ELogStatus["ERROR"] = 1] = "ERROR";
            ELogStatus[ELogStatus["WARN"] = 2] = "WARN";
            ELogStatus[ELogStatus["DEBUG"] = 3] = "DEBUG";
        })(ELogStatus || (ELogStatus = {}));
        ;
    })(Utils = orzBlogFrame.Utils || (orzBlogFrame.Utils = {}));
})(orzBlogFrame || (orzBlogFrame = {}));
;
var orzBlogFrame;
(function (orzBlogFrame) {
    var Utils;
    (function (Utils) {
        class LanguageEx {
            nodes = $('.orzLanguage');
            languageIndex = [];
            langJson;
            subLangJson;
            constructor() {
                this.getSupoortLang();
                orzBlogFrame.logger.log('DEBUG', 'orzBlogFrame.Utils@LanguageEx Init!');
            }
            ;
            async getSupoortLang(reload = false) {
                if (this.languageIndex.length == 0 || reload)
                    await fetch('/language/langIndex.json')
                        .then(langFile => langFile.json())
                        .then(lang => this.languageIndex = lang);
                return this.languageIndex;
            }
            ;
            async set(reload = false, locale = 'zh-CN', subLocale = 'en-US') {
                if (this.languageIndex.indexOf(locale) == -1) {
                    orzBlogFrame.logger.log('WARN', `${locale} is not supported!`);
                    return false;
                }
                ;
                if (this.languageIndex.indexOf(subLocale) == -1) {
                    orzBlogFrame.logger.log('WARN', `${subLocale} is not supported!`);
                    return false;
                }
                ;
                if (locale == subLocale) {
                    this.subLangJson
                        = this.langJson['language'] == locale
                            ? this.langJson
                            : (this.langJson = await this.getLangJson(locale));
                }
                else {
                    if (reload || this.langJson['language'] != locale)
                        this.langJson = await this.getLangJson(locale);
                    if (reload || this.subLangJson['language'] != subLocale)
                        this.subLangJson = await this.getLangJson(subLocale);
                }
                ;
                $('html').attr('lang', locale);
                this.nodes = $('.orzLanguage');
                this.refresh();
                orzBlogFrame.logger.log('DEBUG', 'Succeefully change language.');
                return true;
            }
            ;
            async refresh(id) {
                var lang = this.langJson['language'];
                this.nodes.each((index, node) => {
                    var node_ = $(node);
                    var value = (node_.attr('by') == id && id)
                        ? id : node_.attr('by');
                    var attrFrom = node_.attr('from');
                    var text = (this.langJson[lang][value] || this.subLangJson[lang][value]).toString();
                    if (value in (this.langJson[lang] || value in this.subLangJson[lang]))
                        node_.text(attrFrom
                            ? attrFrom.replace('$1', text)
                            : text);
                    else
                        orzBlogFrame.logger.log('WARN', `${value} isn't in ${lang} langFile. huh?`);
                });
            }
            ;
            async getLangJson(arg) {
                var result;
                await fetch(`/language/${arg}.lang.json`)
                    .then(response => response.json())
                    .then(json => result = json)
                    .catch((er) => orzBlogFrame.logger.log('ERROR', `LangIndex isn't consistent! here: ${arg} - ${er.message}`));
                return result;
            }
            ;
        }
        Utils.LanguageEx = LanguageEx;
        ;
    })(Utils = orzBlogFrame.Utils || (orzBlogFrame.Utils = {}));
})(orzBlogFrame || (orzBlogFrame = {}));
;
const License = 'MIT License';
var orzBlogFrame;
(function (orzBlogFrame) {
    orzBlogFrame.logger = new orzBlogFrame.Utils.Log4ts();
    orzBlogFrame.langs = new orzBlogFrame.Utils.LanguageEx();
    orzBlogFrame.file = new orzBlogFrame.Utils.File();
    class orzProcessor {
        constructor() {
            this.load();
        }
        ;
        async load() {
            orzBlogFrame.logger.log('DEBUG', 'orzBlogFrame.<main>@orzProcseeor Init!');
            orzBlogFrame.logger.log('DEBUG', 'OK! Waitting for user set the config.');
            orzBlogFrame.logger.log('DEBUG', 'Languages:', await orzBlogFrame.langs.getSupoortLang());
            orzBlogFrame.langs.set(true);
        }
        ;
        async init(config) {
            const frame = $('#orzFrame');
            const topbar = $('#orzTopbarRect', frame);
            const topbarMenu = $('#orzTopbarMenu', topbar);
            const contentRect = $('#orzContentRect', frame);
            const activityRect = $('#orzActivityRect', contentRect);
            const contentScroll = $('#orzContentScroll', contentRect);
            const articleContent = $('#orzArticleContent', contentRect);
            (function initCookie() {
                if ($.cookie('orzContentScrollLeft') == undefined)
                    $.cookie('orzContentScrollLeft', 170);
                if ($.cookie('orzCurrentTheme') == undefined)
                    $.cookie('orzCurrentTheme', 'light');
            })();
            await (async function parseConfig() {
                const linkTheme = $('link[id="orzTheme"]');
                if (config.defaultTheme) {
                    if (!await orzBlogFrame.file.get(`/themes/${config.defaultTheme}/theme.css`))
                        orzBlogFrame.logger.log('ERROR', '[orzProcessor@parseConfig] defaultTheme isn\'t exist!\n');
                    else {
                        $.cookie('orzCurrentTheme', config.defaultTheme);
                        linkTheme.attr('href', `/themes/${config.defaultTheme}/theme.css`);
                    }
                    ;
                }
                else {
                    if ($.cookie('orzCurrentTheme') != 'light')
                        linkTheme.attr('href', `/themes/${$.cookie('orzCurrentTheme')}/theme.css`);
                }
                ;
            })();
            (function contentScrollbar() {
                const cookieScrollLeft = $.cookie('orzContentScrollLeft');
                activityRect.width(Number(cookieScrollLeft) + 2 + 'px');
                contentScroll.css('left', `${cookieScrollLeft}px`);
                articleContent.css('left', `${cookieScrollLeft}px`);
                contentScroll.on('mousedown', ev => {
                    const body = $('body');
                    body.on('mousemove.contentScrollbar', function (ev) {
                        let step = ev.clientX;
                        if (85 + 48 < step && step <= 170 + 48)
                            step = 170 + 48;
                        if (step <= 85 + 48)
                            step = 48;
                        activityRect.width(step);
                        contentScroll.css('left', step - 2);
                        articleContent.css('left', step - 2);
                    });
                    body.on('mouseup.contentScrollbar', function (ev) {
                        $.cookie('orzContentScrollLeft', ev.clientX - 2);
                        body.off('mouseup.contentScrollbar');
                        body.off('mousemove.contentScrollbar');
                    });
                });
                contentScroll.hoverIntent(() => {
                    contentScroll.addClass('scrollbar-hover');
                }, () => {
                    contentScroll.removeClass('scrollbar-hover');
                });
            })();
            (function globalDocument() {
                frame.on('focus', () => {
                    console.log('eee');
                    topbar.removeClass('onTopbarBlur');
                    topbarMenu.removeClass('onTopbarBlur');
                });
                frame.on('blur', () => {
                    topbar.addClass('onTopbarBlur');
                    topbarMenu.addClass('onTopbarBlur');
                });
            })();
        }
        ;
    }
    orzBlogFrame.orzProcessor = orzProcessor;
    ;
})(orzBlogFrame || (orzBlogFrame = {}));
;
{
    $(() => {
        var orzProcessor = new orzBlogFrame.orzProcessor();
        orzProcessor.init({
            'defaultTheme': 'light'
        });
    });
}
;
//# sourceMappingURL=main.js.map