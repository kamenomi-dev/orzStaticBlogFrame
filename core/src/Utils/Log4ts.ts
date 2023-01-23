namespace orzBlogFrame.Utils {
  export class Log4ts {
    private inited: boolean = false;
    private logFormat: string = '[{HH}:{MM}:{SS} {status}]:{log}';
    private withColor: boolean = false;
    private history: string = '====== Logger Inited ======';

    constructor(logFormat: string = '[{HH}:{MM}:{SS} {status}]:{log}', withColor: boolean = false) {
      this.inited = true;
      this.logFormat = logFormat.trim();
      this.withColor = withColor;

      this.log('DEBUG', 'orzBlogFrame.Utils@Log4ts Init!');
    };

    public log<status extends keyof typeof ELogStatus>(status: status, ...log: any[]) { // With saving.
      let formatText = this.format(status, ...log);
      this.history += `\n${formatText}`;
      console.log(formatText);
    };

    public send<status extends keyof typeof ELogStatus>(status: status, ...log: any[]) { // Without saving.
      console.log(this.format(status, ...log));
    };

    public save(): string | void { // Return all of logs.
      return this.history;
    }

    private format<status extends keyof typeof ELogStatus>(status: status, ...log: any[]): string {
      var
        fullLog: string = '',
        format: string = '';

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
            fullLog += ` Function@${value.name || '<Anonymous>'}(<${value.length} arg(s)>...)`;
            break;
          case 'object':
            if (value.constructor == Array)
              fullLog += ` Array@[${value.toString().replace(',', ', ')}]`
            else
              fullLog += ' [object]';
            break;
          case 'string':
            fullLog += ` ${value}`;
            break;
          default:
            fullLog += `\n __orzBlogFrame.Utils@Log4ts.format: log${index} is undefined __`
            break;
        }
      });

      // Format time
      {
        let
          currentDate = new Date(),
          /* - - - - - - - - - - - - - - - - - */
          year = currentDate.getFullYear().toString(),
          month = (currentDate.getMonth() + 1).toString(),
          day = currentDate.getDay().toString(),
          hour = currentDate.getHours().toString(),
          minute = currentDate.getMinutes().toString(),
          second = currentDate.getSeconds().toString();

        format = this.logFormat
          .replace(/\{y+\}/g, year)
          .replace(/\{m+\}/g, month.length == 1 ? `0${month}` : month)
          .replace(/\{d+\}/g, day.length == 1 ? `0${day}` : day)
          .replace(/\{H+\}/g, hour.length == 1 ? `0${hour}` : hour)
          .replace(/\{M+\}/g, minute.length == 1 ? `0${minute}` : minute)
          .replace(/\{S+\}/g, second.length == 1 ? `0${second}` : second);
      };

      // Format all
      {
        format = format
          .replace('{status}', status)
          .replace('{log}', fullLog || ' null');
      };
      return format;
    };

    private caller(): ILog4tsStackInfo | undefined {
      var regexMatches: RegExpExecArray;
      var stack: string = '';
      try {
        stack = ((new Error()).stack as string).split('\n')[1];
      } catch { };

      regexMatches = /at [^\/]*((?:(?:[a-zA-Z]+:)|(?:[\/])|(?:\\\\))(?:.+)):(\d+):(\d+)/.exec(stack) as RegExpExecArray;
      if (regexMatches || regexMatches == 4) {
        return {
          script: regexMatches[1],
          line: Number(regexMatches[2]),
          column: Number(regexMatches[3])
        };
      };
    };
  };
  interface ILog4tsStackInfo {
    script: string,
    line: number,
    column: number
  }
  enum ELogStatus {
    INFO, ERROR, WARN, DEBUG
  };
};