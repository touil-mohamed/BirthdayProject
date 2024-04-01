const mysql = require('mysql2/promise');
require('dotenv').config();

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

async function getGiftListsById(giftListId) {
  const connection = await createDatabaseConnection();
  try {
    const [rows] = await connection.query(
      'SELECT * FROM gift_lists where id = ?',
      [giftListId]
    );
    if (rows.length > 0) {
      return rows[0];
    } else {
      throw new Error("Gift List not found");
    }
  } finally {
    await connection.end();
  }
}

async function createGiftList(newGiftList) {
  const connection = await createDatabaseConnection();
  try {
    const [result] = await connection.query(
      'INSERT INTO gift_lists SET ?',
      newGiftList
    );
    const createdGiftList = { id: result.insertId, ...newGiftList };
    return createdGiftList;
  } finally {
    await connection.end();
  }
}

async function getActiveGiftLists() {
  const connection = await createDatabaseConnection();
  try {
    const [rows] = await connection.query(
      'SELECT * FROM gift_lists WHERE is_active = true'
    );
    return rows;
  } finally {
    await connection.end();
  }
}

async function updateGiftList(listId, updateData) {
  const connection = await createDatabaseConnection();
  try {
    const [result] = await connection.query(
      'UPDATE gift_lists SET ? WHERE id = ?',
      [updateData, listId]
    );
    if (result.affectedRows > 0) {
      return { id: listId, ...updateData };
    } else {
      throw new Error('Gift list not found');
    }
  } finally {
    await connection.end();
  }
}

async function deleteGiftList(listId) {
  const connection = await createDatabaseConnection();
  try {
    const [result] = await connection.query(
      'DELETE FROM gift_lists WHERE id = ?',
      [listId]
    );
    if (result.affectedRows === 0) {
      throw new Error('Gift list not found or already deleted');
    }
  } finally {
    await connection.end();
  }
}

module.exports = {
  getAllGiftLists,
  createGiftList,
  updateGiftList,
  deleteGiftList,
  getGiftListsById,
  getActiveGiftLists
};
