const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  phone: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
})

module.exports = mongoose.model("User", schema)
