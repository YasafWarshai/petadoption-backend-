const { getUserByEmail } = require("../Models/usersModel");
const bcrypt = require("bcrypt");

async function isExistingUser(req, res, next) {
  const user = await getUserByEmail(req.body.email);
  if (user.length !== 0) {
    res
      .status(400)
      .send({ ok: false, message: "This email is already in use" });
    return;
  }
  next();
}


async function userExists(req, res, next) {
  const user = await getUserByEmail(req.body.email);
  if (user.length !== 0) {
    req.body.user = user[0];
    next();
    return;
  }
  res.status(400).send("user with this email does not exist");
}

function encryptPassword(req, res, next) {
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    req.body.password = hash;
    console.log(req.body.password);
    next();
  });
}

function passwordMatch(req, res, next) {
  if (req.body.password === req.body.repassword) {
    next();
    return;
  }
  res.status(400).send("passwords do not match");
  console.log(res.body.password, res.body.repassword);
  return;
}

async function verifyPassword(req, res, next) {
  const { user } = req.body;
  await bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (err) {
   res.status(500).send(err);
      return;
    }
    if (result) {
      next();
      return;
    } else {
      res.status(400).send("incorrect password");
      return
    }
  });
}



module.exports = {
  isExistingUser,
  passwordMatch,
  encryptPassword,
  verifyPassword,
  userExists,
};
