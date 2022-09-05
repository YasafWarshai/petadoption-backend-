const jwt = require('jsonwebtoken')
require('dotenv').config()

async function auth(req, res, next){
if(!req.headers.authorization){
    res.status(401).send('Authorization headers required')
    return
}

const token = req.headers.authorization.replace("Bearer ", "")
jwt.verify(token, process.env.TOKEN_SECRET,(err, decoded) => {
    if(err) {
        res.status(401).send('unauthorized')
    }
    if(decoded){
        req.body._id = decoded.id
        console.log('auth good')
        next();
        return;
    }
     
})
} 

function isAdmin(req, res, next){
    try {
        console.log(req.headers)
      if (req.headers.isadmin === 'true'){
        console.log('admin good')
        next();
        return;
      } else {
        res.status(403).send('Forbidden');
        return;
      }
    } catch (error) {
      res.status(500).send(error)
    }
  }

module.exports = {auth, isAdmin}