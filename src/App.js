import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'

import { Route } from 'react-router-dom'
import homePage from './components/pages/homePage'
import searchPage from './components/pages/searchPage'

class BooksApp extends React.Component {

  render() {
    return (
      <div>
        <Route exact path="/" component={homePage}/>
        <Route path="/search" component={searchPage}/>
      </div>
    )
  }
}

export default BooksApp
