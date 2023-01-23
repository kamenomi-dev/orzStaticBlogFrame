/// <reference path="./Log4ts.ts" />

namespace orzBlogFrame.Utils {
  export class LanguageEx {
    private nodesEle = $('.orzLanguage');
    private languageIndex: string[] = [];
    private langJson: any;
    private subLangJson: any;

    constructor() {
      this.getSupoortLang();
      logger.log('DEBUG', 'orzBlogFrame.Utils@LanguageEx Init!');
    };

    public async getSupoortLang(isHotReload: boolean = false): Promise<string[]> {
      if (this.languageIndex.length == 0 || isHotReload)
        $.ajax({
          url: '/language/langIndex.json',
          async: false,
          dataType: 'JSON',
          success: (response: object) => {
            for (let locale in response) {
              this.languageIndex.push(locale);
            };
          },
          error: () => {
            logger.log('ERROR', 'LangIndex is gone!');
          }
        });
      return this.languageIndex;
    };

    public async set(locale: string = 'zh-CN', subLocale: string = 'en-US') {
      /* isExist */
      if (this.languageIndex.indexOf(locale) == -1) {
        logger.log('WARN', `${locale} is not supported!`);
        return false;
      };
      if (this.languageIndex.indexOf(subLocale) == -1) {
        logger.log('WARN', `${subLocale} is not supported!`);
        return false;
      };

      /* Get *.lang.json */
      if (!this.langJson || this.langJson['language'] != locale)
        this.langJson = await this.getLangJson(locale);
      if (!this.subLangJson || this.subLangJson['language'] != subLocale)
        this.subLangJson = await this.getLangJson(subLocale);
        // console.log( this.langJson, this.subLangJson);

      /* Set element */
      this.nodesEle = $('.orzLanguage');
      $('html').attr('lang', locale);
      this.refresh();
      logger.log('DEBUG', 'Succeefully change language.');
      return true;
    };

    public async refresh(id?: string) {
      const lang = this.langJson['language'];
      this.nodesEle.each((index, node) => {
        let node_ = $(node);
        let value: string;
        if (node_.attr('by') == id && id) value = id;
        else value = node_.attr('by') as string;

        let attrFrom = node_.attr('from');
        if ((value in this.langJson[lang]) || (value in this.subLangJson[lang]))
          node_.text(
            attrFrom
            ? attrFrom.replace('$1', (this.langJson[lang][value] || this.subLangJson[lang][value]).toString())
            : (this.langJson[lang][value] || this.subLangJson[lang][value]).toString()
          );
        else
          logger.log('WARN', `${value} isn't in ${lang} langFile. huh?`)
      });
    };

    protected async getLangJson(arg: string): Promise<any> {
      let result;
      $.ajax({
        url: `/language/${arg}.lang.json`,
        async: false,
        dataType: 'JSON',
        success: response => {
          result = response;
        },
        error: () => {
          logger.log('ERROR', 'LangIndex is not consistent!');
        }
      });
      return result;
    };
  };
};