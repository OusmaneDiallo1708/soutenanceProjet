// const mongoose= require('mongoose')

// const produitSchema = new mongoose.Schema({
    
//     categorie:{ type: mongoose.Schema.Types.ObjectId, ref: 'Categorie' },
//     categorieNom:{type:String,required:true},
//     categorieDescription:{type:String,required:true},
//     quantite: { type: Number, required: true },
//     prixAchat: { type: Number, required: true },
//     prixVente: { type: Number, required: true },
//     stock_min:{type:Number},
//     sctock:{type:Number},
//     date_ajout:{type:Date,required:true},
//     date_expiration:{
//         type:Date,
//         required:true
//     },
//     alert_stock: { type: Boolean, default: false }
// },
// {
//      timestamps:true
// }
// )


// const produitModel = mongoose.model('produit',produitSchema)
// module.exports = produitModel

// const mongoose = require('mongoose');

// const produitSchema = new mongoose.Schema(
//   {
//     // 🔗 Référence à la catégorie
//     categorie: { type: mongoose.Schema.Types.ObjectId, ref: 'Categorie' },

//     // 📌 Infos de la catégorie (stockées en plus pour éviter les lookup coûteux)
//     categorieNom: { type: String, required: true },
//     categorieDescription: { type: String, required: true },

//     // 📦 Stock et quantités
//     quantite: { type: Number, required: true },
//     stock_min: { type: Number, default: 0 },
//     stock: { type: Number, default: 0 }, // ✅ correction de "sctock"

//     // 💰 Prix
//     prixAchat: { type: Number, required: true },
//     prixVente: { type: Number, required: true },

//     // 📅 Dates
//     date_ajout: { type: Date, required: true, default: Date.now },
//     date_expiration: { type: Date, required: true },

//     // ⚠️ Alertes
//     alert_stock: { type: Boolean, default: false },

//     // 🖼️ Image du produit
//     image: { type: String }, // URL ou chemin de l'image
//   },
//   {
//     timestamps: true,
//   }
// );

// const produitModel = mongoose.model('Produit', produitSchema);
// module.exports = produitModel;
const mongoose = require("mongoose");
const produitSchema = new mongoose.Schema({
  categorie: { type: mongoose.Schema.Types.ObjectId, ref: 'Categorie' },
  categorieNom: { type: String, required: true },
  categorieDescription: { type: String, required: true },
  quantite: { type: Number, required: true },
  stock_min: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  prixAchat: { type: Number, required: true },
  prixVente: { type: Number, required: true },
  date_ajout: { type: Date, default: Date.now },
  date_expiration: { type: Date, required: true },
  alert_stock: { type: Boolean, default: false },
  image: { type: String },
  utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true }, // 👈 Lien vers l’utilisateur
}, { timestamps: true });

const produitModel = mongoose.model('Produit', produitSchema);
module.exports = produitModel;


