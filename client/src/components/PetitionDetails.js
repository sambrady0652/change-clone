import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { Heading, Box, Button, Meter, Text, Image, Avatar, Paragraph } from 'grommet'

import Navbar from './Navbar'
import SignPetitionForm from './SignPetitionForm'
import { fetchPetitionDetails } from '../store/currentPetition';

const PetitionDetails = () => {
  const { header } = useParams()
  const { id, description, creator, current, goal, image_url } = useSelector(state => state.currentPetition)
  const { first_name, last_name, profile_pic_url } = creator
  const dispatch = useDispatch()
  const isCreator = id === creator.id
  useEffect(() => {
    dispatch(fetchPetitionDetails(header))
  }, [])

  return (
    <>
      {/* TO DO */}
      <div>Secondary Nav Here?</div>
      <Box>
        <Heading level={2} alignSelf="center" margin="large">{header}</Heading>
      </Box>
      <Box direction="row" margin={{ horizontal: "xlarge" }} gap="large" width={{ max: "xlarge", min: "large" }}>
        <Box alignSelf="center" flex={{ shrink: 1 }}>
          {/* NOTE: Replace dummy images with image_url and prof_pic_url */}
          <Image src={image_url} fit="cover" />
          <Box direction="row" pad="xsmall" align="center">
            <Avatar src={profile_pic_url} size="small" />
            <Text size="small" color="#737273" weight="bold" margin={{ left: "xsmall" }}>{first_name} {last_name} started this petition</Text>
          </Box>
          <Paragraph fill={true}>{description}</Paragraph>
          {/* TO DO: */}
          <div>UPDATES</div>
          {isCreator && (
            <Button>Click Here</Button>
          )}
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
          <SignPetitionForm petitionId={id} header={header} />
        </Box>
      </Box>
    </>
  )
}

export default PetitionDetails