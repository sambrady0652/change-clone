import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Form, Button } from 'grommet';

import { FormFieldLabel } from '../Grommet/FormField';
import SignInButton from './SignInButton'
import { signUp } from '../store/users'


const Signup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signUp(firstName, lastName, email, password))
  }

  return (

    <Box align="center" pad="large">
      <div>
        Already have an account? <SignInButton label="sign in here!" context="signup" />
      </div>
      <Form
        onSubmit={handleSubmit}>
        <FormFieldLabel
          required
          name="first_name"
          label="First Name"
          type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)} />
        <FormFieldLabel
          required
          name="last_name"
          label="Last Name"
          type="text"
          value={lastName}
          onChange={e => setLastName(e.target.value)} />
        <FormFieldLabel
          required
          name="email"
          label="Email"
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)} />
        <FormFieldLabel
          required
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)} />
        <Button
          type="submit"
          plain={false}
          primary
          color="#ED2D23">
          sign in</Button>
      </Form>
    </Box>
  );
}

export default Signup