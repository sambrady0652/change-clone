import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { baseUrl } from '../config';
import axios from 'axios';
import { useParams, Redirect, Link, useHistory} from 'react-router-dom'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Embed from './Embedder';
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'
const UpdateForm = (props) => {
  const [header, setHeader] = useState('')
  const [content, setContent] = useState('');
  const [mediaurl, setMediaUrl] = useState('');
  const [black, setBlack] = useState(false)
  const dispatch = useDispatch();
  const { name } = useParams()
  let history = useHistory();
  var formData = new FormData();
  const handleMediaChange = async (e) => {
    e.preventDefault()
    var imagefile = e.target.files
    formData.append("file", imagefile[0]);
  }
  const AddUrlHandler = e => {
    e.preventDefault()
    setBlack(true)
    setMediaUrl(e.target.value)
  }
  const handleClick = async (e) => {
    e.preventDefault()

    formData.append('header', header)
    formData.append('content', content)
    formData.append('name', name)
    if (document.querySelector('#file') === null) { formData.append('mediaurl', mediaurl) }
    else {
      formData.append("file", e.target.files[0]);

    }
   

    axios.post(`${baseUrl}/api/petitions/${name}/updates`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return history.push(`/${name}/updates`);
  };
  const handleSubmit = e => { 
    e.preventDefault()
    return <Redirect to={`/${name}/updates`} />}


  return (
    <Fragment>
      <div id="siteWrapper">
        <div id="updateh1">Update your supporters</div>
        <div id="update_form_wrapper">
          <form id="form_form">
            <div id="headline_div">
              <label id="headline_label">Headline:</label>
              <div id="inputdiv2">
                <input type="text" name="headline" id="update_headline"
                  value={header}
                  onChange={e => setHeader(e.target.value)} />
              </div>
            </div>
            <div id="body_div">
              <div id="body_control">
                <label id="development_label">Your latest development</label>
                <div id="body_input_div">
                <div id="ckeditordiv">
                <CKEditor
                    editor={ ClassicEditor }
                    data=""
                    onInit={ editor => {
                        // You can store the "editor" and use when it is needed.
                        // console.log( '', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setContent(data);
                    } }
                    onBlur={ ( event, editor ) => {
                        // console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        // console.log( 'Focus.', editor );
                    } }
                />
                  </div>
                  {/* <input type="text" name="body" id="update_body"
                    value={content}
                    onChange={e => setContent(`${e.target.value}`)} /> */}
                </div>
              </div>
              <div id="media_div">
                <label id="addMediadiv">Add media(optional)</label>
                <div id="upload_media_div">
                  <div id="upload_container">
                    <label id="url_description">URL for an article, image, or video</label>
                    <div id="url_add">
                      <div id="urlinputdiv">
                        {black ?

<div style={{ width: 300, height: 175}}>
<iframe src={`${mediaurl}`}
        frameborder='0'
        allow='autoplay; encrypted-media'
        allowfullscreen
        title='video'
/>
</div>
                          
                          :
                        <input type="text" id="url_input" className="url_input"
                          value={mediaurl}
                          onChange={e => setMediaUrl(e.target.value)} 
                         />
                        }
                      </div>
                        
                      <span id="addSpan">
                        <button htmlFor="url_input" id="addUrl" onClick={AddUrlHandler}>Add</button>
                      </span>
                    </div>
                    
                    <div id="orContainer">
                      <div id="orSmallerContainer">
                        <div id="orDiv">or</div>
                      </div>
                    </div>
               
                      <div>
                      <div id="uploadPhoto_container">
                      <div>
                      <input id="uploadPhotoInput" type='file' name='file' onChange={handleMediaChange}></input> 
                      
                      <div id="photoWarningDiv">
                        Photos should be at least 1200 × 675 pixels. Large photos without text are best.
                        
                    </div>
                    </div>
                     
                    </div>
                      
                    </div>
                   

                    
                  
                  </div>
                    
                </div>
              </div>
            </div>
            <a href={`/${name}/updates`}>
            <div id="submit_div" >
              <div id="submit_container" href={`/${name}/updates`}>
            <button id="postButton"   onClick={handleClick}>Post</button>
              </div>
              
              <div id="warning_div"><p id="warningP"><strong>You can post one update every 24 hours.</strong> Updates appear on your
                petition page, and will be sent in an email to all of your supporters.</p></div>
            </div>
            </a>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default UpdateForm;