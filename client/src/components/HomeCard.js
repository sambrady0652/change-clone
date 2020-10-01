
import React from 'react'
import { Card, CardBody, Box, Image, Heading, Meter, Text, Anchor, Stack, CardHeader } from 'grommet'
import { Link } from 'react-router-dom'

export const makeHomeCard = (petition) => {
  const { id, image_url, header, description, goal, current } = petition
  return (
    <Box alignSelf="center" pad="small" key={`box-around-card-${id}`}>
      <HomeCard
        image_url={image_url}
        header={header}
        description={description}
        goal={goal}
        current={current}
        id={id}
      />
    </Box>)
}


const HomeCard = (props) => {
  const { image_url, header, goal, current, id } = props

  return (

    <Card width="medium">
      <Stack anchor="bottom-left">
        <CardBody height="medium">
          <Image
            style={{ backgroundSize: "cover" }}
            src={image_url}
          />
        </CardBody>
        <CardHeader
          pad={{ horizontal: 'small', vertical: 'small' }}
          background="#000000A0"
          width="medium"
          justify="start"
        >

          <Box>
            <Link to={`/p/${id}`}>
              <Anchor color="#fff" >
                <Heading level="3" margin="none" >
                  {header}
                </Heading>
              </Anchor>

            </Link>
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
          </Box>
        </CardHeader>
      </Stack>
    </Card>
  )
}

export default HomeCard