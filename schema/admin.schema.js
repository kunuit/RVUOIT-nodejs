const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  status: {
    type: Boolean,
    default: false,
    required: true
  }
}, { timestamps: true })

AdminSchema.pre('save', async function(next){
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  //hash password
  var hash = await bcrypt.hash(user.password,10)

  // overwrite password
  user.password = hash
  next()
})

module.exports = mongoose.model('admins', AdminSchema);