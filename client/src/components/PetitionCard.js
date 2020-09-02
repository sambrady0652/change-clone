import React, { useState } from 'react'
import { Card, CardBody, Box, Image, Heading, Paragraph, Button, Meter, Text } from 'grommet'


const PetitionCard = (props) => {
  const [expanded, setExpanded] = useState(false)
  const { image_url, header, description, goal, current } = props

  return (
    <Card width="large" background="#ffffff">
      <Box direction="row">
        <CardBody height="small">
          <Image
            fit="cover"
            src={image_url}
          />
        </CardBody>
        {expanded ?
          // EXPANDED CARD 
          <Box direction="column" pad={{ horizontal: 'medium' }} responsive={true}>
            <Heading level="3" margin={{ bottom: "none" }}>{header}</Heading>
            <Paragraph>{description}</Paragraph>
            <Text size="xxsmall">{current} signatures out of {goal}</Text>
            <Meter
              max={goal}
              round={true}
              background="#DBD9DB"
              values={[{
                value: current,
                color: "#ED2D23",
              }]}
            />
            <Button hoverIndicator={{ color: "#ffffff" }} onClick={() => setExpanded(false)}>Read less</Button>
          </Box>
          :
          // SMALL CARD 
          <Box direction="column" pad={{ horizontal: 'medium' }} responsive={true} height="small">
            <Heading level="3" margin={{ bottom: "none" }}>{header}</Heading>
            <Paragraph className="truncate-overflow" margin={{ bottom: "none" }}>{description}</Paragraph>
            <Button hoverIndicator={{ color: "#ffffff" }} onClick={() => setExpanded(true)}>Read more</Button>
            <Box flex="grow" overflow="auto">
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
            </Box>
          </Box>}
      </Box>
    </Card>

  )
}

export default PetitionCard
