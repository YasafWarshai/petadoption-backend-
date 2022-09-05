const { default: mongoose } = require('mongoose')
const User = require('../Schema/mongooseUser')
const database = require('../server')

async function getUserByEmail(email) {
    const user = await User.find({email})
if (user) {
    console.log(user)
    return user
}
else {
    console.log(false)
    return false
}
    }

    async function loginModel({email, password}) {
        try {
            const user = {email, password}
            return user;
        } catch (error) {
            return error
        }
    }

    async function signupModel (newUser) {
        try {
        const user = await User.create(newUser)
        return user;
        } catch (err) {
            return error;
        }
    }

async function updateUser(user){
   const { _id } = user
    const update =  User.findByIdAndUpdate({_id}, { $set: { firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone, bio: user.bio}}, (err, result) => {
        if (err){
           console.log(err)
        }
        if (result){
            return result;
        }
    })
}

async function save(pet, user){
    const { _id } = user
    User.findByIdAndUpdate(
    {_id},
    { $addToSet: { savedPets: pet._id} },
    (err, result) => {
      if (err) {
        console.log('no good');
      }
      if (result) {
      return result;
      }
    }
  );
}

async function unSave(pet, user){
    console.log(pet, user)
    const { _id } = user
    User.findByIdAndUpdate(
    {_id},
    { $pull: { savedPets: pet._id} },
    (err, result) => {
      if (err) {
        console.log('no good');
      }
      if (result) {
        return result;
      }
    }
  );
}


module.exports = { getUserByEmail, signupModel, loginModel, updateUser, save, unSave }