const jwt = require("jsonwebtoken");
const habilitationModel = require("../models/habilitations");

module.exports = {
  createEmpowerment: (req, res) => {
    const body = req.body;
    const id = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SIGN_SECRET
    ).userId;

    //Controlle des champs entrés par l'utilisateur
    if (Object.keys(body).length === 0) {
      return res.status(400).send({
        message: "Content can not be empty!",
        attributs: {
          contenu: "required",
        },
      });
    }

    const requiredFields = ["contenu"];

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
      }
    }

    habilitationModel
      .createEmpowerment({ ...body, id_Utilisateur: id })
      .then((result) => {
        res.status(201).send({
          message: "Habilitation created successfully!",
          data: {
            id: result.insertId,
            contenu: body.contenu,
          },
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Some error occurred while creating habilitation.",
          error: err.message,
        });
      });
  },

  getEmpowerment: (req, res) => {
    const id = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SIGN_SECRET
    ).userId;

    habilitationModel
      .getEmpowerment(id)
      .then((result) => {
        res.status(200).send({
          message: "Habilitation retrieved successfully!",
          data: result,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Some error occurred while retrieving habilitation.",
          error: err.message,
        });
      });
  },

  updateEmpowerment: (req, res) => {
    const body = req.body;
    const idToUpdate = req.params.id;

    //Controlle des champs entrés par l'utilisateur
    if (Object.keys(body).length === 0) {
      return res.status(400).send({
        message: "Content can not be empty!",
        attributs: {
          contenu: "required",
        },
      });
    }

    habilitationModel
      .updateEmpowerment(body, idToUpdate)
      .then(() => {
        res.status(200).send({
          message: `Habilitation ${idToUpdate} updated successfully!`,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Some error occurred while updating habilitation.",
          error: err.message,
        });
      });
  },

  deleteEmpowerment: (req, res) => {
    const idToDelete = req.params.id;
    habilitationModel
      .deleteEmpowerment(idToDelete)
      .then(() => {
        res.status(200).send({
          message: `Habilitation ${idToDelete} deleted successfully!`,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Some error occurred while deleting habilitation.",
          error: err.message,
        });
      });
  },
};
