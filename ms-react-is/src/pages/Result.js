import React, { useState, useRef, useEffect } from "react";
// import "./App.css";
import { Editor } from "@tinymce/tinymce-react";
import ReactHTMLTableToExcel from "react-html-table-to-excel"; //导表
// import AllPostPage from "./AllPostPage";
// import DataToTable from "../component/result/DataToTable";
import Button from '@mui/material/Button';
import FlavorForm from "../component/result/FlavorForm";
import TabSetup from "../component/result/TabSetup";
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
  const [edit, setEdit] = useState(false);
  const [newcontent, setNewcontent] = useState("");
  var pblc = "0";
  const handlePublic = (newValue) => {
    pblc = newValue
    console.log('111', { pblc })
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
    let content = editorValue.current.getContent();
    let style = ".title-span{ font-size:16px; color:red }";
    let html = creatHtmlTree(content, style);
    let blob = new Blob([html], {
      type: "application/vnd.ms-word;charset=UTF-8",
    });
    FileSaver.saveAs(blob, "文档名称.docx");
  };
  const client = new MeiliSearch({ host: "http://106.75.250.96:3001/api2/", apiKey: "MASTER_KEY" });
  const setPrivate = (hit) => {// 通过私有化申请,改为收藏，不从原数据删除
    if (window.confirm('确定收藏？在all_private中搜索', hit.title, '查找收藏后的信息')) {
      if (location.state.userid === '') { window.alert("请先登录，才可收藏此条") }
      else {
        client.index('all_private').addDocuments([{
          id: hit.id,
          url: hit.url,
          title: hit.title,
          text: hit.text,
          public: "true", //收藏后仍为公有，直到修改保存后需要改为false，直到将其公开
          userid: location.state.userid,
          级别: hit.级别,
          genre: hit.genre
        }])
        client.index('wait_to_check').deleteDocument(hit.id)
      }
    }
  }
  const setPublic = (hit) => {// 通过公有化申请 （未实现公开到哪个index，还需选择）
    if (window.confirm('确定公开吗？公开后将从私有index与待审核index删除，可在公开库搜索', hit.title, '查找公开后的数据')) {
      client.index('doc_wiki_05').addDocuments([{
        id: hit.id,
        url: hit.url,
        userid: hit.userid,
        title: hit.title,
        text: hit.text,
        public: "true",
        级别: hit.级别,
        genre: hit.genre
      }])
      //设为公有从此待审核index删除
      client.index('wait_to_check').deleteDocument(hit.id)
      //公有后将私有index的此条记录更新为公开状态
      client.index('all_private').updateDocuments([{
        id: hit.id,
        public: 'true',
      }])

      // this.refreshIndex('wait_to_check')
    }
  }
  const refusePublic = (hit) => {
    client.index('wait_to_check').deleteDocument(hit.id)
    // this.refreshIndex('wait_to_check')
  }
  const setWaitPublicCheck = (hit, newContent) => {// 公有加入待审核
    const client = new MeiliSearch({ host: "http://106.75.250.96:3001/api2/", apiKey: "MASTER_KEY" });
    //加入到待审核index，同时需要携带该用户的userid，以便后续限制此用户只能访问用户id是自己的数据
    // hit数据中加入userid
    console.log("new", newContent)
    console.log("old", location.state.hit.text)
    if (location.state.hit.text === newContent) { //此判断内容有格式问题，还需修改
      window.alert("您并没有更改内容，保存无效")
    }
    if (newContent === "") {
      window.alert("您还没有保存")
    }
    else if (pblc === "0") {//选择公开
      if (window.confirm('您已经修改此内容，点击确认则将新内容公开发布，您可在待审核区查看')) {
        // 此处要根据修改后tiny内的值进行修改，例如下面text所述
        const new_id = nanoid()
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
          text: newcontent,  // 将hit.text替换成tiny内新保存的值
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
      <div style={{
        width: '1200px',
        padding: '10px',
        margin: 'auto'
      }}>
        
        <div>
          <div style={{ float: "left" }}>
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              {/* 使用失去焦点的遮罩层达到不可编辑 */}
              <div style={edit? {opacity: 60,position: 'relative',width: '100%',height: '100%',} : {opacity: 60,position: 'relative',width: '100%',height: '100%',pointerEvents: 'none',}}>
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
                    icons: "savetext3",
                    plugins:
                      " autoresize save  searchreplace autolink fullscreen link charmap pagebreak inserTdatetime advlist lists wordcount",
                    toolbar:
                      " link  newdocument save print searchreplace undo redo cut copy paste blockquote removeformat forecolor backcolor bold italic underline strikethrough charmap blocks fontsize alignleft aligncenter alignright alignjustify ouTdent indent pagebreak inserTdatetime  fullscreen",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    save_onsavecallback: function () {
                      // newcontent = editorValue.current.getContent().slice(3, -4)
                      console.log("编辑页的Save", setNewcontent(editorValue.current.getContent().slice(3, -4)));
                      const client = new MeiliSearch({ host: "http://106.75.250.96:3001/api2/", apiKey: "MASTER_KEY" });
                      const new_id = nanoid()
                      client.index('wait_to_submit').addDocuments([{
                        id: new_id,
                        url: location.state.hit.url,
                        title: location.state.hit.title,
                        text: editorValue.current.getContent().slice(3, -4),  // 将hit.text替换成tiny内新保存的值
                        级别: location.state.hit.级别,
                        genre: location.state.hit.genre,
                        public: 'false',
                        userid: location.state.userid //后续根据当前登录用户进行修改
                      }])
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
              </div>
              
              {
                edit ?
                  // 可编辑状态
                  <div>
                    <Button style={{ backgroundColor: "#F0F2F5" }} onClick={() => { }} className="r-button" >
                      分析文本（未写功能）
                    </Button>
                    <p>下方选择保存后是否公开</p>
                    <CheckBox handlePublic={handlePublic} />
                    <Button style={{ backgroundColor: "#F0F2F5" }} onClick={() => { setWaitPublicCheck(location.state.hit, newcontent) }} className="r-button" >
                      提交
                    </Button>
                    <FlavorForm hit={location.state.hit} selectedIndex={location.state.selectedIndex} userid={location.state.userid} />
                  </div>
                  :
                  // 不可编辑状态
                  <div>
                    <div style={{ textAlign: "center" }}>
                      <Button style={{ backgroundColor: "#F0F2F5" }} onClick={() => { setEdit(true); }} className="r-button" >
                        编辑文本
                      </Button>
                      {
                        location.state.selectedIndex !== "all_private" && location.state.selectedIndex !== "wait_to_check" ?
                          location.state.hit.public === 'true' ?
                            <Button onClick={() => setPrivate(location.state.hit)} style={{ backgroundColor: "#F0F2F5" }}>点击收藏</Button> :
                            <></> : <></>
                      }
                      {
                        //在审核页面显示
                        location.state.userid === "MTcwXzI" ?
                          location.state.selectedIndex === 'wait_to_check' ?
                            location.state.hit.public === 'true' ?
                              <Button onClick={() => setPrivate(location.state.hit)} style={{ backgroundColor: "#F0F2F5" }}>通过私有化申请</Button> :
                              <div>
                                <Button onClick={() => setPublic(location.state.hit)} style={{ backgroundColor: "#F0F2F5" }}>通过公有化申请</Button>
                                <Button onClick={() => refusePublic(location.state.hit)} style={{ backgroundColor: "#F0F2F5" }}>拒绝公有化申请</Button>
                              </div> :
                            <></> : <></>

                      }
                    </div>
                  </div>
              }
              <Button onClick={log}>下载当前文本docx</Button>
              {/* <Button onClick={download}>下载当前文本pdf</Button> */}


            </form>
          </div>
          <div style={{
            float: 'right',
            height: '550px',
            width: '590px',
            textAlign: 'center',
            border: '1px solid #900' }}>
            <TabSetup />
          </div>
          
        </div>
        <>
          
          {/* <Button onClick={handler}>展示/隐藏统计信息</Button> */}
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
