const path = require("path");
const express = require("express");
const cors = require("./middleware/cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const impotRoutes = require("./routes/impots");
const habilitationRoutes = require("./routes/habilitations");

const app = express();

// Anticipation des erreurs CORS de toute les routes
app.use(cors);

app.use(bodyParser.json());
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/impot", impotRoutes);
app.use("/api/habilitation", habilitationRoutes);
app.use("/pdc", express.static(path.join(__dirname, "pdc")));
app.use("/facture", express.static(path.join(__dirname, "facture")));

module.exports = app;
