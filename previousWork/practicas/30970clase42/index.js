const { writeFileSync } = require('fs');
const http = require('http');

const opciones = {
  method: 'GET',
  hostname: 'jsonplaceholder.typicode.com',
  port: 80,
  path: '/posts'
}

let dataGuardada = '';

const req = http.request(opciones, (res) => {
  res.on('data', (buffer) => {
    dataGuardada += buffer.toString()
  });

  res.on('end', () => {
    writeFileSync('./postsHttp.json', dataGuardada);
  });
});

req.end();


