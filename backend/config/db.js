const mongoose = require('mongoose')
const ConnexionDB = async ()=>{
    try {
    mongoose.set('strictQuery',false)
    await mongoose.connect(process.env.MONGO_URL)
    console.log('MongoDB est connecter avec succès')
    } catch (error) {
        console.log("La connection c'est mal passe avec MongoDB",error.message)
        process.exit(1)
    }
}

module.exports = ConnexionDB