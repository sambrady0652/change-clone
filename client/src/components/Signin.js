import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Form, Button } from 'grommet';

import { FormFieldLabel } from '../Grommet/FormField';
import SignInButton from './SignInButton'


const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // HANDLE SUBMIT
  }

  return (

    <Box align="center" pad="large">
      <div>
        don't have an account? <SignInButton label="sign up here!" context="signin" />
      </div>
      <Form
        onSubmit={handleSubmit}>
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

export default Signin