import React, { useState, useRef, useEffect } from "react";
// import "./App.css";
import { Editor } from "@tinymce/tinymce-react";
import ReactHTMLTableToExcel from "react-html-table-to-excel"; //导表
// import AllPostPage from "./AllPostPage";
// import DataToTable from "../component/result/DataToTable";
import FlavorForm from "../component/result/FlavorForm";
import { useLocation } from "react-router-dom";
import FileSaver from "file-saver";
// import { jsPDF } from "jspdf";
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text
} from "@chakra-ui/react";

function Result() {
  const location = useLocation();
  const editorValue = useRef("");
  const [showTable, setShowTable] = useState(true);
  const handler = () => {
    setShowTable(!showTable);
  }
  const creatHtmlTree = (htmlTree, style = "") => {
    return `
            <!DOCTYPE html>
                <html lang="en">
         <head>
                <meta charset="UTF-8">
                <style>
                    ${style}
                </style>
                </head>
                <body>
                    ${htmlTree}
                </body>
                </html>`;
  };
  const log = () => {
    // console.log(editorValue.current.startContent);
    let content = editorValue.current.startContent;
    let style = ".title-span{ font-size:16px; color:red }";
    let html = creatHtmlTree(content, style);
    let blob = new Blob([html], {
      type: "application/vnd.ms-word;charset=UTF-8",
    });
    FileSaver.saveAs(blob, "文档名称.doc");
  };
  // const download = () => {
  //   let content = editorValue.current.startContent;
  //   const doc = new jsPDF();
  //   doc.addFont("../fonts/SourceHanSansSC-VF.ttf", "SourceHanSansSC-VF", "normal");
  //   doc.setFont("SourceHanSansSC-VF");
  //   doc.text(content, 10, 10);
  //   doc.save("test.pdf");
  // };
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/vxe-table-plugin-export-pdf/fonts/source-han-sans-normal.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <>
      <div>
        <div style={{ float: "left" }}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <Editor
              tinymceScriptSrc={
                process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"
              }
              onInit={(evt, editor) => (editorValue.current = editor)}
              initialValue={location.state.value}
              init={{
                id: "tiny2",
                language: "zh-Hans",
                min_height: 540,
                width: 590,
                menubar: false,
                icons_url: "/icons/savetext/icons.js",
                icons: "savetext",
                plugins:
                  " autoresize save  searchreplace autolink fullscreen link charmap pagebreak insertdatetime advlist lists wordcount",
                toolbar:
                  " link  newdocument save print searchreplace undo redo cut copy paste blockquote removeformat forecolor backcolor bold italic underline strikethrough charmap blocks fontsize alignleft aligncenter alignright alignjustify outdent indent pagebreak insertdatetime  fullscreen",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                save_onsavecallback: function () {
                  console.log("Saved");
                },
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
                  // //模拟出一个input用于添加本地文件
                  // var input = document.createElement("input");
                  // input.setAttribute("type", "file");
                  // input.setAttribute("accept", filetype);
                  // input.click();
                  // input.onchange = function () {
                  //   var file = this.files[0];
                  //   var xhr, formData;
                  //   console.log(file.name);
                  // };
                },
              }}
            />
            <Button onClick={log}>下载当前文本doc</Button>
            {/* <Button onClick={download}>下载当前文本pdf</Button> */}
            <FlavorForm hit={location.state.hit}/>
          </form>
        </div>
        <>
          <Button onClick={handler}>展示/隐藏统计信息</Button>
          {showTable && <TableContainer>
            <Table variant="simple">
              <TableCaption>统计信息</TableCaption>
              <Thead>
                <Tr>
                  <Th>级别</Th>
                  <Th>1</Th>
                  <Th>2</Th>
                  <Th>3</Th>
                  <Th>4</Th>
                  <Th>5</Th>
                  <Th>6</Th>
                  <Th>7</Th>
                  <Th>8</Th>
                  <Th>9</Th>
                  <Th>未录入</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>字数</Td>
                </Tr>
                <Tr>
                  <Td>占比</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>}
          <Text>分析结果： 适合HSK 6级以上的学习者</Text>
          <Button>
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="download-table-xls-button"
              table="table-to-xls"
              filename="tablexls"
              sheet="tablexls"
              buttonText="下载分析明细"
            />
          </Button>
        </>
      </div>
    </>
  );
}

export default Result;
