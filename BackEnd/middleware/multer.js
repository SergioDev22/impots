const multer = require("multer");
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  // Preciser la destination des fichiers images enregistrés
  // ici dans le dossier images
  destination: (req, file, callback) => {
    callback(null, "pdc");
  },

  filename: (req, file, callback) => {
    // Eviter le nom de fichier qu'il a des espaces
    // On change ces espaces en underscore
    const name = file.originalname.split(" ").join("_");

    // On va savoir l'extension du fichier à partir de son mimetype
    const extension = MIME_TYPES[file.mimetype];

    // En enregistrant le fichier ;
    // On va créer un nom de fichier unique avec la date et l'heure actuelle en timestape
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("pdc"); // pdc est le nom du champ du formulaire
