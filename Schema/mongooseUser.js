const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phone: String,
    pets: Object,
    isAdmin: Boolean,
    bio: String,
    savedPets: Array
})


module.exports = mongoose.model('user', userSchema)

