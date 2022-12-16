const db = require("../services/connect");

module.exports = {
  create: (data) => {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO impot SET ?", data, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  history: (user) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT id, date_ajout, mois, annee, facture FROM impot WHERE id_Utilisateur = ?",
        user,
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },
};
