import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { Heading, Box, Meter, Text, Image, Avatar, Paragraph } from 'grommet'

import Navbar from './Navbar'
import SignPetitionForm from './SignPetitionForm'

const PetitionDetails = () => {
  const { name } = useParams()
  const { petitions } = useSelector(state => state)
  const { users } = useSelector(state => state)

  //Retrieves relevant Petition from Redux Store (NOTE: does not make fetch call to database)
  const getOnePetition = () => {
    const allPetitions = Object.values(petitions)
    const petitionArr = allPetitions.filter(petition => petition.header === name)
    return Object.assign({}, petitionArr[0])
  }
  //Retrieves Petition Creator information from Redux Store (NOTE: does not make fetch call to database)
  const getCreator = () => {
    //This was a quick-fix for avoiding a 'failed to destructure undefined' error
    //On initial load, redux store will be undefined so it will not hit this if statement
    if (Object.keys(users).length) {
      return users[creator]
    }
    //Instead, it will return an empty object (rather than returning 'undefined'), until Redux Store loads and it hits the If statement above.
    else {
      return {}
    }
  }
  //Destructure Relevant Information from Objects returned from Redux Store
  const { header, description, image_url, creator, current, goal, signatures, topic, updates } = getOnePetition()
  const { first_name, last_name, profile_pic_url } = getCreator()
  return (
    <>
      <Navbar />
      {/* TO DO */}
      <div>Secondary Nav Here?</div>
      <Box>
        <Heading level={2} alignSelf="center" margin="large">{header}</Heading>
      </Box>
      <Box direction="row" margin={{ horizontal: "xlarge" }} gap="large" width={{ max: "xlarge", min: "large" }}>
        <Box alignSelf="center" flex={{ shrink: 1 }}>
          {/* NOTE: Replace dummy images with image_url and prof_pic_url */}
          <Image src="//v2.grommet.io/assets/IMG_4245.jpg" fit="cover" />
          <Box direction="row" pad="xsmall" align="center">
            <Avatar src="//v2.grommet.io/assets/IMG_4245.jpg" size="small" />
            <Text size="small" color="#737273" weight="bold" margin={{ left: "xsmall" }}>{first_name} {last_name} started this petition</Text>
          </Box>
          <Paragraph fill={true}>{description}</Paragraph>
          {/* TO DO: */}
          <div>UPDATES</div>
          <div>REASONS FOR SIGNING</div>
        </Box>
        <Box flex={{ grow: 1 }}>
          <Meter
            max={goal}
            round={true}
            background="#DBD9DB"
            values={[{
              value: current,
              color: "#ED2D23",
            }]}
          />
          <Text size="xxsmall" weight="bold">{current} signed of {goal} goal</Text>
          <div>LIVE STREAM OF SIGNATURES</div>
          <SignPetitionForm />
        </Box>
      </Box>
    </>
  )
}

export default PetitionDetails