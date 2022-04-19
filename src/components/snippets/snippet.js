import React, { useState } from "react";
import { oneDark } from "@codemirror/theme-one-dark";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import * as snippetService from "../../services/snippets-service";

const Snippet = ({ snippet }) => {
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);
    const [borderColor, setBorderColor] = useState("border-dark");
    const [code, setCode] = useState(
        snippet.code || "console.log('hello world!);"
    );

    const updatedCodemirrorText = (value) => {
        setCode(value);
        document.getElementById("saveButton").disabled = false;
        document.getElementById("saveButton").textContent = "Save";
    };

    const saveCode = async () => {
        snippet.code = code;
        const response = await snippetService.updateSnippet(snippet._id, {
            code,
        });
        if (response.modifiedCount === 1) {
            document.getElementById("saveButton").textContent = "Saved";
            document.getElementById("saveButton").disabled = true;
        } else {
            console.log(response);
        }
    };
    const runCode = async () => {
        setLoading(true);
        const response = await snippetService.runSnippet({ code });
        if (response.status.id !== 3) {
            setBorderColor("border-danger");
            setOutput(response.stderr);
        } else {
            setBorderColor("border-success");
            setOutput(response.stdout);
        }
        setLoading(false);
    };

    return (
        <div className="container">
            <div className="row">
                <CodeMirror
                    value={code}
                    height="200px"
                    theme={oneDark}
                    extensions={[javascript({ jsx: true })]}
                    onChange={updatedCodemirrorText}
                />
            </div>
            <div className="d-flex justify-content-end">
                <button
                    type="button"
                    className="btn btn-primary mt-2 ms-2"
                    onClick={runCode}
                    disabled={loading}
                >
                    {loading ? (
                        <div
                            className="spinner-border"
                            role="status"
                            style={{ width: "20px", height: "20px" }}
                        >
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        "Run"
                    )}
                </button>
                <button
                    type="button"
                    id="saveButton"
                    className="btn btn-success mt-2 ms-2"
                    onClick={saveCode}
                >
                    Save
                </button>
            </div>
            <div className="">
                <div className="output-box">Output</div>
                <div
                    className={"border rounded " + borderColor}
                    style={{ minHeight: "20px" }}
                >
                    <div className="p-2" style={{ whiteSpace: "pre-line" }}>
                        {output}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Snippet;
