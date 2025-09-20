// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // 📂 dossier de stockage
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       Date.now() + "-" + file.originalname.replace(/\s+/g, "_")
//     );
//   },
// });

// const upload = multer({ storage: storage });

// module.exports = upload;



const multer = require("multer");
const path = require("path");

// Configuration du stockage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Dossier de destination
  },
  filename: function (req, file, cb) {
    // Nom unique pour éviter les conflits
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        path.extname(file.originalname)
    );
  },
});

// Filtrage des fichiers
const fileFilter = (req, file, cb) => {
  // Autoriser seulement les images
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Format d'image non supporté"), false);
  }
};

// Configuration de multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limite
  },
});

module.exports = upload;

// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // --- 1️⃣ Créer le dossier uploads s’il n’existe pas ---
// const uploadDir = path.join(__dirname, "..", "uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // --- 2️⃣ Configuration du stockage ---
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir); // Dossier de destination
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const ext = path.extname(file.originalname).toLowerCase();
//     cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
//   },
// });

// // --- 3️⃣ Filtrage des fichiers ---
// const fileFilter = (req, file, cb) => {
//   const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
//   if (allowed.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Format d'image non supporté (jpeg, png, jpg, webp)"), false);
//   }
// };

// // --- 4️⃣ Configuration finale ---
// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
// });

// module.exports = upload;
