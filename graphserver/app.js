const express = require('express');
const {graphqlHTTP} = require('express-graphql');
//helps express understand graphql
//also used as middleware

const schema = require('./schema/schema');
const mongoose = require('mongoose');



const app = express();

// enables environment variables
require('dotenv').config();

// DB connection
require('./db/connect.js')();



//used as middleware here
app.use('/graphql',graphqlHTTP({
    //schema:schema  ES6 syntax below used
    schema,
    //providing a string
    graphiql:true
    //graphiql to test queries
}));
//the above function graphqlHTTP take some options inside an object
//the above functio which uses the middleware.. it needs to know about the graph
//graph needs a schema


app.listen(process.env.PORT,()=>{
 console.log('listening');
});
