import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
const TextEditor = (props) => {


   const [editor, setEditor] = useState(EditorState.createEmpty())


return (
  <div>
    <Editor 
      editorState={editor}
      wrapperClassName="rich-editor demo-wrapper"
      editorClassName="demo-editor"
      onEditorStateChange={setEditor}
      placeholder="The message goes here..." />
  </div>
);
 }
export default TextEditor