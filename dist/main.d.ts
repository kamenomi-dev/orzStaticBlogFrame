declare namespace orzBlogFrame.Utils {
    export class Log4ts {
        private inited;
        private logFormat;
        private withColor;
        private history;
        constructor(logFormat?: string, withColor?: boolean);
        log<status extends keyof typeof LogStatus>(status: status, ...log: any[]): void;
        send<status extends keyof typeof LogStatus>(status: status, ...log: any[]): void;
        save(): string | void;
        private format;
    }
    enum LogStatus {
        INFO = 0,
        ERROR = 1,
        WARN = 2
    }
    export {};
}
declare namespace orzBlogFrame {
    const logger: Utils.Log4ts;
    class orzProcessor {
        constructor();
        private init;
    }
}
