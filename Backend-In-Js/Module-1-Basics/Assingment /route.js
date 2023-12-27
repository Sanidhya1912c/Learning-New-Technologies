const fs = require("fs");

const routeHandler = (req, res) => {
  const url = req.url;

  if (url === "/") {
    res.write(`
          <html><head></head><body>
          <form action='/create-user' method='POST'><input type='text' name='message'></input><button type='submit'>Send</button></form>
          </body></html>
          `);

    return res.end();
  }
  if (url === "/create-user") {
    const body = [];
    req.on("data", (data) => body.push(data));

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const userName = parsedBody.split("=")[1];

      const data = fs.readFileSync("./data.txt");
      const parsedData = Buffer.concat([data]).toString();

      const users = [userName, ...[parsedData.split(',')]];
      fs.writeFileSync("./data.txt", [users].toString());

      console.log(users)
    });

    res.writeHead(302, { location: "/" });

    return res.end();
  }
};

module.exports = routeHandler;
