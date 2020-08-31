import React from 'react'
import { Header, Anchor, Button } from 'grommet'
import { Search } from 'grommet-icons'

const style = { textDecoration: "none", color: "inherit", fontWeight: 400, }

const Navbar = () => {
  return (
    <Header justify="center" pad={{ vertical: "xsmall" }}>
      <div>LOGO HERE</div>
      <Anchor href="" style={style} label="Start a petition" />
      <Anchor href="" style={style} label="My petitions" />
      <Anchor href="" style={style} label="Browse" />
      <Anchor href="" style={style} label="Membership" />
      <Anchor href="" style={style} icon={<Search color="plain" />} margin={{ left: "large" }} />
      <Anchor href="" style={style} label="Sign In" />
    </Header >
  )
}

export default Navbar