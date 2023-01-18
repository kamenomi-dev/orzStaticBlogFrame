"use strict";
var orzBlogFrame;
(function (orzBlogFrame) {
    var Utils;
    (function (Utils) {
        class Log4ts {
            inited;
            logFormat;
            withColor;
            constructor(logFormat = '[{HH}:{MM}:{SS} {status}]:{log}', withColor = false) {
                this.inited = true;
                this.logFormat = logFormat;
                this.withColor = withColor;
            }
            ;
            log(status) {
            }
            ;
            send() {
            }
            ;
            save() {
                return;
            }
            format(status, ...log) {
                var fullLog, date;
                // To string.
                log.forEach((value, index) => {
                    switch (typeof value) {
                        case 'bigint':
                        case 'number':
                        case 'symbol':
                        case 'boolean':
                            fullLog += value.toString();
                            break;
                        case 'function':
                            fullLog += ` f@${value.name}()`;
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
                }
                return '';
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
//# sourceMappingURL=Log4ts.js.map