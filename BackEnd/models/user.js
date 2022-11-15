const db = require("../services/connect");

module.exports = {
  register: (data) => {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO Utilisateur SET ?", data, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  login: (username) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM Utilisateur WHERE username = ?",
        username,
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  },
};
