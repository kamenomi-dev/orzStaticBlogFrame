declare namespace orzBlogFrame.Utils {
    export class Log4ts {
        private inited;
        private logFormat;
        private withColor;
        constructor(logFormat?: string, withColor?: boolean);
        log<status extends keyof typeof LogStatus>(status: status): void;
        send(): void;
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
