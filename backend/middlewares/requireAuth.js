const jwt = require("jsonwebtoken");
const utilisateurModel = require("../models/utilisateurModel");

module.exports.requireAuth = async (req, res, next) => {
  try {
    let token = null;

    // 1️⃣ Vérifier d'abord dans les cookies
    if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
      console.log("✅ Token trouvé dans les cookies");
    }
    
    // 2️⃣ Sinon vérifier dans le header Authorization
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7); // Enlève "Bearer "
        console.log("✅ Token trouvé dans le header Authorization");
      }
    }
    
    // 3️⃣ Si aucun token trouvé
    if (!token) {
      console.log("❌ Aucun token trouvé");
      return res.status(401).json({ 
        message: "Accès non autorisé - Token manquant",
        code: "NO_TOKEN"
      });
    }

    // 4️⃣ Vérifier et décoder le token
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log("🔓 Token décodé, ID utilisateur:", decodedToken.id);

    // 5️⃣ Récupérer l'utilisateur dans la base de données
    const utilisateur = await utilisateurModel.findById(decodedToken.id).select('-motDePasse');
    
    if (!utilisateur) {
      console.log("❌ Utilisateur non trouvé en base");
      return res.status(401).json({ 
        message: "Utilisateur non trouvé",
        code: "USER_NOT_FOUND"
      });
    }

    // 6️⃣ Stocker l'utilisateur dans req et res.locals pour les routes
    req.user = utilisateur;
    res.locals.user = utilisateur;
    
    console.log("✅ Authentification réussie pour:", utilisateur.email);
    next();
    
  } catch (err) {
    console.log("❌ Erreur d'authentification:", err.message);
    
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        message: "Token invalide",
        code: "INVALID_TOKEN"
      });
    }
    
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: "Token expiré",
        code: "TOKEN_EXPIRED"
      });
    }
    
    return res.status(401).json({ 
      message: "Token invalide ou expiré",
      code: "AUTH_ERROR"
    });
  }
};