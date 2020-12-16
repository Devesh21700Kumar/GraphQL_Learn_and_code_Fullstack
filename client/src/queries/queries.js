import {gql} from 'apollo-boost';
//made a query using apollo boost and gql

const getAuthorsQuery = gql`
{
    authors{
        name
        id
    }
}
`
const getBooksQuery = gql`
{
    books{
        name
        id
    }
}
`
const addBookMutation = gql`
    mutation{
       addBook(name:"",genre:"",authorID:"") {
           name
           id
       }
    }
`

export { getAuthorsQuery,getBooksQuery,addBookMutation};