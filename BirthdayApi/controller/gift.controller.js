const giftListServices = require("../services/giftList.services");
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

async function getAllGiftLists(req, res) {
  try {
    const allGiftLists = await giftListServices.getAllGiftLists();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(allGiftLists));
  } catch (error) {
    console.error("Error in getAllGiftLists:", error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
}

async function getGiftListById(req, res) {
  try {
    const listId = url.parse(req.url, true).pathname.split("/").pop(); // Récupère le dernier segment de l'URL
    const giftList = await giftListServices.getGiftListById(listId);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(giftList));
  } catch (error) {
    console.error("Error in getGiftListById:", error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
}

async function createGiftList(req, res) {
  parseJsonBody(req, async (error, newGiftList) => {
    if (error) {
      console.error("Error parsing JSON:", error);
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Bad Request");
      return;
    }

    try {
      const createdGiftList = await giftListServices.createGiftList(newGiftList);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(createdGiftList));
    } catch (error) {
      console.error("Error in createGiftList:", error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  });
}

async function updateGiftList(req, res) {
  const listId = url.parse(req.url, true).pathname.split("/").pop();
  parseJsonBody(req, async (error, updateData) => {
    if (error) {
      console.error("Error parsing JSON:", error);
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Bad Request");
      return;
    }

    try {
      const updatedGiftList = await giftListServices.updateGiftList(listId, updateData);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updatedGiftList));
    } catch (error) {
      console.error("Error in updateGiftList:", error);
      res.writeHead(error.message === "Gift list not found" ? 404 : 500, { "Content-Type": "text/plain" });
      res.end(error.message);
    }
  });
}

async function deleteGiftList(req, res) {
  const listId = url.parse(req.url, true).pathname.split("/").pop();
  try {
    await giftListServices.deleteGiftList(listId);
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Gift list deleted successfully");
  } catch (error) {
    console.error("Error in deleteGiftList:", error);
    res.writeHead(error.message === "Gift list not found" ? 404 : 500, { "Content-Type": "text/plain" });
    res.end(error.message);
  }
}


module.exports = {
  getAllGiftLists,
  getGiftListById,
  createGiftList,
  updateGiftList,
  deleteGiftList,
};