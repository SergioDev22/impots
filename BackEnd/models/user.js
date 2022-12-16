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

  verifExistUsername: (username) => {
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

  update: (id, data) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE Utilisateur SET ? WHERE id = ? ",
        [data, id],
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
