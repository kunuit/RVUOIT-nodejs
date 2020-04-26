const mongoose = require('mongoose')


const uniSchema = new mongoose.Schema({
  IDUni: {
    type: String,
    unique:true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  star: {
    type: Number,
    min: 1
  },
  quantity: {
    type: Number,
    default: 0,
    min: 0,
    required: true
  } 
}, { timestamps: true })

const uni = mongoose.model('unis', uniSchema)

module.exports = uni