const jwt = require('jsonwebtoken');
const admin = require('../schema/admin.schema')
require('dotenv').config()
//check admin via token 
module.exports = async (req,res,next) => {
  try {
    // check coi có token ko ?
    if (!req.headers.authorization) return res.status(400).send({message: 'Token invalid'})
    console.log("Authenticating...")
    // check và decode token 
    const token = req.headers.authorization.split(" ")[1]
    const decode = jwt.verify(token, process.env.JWT_PRIVATEKEY)   
    req.data = decode.data  //username
    // check admin này còn tồn tại ko 
    const getAdmin = await admin.find({username: decode.data})
    if(getAdmin.length == 0) {
      return res.status(400).send({message: "Admin isn't exits"})
    }
    next()

  } catch (error) {
    console.log(error)
    res.status(400).send({ message: error.message })    
  }
}