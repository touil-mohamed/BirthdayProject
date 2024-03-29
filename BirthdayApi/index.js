const http = require("http");
const url = require("url");

const giftRoute = require("./routes/gift.routes");
const giftListRoute = require("./routes/giftList.routes")

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname.startsWith("/GiftsList")) {
    giftListRoute.handleRoutes(req, res);
    
  } else if (parsedUrl.pathname.startsWith("/Gifts")) {
    giftRoute.handleRoutes(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(3001, () => {
  console.log("Server listening on http://localhost:3001");
});
