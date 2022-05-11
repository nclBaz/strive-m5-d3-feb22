// const express = require('express') <-- OLD SYNTAX
import express from "express" // <-- NEW IMPORT SYNTAX (remember to add type: "module" to package.json to use it!)
import listEndpoints from "express-list-endpoints"
import usersRouter from "./apis/users/index.js"
import booksRouter from "./apis/books/index.js"

const server = express()

const port = 3001

server.use(express.json()) // if you don't add this BEFORE the endpoints all requests' bodies will be UNDEFINED

// *********************** ENDPOINTS ****************************

server.use("/users", usersRouter)
server.use("/books", booksRouter)

server.listen(port, () => {
  console.table(listEndpoints(server))
  console.log(`Server is listening on port ${port}!`)
})
