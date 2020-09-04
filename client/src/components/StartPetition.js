import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { Button, RadioButtonGroup, TextInput, TextArea, Heading, Box, Image, Paragraph } from 'grommet'
import { NumberInput } from 'grommet-controls'

import { postPetition } from '../store/petitions'
import { fetchTopics } from '../store/topics'

const StartPetitions = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTopics())
  }, [])

  const [topic, setTopic] = useState('1');
  const [header, setHeader] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState(1000);
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreivew] = useState('https://change-clone.s3-us-west-1.amazonaws.com/default_petition.png');

  const [currentView, setCurrentView] = useState(0);

  // let testTopic = useSelector(state => state.topics[topic])
  const nextView = () => {
    let next = currentView + 1
    setCurrentView(next);
    // console.log(testTopic)
  };

  const prevView = () => {
    let prev = currentView - 1
    setCurrentView(prev)
  }

  const creator_id = useSelector(state => state.currentUser.id)
  
  const onSubmit = async e => {
    e.preventDefault()
 
    await dispatch(postPetition({
      topic_id: topic,
      header,
      description,
      goal,
      creator_id,
      file: imageUrl
    }))
    
  }

  const formViews = [
    <SelectTopic nextView={nextView} setTopic={setTopic} />,
    <InputHeader prevView={prevView} nextView={nextView} header={header} setHeader={setHeader} />,
    <InputDescription prevView={prevView} nextView={nextView} description={description} setDescription={setDescription} />,
    <InputGoal prevView={prevView} nextView={nextView} goal={goal} setGoal={setGoal} />,
    <InputImage prevView={prevView} nextView={nextView} imageUrl={imageUrl} setImageUrl={setImageUrl} imagePreview={imagePreview} setImagePreivew={setImagePreivew} />,
    <SubmitConfirmation nextView={nextView} onSubmit={onSubmit} prevView={prevView} topic={useSelector(state => state.topics[topic])} header={header} description={description} goal={goal} imagePreview={imagePreview} />,
    <Redirect to={`/p/${header}`} />
  ];


  return (
    <div style={{ margin: '0 auto', textAlign: 'center', maxWidth: '750px' }}>
      {formViews[currentView]}
    </div>
  );
};

function SelectTopic(props) {
  const topics = Object.values(useSelector((state) => ({ ...state.topics })));
  const [selected, setSelected] = useState('Local')
  // console.log(topics);

  const pickTopic = e => {
    const chosen = topics.filter(topic => topic.topic === e.target.value)[0]
    props.setTopic(chosen.id)
    setSelected(e.target.value)
  }

  return (
    <div>
      <Box>
        <Heading level={3} textAlign='center' alignSelf='center' margin='xxsmall'>Choose a topic for your petitition:</Heading>
      </Box>
      <RadioButtonGroup
        name='topics'
        options={topics.map(topic => topic.topic)}
        value={selected}
        onChange={pickTopic}
        style={{ margin: '0 auto', width: '25%' }}
      />
      <Button color='#ED2D23' secondary label="Next >" onClick={props.nextView} style={{ marginTop: '20px' }} />
    </div>
  );
}

function InputHeader(props) {

  return (
    <div>
      <Box>
        <Heading level={3} textAlign='center' alignSelf='center' margin='xxsmall'>Write your petition title</Heading>
        <Heading level={6} textAlign='center' alignSelf='center' margin='xxsmall'>This is the first thing people will see about your petition. Get their attention with a short title that focuses on the change you’d like them to support.</Heading>
      </Box>
      <TextInput size='xlarge' value={props.header} onChange={e => props.setHeader(e.target.value)} />

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-around' }} >
        <Button color='#ED2D23' secondary label="< Previous" onClick={props.prevView} />
        {props.header === '' ? null : <Button color='#ED2D23' secondary label="Next >" onClick={props.nextView} />}
      </div>

    </div>
  )
}

function InputDescription(props) {
  return (
    <div>
      <Box>
        <Heading level={3} textAlign='center' alignSelf='center' margin='xxsmall'>Explain the problem you want to solve</Heading>
        <Heading level={6} textAlign='center' alignSelf='center' margin='xxsmall'>People are more likely to support your petition if it’s clear why you care. Explain how this change will impact you, your family, or your community.</Heading>
      </Box>

      <TextArea size='xlarge' value={props.description} onChange={e => props.setDescription(e.target.value)} />

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-around' }} >
        <Button color='#ED2D23' secondary label="< Previous" onClick={props.prevView} />
        {props.description === '' ? null : <Button color='#ED2D23' secondary label="Next >" onClick={props.nextView} />}
      </div>
    </div>
  )
}

function InputGoal(props) {
  return (
    <div>
      <Box>
        <Heading level={3} textAlign='center' alignSelf='center' margin='xxsmall'>How many signatures do you want to get?</Heading>
        <Heading level={6} textAlign='center' alignSelf='center' margin='xxsmall'>No pressure, you can change this later</Heading>
      </Box>

      <NumberInput min={0} max={100000000} step={100} value={props.goal} onChange={e => props.setGoal(e.target.value)} />

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-around' }} >
        <Button color='#ED2D23' secondary label="< Previous" onClick={props.prevView} />
        {props.goal == 0 ? null : <Button color='#ED2D23' secondary label="Next >" onClick={props.nextView} />}
      </div>
    </div>
  )
}

function InputImage(props) {

  const onChange = e => {
    props.setImageUrl(e.target.files.item(0))
    try {
      props.setImagePreivew(URL.createObjectURL(e.target.files.item(0)))
    } catch (e) {
      props.setImagePreivew('https://change-clone.s3-us-west-1.amazonaws.com/default_petition.png')
    }
    console.log(e.target.files.item(0))
  }

  return (
    <div>
      <Box>
        <Heading level={3} textAlign='center' alignSelf='center' margin='xxsmall'>Add a photo</Heading>
        <Heading level={6} textAlign='center' alignSelf='center' margin='xxsmall'>Petitions with a photo receive six times more signatures than those without. Include one that captures the emotion of your story.</Heading>
      </Box>

      <Box height="medium" width="large" style={{ margin: '0 auto' }} fill={true} round='medium'>
        <Image
          fit="cover"
          src={props.imagePreview}
          alignSelf='center'
        />
      </Box>

      <input type='file' onChange={onChange} accept='image/*' />

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-around' }} >
        <Button color='#ED2D23' secondary label="< Previous" onClick={props.prevView} />
        <Button color='#ED2D23' secondary label="Next >" onClick={props.nextView} />
      </div>
    </div>

  )
}

function SubmitConfirmation(props) {
  const submit_redirect = async e => {
    await props.onSubmit(e)
    props.nextView()
  }

  return (
    <div>
      <Box>
        <Heading level={3} textAlign='center' alignSelf='center' margin='xxsmall'>Confirmation</Heading>
        <Heading level={6} textAlign='center' alignSelf='center' margin='xxsmall'>Review your petition details and click "Submit", or click "Previous" if you want to change something</Heading>
      </Box>

      <Box height="medium" width="large" style={{ margin: '0 auto' }} fill={true} round='medium'>
        <Image
          fit="cover"
          src={props.imagePreview}
          alignSelf='center'
        />
      </Box>


      <Box>
        <Heading level={2} textAlign='center' alignSelf='center' margin='xxsmall'>{props.header}</Heading>
        <Paragraph textAlign='center' alignSelf='center'>{`Goal of ${props.goal} signatures`}</Paragraph>
        <Paragraph textAlign='start' alignSelf='center'>{props.description}</Paragraph>
      </Box>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-around', marginBottom: '30px'}} >
        <Button color='#ED2D23' secondary label="< Previous" onClick={props.prevView} />
        <Button color='#ED2D23' primary label="Submit" onClick={submit_redirect} />
      </div>
    </div>

  )
}


export default StartPetitions;
