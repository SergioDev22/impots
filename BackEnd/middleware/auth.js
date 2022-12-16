require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SIGN_SECRET);
    const userId = decodedToken.userId;
    const username = decodedToken.username;

    if (userId !== undefined && username !== undefined) {
      next();
    } else {
      res.status(401).send({
        error:
          "Invalid request! You are not authorized to access this resource",
      });
    }
  } catch {
    res.status(401).send({
      error: "Invalid request! You are not authorized to access this resource",
    });
  }
};
