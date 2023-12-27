const http = require("http");
const reoutes = require('./routes')

const server = http.createServer(reoutes);

server.listen(3000);
