const db = require('../config/db');

// Créer la table des messages si elle n'existe pas
db.run(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    text TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Fonction pour ajouter un message
const addMessage = (username, text, callback) => {
  const query = `INSERT INTO messages (username, text) VALUES (?, ?)`;
  db.run(query, [username, text], callback);
};

// Fonction pour récupérer tous les messages
const getMessages = (callback) => {
  const query = `SELECT * FROM messages ORDER BY timestamp ASC`;
  db.all(query, callback);
};

module.exports = { addMessage, getMessages };