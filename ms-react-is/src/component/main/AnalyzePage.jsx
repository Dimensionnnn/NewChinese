import React, { useRef } from "react";
import Button from "@mui/material/Button";
import { Editor } from "@tinymce/tinymce-react";

function AnalyzePage() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
        }}
      />
      <Button onClick={log}>Log editor content</Button>
    </>
  );
}

export default AnalyzePage;
