namespace orzBlogFrame.Utils {
  export class File {
    constructor() {
      return;
    };
    /**
     * isExistFile
     */
    public isExistFile(UrlPath: string): boolean {
      let isExist: boolean = false;
      $.ajax({
        url: UrlPath,
        async: false,
        success: () => {
          isExist = true;
        }
      });
      return isExist;
    }
  };
};