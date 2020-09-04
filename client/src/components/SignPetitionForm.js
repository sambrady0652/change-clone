import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, TextInput, Button, TextArea, Box, Text } from 'grommet'

import { guestSignPetition, userSignPetition } from '../store/currentPetition'
import SignInButton from './SignInButton'

const SignPetitionForm = (props) => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const dispatch = useDispatch()
  const { petitionId, header } = props
  const { id, needSignIn, signedPetitions } = useSelector(state => state.currentUser)
  const alreadySigned = signedPetitions.includes(petitionId)

  const handleGuestSubmit = async (e) => {
    e.preventDefault();
    dispatch(guestSignPetition(firstName, lastName, email, password, message, petitionId, header))
    setMessage("")
  }

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    dispatch(userSignPetition(id, message, petitionId, header))
    setMessage("")
  }
  return (
    <>
      {needSignIn ? (
        <Form onSubmit={handleGuestSubmit}>
          <Box direction="row" align="center">
            <Text margin={{ right: "small" }}>Want to add your signature?</Text>
            <SignInButton label="sign in" />
          </Box>
          <Text size="small"> or create an account here:</Text>
          <TextInput placeholder="First Name" name="first_name" value={firstName} onChange={e => setFirstName(e.target.value)} />
          <TextInput placeholder="Last Name" name="last_name" value={lastName} onChange={e => setLastName(e.target.value)} />
          <TextInput placeholder="Email" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <TextInput placeholder="Password" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <TextArea placeholder="Message (optional)" name="message" resize="vertical" value={message} onChange={e => setMessage(e.target.value)} />
          <Button
            fill="horizontal"
            style={{ borderRadius: "4px" }}
            type="submit"
            plain={false}
            primary
            color="#ED2D23">
            Sign the petition
        </Button>
        </Form >
      ) :
        (
          <>
            {alreadySigned ? (
              <Text>Thank you for signing this petition!</Text>
            )
              : (
                <Form onSubmit={handleUserSubmit}>
                  <TextInput value={id} style={{ display: "none" }} />
                  <Button
                    fill="horizontal"
                    style={{ borderRadius: "4px" }}
                    type="submit"
                    plain={false}
                    primary
                    color="#ED2D23">
                    Sign the petition
                  </Button>
                  <TextArea placeholder="Add an optional message telling us why you signed" name="message" resize="vertical" value={message} onChange={e => setMessage(e.target.value)} />
                </Form >
              )}
          </>
        )
      }
    </>
  )
}

export default SignPetitionForm