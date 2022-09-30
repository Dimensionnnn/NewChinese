import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import { Editor } from "@tinymce/tinymce-react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CheckBox from "../CheckBox";
import { motion } from "framer-motion";
import { MeiliSearch } from "meilisearch";
import { nanoid } from "nanoid";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedIn } from "../store/user/userInfo";
import ExcelJs from "exceljs";
import FileSaver from "file-saver";
import "../../pages/tinyInline.css";

function AnalyzePage() {
  let titleInput = useRef(null);
  const [value, setValue] = useState("");
  const editorValue = useRef("");
  const [totalWordNumber, setTotalWordNumber] = useState(0);
  const [editWord, setEditWord] = useState(false);
  const [editPhrase, setEditPhrase] = useState(false);
  const [totalPhraseNumber, setTotalPhraseNumber] = useState(0);
  const [wordCount, setWordCount] = useState({
    一级: 0,
    二级: 0,
    三级: 0,
    四级: 0,
    五级: 0,
    六级: 0,
    高等: 0,
    未录入: 0,
  });
  const [inHSKTableCount, setInHSKTableCount] = useState(0);
  const [wordLevelCount, setWordLevelCount] = useState({
    一级: 0,
    二级: 0,
    三级: 0,
    四级: 0,
    五级: 0,
    六级: 0,
    高等: 0,
    未录入: 0,
  });
  const [inLevelTableCount, setInLevelTableCount] = useState(0);

  const [groupOfPhrases, setGroupOfPhrases] = useState([]);
  const [phraseCount, setPhraseCount] = useState({
    一级: 0,
    二级: 0,
    三级: 0,
    四级: 0,
    五级: 0,
    六级: 0,
    高等: 0,
    未录入: 0,
  });
  const [inHSKTablePhraseCount, setInHSKTablePhraseCount] = useState(0);
  const [phraseLevelCount, setPhraseLevelCount] = useState({
    一级: 0,
    二级: 0,
    三级: 0,
    四级: 0,
    五级: 0,
    六级: 0,
    高等: 0,
    未录入: 0,
  });
  const [inLevelTablePhraseCount, setInLevelTablePhraseCount] = useState(0);

  const [displayBasic, setDisplayBasic] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);

  const exportToExcel = () => {
    let copiedWordCount = { ...wordCount };
    let doubleCopy = { ...copiedWordCount };
    for (const key in doubleCopy) {
      doubleCopy[key] = (
        (100 * copiedWordCount[key]) /
        totalWordNumber
      ).toFixed(2);
    }
    let data = [copiedWordCount, doubleCopy];

    let copiedWordLevelCount = { ...wordLevelCount };
    let doubleCopy2 = { ...copiedWordLevelCount };
    for (const key in doubleCopy2) {
      doubleCopy2[key] = (
        (100 * copiedWordLevelCount[key]) /
        totalWordNumber
      ).toFixed(2);
    }
    let data2 = [copiedWordLevelCount, doubleCopy2];

    let copiedPhraseCount = { ...phraseCount };
    let doubleCopy3 = { ...copiedPhraseCount };
    for (const key in doubleCopy3) {
      doubleCopy3[key] = (
        (100 * copiedPhraseCount[key]) /
        totalPhraseNumber
      ).toFixed(2);
    }
    let data3 = [copiedPhraseCount, doubleCopy3];

    let copiedPhraseLevelCount = { ...phraseLevelCount };
    let doubleCopy4 = { ...copiedPhraseLevelCount };
    for (const key in doubleCopy4) {
      doubleCopy4[key] = (
        (100 * copiedPhraseLevelCount[key]) /
        totalPhraseNumber
      ).toFixed(2);
    }
    let data4 = [copiedPhraseLevelCount, doubleCopy4];
    let sheetName = "基本信息1.xlsx";
    let headerName = "RequestsList";

    // 获取sheet对象，设置当前sheet的样式
    // showGridLines: false 表示不显示表格边框
    let workbook = new ExcelJs.Workbook();
    let sheet = workbook.addWorksheet(sheetName, {
      views: [{ showGridLines: true }],
    });
    let sheet2 = workbook.addWorksheet("基本信息2.xlsx", {
      views: [{ showGridLines: true }],
    });
    let sheet3 = workbook.addWorksheet("基本信息3.xlsx", {
      views: [{ showGridLines: true }],
    });
    let sheet4 = workbook.addWorksheet("基本信息4.xlsx", {
      views: [{ showGridLines: true }],
    });

    // 获取每一列的header
    let columnArr = [];
    for (let i in data[0]) {
      let tempObj = { name: "" };
      tempObj.name = i;
      columnArr.push(tempObj);
    }

    // 设置表格的头部信息，可以用来设置标题，说明或者注意事项
    sheet.addTable({
      name: `Header`,
      ref: "A2", // 头部信息从A1单元格开始显示
      headerRow: true,
      totalsRow: false,
      style: {
        theme: "",
        showRowStripes: false,
        showFirstColumn: true,
        width: 200,
      },
      columns: [{ name: "级别" }],
      rows: [[`字数`], [`占比`]],
    });

    // 设置表格的主要数据部分
    sheet.addTable({
      name: headerName,
      ref: "B2", // 主要数据从A5单元格开始
      headerRow: true,
      totalsRow: false,
      style: {
        theme: "TableStyleMedium2",
        showRowStripes: false,
        width: 200,
      },
      columns: columnArr ? columnArr : [{ name: "" }],
      rows: data.map((e) => {
        let arr = [];
        for (let i in e) {
          arr.push(e[i]);
        }
        return arr;
      }),
    });

    sheet.getCell("A1").font = { size: 20, bold: true }; // 设置单元格的文字样式

    // 设置每一列的宽度
    sheet.columns = sheet.columns.map((e) => {
      const expr = e.values[5];
      switch (expr) {
        case "级别":
          return { width: 40 };
        case "Gender":
          return { width: 40 };
        case "Height":
          return { width: 30 };
        default:
          return { width: 20 };
      }
    });

    //sheet2
    // 获取每一列的header
    let columnArr2 = [];
    for (let i in data2[0]) {
      let tempObj = { name: "" };
      tempObj.name = i;
      columnArr2.push(tempObj);
    }
    // 设置表格的头部信息，可以用来设置标题，说明或者注意事项
    sheet2.addTable({
      name: `Header`,
      ref: "A2", // 头部信息从A1单元格开始显示
      headerRow: true,
      totalsRow: false,
      style: {
        theme: "",
        showRowStripes: false,
        showFirstColumn: true,
        width: 200,
      },
      columns: [{ name: "级别" }],
      rows: [[`字数`], [`占比`]],
    });

    // 设置表格的主要数据部分
    sheet2.addTable({
      name: headerName,
      ref: "B2", // 主要数据从A5单元格开始
      headerRow: true,
      totalsRow: false,
      style: {
        theme: "TableStyleMedium2",
        showRowStripes: false,
        width: 200,
      },
      columns: columnArr2 ? columnArr2 : [{ name: "" }],
      rows: data2.map((e) => {
        let arr = [];
        for (let i in e) {
          arr.push(e[i]);
        }
        return arr;
      }),
    });

    sheet2.getCell("A1").font = { size: 20, bold: true }; // 设置单元格的文字样式

    // 设置每一列的宽度
    sheet2.columns = sheet2.columns.map((e) => {
      const expr = e.values[5];
      switch (expr) {
        case "级别":
          return { width: 40 };
        case "Gender":
          return { width: 40 };
        case "Height":
          return { width: 30 };
        default:
          return { width: 20 };
      }
    });

    //sheet3
    // 获取每一列的header
    let columnArr3 = [];
    for (let i in data3[0]) {
      let tempObj = { name: "" };
      tempObj.name = i;
      columnArr3.push(tempObj);
    }

    // 设置表格的头部信息，可以用来设置标题，说明或者注意事项
    sheet3.addTable({
      name: `Header`,
      ref: "A2", // 头部信息从A1单元格开始显示
      headerRow: true,
      totalsRow: false,
      style: {
        theme: "",
        showRowStripes: false,
        showFirstColumn: true,
        width: 200,
      },
      columns: [{ name: "级别" }],
      rows: [[`字数`], [`占比`]],
    });

    // 设置表格的主要数据部分
    sheet3.addTable({
      name: headerName,
      ref: "B2", // 主要数据从A5单元格开始
      headerRow: true,
      totalsRow: false,
      style: {
        theme: "TableStyleMedium2",
        showRowStripes: false,
        width: 200,
      },
      columns: columnArr2 ? columnArr2 : [{ name: "" }],
      rows: data3.map((e) => {
        let arr = [];
        for (let i in e) {
          arr.push(e[i]);
        }
        return arr;
      }),
    });

    sheet3.getCell("A1").font = { size: 20, bold: true }; // 设置单元格的文字样式

    // 设置每一列的宽度
    sheet3.columns = sheet3.columns.map((e) => {
      const expr = e.values[5];
      switch (expr) {
        case "级别":
          return { width: 40 };
        case "Gender":
          return { width: 40 };
        case "Height":
          return { width: 30 };
        default:
          return { width: 20 };
      }
    });

    //sheet4
    // 获取每一列的header
    let columnArr4 = [];
    for (let i in data4[0]) {
      let tempObj = { name: "" };
      tempObj.name = i;
      columnArr4.push(tempObj);
    }
    // 设置表格的头部信息，可以用来设置标题，说明或者注意事项
    sheet4.addTable({
      name: `Header`,
      ref: "A2", // 头部信息从A1单元格开始显示
      headerRow: true,
      totalsRow: false,
      style: {
        theme: "",
        showRowStripes: false,
        showFirstColumn: true,
        width: 200,
      },
      columns: [{ name: "级别" }],
      rows: [[`字数`], [`占比`]],
    });

    // 设置表格的主要数据部分
    sheet4.addTable({
      name: headerName,
      ref: "B2", // 主要数据从A5单元格开始
      headerRow: true,
      totalsRow: false,
      style: {
        theme: "TableStyleMedium2",
        showRowStripes: false,
        width: 200,
      },
      columns: columnArr2 ? columnArr2 : [{ name: "" }],
      rows: data4.map((e) => {
        let arr = [];
        for (let i in e) {
          arr.push(e[i]);
        }
        return arr;
      }),
    });

    sheet4.getCell("A1").font = { size: 20, bold: true }; // 设置单元格的文字样式

    // 设置每一列的宽度
    sheet4.columns = sheet4.columns.map((e) => {
      const expr = e.values[5];
      switch (expr) {
        case "级别":
          return { width: 40 };
        case "Gender":
          return { width: 40 };
        case "Height":
          return { width: 30 };
        default:
          return { width: 20 };
      }
    });

    const writeFile = (fileName, content) => {
      const link = document.createElement("a");
      const blob = new Blob([content], {
        type: "application/vnd.ms-excel;charset=utf-8;",
      });
      link.download = fileName;
      link.href = URL.createObjectURL(blob);
      link.click();
    };

    // 表格的数据绘制完成，定义下载方法，将数据导出到Excel文件
    workbook.xlsx.writeBuffer().then((buffer) => {
      writeFile(sheetName, buffer);
    });
  };

  let pblc = "0";
  const handlePublic = (newValue) => {
    pblc = newValue;
    console.log("111", { pblc });
  };
  const token = useSelector((state) => state.userInfo.token).slice(0, 7);
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

  const myDate = new Date();
  const saveCur = () => {
    console.log("token", token);
    const new_id = nanoid();
    if (editorValue.current.getContent().slice(3, -4) === "") {
      alert("请输入内容");
    } else if (window.confirm("保存后将存入待提交")) {
      client.index("wait_to_submit").addDocuments([
        {
          id: new_id,
          // title: titleInput.value,
          上次修改时间: myDate.toLocaleString(),
          text: editorValue.current.getContent().slice(3, -4), // 将hit.text替换成tiny内新保存的值
          userid: token, //后续根据当前登录用户进行修改
        },
      ]);
    }
  };
  const setAnalyze = (newContent) => {
    // 加入待审核
    console.log("new", newContent);
    if (newContent === "") {
      window.alert("请输入文字后提交");
    } else if (pblc === "0") {
      //选择公开
      if (window.confirm("请注意保存最后的修改！保存后在已提交查看")) {
        // 此处要根据修改后tiny内的值进行修改，例如下面text所述
        const new_id = nanoid();
        client.index("wait_to_check").addDocuments([
          {
            id: new_id,
            // title: titleInput.value,
            提交时间: myDate.toLocaleString(),
            审核状态: "待审核",
            text: newContent, // 将hit.text替换成tiny内新保存的值
            userid: token, //后续根据当前登录用户进行修改
          },
        ]);
        client.index("all_private").addDocuments([
          {
            id: new_id,
            // title: titleInput.value,
            创建时间: myDate.toLocaleString(),
            text: newContent, // 将hit.text替换成tiny内新保存的值
            userid: token, //后续根据当前登录用户进行修改
          },
        ]);
      }
    } else {
      //选择私有
      if (window.confirm("请注意保存！将存入私有文章")) {
        const new_id = nanoid();
        client.index("all_private").addDocuments([
          {
            id: new_id,
            // title: titleInput.value,
            创建时间: myDate.toLocaleString(),
            text: newContent, // 将hit.text替换成tiny内新保存的值
            userid: token, //后续根据当前登录用户进行修改
          },
        ]);
      }
    }
  };
  async function searchForWords(word) {
    const result = await client.index("HSK_utf8_id_space").search(word);
    if (result.hits.length !== 0) {
      return result.hits[0].HSK级别;
    } else {
      return "未录入";
    }
  }
  async function searchForWordsLevel(word) {
    const result = await client.index("words_3d9j_space0").search(word);
    if (result.hits.length !== 0) {
      return result.hits[0].等级;
    } else {
      return "未录入";
    }
  }
  async function getSplitWord(text) {
    const res = await axios.get("http://106.75.250.96:3000/api1/fenci/", {
      params: { fenci_str: text },
    });
    return res.data;
  }
  async function searchForPhrases(phrase) {
    const result = await client.index("HSK_utf8_id_space").search(phrase);
    setEditPhrase(true);
    if (result.hits.length !== 0) {
      return result.hits[0].HSK级别;
    } else {
      return "未录入";
    }
  }
  async function searchForPhrasesLevel(phrase) {
    const result = await client.index("words_3d9j_space0").search(phrase);
    if (result.hits.length !== 0) {
      return result.hits[0].等级;
    } else {
      return "未录入";
    }
  }
  const handleEditorChange = () => {
    if (!value) {
      setOpenAlert(true);
      return;
    }
    if (
      !value
        .replace(/(<([^>]+)>)/gi, "")
        .replace(/&nbsp;/gi, "")
        .match(/[\u4e00-\u9fa5]/g)
    ) {
      setOpenAlert(true);
      return;
    }
    setEditWord(true);
    let numberOfWords =
      editorValue.current.plugins.wordcount.body.getWordCount();
    setTotalWordNumber(numberOfWords);
    // Single word HSK count
    let copiedWordCount = {
      一级: 0,
      二级: 0,
      三级: 0,
      四级: 0,
      五级: 0,
      六级: 0,
      高等: 0,
      未录入: 0,
    };
    let tmpInHSKTableCount = 0;
    Promise.all(
      [
        ...value
          .replace(/(<([^>]+)>)/gi, "")
          .replace(/&nbsp;/gi, "")
          .match(/[\u4e00-\u9fa5]/g)
          .join(""),
      ].map((word) => searchForWords(word))
    ).then((values) => {
      values.forEach((value) => {
        copiedWordCount[value]
          ? copiedWordCount[value]++
          : (copiedWordCount[value] = 1);
      });
      for (let key in copiedWordCount) {
        if (key !== "未录入") {
          tmpInHSKTableCount += copiedWordCount[key];
        }
      }
      setInHSKTableCount(tmpInHSKTableCount);
      setWordCount(copiedWordCount);
    });
    // Single word level count
    let copiedWordLevelCount = {
      一级: 0,
      二级: 0,
      三级: 0,
      四级: 0,
      五级: 0,
      六级: 0,
      高等: 0,
      未录入: 0,
    };
    let tmpInLevelTableCount = 0;
    Promise.all(
      [
        ...value
          .replace(/(<([^>]+)>)/gi, "")
          .replace(/&nbsp;/gi, "")
          .match(/[\u4e00-\u9fa5]/g)
          .join(""),
      ].map((word) => searchForWordsLevel(word))
    ).then((values) => {
      values.forEach((value) => {
        copiedWordLevelCount[value]
          ? copiedWordLevelCount[value]++
          : (copiedWordLevelCount[value] = 1);
      });
      for (let key in copiedWordLevelCount) {
        if (key !== "未录入") {
          tmpInLevelTableCount += copiedWordLevelCount[key];
        }
      }
      setInLevelTableCount(tmpInLevelTableCount);
      setWordLevelCount(copiedWordLevelCount);
    });

    getSplitWord(
      value
        .replace(/(<([^>]+)>)/gi, "")
        .replace(/&nbsp;/gi, "")
        .match(/[\u4e00-\u9fa5]/g)
        .join("")
    ).then((val) => {
      setGroupOfPhrases(Object.values(val));
    });
  };
  const getPhrase = () => {
    setTotalPhraseNumber(groupOfPhrases.length);
    // Phrase count
    let copiedPhraseCount = {
      一级: 0,
      二级: 0,
      三级: 0,
      四级: 0,
      五级: 0,
      六级: 0,
      高等: 0,
      未录入: 0,
    };
    let tmpInHSKTablePhraseCount = 0;
    Promise.all(groupOfPhrases.map((phrase) => searchForPhrases(phrase))).then(
      (values) => {
        values.forEach((value) => {
          copiedPhraseCount[value]
            ? copiedPhraseCount[value]++
            : (copiedPhraseCount[value] = 1);
        });
        for (const key in copiedPhraseCount) {
          if (key !== "未录入") {
            tmpInHSKTablePhraseCount += copiedPhraseCount[key];
          }
        }
        setInHSKTablePhraseCount(tmpInHSKTablePhraseCount);
        setPhraseCount(copiedPhraseCount);
      }
    );
    // Phrase level count
    let copiedPhraseLevelCount = {
      一级: 0,
      二级: 0,
      三级: 0,
      四级: 0,
      五级: 0,
      六级: 0,
      高等: 0,
      未录入: 0,
    };
    let tmpInLevelTablePhraseCount = 0;
    Promise.all(
      groupOfPhrases.map((phrase) => searchForPhrasesLevel(phrase))
    ).then((values) => {
      values.forEach((value) => {
        copiedPhraseLevelCount[value]
          ? copiedPhraseLevelCount[value]++
          : (copiedPhraseLevelCount[value] = 1);
      });
      for (const key in copiedPhraseLevelCount) {
        if (key !== "未录入") {
          tmpInLevelTablePhraseCount += copiedPhraseLevelCount[key];
        }
      }
      setInLevelTablePhraseCount(tmpInLevelTablePhraseCount);
      setPhraseLevelCount(copiedPhraseLevelCount);
    });
  };
  return (
    <>
      <Collapse in={openAlert}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <AlertTitle>错误</AlertTitle>
          请输入中文字符
        </Alert>
      </Collapse>
      <Container sx={{ display: "flex", mt: 3 }}>
        <Container sx={{ alignSelf: "flex-start" }}>
          <div id="doc-app">
            <div className="toolbar"></div>
            <div className="box">
              <div className="tit">
                <input
                  type="text"
                  placeholder="标题"
                  ref={(input) => {
                    titleInput = input;
                  }}
                ></input>
              </div>
              <div className="doc-cnt">
                <Editor
                  tinymceScriptSrc={
                    process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"
                  }
                  onInit={(evt, editor) => (editorValue.current = editor)}
                  initialValue={""}
                  value={value}
                  init={{
                    id: "tiny2",
                    language: "zh-Hans",
                    min_height: 540,
                    width: 590,
                    inline: true,
                    fixed_toolbar_container: "#doc-app .toolbar",
                    custom_ui_selector: "body",
                    toolbar_mode: "wrap",
                    toolbar_sticky: true,
                    menubar: false,
                    icons: "savetext3",
                    plugins:
                      "autosave autoresize save searchreplace autolink fullscreen link charmap pagebreak advlist lists wordcount",
                    toolbar:
                      "link  newdocument save print searchreplace undo redo cut copy paste blockquote removeformat forecolor backcolor bold italic underline strikethrough charmap blocks fontsize alignleft aligncenter alignright alignjustify ouTdent indent pagebreak fullscreen ",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
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
                    save_onsavecallback: function () {
                      saveCur();
                    },
                  }}
                  onEditorChange={(newValue, editor) => setValue(newValue)}
                  onChange={handleEditorChange}
                />
              </div>
            </div>
          </div>

          <Button style={{ backgroundColor: "#F0F2F5" }} onClick={getPhrase}>
            分析文章
          </Button>
          <CheckBox handlePublic={handlePublic} />
          <Button
            style={{ backgroundColor: "#F0F2F5" }}
            onClick={() => {
              setAnalyze(editorValue.current.getContent().slice(3, -4));
            }}
          >
            提交
          </Button>
          <Button onClick={log}>下载当前文本docx</Button>
        </Container>
        <Container>
          <motion.div
            initial={{ opacity: 0.2, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Paper sx={{ height: 860, width: 600 }} elevation={3}>
              <Container sx={{ display: "flex", justifyContent: "center" }}>
                <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={3}
                >
                  <Button onClick={() => setDisplayBasic(true)}>
                    基本信息
                  </Button>
                  <Button onClick={() => setDisplayBasic(false)}>
                    高阶信息
                  </Button>
                </Stack>
              </Container>
              {displayBasic ? (
                <Container>
                  <strong>分析结果： 适合HSK 6级以上的学习者</strong>
                  <p>
                    <strong>HSK字表</strong> 总字数： {totalWordNumber}，{" "}
                    HSK大纲字数： {inHSKTableCount}，{" "}
                    {editWord
                      ? ((100.0 * inHSKTableCount) / totalWordNumber).toFixed(
                          2
                        ) + "%"
                      : "0 %"}
                  </p>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {Object.keys(wordCount).map((j, i) => (
                          <TableCell key={i}>{j}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        {Object.entries(wordCount).map(([key, value]) => {
                          return <TableCell key={key}>{value}</TableCell>;
                        })}
                      </TableRow>
                      <TableRow>
                        {Object.entries(wordCount).map(([key, value]) => {
                          return (
                            <TableCell key={key}>
                              {editWord
                                ? ((100.0 * value) / totalWordNumber).toFixed(
                                    2
                                  ) + "%"
                                : "0 %"}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Divider />
                  <p>
                    <strong>等级大纲字表</strong> 总字数： {totalWordNumber}，{" "}
                    369级大纲字数： {inLevelTableCount}，{" "}
                    {editWord
                      ? ((100.0 * inLevelTableCount) / totalWordNumber).toFixed(
                          2
                        ) + "%"
                      : "0 %"}
                  </p>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {Object.keys(wordLevelCount).map((j, i) => (
                          <TableCell key={i}>{j}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        {Object.entries(wordLevelCount).map(([key, value]) => {
                          return <TableCell key={key}>{value}</TableCell>;
                        })}
                      </TableRow>
                      <TableRow>
                        {Object.entries(wordLevelCount).map(([key, value]) => {
                          return (
                            <TableCell key={key}>
                              {editWord
                                ? ((100.0 * value) / totalWordNumber).toFixed(
                                    2
                                  ) + "%"
                                : "0 %"}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Divider />
                  <p>
                    <strong>HSK词表</strong> 总词数： {totalPhraseNumber}，{" "}
                    HSK大纲词数： {inHSKTablePhraseCount}，{" "}
                    {editPhrase
                      ? (
                          (100.0 * inHSKTablePhraseCount) /
                          totalPhraseNumber
                        ).toFixed(2) + "%"
                      : "0 %"}
                  </p>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {Object.keys(phraseCount).map((j, i) => (
                          <TableCell key={i}>{j}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        {Object.entries(phraseCount).map(([key, value]) => {
                          return <TableCell key={key}>{value}</TableCell>;
                        })}
                      </TableRow>
                      <TableRow>
                        {Object.entries(phraseCount).map(([key, value]) => {
                          return (
                            <TableCell key={key}>
                              {editPhrase
                                ? ((100.0 * value) / totalPhraseNumber).toFixed(
                                    2
                                  ) + "%"
                                : "0 %"}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Divider />
                  <p>
                    <strong>等级大纲词表</strong> 总词数： {totalPhraseNumber}，{" "}
                    369级大纲词数： {inLevelTablePhraseCount}，{" "}
                    {editPhrase
                      ? (
                          (100.0 * inLevelTablePhraseCount) /
                          totalPhraseNumber
                        ).toFixed(2) + "%"
                      : "0 %"}
                  </p>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {Object.keys(phraseLevelCount).map((j, i) => (
                          <TableCell key={i}>{j}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        {Object.entries(phraseLevelCount).map(
                          ([key, value]) => {
                            return <TableCell key={key}>{value}</TableCell>;
                          }
                        )}
                      </TableRow>
                      <TableRow>
                        {Object.entries(phraseLevelCount).map(
                          ([key, value]) => {
                            return (
                              <TableCell key={key}>
                                {editPhrase
                                  ? (
                                      (100.0 * value) /
                                      totalPhraseNumber
                                    ).toFixed(2) + "%"
                                  : "0 %"}
                              </TableCell>
                            );
                          }
                        )}
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Button
                    style={{ backgroundColor: "#F0F2F5" }}
                    onClick={() => {
                      exportToExcel();
                    }}
                  >
                    下载分析结果
                  </Button>
                </Container>
              ) : (
                <Container>{"施工中..."}</Container>
              )}
            </Paper>
          </motion.div>
        </Container>
      </Container>
    </>
  );
}

export default AnalyzePage;
