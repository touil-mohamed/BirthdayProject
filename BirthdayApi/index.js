const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const swaggerUiPath = require("swagger-ui-dist").getAbsoluteFSPath();

const classRoute = require("./routes/class.routes");
const studentRoute = require("./routes/student.routes");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname.startsWith("/Gift")) {
    classRoute.handleRoutes(req, res);
  } else if (parsedUrl.pathname.startsWith("/Student")) {
    studentRoute.handleRoutes(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});
