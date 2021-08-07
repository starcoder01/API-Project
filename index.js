const express = require("express");
var bodyParser = require("body-parser");

//database
const database = require("./database");
const booky = express(); //initialise express

//It allows express to read the body and parse it into JSON format
//Url thing is for support of any format of request
booky.use(bodyParser.urlencoded({
  extended: true
}));

booky.use(bodyParser.json());
/*
Route         /
Description   Get all the books
Access        Public
Parameters    None
Methods       GET
*/
booky.get("/", (req, res) => {
  return res.json({
    data: database.books
  });
});

/*
Route         /is
Description   Get specific book based on isbn
Access        Public
Parameters    isbn
Methods       GET
*/
booky.get("/is/:isbn", (req, res) => {
  const getSpecificBook = database.books.filter((book) => book.ISBN === req.params.isbn);
  if (getSpecificBook.length === 0)
    return res.json({
      Error: `No book found for the isbn of ${req.params.isbn}`
    });
  else
    return res.json({
      book: getSpecificBook
    });
});

/*
Route         /c
Description   Get specific book based on category
Access        Public
Parameters    isbn
Methods       GET
*/
booky.get("/c/:category", (req, res) => {
  const getSpecificBook = database.books.filter((book) =>
    book.category.includes(req.params.category));
  if (getSpecificBook.length === 0)
    return res.json({
      Error: `No book found for the category of ${req.params.category}`
    });
  else
    return res.json({
      data: getSpecificBook
    });
});

/*
Route         /l
Description   Get all the books based on language
Access        Public
Parameters    language
Methods       GET
*/
booky.get("/l/:language", (req, res) => {
  const getSpecificBook = database.books.filter((book) => book.language === req.params.language);
  if (getSpecificBook.length === 0)
    return res.json({
      Error: `No book found for the language of ${req.params.language}`
    });
  else
    return res.json({
      data: getSpecificBook
    });
});

/*
Route         /author
Description   Get all the authors
Access        Public
Parameters    None
Methods       GET
*/

booky.get("/author", (req, res) => {
  return res.json({
    author: database.author
  });
});

/*
Route         /author/book
Description   Get specific author based on books
Access        Public
Parameters    isbn
Methods       GET
*/
booky.get("/author/book/:isbn", (req, res) => {
  const getSpecificAuthor = database.author.filter((author) => author.books.includes(req.params.isbn));
  if (getSpecificAuthor.length === 0)
    return res.json({
      ERROR: `No author found for the isbn of ${req.params.isbn}`
    });
  else
    return res.json({
      author: getSpecificAuthor
    });
});


/*
Route         /author/id
Description   Get specific author based on ID
Access        Public
Parameters    id
Methods       GET
*/

booky.get("/author/id/:id", (req, res) => {
  const getSpecificAuthor = database.author.filter((author) => author.id === parseInt(req.params.id));
  if (getSpecificAuthor.length === 0)
    return res.json({
      ERROR: `No author found for the id of ${req.params.id}`
    });
  else {
    return res.json({
      author: getSpecificAuthor
    });
  }
});

/*
Route         /publications
Description   get all the publications
Access        Public
Parameters    None
Methods       GET
*/
booky.get("/publications", (req, res) => {
  return res.json({
    publications: database.publication
  });
});

/*
Route         /publications
Description   geta specific publication based on ID
Access        Public
Parameters    id
Methods       GET
*/
booky.get("/publications/id/:id", (req, res) => {
  const getSpecificPublication = database.publication.filter((pub) => pub.id === parseInt(req.params.id));
  if (getSpecificPublication.length === 0)
    return res.json({
      ERROR: `no publication found for name of ${req.params.id}`
    });
  else
    return res.json({
      publication: getSpecificPublication
    });
});

/*
Route         /publications/books
Description   get a specific publication based on books
Access        Public
Parameters    books
Methods       GET
*/
booky.get("/publications/books/:isbn", (req, res) => {
  const getSpecificPublication = database.publication.filter((pub) => pub.books.includes(req.params.isbn));
  if (getSpecificPublication.length === 0)
    return res.json({
      ERROR: `no publication found for isbn of ${req.params.isbn}`
    });
  else
    return res.json({
      publication: getSpecificPublication
    });
});

//POST
/*
Route         /book/new
Description   add new books
Access        Public
Parameters    none
Methods       POST
*/
booky.post("/book/new", (req, res) => {
  const newBook = req.body; //fetch the body of our request
  database.books.push(newBook);
  return res.json({
    updatedBooks: database.books
  });
});

/*
Route         /author/new
Description   add new authors
Access        Public
Parameters    none
Methods       POST
*/
booky.post("/author/new", (req, res) => {
  const newAuthor = req.body;
  database.author.push(newAuthor);
  return res.json({
    updatedAuthors: database.author
  });
});

/*
Route         /publication/new
Description   add new publication
Access        Public
Parameters    none
Methods       POST
*/
booky.post("/publication/new", (req, res) => {
  const newPublication = req.body;
  database.publication.push(newPublication);
  return res.json({
    updatedPublication: database.publication
  });
});

booky.listen("3000", () => {
  console.log("Server is running");
});
