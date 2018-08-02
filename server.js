const bodyparser = require("body-parser")
const config = require("./config")
const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const router = require("./router")

mongoose.connect(config.database)

const server = express()
server.use(morgan("dev"))
server.use(bodyparser.urlencoded({ extended: true }))
server.use(bodyparser.json())

router(server)

server.listen(config.port, () => {
  console.log(`running on port ${config.port}`)
})
