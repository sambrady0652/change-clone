import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Navbar from './Navbar'
import { Box, Heading, Text, Button, Form, TextInput, FormField } from 'grommet'
import { apiUrl } from '../config';

const SettingsPage = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [location, setLocation] = useState('')
  const [id, setId] = useState(localStorage.getItem('USER_ID'))
  let history = useHistory()

  //need to implement
  //if no user id, redirect to home page to sign up


  useEffect(() => {
    async function fetchData() {
      console.log(apiUrl + `/users/${id}`)
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
    fetchData();
  }, []);

  //cross origin issue, does not work yet
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(apiUrl + `/users/${id}`, {
      method: 'patch',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('SESSION_TOKEN')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'first_name': firstName,
        'last_name': lastName,
        'location': location
      })
    })
    let data = await response.json()
    console.log(data)
    history.push("/")
  }

  const deleteAccount = async (e) => {
    e.preventDefault();

    const response = await fetch(apiUrl + '/users/delete_account', {
      method: 'delete',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('SESSION_TOKEN')}`
      }

    });

    let data = await response.json()
    console.log(data)
    localStorage.removeItem('SESSION_TOKEN')
    localStorage.removeItem('USER_ID')
    history.push("/")
  }


  return (
    <>
      <Navbar />
      <Box justify="center" align="center" >
        <Heading margin={{ bottom: "small" }} textAlign="center">{firstName} {lastName}</Heading>
        <Text margin={{ top: "small" }} weight="bold">Thanks for being an active member of our community. Together we are Change.  </Text>
      </Box>
      <Box justify="center" align="center" >
        <Heading margin={{ bottom: "small" }} textAlign="center">Account Settings</Heading>
        <Form
          onSubmit={handleSubmit}>
          <FormField
            name="first_name"
            label="First Name"
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)} />
          <FormField
            name="last_name"
            label="Last Name"
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)} />
          <FormField
            name="location"
            label="location"
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)} />
          <Button
            type="submit"
            plain={false}
            primary
            color="#ED2D23">
            Save</Button>
        </Form>
      </Box>
      <Button
        type="submit"
        plain={false}
        primary
        color="#ED2D23" onClick={deleteAccount}>
        Delete Account</Button>
    </>
  )
}

export default SettingsPage
