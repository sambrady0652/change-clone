import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom'
import { Heading, Box, Meter, Text, Image, Avatar, Paragraph } from 'grommet'

import SignPetitionForm from './SignPetitionForm'
import { fetchPetitionDetails } from '../store/currentPetition';

const PetitionDetails = () => {
  const { id } = useParams()
  const { currentUser } = useSelector(state => state)
  const { header, description, creator, current, goal, image_url } = useSelector(state => state.currentPetition)
  const { first_name, last_name, profile_pic_url } = creator
  const dispatch = useDispatch()
  let [isCreator, setCreator] = useState(false)

  const checkCreator = () => {
    if (currentUser.id !== undefined && creator.id !== undefined) {
      setCreator((currentUser.id === creator.id))
    }
    else {
      setCreator(false)
    }
  }

  useEffect(() => {
    dispatch(fetchPetitionDetails(id))
    checkCreator()
  }, [dispatch, isCreator, currentUser.id])

  return (
    <>
      <Box>
        <Heading level={2} alignSelf="center" margin="large">{header}</Heading>
      </Box>
      <Box direction="row" margin={{ horizontal: "xlarge" }} gap="large" width={{ max: "xlarge", min: "large" }}>
        <Box alignSelf="center" flex={{ shrink: 1 }}>
          <Box height="small">
            <Image src={image_url} fit="contain" />
          </Box>
          <Box direction="row" pad="xsmall" align="center">
            <Avatar src={profile_pic_url} size="small" />
            <Text size="small" color="#737273" weight="bold" margin={{ left: "xsmall" }}>{first_name} {last_name} started this petition</Text>
          </Box>
          <Paragraph fill={true}>{description}</Paragraph>
          {/* TO DO: */}
          <Link to={`/p/${id}/updates`} id="updateFormLink">UPDATES</Link>
          {isCreator === true && (
            <div id="LinkDivend">
              <Link to={`/p/${id}/updateform`} id="updateFormLink">Create Update</Link>
            </div>
          )}
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
          <SignPetitionForm petitionId={id} header={header} />
        </Box>
      </Box>
    </>
  )
}

export default PetitionDetails