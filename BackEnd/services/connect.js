require("dotenv").config();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: "utf8mb4",
});

db.connect((err) => {
  if (err) {
    console.log("Impossible de connecter à la base de donnée");
    return;
  }
  console.log("Connexion à la base de donnée reussie");
});

module.exports = db;
