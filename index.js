/* eslint-disable object-curly-spacing */
const http = require('node:http');
const fs = require('node:fs');

const server = http.createServer();

server.on('request', (request, res) => {
  const url = new URL(request.url, 'http://localhost:8080/');
  console.log(url);
  let filename;
  switch (url.pathname) {
    case '/':
      filename = 'index';
      break;
    case '/about':
      filename = 'about';
      break;
    case '/contact':
      filename = 'contact-me';
      break;
    default:
      filename = 404;
      break;
  }
  filename = filename + '.html';

  fs.readFile(filename, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end('404 Not Found');
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    return res.end();
  });
});

server.listen(8080);
