// *********************************************** BOOKS ENDPOINTS *********************************************

/* ********************************************* BOOKS CRUD ****************************************************

1. CREATE --> POST http://localhost:3001/books/ (+ body)
2. READ --> GET http://localhost:3001/books/ (+ optional query parameters)
3. READ (single book) --> GET http://localhost:3001/books/:bookId
4. UPDATE (single book) --> PUT http://localhost:3001/books/:bookId (+ body)
5. DELETE (single book) --> DELETE http://localhost:3001/books/:bookId

*/

import express from "express"
import fs from "fs" // CORE MODULE (no need to be installed!)
import { fileURLToPath } from "url" // CORE MODULE
import { dirname, join } from "path" // CORE MODULE
import uniqid from "uniqid"

const booksRouter = express.Router()

const booksJSONPath = join(dirname(fileURLToPath(import.meta.url)), "books.json") // C:\Strive\FullStack\2022\Feb22\M5\strive-m5-d3-feb22\src\apis\books\

const getBooks = () => JSON.parse(fs.readFileSync(booksJSONPath))
const writeBooks = booksArray => fs.writeFileSync(booksJSONPath, JSON.stringify(booksArray))

// 1.
booksRouter.post("/", (req, res) => {
  const newBook = { ...req.body, createdAt: new Date(), id: uniqid() }

  const books = getBooks()

  books.push(newBook)

  writeBooks(books)

  res.status(201).send({ id: newBook.id })
})

// 2.
booksRouter.get("/", (req, res) => {
  console.log("QUERY: ", req.query)
  if (req.query && req.query.category) {
    const filteredBooks = books.filter(book => book.category === req.query.category)
    res.send(filteredBooks)
  } else {
    res.send(books)
  }
})

// 3.
booksRouter.get("/:bookId", (req, res) => {
  const books = getBooks()

  const foundBook = books.find(book => book.id === req.params.bookId)

  res.send(foundBook)
})

// 4.
booksRouter.put("/:bookId", (req, res) => {
  const books = getBooks()

  const index = books.findIndex(book => book.id === req.params.bookId)

  const oldBook = books[index]

  const updatedBook = { ...oldBook, ...req.body, updatedAt: new Date() }

  books[index] = updatedBook

  writeBooks(books)

  res.send(updatedBook)
})

// 5.
booksRouter.delete("/:bookId", (req, res) => {
  const books = getBooks()

  const remainingBooks = books.filter(book => book.id !== req.params.bookId)

  writeBooks(remainingBooks)

  res.status(204).send()
})

export default booksRouter
