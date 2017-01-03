var http = require('http');
var fs = require('fs');

var getBooks = function(books) {
  return new Promise((resolve, reject) => {
    http.get("http://localhost/program/MyNovels/willingread/list.php", (res) => {　
      let doc = '';
      res.on('data', (chunk) => {
        doc += chunk;
      });
      res.on('end', () => {
        let text = [],
          rst;
        let regx = /<td>(\d+)<\/td><td>([^<]+)<\/td><td>([^<]+)<\/td><td>([^<]+)<\/td>/g;
        while ((rst = regx.exec(doc)) != null) {
          text.push({
            'id': rst[1],
            'name': rst[2],
            'author': rst[3],
            'country': rst[4]
          });
        }
        resolve(books.concat(text));
      });
    }).on('error', (e) => {　　
      reject(e);
    });
  });
};

getBooks([]).then((rst) => {
  fs.writeFile('E:\\project\\books\\store\\willRead.js', JSON.stringify(rst), (err) => {
    if (err) {
      console.log("getBooks wrong!");
    } else {
      console.log("getBooks success!");
    }
  });
});