// =======================
// 📌 Import des modules
// =======================
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path"); // ✅ important pour servir "uploads"

const ConnexionDB = require("./config/db");
const utilisateurRoute = require("./routes/utilisateurRoute");
const allRoute = require("./routes/allRoute");
const cookieParser = require("cookie-parser");
const { checkUser, requireAuth } = require("./middlewares/authmiddlewear");
const cors = require("cors");

// =======================
// 📌 Configuration dotenv
// =======================
dotenv.config({ path: "./config/.env" });

// =======================
// 📌 Initialisation App
// =======================
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// =======================
// 📌 Configuration CORS
// =======================
const corsOptions = {
  origin: "http://localhost:5173", // Frontend React
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

// =======================
// 📌 Vérification JWT
// =======================
app.use(checkUser);

// =======================
// 📌 Connexion MongoDB
// =======================
ConnexionDB();

// =======================
// 📌 Routes
// =======================
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).json({ userId: res.locals.user._id });
});

// ✅ Rendre les images accessibles publiquement
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/utilisateur", utilisateurRoute);
app.use("/api/allroute", allRoute);

// =======================
// 📌 Démarrage Serveur
// =======================
app.listen(process.env.PORT, () => {
    console.log(`✅Le serveur a démarré sur le port ${process.env.PORT}`)
})
