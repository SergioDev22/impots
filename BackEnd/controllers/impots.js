const jwt = require("jsonwebtoken");
const impotModel = require("../models/impots");

module.exports = {
  create: (req, res) => {
    const data = req.body;
    const facture = req.file;
    const id = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SIGN_SECRET
    ).userId;

    if (Object.keys(data).length === 0) {
      return res.status(400).send({
        message: "Content can not be empty!",
        attributs: {
          mois: "required",
          annee: "required",
        },
      });
    }

    // Verification de l'existance de la photo de facture
    if (facture === undefined) {
      return res.status(400).send({
        message: "Facture is required!",
      });
    }

    const requiredFields = ["mois", "annee"];
    for (const field of requiredFields) {
      if (!data[field] || data[field] === "" || data[field] === null) {
        return res.status(400).send({
          message: `Content "${[
            field,
          ]}" must be present and can not be empty or null!`,
        });
      }
    }

    impotModel
      .create({
        ...data,
        id_Utilisateur: id,
        facture: `${req.protocol}://${req.get("host")}/facture/${
          req.file.filename
        }`,
      })
      .then((result) =>
        res.status(201).send({
          message: "Impot created successfully!",
          data: {
            id: result.insertId,
            ...data,
            facture: `${req.protocol}://${req.get("host")}/facture/${
              req.file.filename
            }`,
          },
        })
      )
      .catch((err) =>
        res.status(500).send({
          message: "Some error occurred while creating impot.",
          error: err.message,
        })
      );
  },

  history: (req, res) => {
    const id = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SIGN_SECRET
    ).userId;

    impotModel
      .history(id)
      .then((result) =>
        res.status(200).send({
          message: "Impot history successfully!",
          data: result,
        })
      )
      .catch((err) =>
        res.status(500).send({
          message: "Some error occurred while getting impot history.",
          error: err.message,
        })
      );
  },
};
