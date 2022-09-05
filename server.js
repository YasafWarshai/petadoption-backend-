const mongoose = require('mongoose')

const express = require('express')
const fs = require('fs')
require('dotenv').config()
const PORT = process.env.PORT || 8080
const MONGO_CONNECTION = process.env.MONGO_CONNECTION
const app = express()
const router = express.Router()
const usersRoute = require('./Routes/usersRoute')
const petsRoute = require('./Routes/petsRoute')
const cors = require('cors');
const uuid = require('uuid')

app.use(cors({
    origin: '*'
}));
app.use(express.json())
app.use('/pets', petsRoute)
app.use('/users', usersRoute)


const database = module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    try {
        mongoose.connect(`${MONGO_CONNECTION}`, connectionParams)
        console.log('connected')
    } catch (error) {
        console.log(error)
    }
}

database()

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`)
})

