const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      userNumber: user.userNumber,
    },
    process.env.JWT_SIGN_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

module.exports = generateToken;
