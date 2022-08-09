import React, { useState, useRef, useEffect } from "react";
// import "./App.css";
import { Editor } from "@tinymce/tinymce-react";
import ReactHTMLTableToExcel from "react-html-table-to-excel"; //导表
// import AllPostPage from "./AllPostPage";
// import DataToTable from "../component/result/DataToTable";
import FlavorForm from "../component/result/FlavorForm";
import { useLocation } from "react-router-dom";
import { MeiliSearch } from "meilisearch";
import FileSaver from "file-saver";
import { nanoid } from 'nanoid';
// import { jsPDF } from "jspdf";
// import {
//   Button,
//   Table,
//   Thead,
//   Tbody,
//   Tfoot,
//   Tr,
//   Th,
//   Td,
//   TableCaption,
//   TableContainer,
//   Text
// } from "@chakra-ui/react";
import CheckBox from "../component/CheckBox";

function Result() {
  const location = useLocation();
  const editorValue = useRef("");
  const [showTable, setShowTable] = useState(true);
  var pblc = "0"
  const handlePublic = (newValue) => {
    pblc = newValue
    console.log('111',{pblc})
  }
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
  const setWaitPublicCheck = (hit, newContent) => {// 公有加入待审核
    const client = new MeiliSearch({ host: "http://127.0.0.1:7700", apiKey: "MASTER_KEY" });
    //加入到待审核index，同时需要携带该用户的userid，以便后续限制此用户只能访问用户id是自己的数据
    // hit数据中加入userid
    console.log("new", newContent)
    console.log("old", location.state.hit.text)
    if (location.state.hit.text === newContent) { //此判断内容有格式问题，还需修改
      window.alert("您并没有更改内容，保存无效")
    }
    if (pblc === "0") {//选择公开
      if (window.confirm('您已经修改此内容，点击确认则将新内容公开发布，您可在待审核区查看')) {
        // 此处要根据修改后tiny内的值进行修改，例如下面text所述
        const new_id=nanoid()
        client.index('wait_to_check').addDocuments([{
          id: new_id,
          url: hit.url,
          title: hit.title,
          text: newContent,  // 将hit.text替换成tiny内新保存的值
          级别: hit.级别,
          genre: hit.genre,
          public: 'false',
          userid: location.state.userid //后续根据当前登录用户进行修改
        }])
        client.index('all_private').addDocuments([{
          id: new_id,
          url: hit.url,
          title: hit.title,
          text: newContent,  // 将hit.text替换成tiny内新保存的值
          级别: hit.级别,
          genre: hit.genre,
          public: 'false',
          userid: location.state.userid //后续根据当前登录用户进行修改
        }])
      }
    }
    else {//选择私有
      if (window.confirm('您已经修改此内容，点击确认则保存入私有文本库')) {
        client.index('all_private').addDocuments([{
          id: nanoid(),
          url: hit.url,
          title: hit.title,
          text: newContent,  // 将hit.text替换成tiny内新保存的值
          级别: hit.级别,
          genre: hit.genre,
          public: 'false',
          userid: location.state.userid //后续根据当前登录用户进行修改
        }])
      }
    }

  }
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
        <div style={{
          height: '100 %',
          border: '2px solid #900',
          padding: '10px',
          margin: 'auto'
        }}>
          {/* <Text>分析结果： 适合HSK 6级以上的学习者</Text> */}
        </div>
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
                    " autoresize save  searchreplace autolink fullscreen link charmap pagebreak inserTdatetime advlist lists wordcount",
                  toolbar:
                    " link  newdocument save print searchreplace undo redo cut copy paste blockquote removeformat forecolor backcolor bold italic underline strikethrough charmap blocks fontsize alignleft aligncenter alignright alignjustify ouTdent indent pagebreak inserTdatetime  fullscreen",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  save_onsavecallback: function () {
                    var newContent = editorValue.current.getContent().slice(3, -4)
                    console.log("编辑页的Save", newContent);
                    setWaitPublicCheck(location.state.hit,newContent)
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
              <button onClick={log}>下载当前文本doc</button>
              {/* <Button onClick={download}>下载当前文本pdf</Button> */}
              <p>下方选择保存后是否公开</p>
              {/* <CheckBox handlePublic={handlePublic} /> */}
              {/* <FlavorForm hit={location.state.hit} selectedIndex={location.state.selectedIndex} userid={location.state.userid} /> */}
            </form>
          </div>
        </div>
        <>
          <button onClick={handler}>展示/隐藏统计信息</button>
          {/* {showTable && <TableContainer>
            <Table variant="simple" id="table-to-xls">
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
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td>占比</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>}
          <Button>
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="download-table-xls-button"
              table="table-to-xls"
              filename="tablexls"
              sheet="tablexls"
              buttonText="下载分析明细"
            />
          </Button> */}
        </>
      </div>
    </>
  );
}

export default Result;
