import React, { useState, useEffect } from "react";
import { oneDark } from '@codemirror/theme-one-dark';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';


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
        <button onClick={runCode}>Run</button>
        <button onClick={saveCode}>Save</button>
    </>
  );
};
export default Snippets;