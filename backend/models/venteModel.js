const mongoose = require('mongoose')


const venteSchema = new mongoose.Schema({
    produit: { type: mongoose.Schema.Types.ObjectId, ref: 'produit' },
    produitNom:{type:String,required:true},
    // client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
    utilisateurNom:{type:String,required:true},
    quantite: {type:Number,required:true},
    prix_unitaire: {type:Number,required:true},
    date_vente: {type:Date,required:true}
  },
  {
    timestamps:true
  });

  const venteModel = mongoose.model('vente',venteSchema)
  module.exports = venteModel