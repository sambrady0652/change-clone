import React from 'react'
import Navbar from './Navbar'
import 'bulma/css/bulma.css'

const Search = () => {
  return (
    <>
      <Navbar/>
      <div style={{display: "flex", justifyContent: "center"}}>
        <div class="control">
          <div>Search</div>
          <div style={{display: "flex"}}>
            <input class="input" type="text" placeholder="Search petitions"/>
            <button class="button is-link">Search</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Search
