// const express = require('express') <-- OLD SYNTAX
import express from "express" // <-- NEW IMPORT SYNTAX (remember to add type: "module" to package.json to use it!)
import listEndpoints from "express-list-endpoints"
import cors from "cors"
import usersRouter from "./apis/users/index.js"
import booksRouter from "./apis/books/index.js"
import { genericErrorHandler, notFoundErrorHandler, badRequestErrorHandler, unauthorizedErrorHandler } from "./errorHandlers.js"

const server = express()

const port = 3001

// *********************** MIDDLEWARES ***************************

const loggerMiddleware = (req, res, next) => {
  console.log(`Request Method: ${req.method} --- URL ${req.url} --- ${new Date()}`)
  next()
}

const anotherMiddleware = (req, res, next) => {
  console.log("Hey I am another middleware!")
  next()
}

server.use(cors()) // GLOBAL MIDDLEWARE to connect FE and BE without errors in the browser
server.use(loggerMiddleware) // GLOBAL MIDDLEWARE
server.use(express.json()) // GLOBAL MIDDLEWARE if you don't add this BEFORE the endpoints all requests' bodies will be UNDEFINED

// *********************** ENDPOINTS ****************************

server.use("/users", anotherMiddleware, usersRouter)
server.use("/books", booksRouter)

// ************************ ERROR HANDLERS **********************

server.use(badRequestErrorHandler)
server.use(unauthorizedErrorHandler)
server.use(notFoundErrorHandler)
server.use(genericErrorHandler)

server.listen(port, () => {
  console.table(listEndpoints(server))
  console.log(`Server is listening on port ${port}!`)
})
