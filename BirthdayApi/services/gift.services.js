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
    const [rows] = await connection.query('SELECT * FROM gift');
    return rows;
  } finally {
    await connection.end();
  }
}

// Récupère un cadeau par son ID
async function getGiftById(giftId) {
  const connection = await createDatabaseConnection();
  try {
    const [rows] = await connection.query('SELECT * FROM gift WHERE id = ?', [giftId]);
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
    const [result] = await connection.query('INSERT INTO gift SET ?', newGift);
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
    const [result] = await connection.query('UPDATE gift SET ? WHERE id = ?', [updateData, giftId]);
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
    const [result] = await connection.query('DELETE FROM gift WHERE id = ?', [giftId]);
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
    const [rows] = await connection.query('SELECT * FROM gift WHERE list_id = ?', [listId]);
    return rows;
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
};