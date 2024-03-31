const giftServices = require("../services/gift.services");
const url = require("url");

async function getAllGift(req, res) {
  try {
    const allGift = await giftServices.getAllGifts();
    res.send({
      gift: allGift});
  } catch (error) {
    console.error("Error in getAllGift:", error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.send("Internal Server Error");
  }
}

async function getGiftById(req, res) {
  try {
    const listId = url.parse(req.url, true).pathname.split("/").pop(); // Récupère le dernier segment de l'URL
    const gift = await giftServices.getGiftById(listId);
    res.send(gift);
  } catch (error) {
    console.error("Error in getGiftById:", error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.send("Internal Server Error");
  }
}

async function createGift(req, res) {
    
    try {
      const newGift = req.body;
      const createdGift = await giftServices.createGift(newGift);
      res.send(createdGift);
    } catch (error) {
      console.error("Error in createGift:", error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.send("Internal Server Error");
    }
}

async function updateGift(req, res) {
  const listId = url.parse(req.url, true).pathname.split("/").pop();
  const updateData = req.body;
    try {
      const updatedGift = await giftServices.updateGift(listId, updateData);
      res.send(updatedGift);
    } catch (error) {
      console.error("Error in updatedGift:", error);
      res.writeHead(error.message === "Gift  not found" ? 404 : 500, { "Content-Type": "text/plain" });
      res.send(error.message);
    }
}

async function deleteGift(req, res) {
  const listId = url.parse(req.url, true).pathname.split("/").pop();
  try {
    await giftServices.deleteGift(listId);
    res.send("Gift list deleted successfully");
  } catch (error) {
    console.error("Error in deleteGift:", error);
    res.writeHead(error.message === "Gift not found" ? 404 : 500, { "Content-Type": "text/plain" });
    res.send(error.message);
  }
}

async function getGiftsByListId(req, res) {
  try {
    const listId = url.parse(req.url, true).pathname.split("/").pop();
    const giftByList = await giftServices.getGiftsByListId(listId);
    res.send(giftByList);
  } catch (error) {
    console.error("Error in GiftsByListId:", error);
    res.writeHead(error.message === "Gift by List not found" ? 404 : 500, { "Content-Type": "text/plain" });
    res.send(error.message);
  }
}


module.exports = {
  getAllGift,
  getGiftById,
  createGift,
  updateGift,
  deleteGift,
  getGiftsByListId
};