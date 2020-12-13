const graphql = require('graphql');

const {GraphQLObjectType,GraphQLString} = graphql;

//defined our object type
const BookType = new GraphQLObjectType({
    name:'Book',
    fields:()=>({
      //important to be wrapped in a function
      id: {type: GraphQLString },
      name: {type: GraphQLString},
      genre: {type: GraphQLString}  
    })
});

//how a user can jump into graph data/schema from frontend
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
       book: {
           type: BookType,
           //pass down args to know which item (here book) is needed
           args: {id:{type: GraphQLString}},
           //resolve function to get data we need from DB or other source
           resolve(parent,args){
                //parents will come into play during data relationships
                
            }
       } 
    }
});

//property of graphql package
module.exports = new graphql.GraphQLSchema({
    query: RootQuery
    //we define rootquery or how we initially jump into the graph
})
