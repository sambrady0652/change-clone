import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Form, Button, FormField } from 'grommet';

import SignInButton from './SignInButton'
import { signIn } from '../store/auth'
import ErrorBox from '../Grommet/ErrorBox'


const Signin = (props) => {
  const { toggleLast } = props
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authErrors } = useSelector(state => state.currentUser)
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signIn(email, password))
  }

  const handleGuestSubmit = async (e) => {
    e.preventDefault()
    dispatch(signIn("default@user.com", "password"))
  }
  return (
    <Box align="center" pad="large">
      <div>
        don't have an account? <SignInButton label="sign up here!" onClickProp={toggleLast} />
      </div>
      {/* if authErrors, show Error Box */}
      {authErrors && <ErrorBox />}
      <Form
        onSubmit={handleSubmit}>
        <FormField
          name="email"
          label="Email"
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)} />
        <FormField
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
          <Button
            onClick={handleGuestSubmit}
            type="submit"
            margin="small"
            plain={false}
            primary
            color="#ED2D23">
            sign in as guest</Button>
      </Form>

    </Box>
  );
}

export default Signin
