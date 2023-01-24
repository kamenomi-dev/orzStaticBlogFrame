namespace orzBlogFrame.Utils {
  export class File {
    constructor() {
      return;
    };
    /**
     * isExistFile
     */
    public async get(urlPath: string): Promise<{ data: any; isExist: boolean; }> {
      var result = { data: '', isExist: false };
      await fetch(urlPath)
        .then(response => {
          result.isExist = response.ok;
          return response.text();
        })
        .then(text => result.data = text);
      return result;
    }
  };
};