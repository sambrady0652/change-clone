import React, { useState, useEffect } from 'react';
import Signin from './Signin'
import Signup from './Signup'
import { Box, Button, Layer } from 'grommet';

const SignInButton = (props) => {
  const [show, setShow] = useState(false)
  const { label, context } = props

  const handleClick = () => {
    if (context === "nav") {
      setShow(true)
    }
    if (context === "signin" || context === "signup") {
      setShow(true)
    }
  }

  return (
    <Box>
      <Button
        plain
        focusIndicator={false}
        hoverIndicator={{ color: "#ED2D23" }}
        label={label}
        onClick={() => handleClick()} />
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