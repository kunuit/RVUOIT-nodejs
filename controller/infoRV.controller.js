const infoRV = require('../schema/infoRV.schema')
const uni = require('../schema/university.schema')

const createOne = async (req, res) => {
  try {
    const { name, position, review, star } = req.body
    const { IDUni } = req.params

    const [newReview, infoUni] = await Promise.all([
      infoRV.create({ IDUni, IDBranch: null, name, position, review, star }),
      uni.findOne({ IDUni })
    ])
    ++infoUni.quantity
    infoUni.star += star

    infoUni.save()

    res.send(newReview)

  } catch (error) {
    console.log(error)
    res.status(400).send({ message: error.message })
  }
}

const getAll = async (req, res) => {
  try {
    const { IDUni } = req.params
    console.log(IDUni)
    const getAllReview = await infoRV.find({ IDUni })
    res.send(getAllReview)
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: error.message })
  }
}

const deleteOne = async (req, res) => {
  try {
    const { _id, IDUni } = req.params
    const [getOneRV, infoUni] = await Promise.all([
      infoRV.findOne({ _id }),
      uni.findOne({ IDUni })
    ])

     --infoUni.quantity,
     infoUni.star -= getOneRV.star,
    await infoUni.save()
    
    const delUni = await infoRV.deleteOne({ _id })
    res.send(delUni)
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: error.message })
  }
}

module.exports = { createOne, getAll, deleteOne }