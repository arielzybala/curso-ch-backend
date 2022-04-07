const http = require("http");

let today = new Date();
let actualHour = today.getHours();

const server = http.createServer((req, res) => {
  res.status = 200;
  res.setHeader('Content-Type', 'text-plain')
  res.end(Saludar());
});


const Saludar = () => {
  if (actualHour > 6 && actualHour < 12) {
    return "Buenos dias!";
  } else if (actualHour > 13 && actualHour < 19) {
    return "Buenos tardes!";  
} else {
    return "Buenos Noches!";  
  }
};

const connectedServer = server.listen(8081, () => {
  console.log(`Serv Htttp listening on port ${connectedServer.address().port}`);
});
