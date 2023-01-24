declare namespace orzBlogFrame.Utils {
    class File {
        constructor();
        get(urlPath: string): Promise<{
            data: any;
            isExist: boolean;
        }>;
    }
}
declare namespace orzBlogFrame.Utils {
    export class Log4ts {
        private inited;
        private logFormat;
        private withColor;
        private history;
        constructor(logFormat?: string, withColor?: boolean);
        log<status extends keyof typeof ELogStatus>(status: status, ...log: any[]): void;
        send<status extends keyof typeof ELogStatus>(status: status, ...log: any[]): void;
        save(): string | void;
        private format;
        private caller;
    }
    enum ELogStatus {
        INFO = 0,
        ERROR = 1,
        WARN = 2,
        DEBUG = 3
    }
    export {};
}
declare namespace orzBlogFrame.Utils {
    class LanguageEx {
        private nodes;
        private languageIndex;
        private langJson;
        private subLangJson;
        constructor();
        getSupoortLang(reload?: boolean): Promise<string[]>;
        set(reload?: boolean, locale?: string, subLocale?: string): Promise<boolean>;
        refresh(id?: string): Promise<void>;
        protected getLangJson(arg: string): Promise<any>;
    }
}
declare const License = "MIT License";
declare namespace orzBlogFrame {
    const logger: Utils.Log4ts;
    const langs: Utils.LanguageEx;
    const file: Utils.File;
    class orzProcessor {
        constructor();
        private load;
        init(config: {
            copyright?: string;
            defaultTheme?: string;
        }): Promise<void>;
    }
}
