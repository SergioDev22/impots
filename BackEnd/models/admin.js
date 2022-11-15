const db = require("../services/connect");

module.exports = {
  login: (username) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM admin WHERE username = ?",
        [username],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },
};
