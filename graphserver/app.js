const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
//helps express understand graphql
//also used as middleware

const app = express();

// enables environment variables
require('dotenv').config();

// DB connection
require('./db/connect.js')();

//CONNECTING MONGOOSE:-
/*mongoose.connect("mongodb+srv://Dev:6pbj8ThNKTBsOupS@cluster0.op0lq.mongodb.net/<dbname>?retryWrites=true&w=majority",
{
 useNewUrlParser:true,
 useCreateIndex:true,
 useUnifiedTopology: true 
}).then(()=>{
	console.log('connected to DB');
}).catch(err=>{
	console.log('ERROR',err.message);
});*/

//used as middleware here
app.use('/graphql',graphqlHTTP({
    //schema:schema  ES6 syntax below used
    schema,
    //providing a string
    graphiql:true
}));
//the above function graphqlHTTP take some options inside an object
//the above functio which uses the middleware.. it needs to know about the graph
//graph needs a schema


app.listen(4000,()=>{
 console.log('listening');
});
