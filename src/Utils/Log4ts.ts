namespace orzBlogFrame.Utils {
  export class Log4ts {
    private inited!: boolean;
    private logFormat!: string;
    private withColor!: boolean;
    constructor(logFormat: string = '[{HH}:{MM}:{SS} {status}]:{log}', withColor: boolean = false) {
      this.inited = true;
      this.logFormat = logFormat;
      this.withColor = withColor;
    };
    public log<status extends keyof typeof LogStatus>(status: status) { // With saving.

    };
    public send() { // Without saving.
      
    };
    public save(): string | void { // Return all of logs.
      return;
    }
    private format<status extends keyof typeof LogStatus>(status: status, ...log: any[]): string {
      var
        fullLog: string,
        date: string;

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
            fullLog += `\n __orzBlogFrame.Utils@Log4ts.format: log${index} is undefined __`
            break;
        }
      });

      // Format time
      {
        
      }
      
      return '';
    };
  };
  enum LogStatus {
    INFO, ERROR, WARN
  };
};