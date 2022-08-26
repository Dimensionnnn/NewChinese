import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { MeiliSearch } from "meilisearch";

const Analysis = () => {
  let navigate = useNavigate();
  const editorRef = useRef(null);
  const location = useLocation();
  const routeChange = () => {
    let path = `/result`;
    navigate(path, {
      state: {
        value: location.state.value,
        hit: location.state.hit,
        selectedIndex: location.state.selectedIndex,
        userid: location.state.userid
      }
    });
  };
  const client = new MeiliSearch({ host: "http://0.0.0.0:3001/api2", apiKey: "MASTER_KEY" });

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
      }
    }
  }
  return (
    <>
      <Editor
        tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={location.state.value}
        init={{
          id: "tiny1",
          language: "zh-Hans",
          height: 500,
          menubar: false,
          plugins: ["fullscreen", "link", "wordcount"],
          toolbar: "link",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          placeholder: "请输入待分析文本",
          save_onsavecallback: function () {
            console.log("Saved");
          },
          // file_picker_callback: function (callback, value, meta) {
          //   //文件分类
          //   var filetype =
          //     ".pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4";
          //   var upurl = "/api/controller/";
          //   //为不同插件指定文件类型及后端地址
          //   switch (meta.filetype) {
          //     case "image":
          //       filetype = ".jpg, .jpeg, .png, .gif";
          //       upurl += "action1";
          //       break;
          //     case "media":
          //       filetype = ".mp3, .mp4";
          //       upurl += "action2";
          //       break;
          //     case "file":
          //       break;
          //   }
          // //模拟出一个input用于添加本地文件
          // var input = document.createElement("input");
          // input.setAttribute("type", "file");
          // input.setAttribute("accept", filetype);
          // input.click();
          // input.onchange = function () {
          //   var file = this.files[0];
          //   var xhr, formData;
          //   console.log(file.name);
          //   //TODO:这里写请求
          // };
          // },
        }}
      />

      <div style={{ textAlign: "center" }}>
        <Button
          style={{ backgroundColor: "#F0F2F5" }}
          onClick={routeChange}
          className="r-button"
        >
          分析文本
        </Button>
        {
          location.state.selectedIndex !== "all_private" && location.state.selectedIndex !== "wait_to_check" ?
            location.state.hit.public === 'true' ?
              <Button onClick={() => setPrivate(location.state.hit)} style={{ backgroundColor: "#F0F2F5" }}>点击收藏</Button> :
              <></> : <></>
        }
      </div>
    </>
  );
};

export default Analysis;