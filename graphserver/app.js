const express = require('express');
const {graphqlHTTP} = require('express-graphql');
//helps express understand graphql
//also used as middleware

const app = express();

//used as middleware here
app.use('/graphql',graphqlHTTP({

}));
//the above function graphqlHTTP take some options inside an object
//the above functio which uses the middleware.. it needs to know about the graph
//graph needs a schema


app.listen(4000,()=>{
 console.log('listening');
});
