import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Layer } from 'grommet';

import Signin from './Signin';
import Signup from './Signup';

const SignInButton = (props) => {

  const [show, setShow] = useState(false)
  const { label, context } = props
  const { needSignIn } = useSelector(state => state.user)

  useEffect(() => {
    if (!needSignIn) {
      setShow(false)
    }
  }, [needSignIn])

  return (
    <Box>
      <Button
        plain
        hoverIndicator={{ color: "#ffffff" }}
        label={label}
        onClick={() => setShow(true)} />
      {show ? (
        <Layer
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
        >
          {context === 'signin' ?
            (
              <Signup />
            ) : (
              <Signin />
            )
          }
        </Layer>
      ) : <> </>}
    </Box>
  )
}

export default SignInButton;