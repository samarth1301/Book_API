//requirement for our project

const { books } = require("./database/database")


//we are a book management company


//books
//isbn-id of the book
//title of the book
//publication date
//language
//number of pages
//author[]
//category[]


//author
//id
//name
//array[]
//

//publications
//id name books[]

//we have to design and create an API over this:
//1.books
//to get all the books
//to get specific book
// to get a list of books based on category
//to get a list of books based on languages

// 2.authors
//we need an api:
//to get all the authors
// to get a specific author 
// to get a list of authors based on books

// 3.publications 
// we need an api
// to get all the publications
// to get a specific publication
//to get a list of publications based on book.



// we will be using post method now 
// 1. add new boook
//2.add new publications
//3. add new author


/* *************************** */
//update book details if author is changed



/* ******************************* */
// delete
// delete a book
// delete author from book
// delete author from book and related book from author



//schema -blueprint of how data has to be constructed
//mongoDB is schemaless
//mongoose has schema
// mongoose - validation - relationship with other data.
//model -> document model of MongoDB
//schema -> model -> use them.