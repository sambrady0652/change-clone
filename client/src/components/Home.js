import React from 'react';
import { Box, Heading, Text, Anchor } from 'grommet'

import HomeCarousel from './HomeCarousel'
import Footer from './Footer';


const Home = () => {
  return (
    <>
      <Box justify="center" align="center" background={{ image: "url(https://change-clone.s3-us-west-1.amazonaws.com/Globe-Red-Dot.png)", size: "contain" }} height="medium" >
        <Heading textAlign="center">The world’s platform for change</Heading>
        <Text margin={{ top: "small", bottom: "large" }} weight="bold">people are taking action. <Anchor disabled href="" color="#ED2D23" weight={600}> get started today.</Anchor></Text>
      </Box>
      <Box justify="center" align="center" >
        <HomeCarousel />
      </Box>
      {/* <Footer /> */}
    </>
  )
}

export default Home;