const giftServices = require("../services/gift.services");
const url = require("url");

// Utiliser une fonction d'analyse pour le corps JSON
const parseJsonBody = (req, callback) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    try {
      const json = JSON.parse(body);
      callback(null, json);
    } catch (error) {
      callback(error, null);
    }
  });
};

async function getAllGift(req, res) {
  try {
    const allGift = await giftServices.getAllGifts();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(allGift));
  } catch (error) {
    console.error("Error in getAllGift:", error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
}

async function getGiftById(req, res) {
  try {
    const listId = url.parse(req.url, true).pathname.split("/").pop(); // Récupère le dernier segment de l'URL
    const gift = await giftServices.getGiftById(listId);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(gift));
  } catch (error) {
    console.error("Error in getGiftById:", error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
}

async function createGift(req, res) {
  parseJsonBody(req, async (error, newGift) => {
    if (error) {
      console.error("Error parsing JSON:", error);
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Bad Request");
      return;
    }

    try {
      const createdGift = await giftServices.createGiftList(newGift);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(createdGift));
    } catch (error) {
      console.error("Error in createGift:", error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  });
}

async function updateGift(req, res) {
  const listId = url.parse(req.url, true).pathname.split("/").pop();
  parseJsonBody(req, async (error, updateData) => {
    if (error) {
      console.error("Error parsing JSON:", error);
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Bad Request");
      return;
    }

    try {
      const updatedGift = await giftServices.updateGift(listId, updateData);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updatedGift));
    } catch (error) {
      console.error("Error in updatedGift:", error);
      res.writeHead(error.message === "Gift  not found" ? 404 : 500, { "Content-Type": "text/plain" });
      res.end(error.message);
    }
  });
}

async function deleteGift(req, res) {
  const listId = url.parse(req.url, true).pathname.split("/").pop();
  try {
    await giftServices.deleteGift(listId);
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Gift list deleted successfully");
  } catch (error) {
    console.error("Error in deleteGift:", error);
    res.writeHead(error.message === "Gift not found" ? 404 : 500, { "Content-Type": "text/plain" });
    res.end(error.message);
  }
}

async function getGiftsByListId(req, res) {
  try {
    const listId = url.parse(req.url, true).pathname.split("/").pop();
    const giftByList = await giftServices.getGiftsByListId(listId);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(giftByList));
  } catch (error) {
    console.error("Error in GiftsByListId:", error);
    res.writeHead(error.message === "Gift by List not found" ? 404 : 500, { "Content-Type": "text/plain" });
    res.end(error.message);
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