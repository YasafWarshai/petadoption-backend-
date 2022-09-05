const { default: mongoose } = require("mongoose");
require("dotenv").config();
const Pet = require("../Schema/mongoosePet");
const database = require("../server");

async function getAllPets() {
  try {
    const pets = await Pet.find();
    return pets;
  } catch (err) {
    res.status(500).send("couldn't find pets");
  }
}

async function petCreation(input) {
  try {
    const pet = await Pet.create(input);
    return pet;
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function populate() {
  const petTypes = await Pet.find().distinct("typeOf");
  return petTypes;
}

async function foster(pet, user) {
    console.log(pet, user)
    const { _id } = pet
    Pet.findByIdAndUpdate(
    {_id},
    { $set: { owner: user._id, adoptionStatus: "fostered" } },
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

async function adopt(pet, user) {
    console.log(pet, user)
    const { _id } = pet
    Pet.findByIdAndUpdate(
    {_id},
    { $set: { owner: user._id, adoptionStatus: "adopted" } },
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

async function petReturn(pet, user) {
    console.log(pet, user)
    const { _id } = pet
    Pet.findByIdAndUpdate(
    {_id},
    { $set: { owner: '', adoptionStatus: "available" } },
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



module.exports = { getAllPets, petCreation, populate, foster, adopt, petReturn };
