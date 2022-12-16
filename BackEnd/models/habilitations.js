const db = require("../services/connect");

module.exports = {
  createEmpowerment: (data) => {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO habilitation SET ?", data, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  getEmpowerment: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM habilitation WHERE id_Utilisateur = ?",
        id,
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  updateEmpowerment: (data, id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE habilitation SET ? WHERE id = ?",
        [data, id],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  deleteEmpowerment: (id) => {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM habilitation WHERE id = ?", id, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
};
