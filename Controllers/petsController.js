const { default: mongoose } = require('mongoose');
require('dotenv').config()
const Pet = require('../Schema/mongoosePet')
const database = require('../server')
const { getAllPets, petCreation, populate, foster, adopt, petReturn,  } = require('../Models/petsModel')

async function getPets(req, res){
    try {
        const pets = await getAllPets()
        res.send(pets)
        console.log(pets)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function createPet (req, res) {
    try {
        const { typeOf, name, adoptionStatus, picture, height, weight, color, bio, hypoallergenic, dietary, breed, owner } = req.body
        const pet = await petCreation({typeOf: typeOf, name: name, adoptionStatus: adoptionStatus, picture: picture, height: height, weight: weight, color: color, bio: bio, hypoallergenic: hypoallergenic, dietary: dietary, breed: breed, owner: owner})
    res.send(pet)
    console.log('pet created')
} catch (error) {
        res.status(500).send(error.message)
    }
}


async function simpleSearch(req, res){
    try {
        console.log(req.params)
        const pets = await Pet.find(req.params)
        res.send(pets)
        console.log(pets)
    } catch (error) {
        res.status(500).send(error.message)
    }
}



async function populateSearch(req, res){
    try {
    let petTypes = await populate()
    res.status(200).send(petTypes)
    } catch (err) {
     res.status(500).send(err.message)
    }
}

async function fosterPet(req, res){
    try {
      const result = foster(req.params, req.body)
        res.status(200).send('fostered')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function adoptPet(req, res){
    try {
      const result = adopt(req.params, req.body)
        res.status(200).send('adopted')
    } catch (error) {
        res.status(500).send(error.message)
    }
}



async function returnPet(req, res){
    try {
      const result = petReturn(req.params, req.body)
        res.status(200).send('available')
    } catch (error) {
        res.status(500).send(error.message)
    }
}





module.exports = { getPets, simpleSearch, createPet, populateSearch, fosterPet, adoptPet, returnPet }
