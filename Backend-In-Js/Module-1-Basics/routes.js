const fs = require("fs");

const routesHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write(`
      <html><head></head><body>
      <form action='/message' method='POST'><input type='text' name='message'></input><button type='submit'>Send</button></form>
      </body></html>
      `);

    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (data) => {
      body.push(data);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1].replace("+", " ");
      fs.writeFileSync("message.txt", message);
    });

    res.writeHead(302, {
      location: "/",
    });
    
    return res.end();
  }
};

module.exports = routesHandler;
