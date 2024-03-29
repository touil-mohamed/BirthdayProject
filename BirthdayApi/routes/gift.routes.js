const giftController = require("../controller/gift.controller");

function handleRoutes(req, res) {
  const urlParts = req.url.split('/');

  try {
    if (req.method === "GET" && req.url === "/Gifts") {
      giftController.getAllGift(req, res);
    } else if (req.method === "GET" && urlParts[1] === "Gifts" && urlParts.length === 3) {
      const id = urlParts[2];
      giftController.getGiftById(req, res, id);
    } else if (req.method === "POST" && req.url === "/Gifts/create") {
      giftController.createGift(req, res);
    } else if (
      (req.method === "PATCH" || req.method === "PUT") &&
      req.url.startsWith("/Gift/update/")
    ) {
      const id = urlParts.pop();
      giftController.updateGift(req, res, id);
    } else if (
      req.method === "GET" &&
      urlParts[1] === "Gifts" &&
      urlParts[2] === "List" &&
      urlParts.length === 4
    ) {
      const listId = urlParts[3];
      giftController.getGiftsByListId(req, res, listId);
    } else {
      // Handle 404 - Not Found
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  } catch (error) {
    console.error("error : ", error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
}

module.exports = {
  handleRoutes,
};