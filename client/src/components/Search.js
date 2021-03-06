import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import 'bulma/css/bulma.css'
import { makeCard } from '../components/Petitions'
import { fetchPetitions } from '../store/petitions'

const Search = () => {
  const { petitions } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPetitions())
  }, [dispatch])

  let array = []
  for (let key in petitions) {
    array.push(petitions[key])
  }

  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [errors, setErrors] = useState([])
  const [flag, setFlag] = useState(false)




  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm === '') {
      return
    }
    setSearchResults([])
    setErrors([])
    let tempArray = array.filter(petition => petition.header.toLowerCase().includes(searchTerm.toLowerCase()))
    if (tempArray.length === 0) {
      setErrors(['No results were found from your search'])
      setSearchResults([])
      setFlag(true)
    } else {
      setSearchResults([...tempArray])
    }

  }


  let errorsToRender;
  if (errors[0] !== null) {
    errorsToRender = errors.map(error => {
      return <div style={{ color: 'red', fontWeight: 'bold', font: 20 }} key={error} >{error}</div>
    })
  } else {
    errorsToRender = <div></div>
  }


  if (searchResults.length === 0 && !flag) {
    return (
      <>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="control">
            <div>Search</div>
            <div style={{ display: "flex" }}>
              <input className="input" name='search_term' value={searchTerm} onChange={e => setSearchTerm(e.target.value)} type="text" placeholder="Search petitions" />
              <button className="button is-link" onClick={handleSubmit}>Search</button>
            </div>
            <div>{errorsToRender}</div>
            <div style={{ justifyContent: "center" }}>
              {array.map(ele =>
                makeCard(ele))}
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="control">
            <div>Search</div>
            <div style={{ display: "flex" }}>
              <input className="input" name='search_term' value={searchTerm} onChange={e => setSearchTerm(e.target.value)} type="text" placeholder="Search petitions" />
              <button className="button is-link" onClick={handleSubmit}>Search</button>
            </div>
            <div>{errorsToRender}</div>
            <div>
              {searchResults.map(ele =>
                makeCard(ele))}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Search
