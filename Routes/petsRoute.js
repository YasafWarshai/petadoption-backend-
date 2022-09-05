const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()
const { getPets, createPet, simpleSearch, populateSearch, fosterPet, adoptPet, returnPet } = require('../Controllers/petsController')
const fs = require('fs')
const Pet = require('../Schema/mongoosePet')
const { validateBody } = require('../Middleware/validateBody')
const { petSchema } = require('../Schema/Schema')
const { auth, isAdmin } = require('../Middleware/auth')


router.get('/', auth, getPets)

router.post('/createpet', auth, isAdmin, validateBody(petSchema), createPet)

router.get('/search/:typeOf', simpleSearch)

router.get('/types', populateSearch)

router.put('/foster/:_id', auth, fosterPet)

router.put('/adopt/:_id', auth, adoptPet)

router.put('/return/:_id', auth, returnPet)


module.exports = router;