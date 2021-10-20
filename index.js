// require("dotenv").config();
require('dotenv').config();

const express=require('express');
const mongoose = require('mongoose');

//database
const database=require('./database/database');

//models
const BookModel=require('./database/book');
const AuthorModel= require('./database/author');
const PublicationModel =require('./database/publication');

// console.log(database.books);


//for posting something we need a few more things such as body parser
const bodyParser=require('body-parser');



//initialize express
const booky=express();
booky.use(bodyParser.urlencoded({extended: true}));//this is done for taking all data formats and convert them into JSON format
booky.use(bodyParser.json());
mongoose.connect(process.env.MONGO_URL, 
{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false, 
    useCreateIndex: true, 
} 
).then(()=> console.log("Connection Established"));

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

//get method is used to take request from the user and respond accordingly.
//post is used to post some data from the user in the backend(database or server)



// route
//  description:   get all the books
//  access:    PUBLIC
// Parameter :    none
// methods used : get method



/* booky.get('/',(req,res)=>{
    return res.json({
        books:database.books,
    })
})
 */
// async await is always used when dealing with mongoose because it is an asynchronous task.

booky.get('/',async(req,res)=>{
    const getAllBooks=await BookModel.find();
    return res.json(getAllBooks);
})

//----------------------------------------------------------------------------

// route
//  description:   get specific book based on ISBN
//  access:    PUBLIC
// Parameter :    ISBN
// methods used : get 

booky.get('/is/:ISBN',async(req,res)=>{
    const id=req.params.ISBN;
    console.log(id);


    const specifiedBooks= await BookModel.findOne({
        ISBN:id
    });
    
    //null is returned if no element is found;
    if(specifiedBooks===null){
        return res.json({error: `no Book found for ISBN: ${id}`});
    };


    //didi used if(!specifiedBooks)




    return res.json({book: specifiedBooks});





    // const arr=(database.books.filter((e)=>e.ISBN===id));
    // if(arr.length===0){
    //     return res.json({error: `No book found for the ISBN of ${id}`});
    // }
    // return res.json({book:arr});
})


//----------------------------------------------------------------------------


// route
//  description:   get specific book based on category
//  access:    PUBLIC
// Parameter :    category
// methods used : get 

booky.get('/c/:cat',async (req,res)=>{
    const id=req.params.cat;
    console.log(id);

    const specificBook=await BookModel.find({category:id});
    
    if(specificBook.length===0){
        return res.json({error:`no book found with category: ${id}`});
    }



    return res.json(specificBook);















    // const arr=(database.books.filter((e)=>e.category.includes(id)));
    // if(arr.length===0){
    //     return res.json({error: `No book found for the category with ${id}`});
    // }
    // return res.json({book:arr});
});





//----------------------------------------------------------------------------

// route
//  description:   get specific book based on language
//  access:    PUBLIC
// Parameter :    language
// methods used : get 

booky.get('/ln/:lang',async(req,res)=>{
    const id=req.params.lang;
    console.log(id);

    const specificBook=await BookModel.find({
        language:id
    });
    if(specificBook.length===0){
        return res.json({
            error:`no book found which is written in ${id}`
    })
        
}
    
    return res.json({
        book: specificBook
    });

    // const arr=(database.books.filter((e)=>e.language===id));
    // if(arr.length===0){
    //     return res.json({error: `No book found for the language ${id}`});
    // }
    // return res.json({book:arr});
});

//----------------------------------------------------------------------------

// route            /author
//  description:   get data of all authors
//  access:    PUBLIC
// Parameter :    none
// methods used : get 

booky.get('/author',async(req,res)=>{
    // const id=req.params.lang;
    // console.log(id);
    // const arr=(database.books.filter((e)=>e.language===id));
    // if(arr.length===0){
    //     return res.json({error: `No book found for the language ${id}`});
    // }
    // return res.json({authors:database.author});
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);

})

//----------------------------------------------------------------------
// route            /author/id
//  description:   get data of authors based on id
//  access:    PUBLIC
// Parameter :    Id
// methods used : get 
booky.get('/author/:id_',async(req,res)=>{
    const id_=req.params.id;

    const newAuthor= await AuthorModel.findOne({id:id_});
    if(newAuthor===null){
        return res.json({error: `no author found with id: ${id_}`});
    }

    return res.json({author:newAuthor});
    // const arr = database.author.filter((e)=>e.id===parseInt(id));
    // if(arr.length===0){
    //     return res.json({author:`No author found for the given book ID ${id}`})
    // }
    // return res.json({author:arr});
})
//-----------------------------------------------------------------------


// route            /author/book
//  description:   get data of authors based on books
//  access:    PUBLIC
// Parameter :    ISBN
// methods used : get 


booky.get('/author/book/:ISBN',async(req,res)=>{
    const id=req.params.ISBN;
    console.log(id);

    const specificAuthor= await AuthorModel.find({books: id});

    if(specificAuthor.length===0){
        return res.json({error:`no author found with book: ${id}`});
    }
    return res.json({author:specificAuthor});

    // const arr=(database.author.filter((e)=>e.books.includes(id)));
    // if(arr.length===0){
    //     return res.json({error: `No author found for the given book ISBN ${id}`});
    // }
    // return res.json({authors:arr});
})
//-------------------------------------------------------------------------
// route            /publications
//  description:   get data of all publications
//  access:    PUBLIC
// Parameter :    none
// methods used : get 

booky.get('/publications',async (req,res)=>{
    // return res.json({publications:database.publication});
    const getAllPublications= await PublicationModel.find();
    if(getAllPublications.length===0){
        return res.json({error:`no publication present`});
    
    }
    return res.json({publications:getAllPublications});
});


//-------------------------------------------------------------------------
// route            /publications/id
//  description:   get data of specific publication using id
//  access:    PUBLIC
// Parameter :    id
// methods used : get 

booky.get('/publications/identity/:id_',async(req,res)=>{
    const id_=req.params.id_;

    const specificPublication= await PublicationModel.findOne({id:parseInt(id_)});

    if(specificPublication===null){
        return res.json({error:`no such publication found with id: ${id_}`});
    }
    return res.json({publication:specificPublication});
    
    // const arr=database.publication.filter((e)=>e.id===parseInt(id));
    // if(arr.length===0){
        //     return res.json({publications:`no publication found for provided id ${id}`});
        // }
        // return res.json({publications:arr});
    })
    //-------------------------------------------------------------------------
    // route            /publications/book
    //  description:   get data of specific publication using book ISBN
    //  access:    PUBLIC
    // Parameter :    ISBN
    // methods used : get 
    
    booky.get('/publications/book/:ISBN',async(req,res)=>{
        const id=req.params.ISBN;
        console.log(id);
        const specificPublication=await PublicationModel.find({books:id});
        if(specificPublication.length===0){
            return res.json({error:`no such publication found with Book ISBN: ${id}`});
        }
        return res.json({publication:specificPublication});
    

    // const arr=database.publication.filter((e)=>e.books.includes(id));
    // if(arr.length===0){
    //     return res.json({publications:`no publication found for provided book ISBN ${id}`});
    // }
    // return res.json({publications:arr});
    })



/*******post is used to post something from the user in the server********/
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
// route            /book/new
//  description:   post a new book
//  access:    PUBLIC
// Parameter :    none
// methods used : post









booky.post('/book/new', async(req,res)=>{
    const { newBook }=req.body;
    const addNewBook = BookModel.create(newBook);
    return res.json(
        // {updatedBook: addNewBook,
        {updatedBook:await BookModel.find(),
        message:`book was added`
        });






    // let count=0;
    // database.books.forEach((e,i)=>{
    //     if(e.ISBN===newBook.ISBN){
    //         database.books[i]=newBook;//updating the specific bookwith same isbn
    //         count++;
    //         return;
    //     }
    // })
    // if(count===0){
    // database.books.push(newBook);
    // }
    // return res.json({updatedBooks:database.books});
});




//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
// route            /author/new
//  description:   post a new author
//  access:    PUBLIC
// Parameter :    none
// methods used : post

booky.post('/author/new', async(req,res)=>{
    const { newAuthor }= req.body;
    const addAuthor = AuthorModel.create(newAuthor);

    return res.json({
        author: addAuthor,
        message:'author added succesfully.'
    });

    // database.author.push(newAuthor);
    // res.json({updatedAuthor: database.author});
});

//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
// route            /publication/new
//  description:   post a new publication
//  access:    PUBLIC
// Parameter :    none
// methods used : post

booky.post('/publication/new', async(req,res)=>{
    const { newPublication }= req.body;
    console.log(newPublication);
    const addPublication= PublicationModel.create(newPublication);

    return res.json({
        addedPublication: addPublication,
        message:'Publication added succesfully'
    })


    // database.publication.push(newAuthor);
    // res.json({updatedAuthors:database.publication});
})



/* *************put****************** */
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
// route            /publication/update/book/
//  description:   add or update publication
//  access:    PUBLIC
// Parameter :    ISBN
// methods used : put




booky.put('/publication/update/book/:isbn',(req,res)=>{
    //lets first update the publication databse.
    database.publication.forEach((e)=>{
        if(e.id===parseInt(req.body.pubID)){
            if(!e.books.includes(req.params.isbn)){
            return e.books.push(req.params.isbn);
            }
        }
    });
    database.books.forEach((book)=>{
        if(book.ISBN==req.params.isbn){
            if(book.publications!==parseInt(req.body.pubID)){
            book.publications=req.body.pubID;
            return;
        }
        }
    })
    return res.json({
        books: database.books,
        publications:database.publication,
        message:"Succesfully updated publications"
    })
});




/* *************put****************** */
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
// route            /publication/update/book/
//  description:   update book on isbn
//  access:    PUBLIC
// Parameter :    ISBN
// methods used : put


booky.put("/book/update/:isbn", async (req,res)=>{
    const updatedBook = await BookModel.findOneAndUpdate({
        ISBN:req.params.isbn
    },
    {
        title: req.body.bookTitle
    },
    {
        new: true
    }
    );
    
    
    return res.json({
        books:updatedBook
    });
    
});

//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
// route            book/author/update
//  description:   update/add new publication
//  access:    PUBLIC
// Parameter :    ISBN
// methods used : put

booky.put('/book/author/update/:isbn', async (req,res)=>{
    //update book database
    const updatedBook= await BookModel.findOneAndUpdate({
      ISBN:req.params.isbn  
    },
    {
        $addToSet :{
            author:req.body.newAuthor
        }
    },
    {
        new:true
    }
    );

    //update the author database
    const updatedAuthor= await AuthorModel.findOneAndUpdate(
        {
            id: req.body.newAuthor
        },
        {
            $addToSet:{
                books: req.params.isbn
            }
        },
        {
            new:true
        }
    );
        return res.json({
            books:updatedBook,
            author:updatedAuthor,
            message:'new author was added'
        })

});










/* /////////////////////////////// */
/* booky.put('/book/update/:isbn',(req,res)=>{
    const id=req.body.pubID;
    database.publication.forEach((e)=>{
        if(e.id===parseInt(id)){
            return database.publication.push(req.params.isbn);
        }
    });
    database.books.forEach((e)=>{
        if(e.ISBN===req.params.isbn){
            e.publications=parseInt(id);
            return;
        }
    });
     res.json({
        book:database.books
    });
}) */


/* *****************delete ********************/


//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
// route            /book/delete/:isbn
//  description:   to delete a book
//  access:    PUBLIC
// Parameter :    ISBN
// methods used : delete



// booky.delete('/book/delete/:isbn',(req,res)=>{
//     //whichever book that does not match with the isbn just send it to a new array 
//     const id=req.params.isbn;
//     const updated_book=database.books.filter((book)=>book.ISBN!==id);
//     console.log(updated_book);
//     database.books=updated_book;
//     return res.json({books:database.books});
// });



booky.delete('/book/delete/:isbn', async (req,res)=>{
    const updatedBook= await BookModel.findOneAndDelete(
    {
        ISBN:req.params.isbn
    });
    return res.json({
        books: updatedBook
    })
});







/* booky.delete('/book/del/:isbn',(req,res)=>{
    const id=req.params.isbn;
    console.log(id);
    const updated=database.books.filter((e)=>
        e.ISBN!==id
    );
    database.books=updated;
    res.json({
        books:database.books
    });
})
 */


/* booky.delete("/book/delete/:isbn", (req, res)=>{
    const updateBookDatabase = database.books.filter(
        (book) => book.ISBN !== req.params.isbn
    )
    database.books = updateBookDatabase;
    return res.json({books : database.books});
}); */
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
// route           /book/delete/author/:isbn/:authorID
//  description:   delete an author from book
//  access:    PUBLIC
// Parameter :    ISBN,author id
// methods used : delete


booky.delete('/book/del/author/:isbn/:aID',(req,res)=>{
    const bookID=req.params.isbn;
    const aID=req.params.aID;
    database.books.forEach((e)=>{
        if(e.ISBN===bookID){
            e.author=e.author.filter((e)=>e!==parseInt(aID));
            return;
        }
    });



    database.author.forEach((a)=>{
        if(a.id===parseInt(aID)){
            if(a.books.includes(bookID)){
                a.books=a.books.filter((e)=>e!==bookID);
            }
        }
    });

    
    res.json({
        books: database.books,
        author:database.author
    });
})










//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
// route           /book/delete/author/:isbn/:authorID
//  description:   delete a book from author and vice versa
//  access:    PUBLIC
// Parameter :    ISBN,author id
// methods used : delete

booky.delete('/book/delete/author/:isbn/:authorID',(req,res)=>{

    //update the book database
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
            const newAuthorList=book.author.filter((e)=>
                e!==parseInt(req.params.authorID)
            );
            book.author=newAuthorList;
            return;
        }
    })


    //update the author database

    database.author.forEach((author)=>{
        if(author.id === parseInt(req.params.authorID)){
            const newBookList=author.books.filter((book)=>
                book!==req.params.isbn
            );
            author.books=newBookList;
            return;
        }
    })
    return res.json({
        book:database.books,
        author:database.author,
        message:"Author was deleted!!"
    });

})





booky.listen(3000,()=>{
    console.log('server is up and running at port 3000.');
})