import React, { Component } from 'react';
//made a query using apollo boost and gql
import {graphql} from 'react-apollo';
import {getAuthorsQuery} from '../queries/queries';

class AddBook extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            genre:'',
            authorId:''
        };
    }
    displayAuthors(){
        var data = this.props.data;
        //data as props and has a loading property true or false
        if(data.loading){
            return( <option disabled>Loading authors</option> );
        } else {
            return data.authors.map(author => {
                return( <option key={ author.id } value={author.id}>{ author.name }</option> );
            });
        }
    }
    onSubmitForm=(e)=>{
        e.preventDefault();
        console.log(this.state);
    }
    render(){
        return(
            <form id="add-book" onSubmit={this.onSubmitForm}>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" onChange={(e)=>this.setState({name:e.target.value})}/>
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={(e)=>this.setState({genre:e.target.value})}/>
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select onChange={(e)=>this.setState({authorId:e.target.value})}>
                        <option>Select author</option>
                        { this.displayAuthors() }
                    </select>
                </div>
                <button>+</button>
            </form>
        );
    }
}

export default graphql(getAuthorsQuery)(AddBook);
