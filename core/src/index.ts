/// <reference path="./orzProcessor.ts" />
{
  $(() => {
    var orzProcessor = new orzBlogFrame.orzProcessor();
    orzProcessor.init({
      'defaultTheme': 'light'
    });

    // orzBlogFrame.logger.log('INFO', 'is could be log?');
  });
};