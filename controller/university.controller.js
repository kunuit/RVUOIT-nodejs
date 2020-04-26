const uni = require('../schema/university.schema')

const createOne = async (req,res) => {
  try {
    const { IDUni, name, address} = req.body
    const newUni = await uni.create({IDUni, name, address, star: null})
    res.send(newUni)
  } catch (error) {
    console.log(error)
    res.status(400).send({message: error.message})
  }
}

const getAll = async (req, res) => {
  try {
    const getAllUni = await uni.find()
    res.send(getAllUni)
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: error.message})
  }
}
const deleteOne = async (req, res) => {
  try {
    const { _id } = req.params
    const delUni = await uni.deleteOne({_id})
    res.send(delUni)
  } catch (error) {
    console.log(error)
    res.status(400).send({message: error.message})
  }
}

module.exports = { createOne, getAll, deleteOne }