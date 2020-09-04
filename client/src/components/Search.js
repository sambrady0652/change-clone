import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from './Navbar'
import 'bulma/css/bulma.css'
import { makeCard } from '../components/Petitions'

const Search = () => {
<<<<<<< HEAD
  return (
    <>
      <div style={{display: "flex", justifyContent: "center"}}>
        <div class="control">
          <div>Search</div>
          <div style={{display: "flex"}}>
            <input class="input" type="text" placeholder="Search petitions"/>
            <button class="button is-link">Search</button>
=======
  let petitions = useSelector(state => state.petitions);
  let array = []
  for(let key in petitions){
    array.push(petitions[key])
  }

  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [errors, setErrors] = useState([])
  const [flag, setFlag] = useState(false)




  const handleSubmit = async (e) => {
    e.preventDefault();
    if(searchTerm === ''){
      return
    }
    setSearchResults([])
    setErrors([])
    let tempArray = []
    console.log(array)
    array.map(petition => {
      if (petition.header.includes(searchTerm)){
        tempArray.push(petition)
      }
    })
    if(tempArray.length === 0){
      setErrors(['No results were found from your search'])
      setSearchResults([])
      setFlag(true)
    }else{
      setSearchResults([...tempArray])
    }

  }


  let errorsToRender;
    if(errors[0] !== null){
      errorsToRender = errors.map(error => {
          return <div style={{color: 'red', fontWeight: 'bold', font: 20}} key={error} >{error}</div>
      })
    }else{
    errorsToRender = <div></div>
    }


  if (searchResults.length === 0 && !flag){
    return (
      <>
        <Navbar/>
        <div style={{display: "flex", justifyContent: "center"}}>
          <div className="control">
            <div>Search</div>
            <div style={{display: "flex"}}>
              <input className="input" name='search_term' value={searchTerm} onChange={e => setSearchTerm(e.target.value)} type="text" placeholder="Search petitions"/>
              <button className="button is-link" onClick={handleSubmit}>Search</button>
            </div>
            <div>{errorsToRender}</div>
              <div style={{justifyContent: "center"}}>
                {array.map(ele =>
                  makeCard(ele))}
            </div>
          </div>
        </div>
      </>
    )
  }else{
    return (
      <>
        <Navbar/>
        <div style={{display: "flex", justifyContent: "center"}}>
          <div className="control">
            <div>Search</div>
            <div style={{display: "flex"}}>
              <input className="input" name='search_term' value={searchTerm} onChange={e => setSearchTerm(e.target.value)} type="text" placeholder="Search petitions"/>
              <button className="button is-link" onClick={handleSubmit}>Search</button>
            </div>
            <div>{errorsToRender}</div>
            <div>
              {searchResults.map(ele =>
                  makeCard(ele))}
            </div>
>>>>>>> 10d2d7da25b7119e5da8680ec3cc24d3f6a94ea0
          </div>
        </div>
      </>
    )
  }
}

export default Search
