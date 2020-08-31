import React from 'react'
import { Header, Button } from 'grommet'
import { Search } from 'grommet-icons'
import SignInButton from './SignInButton'


const Navbar = () => {
  return (
    <Header justify="center" pad={{ vertical: "xsmall" }}>
      <div>LOGO HERE</div>
      <Button href="" focusIndicator={false} hoverIndicator={{ color: "#ED2D23" }}>Start a Petition</Button>
      <Button href="" focusIndicator={false} hoverIndicator={{ color: "#ED2D23" }}>My petitions</Button>
      <Button href="" focusIndicator={false} hoverIndicator={{ color: "#ED2D23" }}>Browse</Button>
      <Button disabled href="" focusIndicator={false} hoverIndicator={{ color: "#ED2D23" }}>Membership</Button>
      <Button href="" focusIndicator={false} hoverIndicator={{ color: "#ED2D23" }} icon={<Search color="plain" />} />
      {/* CREATE CONDITIONAL: If Signed in = True , show Account Menu, else, show Signin */}
      <SignInButton label="Sign in" context="nav" />
    </Header >
  )
}

export default Navbar