import React, { useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useParams, Redirect} from 'react-router-dom'
import { baseUrl } from '../config';
import { Box, Carousel, Image } from 'grommet'

const UpdatesBox = (props) => {
  const { name}  = useParams()

 
  const [state, setState] = useState([])
  useEffect(() => {
      fetch(`${baseUrl}/api/petitions/${name}/updates`)
          .then(res => res.json())
          .then(data => setState(data))
       
  }, [])

  const allUpdates = Object.values(state)

  return (
    <Box height="small" width="medium" overflow="hidden" id="carousel">
  <Carousel fill>
      {allUpdates.map(data =>
            <div id="carousel_div" href={`/updates/${data.id}`}>
            <Image fit="cover" id="carousel_image"  src={`${data.mediaurl}`}/>
      <div id="headercarousel">{data.header}</div>
      <div id="contentcaraousel">{data.content.slice(1, 75)}</div>
      </div>
      )}
           
         

         
  </Carousel>
</Box>
  );
}

export default UpdatesBox