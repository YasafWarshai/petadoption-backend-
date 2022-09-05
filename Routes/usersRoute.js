const express = require('express')
const router = express.Router()
const { isExistingUser, verifyPassword, passwordMatch, encryptPassword, userExists } = require('../Middleware/usersMiddleware')
const { signUp, login, getUsers, editUser, savePet, unSavePet} = require('../Controllers/usersController')
const { validateBody} = require('../Middleware/validateBody')
const { loginSchema, signupSchema } = require('../Schema/Schema')
const mongoose = require('mongoose')
const { auth } = require('../Middleware/auth')


router.post('/signup', validateBody(signupSchema), passwordMatch, isExistingUser, encryptPassword, signUp)

router.get('/', auth, getUsers)

router.post('/login', validateBody(loginSchema), userExists, verifyPassword, login)

router.put('/edituser', editUser)

router.put('/save/:_id', auth, savePet)

router.put('/unsave/:_id', auth, unSavePet)







module.exports = router;