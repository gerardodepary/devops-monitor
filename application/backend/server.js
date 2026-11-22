const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Route d'accueil
app.get("/", (req, res) => {
  res.json({
    message: "Bienvenue sur DevOps Monitor API",
    status: "OK"
  });
});

// Route de santé du serveur
app.get("/health", (req, res) => {
  res.json({
    application: "DevOps Monitor",
    status: "UP",
    message: "Le serveur fonctionne correctement"
  });
});

// Démarrage du serveur
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});