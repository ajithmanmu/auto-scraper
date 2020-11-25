export const queryDOM = ($: any, element:string, output:any): {output:any} => {
  $(element).children().each(function(this: any, _i: any, _elem: any) {
    // Iterate over each Row
    let overviewField = '';
    let overviewValue = '';
    $(this).children().each(function(this: any, _i: any, _elem: any) {
      let field = null;
      let value = null;
      if($(this).find('span').length > 0) {
        field = $(this).find('span').text().trim().replace(/[^A-Z0-9]/ig, "_");
      } else {
        if($(this).find('img').length > 0) {
          const imgUrl = $(this).find('img').attr('src');
          value = imgUrl.includes('checked') ? true : false;
        }
        else {
          value = $(this).text().trim();
        }
      }
      if(field) {
        overviewField = field;
      }
      if(value) {
        overviewValue = value;
      }
    });
    output[overviewField] = overviewValue;
  });
  return output;
}
