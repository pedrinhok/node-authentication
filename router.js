const config = require("./config")
const express = require("express")
const jwt = require("jsonwebtoken")

const router = express.Router()

const auth = require("./controllers/auth")
router.use("/auth", auth)

const users = require("./controllers/users")
router.use("/users", users)

const authorization = (req, res, next) => {

    if ((/\/auth$/.test(req.url) || /\/users$/.test(req.url)) && req.method == "POST") {
      return next()
    }

    let token = req.body.token || req.query.token || req.headers["authorization"]

    if (token) {

      jwt.verify(token, config.secret, (error, decoded) => {
        if (error) {
          return res.status(401).send({ message: "unauthorized" })
        } else {
          req.user = decoded
          next()
        }
      })

    } else {
      return res.status(401).send({ message: "unauthorized" })
    }

}

module.exports = (server) => {

  server.use(authorization)

  server.use(router)

  server.use((req, res, next) => {
    res.status(404).send({ message: "not found" })
  })

}
