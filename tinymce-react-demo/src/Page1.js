import React, { useRef } from 'react';
import { Navigate } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';
import './App.css';

class Page1 extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.tinyValue ='<p>一级文本,</p><p>二级文本.</p>';
    }
    render() {
        return (

            <>
                <Editor
                    tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
                    onInit={(evt, editor) => this.myRef.current = editor}
                    initialValue={this.tinyValue}
                    init={{
                        id: 'tiny1',
                        language: 'zh-Hans',
                        height: 500,
                        menubar: false,
                        plugins: [
                            'fullscreen', 'link', 'wordcount'
                        ],
                        toolbar: 'link',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        placeholder: '请输入待分析文本',
                        save_onsavecallback: function () { console.log('Saved'); },
                        file_picker_callback: function (callback, value, meta) {
                            //文件分类
                            var filetype = '.pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4';
                            var upurl = '/api/controller/';
                            //为不同插件指定文件类型及后端地址
                            switch (meta.filetype) {
                                case 'image':
                                    filetype = '.jpg, .jpeg, .png, .gif';
                                    upurl += 'action1';
                                    break;
                                case 'media':
                                    filetype = '.mp3, .mp4';
                                    upurl += 'action2';
                                    break;
                                case 'file':
                                    break;
                            };
                            //模拟出一个input用于添加本地文件
                            var input = document.createElement('input');
                            input.setAttribute('type', 'file');
                            input.setAttribute('accept', filetype);
                            input.click();
                            input.onchange = function () {
                                var file = this.files[0];
                                var xhr, formData;
                                console.log(file.name);
                                //TODO:这里写请求
                            };
                        },

                    }}
                />

                <div style={{ textAlign: 'center' }}>
                    <button style={{ backgroundColor: '#F0F2F5' }}

                        onClick={() => {
                            
                            window.location.href = "/Page2" }}

                        className="r-button">
                        分析文本
                    </button>
                </div>

            </>

        );
    }
            
}

export default Page1;