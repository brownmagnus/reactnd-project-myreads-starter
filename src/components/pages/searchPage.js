import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from '../book'
import * as BooksAPI from '../../BooksAPI'

class searchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      results: [],
      query: ""
    }
  }
  componentDidMount() {
    BooksAPI.getAll()
    .then(resp => {
      this.setState({ books: resp})
    });
  }

  updatequery = (query) => {
    this.setState({query: query}, this.submitSearch);
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
  submitSearch() {
    if(this.state.query === "" || this.state.query === undefined) {
      return this.setState({ results: []});
    }
    BooksAPI.search(this.state.query.trim()).then(res => {
        if(res.error) {
          return this.setState({ results: [] });
        }
        else {
          res.forEach(bookIn => {
            let f = this.state.books.filter(B => B.id === bookIn.id);
            if(f[0]) {
              bookIn.shelf = f[0].shelf;
            }
          })
          return this.setState({ results: res });
        }
    })
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
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" >Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.query}
              onChange={(e) => this.updatequery(e.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.state.results.map((book, key) => <Book updateBook={this.updateBook} key={key} book={book} />)
            }
          </ol>
        </div>
      </div>
    )

  }
}

export default searchPage
