const bcrypt = require("bcrypt");
const userModel = require("../models/user");
const generateToken = require("../services/generateToken");

module.exports = {
  register: (req, res) => {
    const body = req.body;
    const pdc = req.file;

    //Controlle des champs entrés par l'utilisateur
    if (Object.keys(body).length === 0) {
      return res.status(400).send({
        message: "Content can not be empty!",
        attributs: {
          nom: "required",
          prenom: "required",
          username: "required",
          password: "required",
          pdc: "not required",
          adresse: "not required",
          cin: "required",
          phone: "required",
        },
      });
      return false;
    }

    const requiredFields = [
      "nom",
      "prenom",
      "cin",
      "phone",
      "username",
      "password",
    ];

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

    // Hasher le mot de passe avant de l'enregistrer dans la base de données
    bcrypt.hash(body.password, 10, (err, hash) => {
      if (err) {
        res.status(500).send({
          message: "Some error occurred while hashing password.",
          error: err.message,
        });
        return false;
      } else {
        // Remplacer le mot de passe par son hash
        body.password = hash;

        // Enregistrer l'utilisateur dans la base de données
        userModel
          .register({
            ...body,
            pdcUrl:
              pdc !== undefined
                ? `${req.protocol}://${req.get("host")}/pdc/${
                    req.file.filename
                  }`
                : null,
          })
          .then((result) => {
            // Tant que l'utilisateur est enregistré dans la base de données
            // Faut la retourner les information de connexion de l'utilisateur
            // Pour qu'il puisse se connecter aprer l'inscription
            res.status(201).send({
              message: "User registered successfully!",
              data: {
                id: result.insertId,
                nom: body.nom,
                prenom: body.prenom,
                adresse: body.adresse || null,
                cin: body.cin,
                phone: body.phone,
                pdcUrl:
                  pdc !== undefined
                    ? `${req.protocol}://${req.get("host")}/pdc/${
                        req.file.filename
                      }`
                    : null,
                token: generateToken({
                  userId: result.insertId,
                  userNumber: body.phone,
                }),
              },
            });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while registering user.",
            });
          });
      }
    });
  },

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

    userModel
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
                message: "User logged in successfully!",
                data: {
                  id: result[0].id,
                  nom: result[0].nom,
                  prenom: result[0].prenom,
                  adresse: result[0].adresse,
                  cin: result[0].cin,
                  phone: result[0].phone,
                  pdcUrl: result[0].pdcUrl,
                  token: generateToken({
                    userId: result[0].id,
                    userNumber: result[0].phone,
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
            message: "User not found!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Some error occurred while logging user.",
          error: err.message,
        });
      });
  },
};
