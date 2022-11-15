const bcrypt = require("bcrypt");
const adminModel = require("../models/admin");
const generateToken = require("../services/generateToken");

module.exports = {
  login: (req, res) => {
    const body = req.body;

    //Controlle des champs entrés par l'utilisateur
    if (Object.keys(body).length === 0) {
      return res.status(400).send({
        message: "Content can not be empty!",
        attributs: {
          username: "required",
          password: "required",
        },
      });
      return false;
    }

    const requiredFields = ["username", "password"];

    for (let i = 0; i < requiredFields.length; i++) {
      if (
        !body[requiredFields[i]] ||
        body[requiredFields[i]] === "" ||
        body[requiredFields[i]] === null
      ) {
        return res.status(400).send({
          message: `Content "${[
            requiredFields[i],
          ]}" must be present and can not be empty or null!`,
        });

        return false;
      }
    }

    adminModel
      .login(body.username)
      .then((result) => {
        if (result.length > 0) {
          bcrypt.compare(body.password, result[0].password, (err, isMatch) => {
            if (err) {
              res.status(500).send({
                message: "Some error occurred while comparing password.",
                error: err.message,
              });
              return false;
            } else if (isMatch) {
              res.status(200).send({
                message: "Admin logged in successfully!",
                data: {
                  id: result[0].id,
                  nom: result[0].nom,
                  type: result[0].type,
                  token: generateToken({
                    userId: result[0].id,
                    type: result[0].type,
                  }),
                },
              });
            } else {
              res.status(401).send({
                message: "Wrong password!",
              });
            }
          });
        } else {
          res.status(404).send({
            message: "Admin not found!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Some error occurred while logging admin.",
          error: err.message,
        });
      });
  },
};
