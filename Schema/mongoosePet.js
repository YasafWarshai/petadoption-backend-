const mongoose = require('mongoose')


const petSchema = new mongoose.Schema({
    name: String,
    typeOf: String ,
    adoptionStatus: String, 
    picture: String,
    height: String, 
    weight: String, 
    color: String, 
    bio: String,
    hypoallergenic: Boolean, 
    dietary: Array, 
    breed: String,
    owner: String
}
)

module.exports = mongoose.model('pet', petSchema)