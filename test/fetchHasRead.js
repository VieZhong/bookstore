var http = require('http');
var fs = require('fs');

var getBooks = function(page, books) {
  return new Promise(function(resolve, reject) {
    http.get("http://localhost/program/MyNovels/MyNovels.php?page=" + page, (res) => {　
      let doc = '';
      res.on('data', (chunk) => {
        doc += chunk;
      });
      res.on('end', () => {
        let text = [],
          rst;
        let regx = /<tr><td>(\d+)<\/td><td>([^<]+)<\/td><td>([^<]+)<\/td><td>([^<]+)<\/td><\/tr>/g;
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

getBooks(1, []).then(function(rst) {
  return getBooks(2, rst);
}).then(function(rst) {
  return getBooks(3, rst);
}).then(function(rst) {
  return getBooks(4, rst);
}).then(function(rst) {
  return getBooks(5, rst);
}).then(function(rst) {
  return getBooks(6, rst);
}).then(function(rst) {
  return getBooks(7, rst);
}).then(function(rst) {
  return getBooks(8, rst);
}).then(function(rst) {
  return getBooks(9, rst);
}).then(function(rst) {
  fs.writeFile('E:\\project\\books\\stores.js', JSON.stringify(rst), (err) => {
    if (err) {
      console.log("getBooks wrong!");
    } else {
      console.log("getBooks success!");
    }
  });
});