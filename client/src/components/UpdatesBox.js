import React, { useState, useEffect} from 'react';
import { useDispatch,  useSelector} from 'react-redux';
import { useParams, Redirect, Link, useHistory} from 'react-router-dom'
import { baseUrl } from '../config';
import { Box, Carousel, Image } from 'grommet'
import Embed from 'react-embed';
const UpdatesBox = (props) => {
  const { name}  = useParams()
  const { id, description, creator, current, goal, image_url } = useSelector(state => state.currentPetition)
  const { first_name, last_name, profile_pic_url } = creator
  const dispatch = useDispatch()
  let isCreator = null
  let history = useHistory();
  if (id && creator.id) {
    isCreator = (id === creator.id)
  }
 
  const [state, setState] = useState([])
  const [linkState, setLinkState] = useState('')
  useEffect(() => {
      fetch(`${baseUrl}/api/petitions/${name}/updates`)
          .then(res => res.json())
          .then(data => setState(data))
       
  }, [])
        
  const handleClick = (e) => {
    e.preventDefault()
    return history.push(linkState)

  }
  
  const allUpdates = Object.values(state)

  return (
    <div>
    <Box height="small" width="medium" overflow="hidden" id="carousel">
  <Carousel fill>
      {allUpdates.map(data =>
      
            <div id="carousel_div" >
             {data.mediaurl.slice(0, 47) === "https://change-clone.s3-us-west-1.amazonaws.com" ? 
            <Image fit="cover" id="carousel_image"  src={`${data.mediaurl}`}/>
            :
            <Embed id="embedid" url={data.mediaurl} />
      }
      <Link to={`/${name}/update/${data.id}`} id="headercarousel">{data.header}</Link>
      <div id="contentcaraousel">{data.content}</div>
      </div>
      )}
  </Carousel>

{isCreator === true && (
             <div id="LinkDivend">
             <Link to={`/${id}/updateform`} id="updateFormLink">Create Update</Link>
             </div>
          )}
          </Box>
    )
</div>
  );
  
}

export default UpdatesBox