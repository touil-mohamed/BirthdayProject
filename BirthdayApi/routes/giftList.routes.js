const giftListController = require("../controller/giftList.controller");

function handleRoutes(req, res) {
  const urlParts = req.url.split('/');

  try {
    if (req.method === "GET" && req.url === "/GiftsList") {
      giftListController.getAllGiftList(req, res);
    } else if (req.method === "GET" && urlParts[1] === "GiftsList" && urlParts.length === 3) {
      const id = urlParts[2];
      giftListController.getGiftListById(req, res, id);
    } else if (req.method === "POST" && req.url === "/GiftsList/create") {
      giftListController.createGiftList(req, res);
    } else if (
      (req.method === "PATCH" || req.method === "PUT") &&
      req.url.startsWith("/GiftsList/update/")
    ) {
      const id = urlParts.pop();
      giftListController.updateGiftList(req, res, id);
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