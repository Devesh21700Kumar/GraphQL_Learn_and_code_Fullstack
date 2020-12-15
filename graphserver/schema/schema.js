const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const {GraphQLObjectType,GraphQLString,GraphQLID,GraphQLInt,GraphQLList,GraphQLNonNull} = graphql;

// dummy data
//BELOW
//used author id to associate each book with its author
/*var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1',authorId:'1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2',authorId:'2' },
    { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
    { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
    { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
];

var authors = [
    {name:"patrick Rothfuse", age:44,id:'1'},
    {name:"pat", age:42,id:'2'},
    {name:"patrick ", age:64,id:'3'}
];*/


//defined our object type
const BookType = new GraphQLObjectType({
    name:'Book',
    //put functions so that we do not execute it until all of it has run
    //function keeps it running untik completion
    fields:()=>({
      //important to be wrapped in a function
      //it has different feilds
      id: {type: GraphQLID },
      name: {type: GraphQLString},
      genre: {type: GraphQLString},
      author:{
          type:AuthorType,
          //resolve to get data from a place
          resolve(parent,args){
           // return _.find(authors, { id: parent.authorId});
           return Author.findById(parent.authorId);
          }
      }  
    })
});

const AuthorType = new GraphQLObjectType({
    name:'Author',
    //put functions so that we do not execute it until all of it has run
    //function keeps it running untik completion
    fields:()=>({
      //important to be wrapped in a function
      //it has different feilds
      id: {type: GraphQLID},
      name: {type: GraphQLString},
      age: {type: GraphQLInt},
      books: {
          //graphQl List of Book Types
          type: new GraphQLList(BookType),
          resolve(parent,args){
             // return _.filter(books, {authorId: parent.id});
              //all the objects matching the above can remain
              //rest are filtered
              //#lodash
              return Book.find({authorId: parent.id});
          }
      }
    })
});

//how a user can jump into graph data/schema from frontend
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
       book: {
           type: BookType,
           //pass down args to know which item (here book) is needed
           args: {id:{type: GraphQLID}},
           //resolve function to get data we need from DB or other source
           resolve(parent,args){
                //parents will come into play during data relationships
               //return _.find(books,{id: args.id});
               return Book.findById(args.id);
            }
       }, 
       author: {
        type: AuthorType,
        //pass down args to know which item (here book) is needed
        args: {id:{type: GraphQLID}},
        //resolve function to get data we need from DB or other source
        resolve(parent,args){
             //parents will come into play during data relationships
            //return _.find(authors,{id: args.id});
            return AuthorType.findById(args.id);
         }
      },
      //abooks
       books: {
        type: new GraphQLList(AuthorType),
        resolve(parent,args){
            return Book.find({});
        }
      },
      //all authors
       authors: {
        type: new GraphQLList(AuthorType),
        resolve(parent,args){
            return Book.find({});
        }
      },
    }
});

//setting up a mutation
const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor: {
            type: AuthorType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
               return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                //non null to make it a required peoperty
                //these properties cannoyt be null
                //if not passed then don't allow the mutation to happen
                name:{type:new GraphQLNonNull(GraphQLString)},
                genre:{type:new GraphQLNonNull(GraphQLString)},
                authorId:{type:new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
})


//property of graphql package
module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    //we define rootquery or how we initially jump into the graph
    mutation: Mutation
    //mutation property 
})
