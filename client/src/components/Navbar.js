import React from 'react'
import { useSelector } from 'react-redux';
import { Header } from 'grommet'
import { Search } from 'grommet-icons'
import SignInButton from './SignInButton'
import AccountMenu from './AccountMenu'
import NavAnchor from './NavAnchor';


const Navbar = () => {
  const { needSignIn } = useSelector(state => state.currentUser)

  return (
    <Header justify="around" pad={{ vertical: "xsmall" }}>
      <Header justify="center" >
        <NavAnchor label="LOGO HERE" href="/" />
        <NavAnchor label="Start a petition" href="/start-a-petition" />
        <NavAnchor label="My petitions" href="/u/me" />
        <NavAnchor label="Browse" href="/petitions" />
        <NavAnchor disabled label="Membership" href="" />
      </Header>
      <Header >
        <NavAnchor href="/search" icon={<Search color="plain" />} />
        {needSignIn ?
          <SignInButton label="Sign in" />
          :
          <AccountMenu />
        }
      </Header>
    </Header >
  )
}

export default Navbar