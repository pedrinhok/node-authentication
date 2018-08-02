const bcrypt = require("bcryptjs")
const express = require("express")

const router = express.Router()

const User = require("../models/user")

router.get("/", (req, res, next) => {

  User.find()

    .then((users) => {
      res.send(users)
    })

    .catch((error) => {
      res.status(404).send(error)
    })

})

router.post("/", (req, res, next) => {

  const user = new User()

  if (req.body.phone) {
    user.phone = req.body.phone
  }
  if (req.body.name) {
    user.name = req.body.name
  }
  if (req.body.email) {
    user.email = req.body.email
  }
  if (req.body.password) {
    user.password = bcrypt.hashSync(req.body.password, 10)
  }

  user.save()

    .then((user) => {
      res.send(user)
    })

    .catch((error) => {
      res.status(422).send(error)
    })

})

module.exports = router
