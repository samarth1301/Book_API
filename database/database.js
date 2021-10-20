const books=[
    {
        ISBN:"12345Book",
        title:"TESLA",
        pubDate:"2021-08-05",
        language:"en",
        numPage:250,
        author:[1,2],
        publications:1,
        category:["tech","space","education"]
    }
]

const author=[
    {
        id:1,
        name:'aradhna',
        books:['12345Book','secretBook']
    },
    {
        id:2,
        name:'Elon Musk',
        books:['12345Book'],
    }
]

const publication=[
    {
        id:1,
        name:'writex',
        books:['12345Book']
    },
    {
        id:2,
        name:'writex2',
        books:[]
    }
]

module.exports={books,author,publication}

// module.exports={books,author,publication};
//in order to allow export of my arrays from this js file where i ll be wrting the name of arrays i need to export