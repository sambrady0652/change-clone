import React from 'react'
import { useSelector } from 'react-redux';
import { Header, Button } from 'grommet'
import { Search } from 'grommet-icons'
import SignInButton from './SignInButton'
import AccountMenu from './AccountMenu'


const Navbar = () => {
  const { needSignIn } = useSelector(state => state.user)

  return (
    <Header justify="center" pad={{ vertical: "xsmall" }}>
      <div>LOGO HERE</div>
      <Button href="" focusIndicator={false} hoverIndicator={{ color: "#ED2D23" }}>Start a Petition</Button>
      <Button href="" focusIndicator={false} hoverIndicator={{ color: "#ED2D23" }}>My petitions</Button>
      <Button href="" focusIndicator={false} hoverIndicator={{ color: "#ED2D23" }}>Browse</Button>
      <Button disabled href="" focusIndicator={false} hoverIndicator={{ color: "#ED2D23" }}>Membership</Button>
      <Button href="" focusIndicator={false} hoverIndicator={{ color: "#ED2D23" }} icon={<Search color="plain" />} />
      {needSignIn ?
        <SignInButton label="Sign in" context="nav" />
        :
        <AccountMenu />
      }
    </Header >
  )
}

export default Navbar