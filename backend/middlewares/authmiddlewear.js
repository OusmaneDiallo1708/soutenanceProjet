// const jwt = require('jsonwebtoken');
// const utilisateurModel = require('../models/utilisateurModel');


// module.exports.checkUser = (req, res, next) => {
//     const token = req.cookies.jwt; // cookies au pluriel !

//     if (token) {
//         jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodeToken) => {
//             if (err) {
//                 res.locals.user = null;
//                 res.cookie('jwt', '', { maxAge: 1 });
//                 next();
//             }
//                 try {
//                     const user = await utilisateurModel.findById(decodeToken.id);
//                     res.locals.user = user; // corrigé ici
//                     // console.log('Utilisateur tourve avec succès',user._id);
//                     next();
//                 } catch (error) {
//                     console.log("Erreur de récupération de l'utilisateur :", error.message);
//                     res.locals.user = null;
//                     next();
//                 }
//             });
//     } else {
//         res.locals.user = null;
//         next();
//     }
// };
// module.exports.requireAuth = (req, res, next)=>{
//     const token = req.cookies.jwt
//     if (token) {
//         jwt.verify(token, process.env.TOKEN_SECRET, async(err, decodeToken)=>{
//             if (err) {
//                 console.log(err)
//             }else{
//                 console.log(decodeToken.id)
//                 next()
//             }
//         })
//     }else{
//         console.log('No Token')
//     }
// }



// const jwt = require('jsonwebtoken');
// const utilisateurModel = require('../models/utilisateurModel');

// module.exports.checkUser = (req, res, next) => {
//     let token = req.cookies.jwt;

//     // Vérifier aussi le header Authorization
//     if (!token && req.headers.authorization) {
//         const authHeader = req.headers.authorization;
//         if (authHeader.startsWith('Bearer ')) {
//             token = authHeader.substring(7); // Enlève "Bearer "
//         }
//     }

//     if (token) {
//         jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodeToken) => {
//             if (err) {
//                 console.log("❌ Erreur verification token:", err.message);
//                 res.locals.user = null;
//                 res.cookie('jwt', '', { maxAge: 1 });
//                 return next();
//             }
            
//             try {
//                 const user = await utilisateurModel.findById(decodeToken.id);
//                 if (!user) {
//                     console.log("❌ Utilisateur non trouvé pour ce token");
//                     res.locals.user = null;
//                     res.cookie('jwt', '', { maxAge: 1 });
//                     return next();
//                 }
                
//                 res.locals.user = user;
//                 console.log('✅ Utilisateur trouvé avec succès:', user._id);
//                 next();
//             } catch (error) {
//                 console.log("❌ Erreur de récupération de l'utilisateur:", error.message);
//                 res.locals.user = null;
//                 next();
//             }
//         });
//     } else {
//         console.log("⚠️ Aucun token JWT trouvé");
//         res.locals.user = null;
//         next();
//     }
// };

// module.exports.requireAuth = (req, res, next) => {
//     let token = req.cookies.jwt;

//     // Vérifier aussi le header Authorization
//     if (!token && req.headers.authorization) {
//         const authHeader = req.headers.authorization;
//         if (authHeader.startsWith('Bearer ')) {
//             token = authHeader.substring(7);
//         }
//     }
    
//     if (!token) {
//         console.log('❌ No Token - Accès refusé');
//         return res.status(401).json({ message: "Accès non autorisé - Token manquant" });
//     }
    
//     jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodeToken) => {
//         if (err) {
//             console.log('❌ Token invalide:', err.message);
//             res.cookie('jwt', '', { maxAge: 1 });
//             return res.status(401).json({ message: "Token invalide ou expiré" });
//         }
        
//         try {
//             const user = await utilisateurModel.findById(decodeToken.id);
//             if (!user) {
//                 console.log('❌ Utilisateur du token non trouvé');
//                 res.cookie('jwt', '', { maxAge: 1 });
//                 return res.status(401).json({ message: "Utilisateur non trouvé" });
//             }
            
//             console.log('✅ Token valide pour utilisateur:', user._id);
//             res.locals.user = user;
//             next();
//         } catch (error) {
//             console.log('❌ Erreur vérification utilisateur:', error.message);
//             return res.status(500).json({ message: "Erreur serveur" });
//         }
//     });
// };




// const jwt = require('jsonwebtoken');
// const utilisateurModel = require('../models/utilisateurModel');

// // Middleware pour vérifier l'utilisateur à chaque requête
// module.exports.checkUser = (req, res, next) => {
//     console.log('🔍 Checking user for:', req.method, req.url);
    
//     let token = req.cookies.jwt;
//     console.log('🍪 Cookie jwt:', token ? 'Present' : 'Missing');

//     // Vérifier aussi le header Authorization
//     if (!token && req.headers.authorization) {
//         console.log('🔑 Checking Authorization header');
//         const authHeader = req.headers.authorization;
//         if (authHeader.startsWith('Bearer ')) {
//             token = authHeader.substring(7);
//             console.log('✅ Token from header found');
//         }
//     }

//     if (token) {
//         jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodeToken) => {
//             if (err) {
//                 console.log("❌ Token verification failed:", err.message);
//                 res.locals.user = null;
//                 // Ne pas supprimer le cookie ici, seulement sur une action explicite
//                 return next();
//             }
            
//             try {
//                 const user = await utilisateurModel.findById(decodeToken.id);
//                 if (!user) {
//                     console.log("❌ User not found in database");
//                     res.locals.user = null;
//                     return next();
//                 }
                
//                 res.locals.user = user;
//                 console.log('✅ User authenticated:', user._id);
//                 next();
//             } catch (error) {
//                 console.log("❌ Database error:", error.message);
//                 res.locals.user = null;
//                 next();
//             }
//         });
//     } else {
//         console.log("⚠️ No JWT token found for this request");
//         res.locals.user = null;
//         next();
//     }
// };

// // Middleware de protection de route
// module.exports.requireAuth = (req, res, next) => {
//     console.log('🔐 Require auth for:', req.method, req.url);
    
//     if (res.locals.user) {
//         console.log('✅ User already authenticated:', res.locals.user._id);
//         return next();
//     }

//     let token = req.cookies.jwt;

//     // Vérifier le header Authorization si pas de cookie
//     if (!token && req.headers.authorization) {
//         const authHeader = req.headers.authorization;
//         if (authHeader.startsWith('Bearer ')) {
//             token = authHeader.substring(7);
//         }
//     }
    
//     if (!token) {
//         console.log('❌ No token found - Access denied');
//         return res.status(401).json({ 
//             message: "Accès non autorisé - Token manquant",
//             code: "NO_TOKEN"
//         });
//     }
    
//     jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodeToken) => {
//         if (err) {
//             console.log('❌ Invalid token:', err.message);
//             return res.status(401).json({ 
//                 message: "Token invalide ou expiré",
//                 code: "INVALID_TOKEN"
//             });
//         }
        
//         try {
//             const user = await utilisateurModel.findById(decodeToken.id);
//             if (!user) {
//                 console.log('❌ User not found in database');
//                 return res.status(401).json({ 
//                     message: "Utilisateur non trouvé",
//                     code: "USER_NOT_FOUND"
//                 });
//             }
            
//             console.log('✅ Token valid for user:', user._id);
//             res.locals.user = user;
//             next();
//         } catch (error) {
//             console.log('❌ Database error:', error.message);
//             return res.status(500).json({ 
//                 message: "Erreur serveur",
//                 code: "SERVER_ERROR"
//             });
//         }
//     });
// };




const jwt = require('jsonwebtoken');
const utilisateurModel = require('../models/utilisateurModel');

module.exports.checkUser = (req, res, next) => {
    console.log('🔍 Checking user for:', req.method, req.url);
    
    let token = req.cookies.jwt;
    console.log('🍪 Cookie jwt:', token ? 'Present' : 'Missing');

    // Vérifier aussi le header Authorization
    if (!token && req.headers.authorization) {
        console.log('🔑 Checking Authorization header');
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
            console.log('✅ Token from header found');
        }
    }

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodeToken) => {
            if (err) {
                console.log("❌ Token verification failed:", err.message);
                res.locals.user = null;
                return next();
            }
            
            try {
                const user = await utilisateurModel.findById(decodeToken.id);
                if (!user) {
                    console.log("❌ User not found in database");
                    res.locals.user = null;
                    return next();
                }
                
                res.locals.user = user;
                console.log('✅ User authenticated:', user._id);
                next();
            } catch (error) {
                console.log("❌ Database error:", error.message);
                res.locals.user = null;
                next();
            }
        });
    } else {
        console.log("⚠️ No JWT token found for this request");
        res.locals.user = null;
        next();
    }
};

module.exports.requireAuth = (req, res, next) => {
    console.log('🔐 Require auth for:', req.method, req.url);
    
    // Vérifier si l'utilisateur est déjà dans res.locals
    if (res.locals.user) {
        console.log('✅ User already authenticated:', res.locals.user._id);
        return next();
    }

    let token = req.cookies.jwt;

    // Vérifier le header Authorization si pas de cookie
    if (!token && req.headers.authorization) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }
    }
    
    if (!token) {
        console.log('❌ No token found - Access denied');
        return res.status(401).json({ 
            message: "Accès non autorisé - Token manquant",
            code: "NO_TOKEN"
        });
    }
    
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodeToken) => {
        if (err) {
            console.log('❌ Invalid token:', err.message);
            return res.status(401).json({ 
                message: "Token invalide ou expiré",
                code: "INVALID_TOKEN"
            });
        }
        
        try {
            const user = await utilisateurModel.findById(decodeToken.id);
            if (!user) {
                console.log('❌ User not found in database');
                return res.status(401).json({ 
                    message: "Utilisateur non trouvé",
                    code: "USER_NOT_FOUND"
                });
            }
            
            console.log('✅ Token valid for user:', user._id);
            res.locals.user = user;
            next();
        } catch (error) {
            console.log('❌ Database error:', error.message);
            return res.status(500).json({ 
                message: "Erreur serveur",
                code: "SERVER_ERROR"
            });
        }
    });
};