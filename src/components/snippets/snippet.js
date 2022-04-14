import React, { useState, useEffect } from "react";
import { oneDark } from "@codemirror/theme-one-dark";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

const Snippet = ({ snippet }) => {
    const [output, setOutput] = useState("");
    const [code, setCode] = useState(
        snippet.code || "console.log('hello world!);"
    );

    const saveCode = () => {
        // connect to backend
    };
    const runCode = () => {
        // compiler API
    };

    return (
        <div className="container">
            <div className="row">
                <CodeMirror
                    value={code}
                    height="200px"
                    theme={oneDark}
                    extensions={[javascript({ jsx: true })]}
                    onChange={(value, viewUpdate) => setCode(value)}
                />
            </div>
            {/* why does adding the row class here fuck everything up? */}
            <div className="d-flex justify-content-end">
                <button
                    type="button"
                    className="btn btn-primary mt-2 ms-2"
                    onClick={runCode}
                >
                    Run
                </button>
                <button
                    type="button"
                    className="btn btn-success mt-2 ms-2"
                    onClick={saveCode}
                >
                    Save
                </button>
            </div>
            <div className="">
                <div className="output-box">Output</div>
                <div className="border" style={{ minHeight: "20px" }}>
                    {output}
                </div>
            </div>
        </div>
    );
};
export default Snippet;
