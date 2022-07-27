import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { MeiliSearch } from "meilisearch";

const Analysis = () => {
  let navigate = useNavigate();
  const editorRef = useRef(null);
  const location = useLocation();
  const routeChange = () => {
    let path = `/result`;
    navigate(path, { state: { value: location.state.value,hit:location.state.hit } });
  };
  const client = new MeiliSearch({ host: "http://127.0.0.1:7700", apiKey: "MASTER_KEY" });
  const setWaitPrivateCheck = (hit) => {// 私有加入待审核
    //加入到待审核index，同时需要携带该用户的userid，以便后续限制此用户只能访问用户id是自己的数据
    // hit数据中加入userid
    if (window.confirm('确定私有该条吗？管理员通过后将从公有index删除，可在私有库搜索', hit.title, '，若存在则为审核通过')) {
      client.index('wait_to_check').addDocuments([{
        id: hit.id,
        url: hit.url,
        title: hit.title,
        text: hit.text,
        public: "true",
        userid: 'admin' //后续根据当前登录用户进行修改
      }])
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
            location.state.hit.public === 'true' ?
            <Button onClick={() => setWaitPrivateCheck(location.state.hit)} style={{ backgroundColor: "#F0F2F5" }}>点击设为私有</Button>:
            <></>
        }
      </div>
    </>
  );
};

export default Analysis;