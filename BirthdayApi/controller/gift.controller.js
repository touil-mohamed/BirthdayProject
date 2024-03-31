const giftServices = require("../services/gift.services");
const url = require("url");

async function getAllGift(req, res) {
  try {
    const allGift = await giftServices.getAllGifts();
    res.send({
      gift: allGift});
  } catch (error) {
    console.error("Error in getAllGift:", error);
    if (error.message === "Gift not found") {
      res.status(404).send("Gift not found");
    } else {
      res.status(500).send("Internal server error");
    }
  }
}

async function getGiftById(req, res) {
  try {
    const listId = url.parse(req.url, true).pathname.split("/").pop(); // Récupère le dernier segment de l'URL
    const gift = await giftServices.getGiftById(listId);
    res.send({
      gift: gift});
  } catch (error) {
    console.error("Error in getGiftById:", error);
    if (error.message === "Gift not found") {
      res.status(404).send("Gift not found");
    } else {
      res.status(500).send("Internal server error");
    }
  }
}

async function createGift(req, res) {
    
    try {
      const newGift = req.body;
      const createdGift = await giftServices.createGift(newGift);
      res.send(createdGift);
    } catch (error) {
      console.error("Error in createGift:", error);
      if (error.message === "Gift not found") {
        res.status(404).send("Gift not found");
      } else {
        res.status(500).send("Internal server error");
      }
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
      if (error.message === "Gift not found") {
        res.status(404).send("Gift not found");
      } else {
        res.status(500).send("Internal server error");
      }
    }
}


async function deleteGift(req, res) {
  const listId = url.parse(req.url, true).pathname.split("/").pop();
  try {
    await giftServices.deleteGift(listId);
    res.send("Gift list deleted successfully");
  } catch (error) {
    console.error("Error in deleteGift:", error);
    if (error.message === "Gift not found") {
      res.status(404).send("Gift not found");
    } else {
      res.status(500).send("Internal server error");
    }
  }
}



async function getGiftsByListId(req, res) {
  try {
    const listId = url.parse(req.url, true).pathname.split("/").pop();
    const giftByList = await giftServices.getGiftsByListId(listId);
    res.send({
      gift: giftByList});
  } catch (error) {
    console.error("Error in GiftsByListId:", error);
    if (error.message === "Gift not found") {
      res.status(404).send("List Gift not found");
    } else {
      res.status(500).send("Internal server error");
    }
  }
}

async function reserveGift(req, res) {
  const giftId = url.parse(req.url, true).pathname.split("/").pop();
  const { reserved } = req.body;

  // Vérifier si la réservation est spécifiée
  if (reserved === undefined || reserved === null) {
    res.status(400).send("La réservation du cadeau doit être spécifiée.");
    return;
  }

  try {
    // Réserver ou annuler la réservation du cadeau en fonction de la valeur de 'reserved'
    const updatedGift = await giftServices.reserveGift(giftId, reserved);
    res.send({
      gift : updatedGift
    });
  } catch (error) {
    console.error("Error in reserveGift:", error);
    res.status(error.message === "Gift not found" ? 404 : 500).send(error.message);
  }
}


module.exports = {
  getAllGift,
  getGiftById,
  createGift,
  updateGift,
  deleteGift,
  getGiftsByListId,
  reserveGift
};