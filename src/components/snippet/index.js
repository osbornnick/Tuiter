import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

const CodeMirrorTest = () => {
    let code = "const a = 0";
    const runCode = () => {
        console.log(code);
        eval(code);
    };
    return (
        <>
            <CodeMirror
                value={code}
                options={{ theme: "monokai", keyMap: "sublime" }}
                extensions={[javascript({ jsx: true })]}
                onChange={(val) => (code = val)}
            ></CodeMirror>
            <button className="btn btn-success" onClick={runCode}>
                Run
            </button>
        </>
    );
};

export default CodeMirrorTest;
