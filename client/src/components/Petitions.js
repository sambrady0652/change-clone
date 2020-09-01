import React from 'react'
import { Main, Heading } from 'grommet'

import PetitionCard from './PetitionCard'

const Petitions = () => {
  return (
    <Main>
      <Heading>Petitions</Heading>
      <PetitionCard image={"//v2.grommet.io/assets/IMG_4245.jpg"} heading="Heading" description='Description' />
    </Main>
  )
}

export default Petitions