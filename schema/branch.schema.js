const mongoose = require('mongoose')


const branchSchema = new mongoose.Schema({
  IDBranch: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  IDUni: {
    type: String,
    required: true
  },
  star: {
    type: Number,
    min: 1,
    require: false
  },
  quantity: {
    type: Number,
    default: 0,
    min: 0,
    required: true
  } 
}, { timestamps: true })

const branch = mongoose.model('branches', branchSchema)

module.exports = branch