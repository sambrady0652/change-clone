import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from './Navbar'
import { makeCard } from '../components/Petitions'
import { apiUrl } from '../config';
import { Main, Heading, Box, Tab, Tabs } from 'grommet'
import 'bulma/css/bulma.css'
import { fetchPetitions } from '../store/petitions'

const MyPetitions = () => {
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [location, setLocation] = useState('')
  const [id, setId] = useState(parseInt(localStorage.getItem('USER_ID')))
  const [Signed, setSigned] = useState([])
  const history = useHistory()
  let petitions = useSelector(state => state.petitions);
  let startedPetitions = []
  let signedPetitions = []
  for (let key in petitions) {
    if (petitions[key].creator === id)
      startedPetitions.push(petitions[key])
  }

  useEffect(() => {
    async function fetchUserInfo() {
      const response = await fetch(apiUrl + `/users/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('SESSION_TOKEN')}`
        },
      });
      const responseData = await response.json();
      setFirstName(responseData.first_name)
      setLastName(responseData.last_name)
      setLocation(responseData.location)
    }

    async function fetchSignedPetitions() {
      const response = await fetch(apiUrl + `/petitions/${id}/user_signed_petitions`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('SESSION_TOKEN')}`
        },
      });
      const responseData = await response.json();
      const allPetitionsSigned = Object.values(responseData)
      setSigned(allPetitionsSigned)

    }
    fetchUserInfo();
    fetchSignedPetitions()
    dispatch(fetchPetitions())
  }, []);

  if (Signed.length > 0) {
    for (let key in petitions) {
      for (let num in Signed) {
        if (petitions[key].id === Signed[num]) {
          signedPetitions.push(petitions[key])
        }
      }
    }
  }

  return (
    <>
      <Heading margin={{ bottom: "small" }} textAlign="center">{firstName} {lastName}</Heading>
      <Box justify="center" align="center" style={{ position: "relative" }}>
        <Heading level={2} >{location}</Heading>
        <button className="button is-danger is-outlined" style={{ margin: "10px" }} onClick={() => { history.push("/settings") }}>Settings</button>
        <Tabs>
          <Tab title="Started">
            <Main background="#F6F4F6">
              {startedPetitions.map(petition => makeCard(petition))}
            </Main>
          </Tab>
          <Tab title="Signed">
            <Main background="#F6F4F6">
              {signedPetitions.map(petition => makeCard(petition))}
            </Main>
          </Tab>
        </Tabs>
      </Box>
    </>
  )
}

export default MyPetitions
