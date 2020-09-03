import React, { useState, useEffect, Fragment} from 'react';
import { useDispatch } from 'react-redux';
import Navbar from "./Navbar"

const UpdateForm = (props) => {
  const [headline, setHeadline] = useState('')
  const [link, setLink] = useState('')
  const [displayText, setDisplayText] = useState('');
  const [body, setBody] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const dispatch = useDispatch();

  const handleInsertLink = async (e) => {
    e.preventDefault();
    dispatch()
  }

  const handleCancelButton = async (e) => {
    e.preventDefault();
    dispatch()
  }

  const handleMediaSubmit = async (e) => {
    e.preventDefault();
    dispatch()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch()
  }

return (
  <Fragment>
    <Navbar />
      <div id="siteWrapper">
      <div id="updateh1">Update your supporters</div>
      <div id="update_form_wrapper">
        <form id="form_form">
          <div id="headline_div">
            <label id="headline_label">Headline:</label>
            <div id="inputdiv2">
              <input type="text" name="headline" id="update_headline"
                value={headline}
                onChange={e => setHeadline(e.target.value)}/>
            </div>
          </div>

          {/* <div id="insert_link">
            <div id="insertLinkDiv">
              <div id="inserLinkText">Insert Link</div>
              <div id="exitText">x</div>
            </div>
            <label>
              Url <input type="text" name="urlText"
                     value={link}
                     onChange={e => setLink(e.target.value)}/>
            </label>
            <label>
              Text to display <input type="text" name="displayText"
                                value={displayText}
                                onChange={e => setDisplayText(e.target.value)}/>
            </label>
            <div id="buttons_div">
              <button id="okButton" onClick={handleInsertLink}>Ok</button>
              <button id="cancelButton" onClick={handleCancelButton}>Cancel</button>
            </div>
          </div> */}
          <div id="body_div">
            <div id="body_control">
            <label id="development_label">Your latest development</label>
            <div id="body_input_div">
              <input type="text" name="body" id="update_body"
                   value={body}
                   onChange={e => setBody(e.target.value)} />
            </div>
            </div>
          <div id="media_div">
            {/* <div id="media_exit">X</div> */}
            <label id="addMediadiv">Add media(optional)</label>
            <div id="upload_media_div">
              <div id="upload_container">
                <label id="url_description">URL for an article, image, or video</label>
            <div id="url_add">
              <div id="urlinputdiv">
            <input type="text" id="url_input"
                   value={mediaUrl}
                   onChange={e => setMediaUrl(e.target.value)}/>
                   </div>
            <span id="addSpan">
            <button id="addUrl">Add</button>
            </span>
            </div>
            <div id="orContainer">
            <div id="orSmallerContainer">
            <div id="orDiv">or</div>
            </div>
            </div>
            <div id="uploadPhoto_container">
                <button id="uploadPhoto" type='file' name='updatePhoto' onClick={handleMediaSubmit}> Upload photo</button>
                <div id="photoWarningDiv">
                Photos should be at least 1200 × 675 pixels. Large photos without text are best.
                </div>
            </div>
            </div>
            </div>
          </div>
          </div>
          <div id="submit_div">
            <div id="submit_container">
              <button id="postButton" onClick={handleSubmit}>Post</button>
              </div>
              <div id="warning_div"><p id="warningP"><strong>You can post one update every 24 hours.</strong> Updates appear on your 
                petition page, and will be sent in an email to all of your supporters.</p></div>
          </div>
    </form>
    </div>
    </div>
  </Fragment>
  )
}

export default UpdateForm;