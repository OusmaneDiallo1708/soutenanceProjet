const mongoose = require('mongoose')


const categorieSchema = new mongoose.Schema({
    nom:{
        type:String,
        require:true,
        trim:true,
        maxlength:100
    },
    description:{
        type:String,
        require:true,
        trim:true,
        maxlength:300
    }
},
{
    timestamps:true
}
)

const categorieModel = mongoose.model('categorie',categorieSchema)
module.exports = categorieModel