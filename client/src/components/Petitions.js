import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Main, Heading, Box, Tab, Tabs } from 'grommet'

import PetitionCard from './PetitionCard'
import { fetchFeatured, fetchPopular, fetchRecent } from '../store/petitions';

export const makeCard = (petition) => {
  const { id, image_url, header, description, goal, current } = petition
  return (
    <Box alignSelf="center" pad="small" key={`box-around-card-${id}`}>
      <PetitionCard
        image_url={image_url}
        header={header}
        description={description}
        goal={goal}
        current={current}
        id={id}
      />
    </Box>)
}

const Petitions = () => {
  const dispatch = useDispatch()
  const { petitions } = useSelector(state => state)
  let { featured, popular, recent } = petitions
  if (!popular) popular = []
  if (!featured) featured = []
  if (!recent) recent = []

  useEffect(() => {
    dispatch(fetchFeatured())
    dispatch(fetchPopular())
    dispatch(fetchRecent())

  }, [dispatch])
  return (
    <>
      <Box justify="center" align="center" style={{ position: "relative" }}>
        <Heading level={2} >Discover petitions</Heading>
        <Tabs>
          <Tab title="Featured">
            <Main background="#F6F4F6">
              {featured.map(petition => makeCard(petition))}
            </Main>
          </Tab>
          <Tab title="Popular">
            <Main background="#F6F4F6">
              {popular.map(petition => makeCard(petition))}
            </Main>
          </Tab>
          <Tab title="Recent">
            <Main background="#F6F4F6">
              {recent.map(petition => makeCard(petition))}
            </Main>
          </Tab>
          <Tab title="Victories">
            <Main background="#F6F4F6">
              <div>Victories</div>
            </Main>
          </Tab>
        </Tabs>
      </Box>
    </>
  )
}

export default Petitions
