/// <reference path="./Utils/Log4ts.ts" />

namespace orzBlogFrame {
  export const logger = new orzBlogFrame.Utils.Log4ts();
  export class orzProcessor {
    constructor() {
      this.init();
      logger.send('INFO', 'OK!');
    };
    private async init() {
      logger.log('INFO', 'orzBlogFrame@init begin.');
      $.cookie('-orzblog-config') as object;
    }
  };
  type orzblogConfig = {
    title: string,     // website title
    version: string,   // version on your change it
    keywords: string,  // some words to let anybody know what is this.
    copyright: string, // write yourself.
    description:string,// the website for description.
  };
};