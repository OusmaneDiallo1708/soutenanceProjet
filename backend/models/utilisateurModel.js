const mongoose = require("mongoose");
const bcrypt = require('bcrypt')


const utilisateurSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30
    },
    prenom: {
        type: String,
        required: true,
        trim: true,
        maxlength: 55
    },
    genre: {
        type: String,
        required: true,
        enum: ['Homme', 'Femme']
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Le mail est incorrect'],
        maxlength: 100
    },
    telephone: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        maxlength: 30
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'utilisateur', 'visiteur']
    },
    motDePasse:{
        type:String,
        required:true,
        trim:true
    }
});

utilisateurSchema.pre('save', async function (next) {
    try {
        // Vérifie si le mot de passe a été modifié ou créé
        if (!this.isModified('motDePasse')) return next();

        const salt = await bcrypt.genSalt(10);
        this.motDePasse = await bcrypt.hash(this.motDePasse, salt);

        next();
    } catch (err) {
        next(err);
    }
});

utilisateurSchema.statics.login = async function(email, motDePasse) {
    const Utilisateur = await this.findOne({ email });
  
    if (Utilisateur) {
      const auth = await bcrypt.compare(motDePasse, Utilisateur.motDePasse);
      if (auth) return Utilisateur;
  
      throw new Error('Mot de passe incorrect');
    }
  
    throw new Error('Email incorrect');
  };
const utilisateurModel = mongoose.model('Utilisateur', utilisateurSchema);
module.exports = utilisateurModel;


