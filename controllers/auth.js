const bcrypt = require("bcryptjs")
const config = require("../config")
const express = require("express")
const jwt = require("jsonwebtoken")

const router = express.Router()

const User = require("../models/user")

router.post("/", (req, res, next) => {

  User.findOne({ email: req.body.email })
    .then((user) => {

      if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.status(404).send({ message: "not found" })
        return
      }

      const token = jwt.sign({ _id: user._id }, config.secret, { expiresIn: 86400 })

      res.status(200).send({ user, token })

    })
    .catch((error) => {
      res.status(404).send({ message: "not found" })
    })

})

router.delete("/", (req, res, next) => {})

module.exports = router
