const jwt = require('jsonwebtoken');
const utilisateurModel = require('../models/utilisateurModel');


module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt; // cookies au pluriel !

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodeToken) => {
            if (err) {
                res.locals.user = null;
                res.cookie('jwt', '', { maxAge: 1 });
                next();
            }
                try {
                    const user = await utilisateurModel.findById(decodeToken.id);
                    res.locals.user = user; // corrigé ici
                    // console.log('Utilisateur tourve avec succès',user._id);
                    next();
                } catch (error) {
                    console.log("Erreur de récupération de l'utilisateur :", error.message);
                    res.locals.user = null;
                    next();
                }
            });
    } else {
        res.locals.user = null;
        next();
    }
};
module.exports.requireAuth = (req, res, next)=>{
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async(err, decodeToken)=>{
            if (err) {
                console.log(err)
            }else{
                console.log(decodeToken.id)
                next()
            }
        })
    }else{
        console.log('No Token')
    }
}
