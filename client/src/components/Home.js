import React from 'react';
import { Box, Heading, Text, Anchor } from 'grommet'

import Navbar from './Navbar'

const Home = () => {
  return (
    <>
      <Navbar />
      <Box justify="center" align="center" > {/*TO DO: Set Background to Map Image once AWS is setup */}
        <Heading margin={{ bottom: "small" }} textAlign="center">The world’s platform for change</Heading>
        <Text margin={{ top: "small" }} weight="bold">##### people taking action. <Anchor href="" color="#ED2D23" weight={600}> Victories every day.</Anchor></Text>
      </Box>
    </>
  )
}

export default Home;