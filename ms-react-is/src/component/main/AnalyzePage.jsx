import React, { useRef } from "react";
import Button from "@mui/material/Button";
import { Editor } from "@tinymce/tinymce-react";
import Container from '@mui/material/Container';


function AnalyzePage() {
  const editorValue = useRef("");
  const log = () => {
    if (editorValue.current) {
      console.log(editorValue.current.getContent());
    }
  };
  return (
    <Container sx={{ display: 'flex', mt: 2}}>
    <div>
      <Editor
        tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
        onInit={(evt, editor) => (editorValue.current = editor)}
        initialValue={""}
        init={{
          id: "tiny2",
          language: "zh-Hans",
          min_height: 540,
          width: 590,
          menubar: false,
          icons: "savetext3",
          plugins:
            " autoresize save  searchreplace autolink fullscreen link charmap pagebreak inserTdatetime advlist lists wordcount",
          toolbar:
            " link  newdocument save print searchreplace undo redo cut copy paste blockquote removeformat forecolor backcolor bold italic underline strikethrough charmap blocks fontsize alignleft aligncenter alignright alignjustify ouTdent indent pagebreak inserTdatetime  fullscreen",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          file_picker_callback: function (callback, value, meta) {
            //文件分类
            var filetype =
              ".pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4";
            var upurl = "/api/controller/";
            //为不同插件指定文件类型及后端地址
            switch (meta.filetype) {
              case "image":
                filetype = ".jpg, .jpeg, .png, .gif";
                upurl += "action1";
                break;
              case "media":
                filetype = ".mp3, .mp4";
                upurl += "action2";
                break;
              case "file":
                break;
            }
          },
        }}
      />
      <Button onClick={log}>分析文章</Button>
      </div>
    </Container>
  );
}

export default AnalyzePage;
