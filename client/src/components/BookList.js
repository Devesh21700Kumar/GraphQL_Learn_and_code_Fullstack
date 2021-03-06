import React, { Component } from 'react';
//made a query using apollo boost and gql
import {graphql} from 'react-apollo';
import {getBooksQuery} from '../queries/queries';

//now to bind this query with the below component

class BookList extends Component {
     displayBooks=()=>{
        var data=this.props.data;
        if(data.loading){
            return(<div>Loading Books..</div>)
        }
        else{
            return data.books.map((book)=> (
                <li key={book.id}>{book.name}</li>
            )     
            )
        }
    }
    render(){
        return(
            <div>
                <ul id="book-list" >
                   {this.displayBooks()}
                </ul>
            </div>
        );
    }
}


//we bind the query to component using graphql
export default graphql(getBooksQuery)(BookList);
//the query is now stored in the component's props