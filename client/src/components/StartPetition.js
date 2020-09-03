import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, RadioButtonGroup, TextInput, TextArea, } from 'grommet'
import { NumberInput } from 'grommet-controls'

const StartPetitions = () => {
  const [topic, setTopic] = useState("1");
  const [header, setHeader] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [currentView, setCurrentView] = useState(0);

  const nextView = () => {
    let next = currentView + 1
    setCurrentView(next);
    console.log(header)
  };

  const formViews = [
    <SelectTopic nextView={nextView} setTopic={setTopic} />, 
    <InputHeader nextView={nextView} header={header} setHeader={setHeader} />, 
    <InputDescription nextView={nextView} description={description} setDescription={setDescription} />, 
    "goal", 
    "image"];

  return (
    <div style={{ margin: '0 auto', textAlign: 'center', maxWidth: '750px' }}>
      <h1>Create A Petition</h1>
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
      <h3>Choose a topic for your petitition:</h3>
      <RadioButtonGroup
        name='topics'
        options={topics.map(topic => topic.topic)}
        value={selected}
        onChange={pickTopic}
        style={{margin: '0 auto', width: '25%'}}
      />
      <Button secondary label="Next >" onClick={props.nextView} style={{marginTop: '20px'}} />
    </div>
  );
}

function InputHeader(props) {

  return (
    <div>
      <h3>Write your petition title</h3>
      <p>This is the first thing people will see about your petition. Get their attention with a short title that focuses on the change you’d like them to support.</p>
      <TextInput size='xlarge' value={props.header} onChange={e => props.setHeader(e.target.value)} />
      <Button secondary label="Next >" onClick={props.nextView} style={{marginTop: '20px'}} />
    </div>
  )
}

function InputDescription(props) {
  return (
    <div>
      <h3>Explain the problem you want to solve</h3>
      <p>People are more likely to support your petition if it’s clear why you care. Explain how this change will impact you, your family, or your community.</p>
      <TextArea size='xlarge' value={props.description} onChange={e => props.setDescription(e.target.value)} />
      <Button secondary label="Next >" onClick={props.nextView} style={{marginTop: '20px'}} />
    </div>
  )
}

function InputGoal(props) {
  return (
    <dov>
      <h3>Set</h3>
    </dov>
  )
}

export default StartPetitions;
