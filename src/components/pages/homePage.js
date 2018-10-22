import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../../BooksAPI'

import Shelf from '../shelf'

class homePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }
  componentDidMount() {
    BooksAPI.getAll()
    .then(resp => {
      this.setState({ books: resp})
    });
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(resp => {
      book.shelf =shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }));
    });
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf updateBook={this.updateBook} name="Currently Reading" books={this.state.books.filter(f => f.shelf ==="currentlyReading")}/>
            <Shelf updateBook={this.updateBook} name="Want To Read" books={this.state.books.filter(f => f.shelf ==="wantToRead")}/>
            <Shelf updateBook={this.updateBook} name="Read" books={this.state.books.filter(f => f.shelf ==="read")}/>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default homePage
