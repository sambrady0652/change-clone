import React, { useState, useEffect } from 'react';
import { apiUrl } from '../config';
import { useParams } from 'react-router-dom'

const UpdateCard = () => {
  const { updateId } = useParams()


  const [state, setState] = useState([])
  useEffect(() => {
    fetch(`${apiUrl}/updates/${updateId}`)
      .then(res => res.json())
      .then(data => setState(data))

  }, [])



  return (
    <div id='cardWrapper'>
      <div id="updateCardDiv">
        <div>
          {state.mediaural && state.mediural !== '' && state.mediaurl.slice(0, 47) === "https://change-clone.s3-us-west-1.amazonaws.com" ? '' : <img src={`${state.mediaurl}`} id='updateMediaPhoto' />}
        </div>
        <h3 id="cardHeader">{state.header}</h3>
        <h1 id="cardDate">{state.content}</h1>
      </div>
    </div>

  );
}

export default UpdateCard