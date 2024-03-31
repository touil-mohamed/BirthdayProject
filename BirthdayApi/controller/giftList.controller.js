const giftListServices = require("../services/giftList.services");
const url = require("url");


async function getAllGiftList(req, res) {
  try {
    const allGiftsList = await giftListServices.getAllGiftLists();
    res.send(allGiftsList);
  } catch (error) {
    console.error("Error in getAllGiftLists:", error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.send("Internal Server Error");
  }
}

async function getGiftListById(req, res) {
  try {
    const listId = url.parse(req.url, true).pathname.split("/").pop(); // Récupère le dernier segment de l'URL
    const giftList = await giftListServices.getGiftListsById(listId);
    res.send(giftList);
  } catch (error) {
    console.error("Error in giftListById:", error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
}

async function createGiftList(req, res) {
  
    try {
      const newGiftList = req.body;
      const createdGiftList = await giftListServices.createGiftList(newGiftList);
      res.send(createdGiftList);
    } catch (error) {
      console.error("Error in createdGiftList:", error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.send("Internal Server Error");
    }
}

async function updateGiftList(req, res) {
  const listId = url.parse(req.url, true).pathname.split("/").pop();
    
    try {
      const updateData = req.body;
      const updatedGiftList = await giftListServices.updateGiftList(listId, updateData);
      res.send(JSON.stringify(updatedGiftList));
    } catch (error) {
      console.error("Error in updatedGiftList:", error);
      res.writeHead(error.message === "Gift List  not found" ? 404 : 500, { "Content-Type": "text/plain" });
      res.send(error.message);
    }
}

async function deleteGiftList(req, res) {
  const listId = url.parse(req.url, true).pathname.split("/").pop();
  try {
    await giftListServices.deleteGiftList(listId);
    res.send("Gift list deleted successfully");
  } catch (error) {
    console.error("Error in deleteGift:", error);
    res.writeHead(error.message === "Gift not found" ? 404 : 500, { "Content-Type": "text/plain" });
    res.send(error.message);
  }
}


module.exports = {
  getAllGiftList,
  getGiftListById,
  createGiftList,
  updateGiftList,
  deleteGiftList,
};