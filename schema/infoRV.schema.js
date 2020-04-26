const mongoose = require('mongoose')


const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  IDUni: {
    type: String,
    required: true
  },
  IDBranch: {
    type: String,
    required: false
  },
  position: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  star: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  }
}, { timestamps: true })

const review = mongoose.model('reviews', reviewSchema)

module.exports = review