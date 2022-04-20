import React, { useState, useEffect } from "react";
import { oneDark } from "@codemirror/theme-one-dark";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

import * as snippetService from "../../services/snippets-service";

const Snippet = ({ snippetId }) => {
    const [snippet, setSnippet] = useState({ code: "loading..." });

    useEffect(() => {
        snippetService
            .findSnippetById(snippetId)
            .then((res) => setSnippet(res));
    }, [snippetId]);

    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);
    const [borderColor, setBorderColor] = useState("border-dark");

    const runCode = async () => {
        setLoading(true);
        const response = await snippetService.runSnippet({
            code: snippet.code,
        });
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
                    value={snippet.code}
                    height="200px"
                    theme={oneDark}
                    extensions={[javascript({ jsx: true })]}
                    options={{ readOnly: true }}
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
