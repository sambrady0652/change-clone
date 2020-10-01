import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Heading, Text, Button, Form, FormField } from 'grommet'
import { apiUrl } from '../config';

const SettingsPage = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [location, setLocation] = useState('')
  const userId = localStorage.getItem('USER_ID')
  const [id, setId] = useState(localStorage.getItem('USER_ID'))
  let history = useHistory()

  //TODO:
  //if no user id, redirect to home page to sign up

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(apiUrl + `/users/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('SESSION_TOKEN')}`
        },
      });
      const responseData = await response.json();
      setFirstName(responseData.first_name)
      setLastName(responseData.last_name)
      setLocation(responseData.location)
      setId(userId)

    }
    fetchData();
  }, []);

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
    await response.json()
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

    await response.json()
    localStorage.removeItem('SESSION_TOKEN')
    localStorage.removeItem('USER_ID')
    history.push("/")
  }


  return (
    <>
      <Box justify="center" align="center" >
        <Heading margin={{ bottom: "small" }} textAlign="center">{firstName} {lastName}</Heading>
        <Text margin={{ top: "small" }} weight="bold">Thanks for being an active member of our community. Together we are Change.  </Text>
      </Box>
      <Box justify="center" align="center" >
        <Heading margin={{ bottom: "small" }} textAlign="center">Account Settings</Heading>
        <Form
          onSubmit={handleSubmit}>
          <FormField
            required
            name="first_name"
            label="First Name"
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)} />
          <FormField
            required
            name="last_name"
            label="Last Name"
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)} />
          <FormField
            required
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
          <Button
            type="submit"
            plain={false}
            margin="3px"
            primary
            color="#ED2D23" onClick={deleteAccount}>
            Delete Account</Button>
        </Form>
      </Box>
    </>
  )
}

export default SettingsPage
