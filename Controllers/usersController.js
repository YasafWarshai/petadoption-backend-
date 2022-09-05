const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const User = require("../Schema/mongooseUser");
const database = require("../server");
const { signupModel, loginModel, updateUser, save, unSave} = require("../Models/usersModel");

async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function signUp(req, res) {
  const { firstName, lastName, password, phone, email } = req.body;
  const newUser = { firstName, lastName, password, phone, email };
  try {
    const user = await signupModel(newUser);
    res.status(200).send(`user ${user._id} created`);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

function login(req, res) {
  try {
    const { user } = req.body;
    console.log(user)
    const token = jwt.sign({ id: user._id}, process.env.TOKEN_SECRET, {
      expiresIn: "2h",
    });
    res.send({token: token, user});
    return;
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}

async function editUser(req, res){
    try {
  const success = await updateUser(req.body)
await res.send(success)
    } catch (err) {
        res.status(500).send(err.message)
    }

}

async function savePet(req, res){
    try {
    const result = save(req.params, req.body)
    if (result) { res.status(200).send('done')}
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function unSavePet(req, res){
    try {
        const result = unSave(req.params, req.body)
          res.status(200).send(result)
      } catch (error) {
          res.status(500).send(error.message)
      }
}


module.exports = { signUp, login, getUsers, editUser, savePet, unSavePet };
