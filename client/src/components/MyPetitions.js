import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Navbar from './Navbar'
import { makeCard } from '../components/Petitions'
import { apiUrl } from '../config';
import { Main, Heading, Box, Tab, Tabs } from 'grommet'

const MyPetitions = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [location, setLocation] = useState('')
  const [id, setId] = useState(parseInt(localStorage.getItem('USER_ID')))
  const [Started, setStarted] = useState([])
  let petitions = useSelector(state => state.petitions);
  let startedPetitions = []
  for(let key in petitions){
    if(petitions[key].creator === id)
    startedPetitions.push(petitions[key])
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(apiUrl + `/users/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('SESSION_TOKEN')}`
        },
      });
      const responseData = await response.json();
      console.log(responseData)
      setFirstName(responseData.first_name)
      setLastName(responseData.last_name)
      setLocation(responseData.location)
    }
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Heading margin={{ bottom: "small" }} textAlign="center">{firstName} {lastName}</Heading>
        <Box justify="center" align="center" style={{ position: "relative" }}>
          <Heading level={2} ></Heading>
          <Tabs>
            <Tab title="Started">
              <Main background="#F6F4F6">
                {startedPetitions.map(petition => makeCard(petition))}
              </Main>
            </Tab>
            <Tab title="Signed">
              <Main background="#F6F4F6">
                {/* still need to implement */}
              </Main>
              </Tab>
          </Tabs>
        </Box>
      </>
  )
}

export default MyPetitions
