import React, { useState, useRef, useEffect } from "react";
// import "./App.css";
import { Editor } from "@tinymce/tinymce-react";
import ReactHTMLTableToExcel from "react-html-table-to-excel"; //导表
// import AllPostPage from "./AllPostPage";
// import DataToTable from "../component/result/DataToTable";
import Button from "@mui/material/Button";
import FlavorForm from "../component/result/FlavorForm";
import { useDispatch, useSelector } from "react-redux";
import TabSetup from "../component/result/TabSetup";
import ResponsiveAppBar from "../component/navbar/NavBar";
import { useLocation } from "react-router-dom";
import { MeiliSearch } from "meilisearch";
import FileSaver from "file-saver";
import { login } from "../component/store/display/homeSet";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  const dispatch = useDispatch();
  const [showTable, setShowTable] = useState(true);
  const [edit, setEdit] = useState(false);
  const [newcontent, setNewcontent] = useState("");
  const [zishunum, setZishuNum] = useState(0);
  const [oldValue, setOldvalue] = useState("");
  const [fenci, setFenci] = useState([]);
  const [cinum, setCiNum] = useState(0);
  const userLoggedIn = useSelector((state) => state.loginState.value);
  const navigate = useNavigate();
  const [contentOne, setContentOne] = useState("<p>");
  const [flag, setFlag] = useState(0);
  const [ziArr, setZiArr] = useState([
    {
      一级: 0,
      二级: 0,
      三级: 0,
      四级: 0,
      五级: 0,
      六级: 0,
      高等: 0,
      未录入: 0,
    },
    {
      一级: 0,
      二级: 0,
      三级: 0,
      四级: 0,
      五级: 0,
      六级: 0,
      高等: 0,
      未录入: 0,
    },
  ]);
  const [ziArr369, setZiArr369] = useState([
    {
      一级: 0,
      二级: 0,
      三级: 0,
      四级: 0,
      五级: 0,
      六级: 0,
      高等: 0,
      未录入: 0,
    },
    {
      一级: 0,
      二级: 0,
      三级: 0,
      四级: 0,
      五级: 0,
      六级: 0,
      高等: 0,
      未录入: 0,
    },
  ]);
  const [ciArr, setCiArr] = useState([
    {
      一级: 0,
      二级: 0,
      三级: 0,
      四级: 0,
      五级: 0,
      六级: 0,
      高等: 0,
      未录入: 0,
    },
    {
      一级: 0,
      二级: 0,
      三级: 0,
      四级: 0,
      五级: 0,
      六级: 0,
      高等: 0,
      未录入: 0,
    },
  ]);
  const [ciArr369, setCiArr369] = useState([
    {
      一级: 0,
      二级: 0,
      三级: 0,
      四级: 0,
      五级: 0,
      六级: 0,
      高等: 0,
      未录入: 0,
    },
    {
      一级: 0,
      二级: 0,
      三级: 0,
      四级: 0,
      五级: 0,
      六级: 0,
      高等: 0,
      未录入: 0,
    },
  ]);
  var pblc = "0";
  let zishu_hsk = {
    一级: 0,
    二级: 0,
    三级: 0,
    四级: 0,
    五级: 0,
    六级: 0,
    高等: 0,
    未录入: 0,
  };
  let zishu_hsk_rate = {
    一级: 0,
    二级: 0,
    三级: 0,
    四级: 0,
    五级: 0,
    六级: 0,
    高等: 0,
    未录入: 0,
  };
  let zishu_369 = {
    一级: 0,
    二级: 0,
    三级: 0,
    四级: 0,
    五级: 0,
    六级: 0,
    高等: 0,
    未录入: 0,
  };
  let zishu_369_rate = {
    一级: 0,
    二级: 0,
    三级: 0,
    四级: 0,
    五级: 0,
    六级: 0,
    高等: 0,
    未录入: 0,
  };
  let ci_hsk = {
    一级: 0,
    二级: 0,
    三级: 0,
    四级: 0,
    五级: 0,
    六级: 0,
    高等: 0,
    未录入: 0,
  };
  let ci_hsk_rate = {
    一级: 0,
    二级: 0,
    三级: 0,
    四级: 0,
    五级: 0,
    六级: 0,
    高等: 0,
    未录入: 0,
  };
  let ci_369 = {
    一级: 0,
    二级: 0,
    三级: 0,
    四级: 0,
    五级: 0,
    六级: 0,
    高等: 0,
    未录入: 0,
  };
  let ci_369_rate = {
    一级: 0,
    二级: 0,
    三级: 0,
    四级: 0,
    五级: 0,
    六级: 0,
    高等: 0,
    未录入: 0,
  };

  const handlePublic = (newValue) => {
    pblc = newValue;
    console.log("111", { pblc });
  };
  const handler = () => {
    setShowTable(!showTable);
  };
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
  const client = new MeiliSearch({
    host: "http://106.75.250.96:3000/api2/",
    apiKey: "MASTER_KEY",
  });

  const searchLevel = () => {
    let text_arr = getHanzi(getText(editorValue.current.getContent()));
    getfenci(getText(editorValue.current.getContent()));
    let zishu_num = editorValue.current.plugins.wordcount.body.getWordCount();
    let ci_num = fenci.length;
    console.log("分词结果", fenci);
    console.log("词数", ci_num);
    return;
    setZishuNum(zishu_num);
    setCiNum(ci_num);
    for (var q of text_arr) {
      client
        .index("HSK_utf8_id_space")
        .search(q)
        .then((res) => {
          //console.log("HSK_res", res.hits.length !== 0 ? res.hits[0].HSK级别 : "无结果");
          if (res.hits.length !== 0) {
            zishu_hsk[res.hits[0].HSK级别]++;
            zishu_hsk_rate[res.hits[0].HSK级别] = (
              zishu_hsk[res.hits[0].HSK级别] / zishu_num
            ).toFixed(2);
          } else {
            zishu_hsk["未录入"]++;
            zishu_hsk_rate["未录入"] = (
              zishu_hsk["未录入"] / zishu_num
            ).toFixed(2);
          }
        });

      client
        .index("words_3d9j_space0")
        .search(q)
        .then((res) => {
          //console.log("words_3d9j_space0_res", res.hits.length !== 0 ? res.hits[0].等级 : "无结果");
          if (res.hits.length !== 0) {
            zishu_369[res.hits[0].等级]++;
            zishu_369_rate[res.hits[0].等级] = (
              zishu_369[res.hits[0].等级] / zishu_num
            ).toFixed(2);
          } else {
            zishu_369["未录入"]++;
            zishu_369_rate["未录入"] = (
              zishu_369["未录入"] / zishu_num
            ).toFixed(2);
          }
        });
    }
    for (var q of fenci) {
      client
        .index("HSK_utf8_id_space")
        .search(q)
        .then((res) => {
          //console.log("HSK_res", res.hits.length !== 0 ? res.hits[0].HSK级别 : "无结果");
          if (res.hits.length !== 0) {
            ci_hsk[res.hits[0].HSK级别]++;
            ci_hsk_rate[res.hits[0].HSK级别] = (
              ci_hsk[res.hits[0].HSK级别] / ci_num
            ).toFixed(2);
          } else {
            ci_hsk["未录入"]++;
            ci_hsk_rate["未录入"] = (ci_hsk["未录入"] / ci_num).toFixed(2);
          }
        });

      client
        .index("words_3d9j_space0")
        .search(q)
        .then((res) => {
          //console.log("words_3d9j_space0_res", res.hits.length !== 0 ? res.hits[0].等级 : "无结果");
          if (res.hits.length !== 0) {
            ci_369[res.hits[0].等级]++;
            ci_369_rate[res.hits[0].等级] = (
              ci_369[res.hits[0].等级] / ci_num
            ).toFixed(2);
          } else {
            ci_369["未录入"]++;
            ci_369_rate["未录入"] = (ci_369["未录入"] / ci_num).toFixed(2);
          }
        });
    }
    //合并为对象数组
    var zi_arr = [zishu_hsk, zishu_hsk_rate];
    var zi_arr369 = [zishu_369, zishu_369_rate];
    setZiArr(zi_arr.slice());
    setZiArr369(zi_arr369.slice());

    var ci_arr = [ci_hsk, ci_hsk_rate];
    var ci_arr369 = [ci_369, ci_369_rate];
    setCiArr(ci_arr.slice());
    setCiArr369(ci_arr369.slice());

    console.log("zi_hsk", ziArr);
    console.log("zi_369", ziArr369);
    console.log("ci_hsk", ciArr);
    console.log("ci_369", ciArr369);
  };

  const setPrivate = (hit) => {
    // 通过私有化申请,改为收藏，不从原数据删除
    if (userLoggedIn) {
      if (
        window.confirm(
          "确定收藏？在all_private中搜索",
          hit.title,
          "查找收藏后的信息"
        )
      ) {
        if (location.state.userid === "") {
          window.alert("请先登录，才可收藏此条");
        } else {
          client.index("all_private").addDocuments([
            {
              id: hit.id,
              url: hit.url,
              title: hit.title,
              text: hit.text,
              public: "true", //收藏后仍为公有，直到修改保存后需要改为false，直到将其公开
              userid: location.state.userid,
              级别: hit.级别,
              genre: hit.genre,
            },
          ]);
          client.index("wait_to_check").deleteDocument(hit.id);
        }
      }
    } else {
      console.log("xxxxx");
      navigate("/");
      dispatch(login());
    }
  };
  const setPublic = (hit) => {
    // 通过公有化申请
    if (
      window.confirm(
        "确定公开吗？公开后将从私有index与待审核index删除，可在公开库搜索",
        hit.title,
        "查找公开后的数据"
      )
    ) {
      client.index("doc_wiki_05").addDocuments([
        {
          id: hit.id,
          url: hit.url,
          userid: hit.userid,
          title: hit.title,
          text: hit.text,
          public: "true",
          级别: hit.级别,
          genre: hit.genre,
        },
      ]);
      //设为公有从此待审核index删除
      // client.index('wait_to_check').deleteDocument(hit.id)
      //不从待审核删除了，将状态更改为审核通过
      client.index("wait_to_check").updateDocuments([
        {
          id: hit.id,
          public: "true",
          审核状态: "通过", //0 待审核，1：通过，2：不通过
        },
      ]);
      //公有后将私有index的此条记录更新为公开状态
      client.index("all_private").updateDocuments([
        {
          id: hit.id,
          public: "true",
          审核状态: "通过", //0 待审核，1：通过，2：不通过
        },
      ]);

      // this.refreshIndex('wait_to_check')
    }
  };
  const refusePublic = (hit) => {
    //拒绝公开申请
    if (window.confirm("确定拒绝申请？")) {
      client.index("all_private").updateDocuments([
        {
          id: hit.id,
          public: "false",
          审核状态: "不通过", //0 待审核，1：通过，2：不通过
        },
      ]);
      client.index("wait_to_check").updateDocuments([
        {
          id: hit.id,
          public: "false",
          审核状态: "不通过", //0 待审核，1：通过，2：不通过
        },
      ]);
      // client.index('wait_to_check').deleteDocument(hit.id)
      // this.refreshIndex('wait_to_check')
    }
  };

  const setWaitPublicCheck = (hit, newContent) => {
    // 公有加入待审核
    const client = new MeiliSearch({
      host: "http://106.75.250.96:3000/api2/",
      apiKey: "MASTER_KEY",
    });
    //加入到待审核index，同时需要携带该用户的userid，以便后续限制此用户只能访问用户id是自己的数据
    // hit数据中加入userid
    console.log("new", newContent);
    console.log("old", oldValue);
    if (oldValue === newContent) {
      // if (true) {
      //此判断内容有格式问题，还需修改
      window.alert("您并没有更改内容，保存无效");
    } else if (newContent === "") {
      window.alert("您的输入为空");
    } else if (pblc === "0") {
      //选择公开
      if (
        window.confirm(
          "您已经修改此内容，点击确认则将新内容公开发布，您可在待审核区查看"
        )
      ) {
        // 此处要根据修改后tiny内的值进行修改，例如下面text所述
        const new_id = nanoid();
        client.index("wait_to_check").addDocuments([
          {
            id: new_id,
            url: hit.url,
            title: hit.title,
            text: newContent, // 将hit.text替换成tiny内新保存的值
            级别: hit.级别,
            genre: hit.genre,
            审核状态: "待审核", //0 待审核，1：通过，2：不通过
            public: "false",
            userid: location.state.userid, //后续根据当前登录用户进行修改
          },
        ]);
        client.index("wait_to_submit").deleteDocument(hit.id);
        client.index("all_private").addDocuments([
          {
            id: new_id,
            url: hit.url,
            title: hit.title,
            text: newContent, // 将hit.text替换成tiny内新保存的值
            级别: hit.级别,
            genre: hit.genre,
            审核状态: "待审核", //0 待审核，1：通过，2：不通过
            public: "false",
            userid: location.state.userid, //后续根据当前登录用户进行修改
          },
        ]);
      }
    } else {
      //选择私有
      if (window.confirm("您已经修改此内容，点击确认则保存入私有文本库")) {
        client.index("all_private").addDocuments([
          {
            id: nanoid(),
            url: hit.url,
            title: hit.title,
            text: newcontent, // 将hit.text替换成tiny内新保存的值
            级别: hit.级别,
            genre: hit.genre,
            public: "false",
            userid: location.state.userid, //后续根据当前登录用户进行修改
          },
        ]);
      }
    }
  };

  const getText = (str) => {
    if (!str) {
      return;
    }
    return str.replace(/<[^<>]+>/g, "").replace(/&nbsp;/gi, "");
  };

  const getHanzi = (str) => {
    var name = str;
    var reg = /[\u4e00-\u9fa5]/g;
    var names = name.match(reg);
    name = names.join("");
    // var n = name.split("");//去重
    // const result = Array.from(new Set(n));

    return name;
  };
  // const getfenci = (str) => {
  //   const jieba = require("@node-rs/jieba");
  //   //const jieba = require("nodejieba");
  //   const result = jieba.cut("长江黄河");
  //   console.log(result);
  //   return result;
  // };
  const getfenci = async (str) => {
    axios
      .get("http://106.75.250.96:3000/api1/fenci/", {
        params: { fenci_str: str },
      })
      .then((response) => {
        setFenci(response.data);
      });
  };
  useEffect(() => {
    let tmp = editorValue.current.startContent;
    console.log(tmp);
  });
  const setOne1 = () => {
    let i = 0;
    let word = getHanzi(getText(editorValue.current.getContent()));
    for (let q of word) {
      i++;
      client
        .index("HSK_utf8_id_space")
        .search(q)
        .then((res) => {
          // console.log(res.hits[0]);
          // console.log(res.hits[0]);
          // console.log(
          //   "HSK_res",
          //   res.hits.length !== 0 ? res.hits[0].HSK级别 : "无结果"
          // );
          if (typeof res.hits[0] !== "undefined") {
            if (res.hits[0]["HSK级别"] === "一级") {
              setContentOne(
                // {
                //   contentOne:
                //     contentOne +
                //     '<span style="background-color: rgb(252, 249, 4);">' +
                //     "</span>",
                // }
                (contentOne) =>
                  contentOne +
                  '<span style="background-color: rgb(252, 249, 4);">' +
                  q +
                  "</span>"
              );
              // contentOne +=
              //   '<span style="background-color: rgb(252, 249, 4);">';
              // contentOne += q;
              // contentOne += "</span>";
            } else {
              setContentOne(
                // {
                //   contentOne: contentOne + q,
                // }
                (contentOne) => contentOne + q
              );
              // contentOne += q;
            }
            console.log(contentOne);
          }
        });
      if (i == word.length) setFlag(1);
    }
    setContentOne(
      // {
      //   contentOne: contentOne + "</p>",
      // }
      (contentOne) => contentOne + "</p>"
    );
    if (flag == 1) editorValue.current.setContent(contentOne);
  };
  // useEffect(() => {
  //   editorValue.current.setContent(contentOne);
  // }, [flag]);
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
        <ResponsiveAppBar />
        <div
          style={{
            width: "1200px",
            padding: "10px",
            margin: "auto",
          }}
        >
          <div style={{ float: "left" }}>
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              {/* 使用失去焦点的遮罩层达到不可编辑 */}
              <div
                style={
                  edit
                    ? {
                        opacity: 60,
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }
                    : {
                        opacity: 60,
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                      }
                }
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
                    icons: "savetext3",
                    plugins:
                      " autoresize save  searchreplace autolink fullscreen link charmap pagebreak advlist lists wordcount",
                    toolbar:
                      " link  newdocument save print searchreplace undo redo cut copy paste blockquote removeformat forecolor backcolor bold italic underline strikethrough charmap blocks fontsize alignleft aligncenter alignright alignjustify ouTdent indent pagebreak fullscreen",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    save_onsavecallback: function () {
                      setNewcontent(
                        editorValue.current.getContent().slice(3, -4)
                      );
                      const client = new MeiliSearch({
                        host: "http://106.75.250.96:3000/api2/",
                        apiKey: "MASTER_KEY",
                      });
                      console.log(
                        "now",
                        editorValue.current.getContent().slice(3, -4)
                      );
                      console.log("old", oldValue);
                      if (
                        editorValue.current.getContent().slice(3, -4) ===
                        oldValue
                      ) {
                        alert("您没有更改");
                      } else {
                        if (window.confirm("保存后将存入草稿箱")) {
                          client.index("wait_to_submit").addDocuments([
                            {
                              id: location.state.hit.id,
                              url: location.state.hit.url,
                              title: location.state.hit.title,
                              text: editorValue.current
                                .getContent()
                                .slice(3, -4), // 将hit.text替换成tiny内新保存的值
                              级别: location.state.hit.级别,
                              genre: location.state.hit.genre,
                              public: "false",
                              userid: location.state.userid, //后续根据当前登录用户进行修改
                            },
                          ]);
                        }
                      }
                    },
                    file_picker_types: "file",
                    file_picker_callback: function (callback, value, meta) {
                      //文件分类
                      var filetype =
                        ".pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4";
                      //后端接收上传文件的地址
                      var upurl = "/demo/upfile.php";
                      //为不同插件指定文件类型及后端地址
                      switch (meta.filetype) {
                        // case "image":
                        //   filetype = ".jpg, .jpeg, .png, .gif";
                        //   upurl = "upimg.php";
                        //   break;
                        // case "media":
                        //   filetype = ".mp3, .mp4";
                        //   upurl = "upfile.php";
                        //   break;
                        case "file":
                        default:
                      }
                      //模拟出一个input用于添加本地文件;
                      var input = document.createElement("input");
                      input.setAttribute("type", "file");
                      input.setAttribute("accept", filetype);
                      input.click();
                      input.onchange = function () {
                        var file = this.files[0];

                        var xhr, formData;
                        console.log(file.name);
                        xhr = new XMLHttpRequest();
                        xhr.withCredentials = false;
                        xhr.open("POST", upurl);
                        xhr.onload = function () {
                          var json;
                          if (xhr.status != 200) {
                            //failure("HTTP Error: " + xhr.status);
                            return;
                          }
                          json = JSON.parse(xhr.responseText);
                          if (!json || typeof json.location != "string") {
                            //failure("Invalid JSON: " + xhr.responseText);
                            return;
                          }
                          callback(json.location);
                        };
                        formData = new FormData();
                        formData.append("file", file, file.name);
                        xhr.send(formData);
                      };
                    },
                  }}
                />
              </div>

              {edit ? (
                // 可编辑状态
                <div>
                  <Button
                    style={{ backgroundColor: "#F0F2F5" }}
                    onClick={() => {
                      searchLevel();
                    }}
                    className="r-button"
                  >
                    分析文章
                  </Button>
                  <CheckBox handlePublic={handlePublic} />
                  <Button
                    style={{ backgroundColor: "#F0F2F5" }}
                    onClick={() => {
                      setWaitPublicCheck(location.state.hit, newcontent);
                    }}
                    className="r-button"
                  >
                    提交
                  </Button>
                  <Button
                    style={{ backgroundColor: "#F0F2F5" }}
                    onClick={() => {
                      console.log(editorValue.current.getContent());
                      // console.log(getHanzi(editorValue.current.getContent()));
                      // searchLevel(getHanzi(editorValue.current.getContent()));
                      // console.log(zishu_hsk);console.log(zishu_369);
                      //console.log("button内:" + ziArr["0"]);
                      //console.log(editorValue.current.plugins.wordcount.body.getWordCount());
                      //fenCi(getText(editorValue.current.getContent()))
                    }}
                    className="r-button"
                  >
                    搜索测试
                  </Button>
                  <FlavorForm
                    hit={location.state.hit}
                    selectedIndex={location.state.selectedIndex}
                    userid={location.state.userid}
                  />
                </div>
              ) : (
                // 不可编辑状态
                <div>
                  <div style={{ textAlign: "center" }}>
                    {location.state.selectedIndex !== "wait_to_check" ? (
                      <Button
                        style={{ backgroundColor: "#F0F2F5" }}
                        onClick={() => {
                          setOldvalue(
                            editorValue.current.getContent().slice(3, -4)
                          );
                          if (userLoggedIn) {
                            setEdit(true);
                          } else {
                            navigate("/");
                            dispatch(login());
                          }
                        }}
                        className="r-button"
                      >
                        编辑文本
                      </Button>
                    ) : (
                      <></>
                    )}

                    {location.state.selectedIndex !== "all_private" &&
                    location.state.selectedIndex !== "wait_to_check" ? (
                      location.state.hit.public === "true" ? (
                        <Button
                          onClick={() => setPrivate(location.state.hit)}
                          style={{ backgroundColor: "#F0F2F5" }}
                        >
                          点击收藏
                        </Button>
                      ) : (
                        <></>
                      )
                    ) : (
                      <></>
                    )}
                    {
                      //在审核页面显示
                      location.state.userid === "MTcwXzI" ? (
                        location.state.selectedIndex === "wait_to_check" ? (
                          location.state.hit.public === "true" ? (
                            <Button
                              onClick={() => setPrivate(location.state.hit)}
                              style={{ backgroundColor: "#F0F2F5" }}
                            >
                              通过私有化申请
                            </Button>
                          ) : (
                            <div>
                              <Button
                                onClick={() => setPublic(location.state.hit)}
                                style={{ backgroundColor: "#F0F2F5" }}
                              >
                                通过
                              </Button>
                              <Button
                                onClick={() => refusePublic(location.state.hit)}
                                style={{ backgroundColor: "#F0F2F5" }}
                              >
                                拒绝
                              </Button>
                            </div>
                          )
                        ) : (
                          <></>
                        )
                      ) : (
                        <></>
                      )
                    }
                  </div>
                </div>
              )}
              <Button onClick={log}>下载当前文本docx</Button>
              {/* <Button onClick={download}>下载当前文本pdf</Button> */}
            </form>
          </div>
          <div
            style={{
              float: "right",
              height: "588px",
              width: "590px",
              textAlign: "center",
              border: "1px solid #900",
            }}
          >
            <TabSetup
              searchLevel={searchLevel}
              setOne1={setOne1}
              zishu_num={zishunum}
              ci_num={cinum}
              zishu_hsk={ziArr}
              zishu_369={ziArr369}
              ci_hsk={ciArr}
              ci_369={ciArr369}
            />
          </div>
        </div>
        <></>
      </div>
    </>
  );
}

export default Result2;
