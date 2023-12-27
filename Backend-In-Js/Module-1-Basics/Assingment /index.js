/* 
1. Spin up a node-js server at 3000
2. Handle two routes / , /create-users
3. add a form with a username input to '/' page and submit a post request to '/create-user' upon a button click 
4. add the create-user route and parse the incoming data then store it in a text file 
*/


const http = require("http");
const routes = require('./route')

const server = http.createServer(routes);

server.listen(3000);
