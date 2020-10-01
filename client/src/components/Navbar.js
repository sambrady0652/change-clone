import React from 'react'
import { useSelector } from 'react-redux';
import { Header, Heading, Anchor } from 'grommet'
import { Search } from 'grommet-icons'
import SignInButton from './SignInButton'
import AccountMenu from './AccountMenu'
import NavAnchor from './NavAnchor';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const { needSignIn } = useSelector(state => state.currentUser)

  return (
    <Header justify="around" pad={{ vertical: "xsmall" }}>
      <Header justify="center" >
        <Link to='/'>
          <Anchor alignSelf='center'><Heading level={3} color='#ED2D23'>Cause.com</Heading></Anchor>
        </Link>
        {needSignIn ? null : <Link to='/start-a-petition'><NavAnchor label="Start a petition" /></Link>}
        {needSignIn ? null : <Link to='/u/me'><NavAnchor label="My petitions" /></Link>}
        <Link to="/petitions"><NavAnchor label="Browse" /></Link>
        <NavAnchor disabled label="Membership" href="" />
      </Header>
      <Header >
        <Link to='/search'>
          <NavAnchor icon={<Search color="plain" />} />
        </Link>
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