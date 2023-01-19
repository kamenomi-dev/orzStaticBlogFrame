"use strict";
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
            }
            ;
            log(status, ...log) {
                let formatText = this.format(status, ...log);
                this.history += formatText;
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
                var fullLog = '', format = 'test';
                // To string.
                log.forEach((value, index) => {
                    switch (typeof value) {
                        case 'bigint':
                        case 'number':
                        case 'symbol':
                        case 'boolean':
                            fullLog += ` ${value.toString()}`;
                            break;
                        case 'function':
                            fullLog += ` Function@@${value.name || '<Anonymous>'}`;
                            break;
                        case 'object':
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
                // Format time
                {
                    let currentDate = new Date(), 
                    /* - - - - - - - - - - - - - - - - - */
                    year = currentDate.getFullYear().toString(), month = (currentDate.getMonth() + 1).toString(), day = currentDate.getDay().toString(), hour = currentDate.getHours().toString(), minute = currentDate.getMinutes().toString(), second = currentDate.getSeconds().toString();
                    format = this.logFormat
                        .replace(/\{y+\}/g, year)
                        .replace(/\{m+\}/g, month.length == 1 ? `0${month}` : month)
                        .replace(/\{d+\}/g, day.length == 1 ? `0${day}` : day)
                        .replace(/\{H+\}/g, hour.length == 1 ? `0${hour}` : hour)
                        .replace(/\{M+\}/g, minute.length == 1 ? `0${minute}` : minute)
                        .replace(/\{S+\}/g, second.length == 1 ? `0${second}` : second);
                }
                ;
                // Format all
                {
                    format = format
                        .replace('{status}', status)
                        .replace('{log}', fullLog || ' null');
                }
                ;
                return format;
            }
            ;
        }
        Utils.Log4ts = Log4ts;
        ;
        let LogStatus;
        (function (LogStatus) {
            LogStatus[LogStatus["INFO"] = 0] = "INFO";
            LogStatus[LogStatus["ERROR"] = 1] = "ERROR";
            LogStatus[LogStatus["WARN"] = 2] = "WARN";
        })(LogStatus || (LogStatus = {}));
        ;
    })(Utils = orzBlogFrame.Utils || (orzBlogFrame.Utils = {}));
})(orzBlogFrame || (orzBlogFrame = {}));
;
/// <reference path="./Utils/Log4ts.ts" />
var orzBlogFrame;
(function (orzBlogFrame) {
    orzBlogFrame.logger = new orzBlogFrame.Utils.Log4ts();
    class orzProcessor {
        constructor() {
            this.init();
            orzBlogFrame.logger.send('INFO', 'OK!');
        }
        ;
        async init() {
            orzBlogFrame.logger.log('INFO', 'orzBlogFrame@init begin.');
            $.cookie('-orzblog-config');
        }
    }
    orzBlogFrame.orzProcessor = orzProcessor;
    ;
})(orzBlogFrame || (orzBlogFrame = {}));
;
/// <reference path="./orzProcessor.ts" />
{
    $(() => {
        var orzProcessor = new orzBlogFrame.orzProcessor();
    });
}
;
//# sourceMappingURL=main.js.map