import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { oneDark } from "@codemirror/theme-one-dark";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { Modal, Button, Form } from "react-bootstrap";
import * as service from "../../services/tuits-service";


const Snippet = ({ snippet }) => {
    const [output, setOutput] = useState("");
    const [code, setCode] = useState(
        snippet.code || "console.log('hello world!);"
    );
    const [show, setShow] = useState(false);
    const [tuit, setTuit] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let navigate = useNavigate();

    const saveCode = () => {
        // connect to backend
    };
    const runCode = () => {
        // compiler API
    };
    const shareCode = () => service.createTuit("my", { tuit }).then(navigate('/home'));
    
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
                <button
                    type="button"
                    className="btn btn-info mt-2 ms-2"
                    onClick={handleShow}
                >
                    Share
                </button>
            </div>
            <div className="">
                <div className="output-box">Output</div>
                <div className="border" style={{ minHeight: "20px" }}>
                    {output}
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Share Snippet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                            >
                            <Form.Label>Tuit</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={(e) => setTuit(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                    <Button variant="primary" onClick={shareCode}>
                    Share
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
export default Snippet;
