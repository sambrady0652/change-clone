import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel, Box, Heading } from 'grommet'

import { makeHomeCard } from './HomeCard'
import { fetchFeatured, fetchPopular, fetchRecent } from '../store/petitions';


const FeaturedView = (props) => {
  const imgs = props.featured.slice(0, 3);

  return (
    <>
      <Heading level="3" alignSelf="center">Featured</Heading>
      <Box direction="row">
        {imgs.map(img => (
          makeHomeCard(img)
        ))}
      </Box>
    </>
  );
};
const PopularView = (props) => {
  const imgs = props.popular.slice(0, 3);

  return (
    <>
      <Heading level="3" alignSelf="center">Popular</Heading>
      <Box direction="row">
        {imgs.map(img => (
          makeHomeCard(img)
        ))}
      </Box>
    </>
  );
};
const RecentView = (props) => {
  const imgs = props.recent.slice(0, 3);

  return (
    <>
      <Heading level="3" alignSelf="center">Recent</Heading>
      <Box direction="row">
        {imgs.map(img => (
          makeHomeCard(img)
        ))}
      </Box>
    </>
  );
};

const HomeCarousel = () => {
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
    <Carousel play={4000} controls={false}>
      <FeaturedView featured={featured} />
      <PopularView popular={popular} />
      <RecentView recent={recent} />
    </Carousel>
  )
}

export default HomeCarousel