import React, { useState } from 'react'
import { Card, CardBody, Box, Image, Heading, Paragraph, Button } from 'grommet'

const PetitionCard = (props) => {
  const [expanded, setExpanded] = useState(false)
  const { image, heading, description } = props

  return (
    <Card width="large" background="light-1">
      <Box direction="row">
        <CardBody height="small">
          <Image
            fit="cover"
            src={image}
          />
        </CardBody>
        {expanded ?
          <Box direction="column" pad={{ horizontal: 'medium' }} responsive={true}>
            <Heading level="3" >{heading}</Heading>
            <Paragraph>{description}</Paragraph>
            <Button onClick={() => setExpanded(false)}>Read less</Button>
          </Box>
          :
          <Box direction="column" pad={{ horizontal: 'medium' }} responsive={true} height="small">
            <Heading level="3" >{heading}</Heading>
            <Paragraph className="truncate-overflow">{description}</Paragraph>
            <Button onClick={() => setExpanded(true)}>Read more</Button>
          </Box>}
      </Box>
    </Card>

  )
}

export default PetitionCard
