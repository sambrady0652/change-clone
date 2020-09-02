import React, { useState } from 'react'

import { Form, TextInput, Button } from 'grommet'

const SignPetitionForm = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    //HANDLE SUBMIT
  }
  return (
    <Form onSubmit={() => handleSubmit}>
      <TextInput placeholder="First Name" name="first_name" value={firstName} onChange={e => setFirstName(e.target.value)} />
      <TextInput placeholder="Last Name" name="last_name" value={lastName} onChange={e => setLastName(e.target.value)} />
      <TextInput placeholder="Email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
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
  )
}

export default SignPetitionForm