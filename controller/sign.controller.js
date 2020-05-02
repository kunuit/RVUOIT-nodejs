const admin = require('../schema/admin.schema')
const { sign } = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const signup = async (req, res) => {
  try {
    let { username, password, email } = req.body
    const signupAcc = await admin.create({ username, password, email })
    res.send(signupAcc)
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: error.message })
  }
}

const signIn = async (req, res) => {
  try {
    let { user, password } = req.body
    const data = await admin.find({ $or: [{ username: user }, { email: user }] })
    if (data.length == 0) {
      return res.status(400).send({
        message: 'Admin not exits'
      })
    }
    else {
      let testHash = await bcrypt.compare(password, data[0].password)
      if (!testHash) {
        return res.status(400).send({
          message: 'Password wrong'
        })
      }
      else if(data[0].status == false){
        return res.status(400).send({
          message: "Acc isn't upgrade to Admin "
        })
      }
      else {
        // tao accessToken
        const accessToken = sign({ data: data[0].username }, process.env.JWT_PRIVATEKEY, { expiresIn: '1h' })
        res.send({
          accessToken,
          username: data[0].username
        })
      }
    }
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: error.message })
  }
}

const acceptToAdmin = async (req,res) => {
  try {
    let { username } = req.query
    const getAdmin = await admin.findOne({username})
    if (getAdmin == null) {
      return res.status(400).send({
        message: 'Account not exits'
      })
    }
    else if (getAdmin.status == true){
      return res.send({
        message: 'Account is upgraded to Admin'
      })
    }
    else {
      getAdmin.status = true
      await getAdmin.save()
      res.send({
        message: 'Account is upgraded to Admin'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: error.message })
  }
}

module.exports = { signup, signIn, acceptToAdmin }