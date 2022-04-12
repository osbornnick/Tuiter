import React, { useState, useEffect } from "react";
import { oneDark } from '@codemirror/theme-one-dark';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import './snippets.css'


const Snippets = () => {
  const [output, setOutput] = useState("");

  let code = "console.log('hello world!');"

  const saveCode = () => {
    // connect to backend
  }
  const runCode = () => {
    // compiler API
  };

  return(
    <>
      <CodeMirror
        value={code}
        height="400px"
        theme={oneDark}
        extensions={[javascript({ jsx: true })]}
        onChange={(value, viewUpdate) => (code = value)}
      />
      <div class="row">
        <button className="run-btn" onClick={runCode}>Run</button>
        <button className="save-btn" onClick={saveCode}>Save</button>
      </div>      
      <div className="output-box">
        Output
      </div>
    </>
  );
};
export default Snippets;