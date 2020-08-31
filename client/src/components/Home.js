import React from 'react';
import { Box, Heading } from 'grommet'

import Navbar from './Navbar'

const Home = () => {
  return (
    <>
      <Navbar></Navbar>
      <Box justify="center" align="center" fill>
        <Heading>The world’s platform for change</Heading>
      </Box>
    </>
  )
}

export default Home;