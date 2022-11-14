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
};
