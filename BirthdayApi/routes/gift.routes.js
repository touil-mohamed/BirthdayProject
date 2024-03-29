
const giftController = require("../controller/gift.controller");

function handleRoutes(req, res) {
  try {
    if (req.method === "GET" && req.url === "/GiftsList") {
      giftController.getAllGiftLists
    } else if (req.method === "GET" && req.url.startsWith("/GiftList/")) {
      // Extract the GiftList ID from the URL
      const id = req.url.split("/").pop();
      giftController.getGiftListById(req, res, id);
    } else if (req.method === "POST" && req.url === "/GiftList/create") {
      giftController.createGiftList(req, res);
    } else if (
      (req.method === "PATCH" || req.method === "PUT") &&
      req.url.startsWith("/GiftList/update/")
    ) {
      // Extract the GiftList ID from the URL
      const id = req.url.split("/").pop();
      giftController.updateGiftList(req, res, id);
    } else {
      // Handle 404 - Not Found
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  } catch (error) {
    console.error("error : ", error);
  }
}

module.exports = {
  handleRoutes,
};
