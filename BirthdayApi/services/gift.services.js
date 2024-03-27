const mysql = require("mysql2/promise");
require("dotenv").config();

// Configurer la connexion à la base de données
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
};

// Fonction pour créer une connexion à la base de données
async function createDatabaseConnection() {
  return await mysql.createConnection(dbConfig);
}

// Récupère tous les cadeaux
async function getAllGifts() {
  const connection = await createDatabaseConnection();
  try {
    const [rows] = await connection.query('SELECT * FROM gifts');
    return rows;
  } finally {
    await connection.end();
  }
}

// Récupère un cadeau par son ID
async function getGiftById(giftId) {
  const connection = await createDatabaseConnection();
  try {
    const [rows] = await connection.query('SELECT * FROM gifts WHERE id = ?', [giftId]);
    if (rows.length > 0) {
      return rows[0];
    } else {
      throw new Error("Gift not found");
    }
  } finally {
    await connection.end();
  }
}

// Crée un nouveau cadeau
async function createGift(newGift) {
  const connection = await createDatabaseConnection();
  try {
    const [result] = await connection.query('INSERT INTO gifts SET ?', newGift);
    const createdGift = { id: result.insertId, ...newGift };
    return createdGift;
  } finally {
    await connection.end();
  }
}

// Met à jour un cadeau
async function updateGift(giftId, updateData) {
  const connection = await createDatabaseConnection();
  try {
    const [result] = await connection.query('UPDATE gifts SET ? WHERE id = ?', [updateData, giftId]);
    if (result.affectedRows > 0) {
      const updatedGift = { id: giftId, ...updateData };
      return updatedGift;
    } else {
      throw new Error("Gift not found");
    }
  } finally {
    await connection.end();
  }
}

// Supprime un cadeau
async function deleteGift(giftId) {
  const connection = await createDatabaseConnection();
  try {
    const [result] = await connection.query('DELETE FROM gifts WHERE id = ?', [giftId]);
    if (result.affectedRows === 0) {
      throw new Error("Gift not found or already deleted");
    }
  } finally {
    await connection.end();
  }
}

// Récupère tous les cadeaux d'une liste de cadeaux spécifique
async function getGiftsByListId(listId) {
  const connection = await createDatabaseConnection();
  try {
    const [rows] = await connection.query('SELECT * FROM gifts WHERE list_id = ?', [listId]);
    return rows;
  } finally {
    await connection.end();
  }
}

// Fonction pour créer une connexion à la base de données
async function createDatabaseConnection() {
  return await mysql.createConnection(dbConfig);
}

// Opérations CRUD pour la table gift_lists
async function getAllGiftLists() {
  const connection = await createDatabaseConnection();
  try {
    const [rows] = await connection.query('SELECT * FROM gift_lists');
    return rows;
  } finally {
    await connection.end();
  }
}

async function createGiftList(newGiftList) {
  const connection = await createDatabaseConnection();
  try {
    const [result] = await connection.query('INSERT INTO gift_lists SET ?', newGiftList);
    const createdGiftList = { id: result.insertId, ...newGiftList };
    return createdGiftList;
  } finally {
    await connection.end();
  }
}

async function updateGiftList(listId, updateData) {
  const connection = await createDatabaseConnection();
  try {
    const [result] = await connection.query('UPDATE gift_lists SET ? WHERE id = ?', [updateData, listId]);
    if (result.affectedRows > 0) {
      return { id: listId, ...updateData };
    } else {
      throw new Error("Gift list not found");
    }
  } finally {
    await connection.end();
  }
}

async function deleteGiftList(listId) {
  const connection = await createDatabaseConnection();
  try {
    const [result] = await connection.query('DELETE FROM gift_lists WHERE id = ?', [listId]);
    if (result.affectedRows === 0) {
      throw new Error("Gift list not found or already deleted");
    }
  } finally {
    await connection.end();
  }
}

// Exportation des fonctions du module
module.exports = {
  getAllGifts,
  getGiftById,
  createGift,
  updateGift,
  deleteGift,
  getGiftsByListId,
  getAllGiftLists,
  createGiftList,
  updateGiftList,
  deleteGiftList,
  
};