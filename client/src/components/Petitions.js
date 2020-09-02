import React from 'react'
import { useSelector } from 'react-redux';
import { Main, Heading, Box, Tab, Tabs } from 'grommet'

import PetitionCard from './PetitionCard'
import Navbar from './Navbar'

const makeCard = (petition) => {
  const { id, image_url, header, description, goal, current } = petition
  return (
    <Box alignSelf="center" pad="small" key={`box-around-card-${id}`}>
      <PetitionCard
        image_url={image_url}
        header={header}
        description={description}
        goal={goal}
        current={current}
      />
    </Box>)
}

const Petitions = () => {
  const { petitions } = useSelector(state => state)
  // TODO: Develop algorithm to select Featured, Popular, and Recent Petitions
  const allPetitions = Object.values(petitions)
  return (
    <Box>
      <Navbar />
      <Box justify="center" align="center" style={{ position: "relative" }}>
        <Heading level={2} >Discover petitions</Heading>
        <Tabs>
          <Tab title="Featured">
            <Main background="#F6F4F6">
              {allPetitions.map(petition => makeCard(petition))}
            </Main>
          </Tab>
          <Tab title="Popular">
            <Main background="#F6F4F6">
              <div>popular</div>
            </Main>
          </Tab>
          <Tab title="Recent">
            <Main background="#F6F4F6">
              <div>recent</div>
            </Main>
          </Tab>
          <Tab title="Victories">
            <Main background="#F6F4F6">
              <div>Victories</div>
            </Main>
          </Tab>
        </Tabs>
      </Box>
    </Box>
  )
}

export default Petitions