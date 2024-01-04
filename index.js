/* eslint-disable object-curly-spacing */
const http = require('node:http');
const fs = require('node:fs');

const server = http.createServer();

server.on('request', (request, res) => {
  const url = new URL(request.url, 'http://localhost:8080/');
  let filename;
  switch (url.pathname) {
    case '/':
      filename = 'index.html';
      break;
    case '/about':
      filename = 'about.html';
      break;
    case '/contact':
      filename = 'contact-me.html';
      break;
    case '/style.css':
      filename = 'style.css';
      break;
    default:
      filename = '404.html';
      break;
  }

  fs.readFile(filename, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end('404 Not Found');
    }
    // eslint-disable-next-line max-len
    res.writeHead(200, { 'Content-Type': 'text/' + filename.substring(filename.indexOf('.') + 1) });
    res.write(data);
    return res.end();
  });
});

server.listen(8080);
