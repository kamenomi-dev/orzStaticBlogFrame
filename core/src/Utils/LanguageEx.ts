/// <reference path="./Log4ts.ts" />

namespace orzBlogFrame.Utils {
  export class LanguageEx {
    private nodes = $('.orzLanguage');
    private languageIndex: string[] = [];
    private langJson: any;
    private subLangJson: any;

    constructor() {
      this.getSupoortLang();
      logger.log('DEBUG', 'orzBlogFrame.Utils@LanguageEx Init!');
    };

    public async getSupoortLang(reload: boolean = false): Promise<string[]> {
      if (this.languageIndex.length == 0 || reload)
        await fetch('/language/langIndex.json')
          .then(langFile => langFile.json())
          .then(lang => this.languageIndex = lang);
      return this.languageIndex;
    };

    public async set(reload: boolean = false, locale: string = 'zh-CN', subLocale: string = 'en-US') {
      if (this.languageIndex.indexOf(locale) == -1) {
        logger.log('WARN', `${locale} is not supported!`);
        return false;
      };
      if (this.languageIndex.indexOf(subLocale) == -1) {
        logger.log('WARN', `${subLocale} is not supported!`);
        return false;
      };

      /* Get *.lang.json */
      if (locale == subLocale) {
        this.subLangJson
          = this.langJson['language'] == locale
          ? this.langJson
          : (this.langJson = await this.getLangJson(locale));
      }else{
        if (reload || this.langJson['language'] != locale)
          this.langJson = await this.getLangJson(locale);
        if (reload || this.subLangJson['language'] != subLocale)
          this.subLangJson = await this.getLangJson(subLocale);
      };

      /* Set element */
      $('html').attr('lang', locale);
      this.nodes = $('.orzLanguage');
      this.refresh();
      logger.log('DEBUG', 'Succeefully change language.');
      return true;
    };

    public async refresh(id?: string) {
      var lang = this.langJson['language'];
      this.nodes.each((index, node) => {
        var node_ = $(node);
        var value: string
          = (node_.attr('by') == id && id)
          ? id : node_.attr('by') as string;

        var attrFrom = node_.attr('from');
        var text = (this.langJson[lang][value] || this.subLangJson[lang][value]).toString()
        if (value in (this.langJson[lang] || value in this.subLangJson[lang]))
          node_.text(
            attrFrom
              ? attrFrom.replace('$1', text)
              : text
          );
        else
          logger.log('WARN', `${value} isn't in ${lang} langFile. huh?`)
      });
    };

    protected async getLangJson(arg: string): Promise<any> {
      var result;
      await fetch(`/language/${arg}.lang.json`)
        .then(response => response.json())
        .then(json => result = json)
        .catch((er) => 
          logger.log('ERROR', `LangIndex isn't consistent! here: ${arg} - ${er.message}`)
        );
      return result;
    };
  };
};