import React, { useRef } from 'react';
import './App.css';
import { Editor } from '@tinymce/tinymce-react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'; //导表
import AllPostPage from './AllPostPage';
import DataToTable from './DataToTable'
import FlavorForm from './FlavorForm';

class Page2 extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        // const centerStyle = {
        //     textAlign: 'center'
        // }
        this.fontStlye = {
            fontSize: '18px',
            color: 'red'
        }
        this.upStyle = {
            height: '100 %',
            width: '1180px',
            border: '2px solid #900',
            padding: '10px',
            margin: 'auto'
        };
        this.downStyle = {
            width: '1200px',
            padding: '10px',
            margin: 'auto'
        }
        this.rightStyle = {
            float: 'right',
            height: '550px',
            width: '590px',
            textAlign: 'center',
            border: '1px solid #900'
        }
        this.blankStyle = {
            width: '570px',
            height: '100px',
            border: '1px',
            margin: '10px'
        }
        this.buttonStyle = {
            width: '100px',
            height: '30px',

        }

        
        
        this.dataToDisplay1 = [{
            rank: '字数',
            rank_1: '55',
            rank_2: '50',
            rank_3: '50',
            rank_4: '50',
            rank_5: '20',
            rank_6: '20',
            rank_7: '40',
            rank_8: '40',
            rank_9: '50',
            no_rank: '40',
        }, {
            rank: '占比',
            rank_1: '55',
            rank_2: '50',
            rank_3: '50',
            rank_4: '50',
            rank_5: '20',
            rank_6: '20',
            rank_7: '40',
            rank_8: '40',
            rank_9: '50',
            no_rank: '40',
        }];

        this.dataToDownload1 = [
            {
                级别: '词数',
                一级: '55',
                二级: '50',
                三级: '50',
                四级: '50',
                五级: '20',
                六级: '20',
                七级: '40',
                八级: '40',
                九级: '50',
                未录入: '40',
            }, {
                级别: '占比',
                一级: '55',
                二级: '50',
                三级: '50',
                四级: '50',
                五级: '20',
                六级: '20',
                七级: '40',
                八级: '40',
                九级: '50',
                未录入: ' 40',
            }
        ]
        this.dataToDisplay2 = [{
            rank: '词数',
            rank_1: '55',
            rank_2: '50',
            rank_3: '50',
            rank_4: '50',
            rank_5: '20',
            rank_6: '20',
            rank_7: '40',
            rank_8: '40',
            rank_9: '50',
            no_rank: '40',
        }, {
            rank: '占比',
            rank_1: '55',
            rank_2: '50',
            rank_3: '50',
            rank_4: '50',
            rank_5: '20',
            rank_6: '20',
            rank_7: '40',
            rank_8: '40',
            rank_9: '50',
            no_rank: '40',
        }];

        this.dataToDownload2 = [
            {
                级别: '词数',
                一级: '55',
                二级: '50',
                三级: '50',
                四级: '50',
                五级: '20',
                六级: '20',
                七级: '40',
                八级: '40',
                九级: '50',
                未录入: '40',
            }, {
                级别: '占比',
                一级: '55',
                二级: '50',
                三级: '50',
                四级: '50',
                五级: '20',
                六级: '20',
                七级: '40',
                八级: '40',
                九级: '50',
                未录入: ' 40',
            }
        ]
    }
    log = () => {

        console.log('hi');

    };
    setOne = () => {
        const contentOne = '<p style="color:orange">一级文本,</p> <p style="color:black">二级文本. </p>'
        if (this.myRef.current) {
            this.myRef.current.setContent(contentOne);
        }
    };
    setTwo = () => {
        const contentTwo = '<p style="color:black;">一级文本, <p style="color:orange">二级文本.</p></p>'
        if (this.myRef.current) {
            this.myRef.current.setContent(contentTwo);
        }
    };
    
    render () {
        return (
            <>
                <div style={this.upStyle} >
                    分析结果： 适合HSK 6级以上的学习者
                </div>
                <div style={this.downStyle}>
                    <div style={{ float: 'left' }}>
                        <form method="post">
                            <Editor
                                tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
                                onInit={(evt, editor) => this.myRef.current = editor}
                                initialValue='<p>一级文本,</p><p>二级文本.</p>'
                                init={{
                                    id: 'tiny2',
                                    language: 'zh-Hans',
                                    min_height: 540,
                                    width: 590,
                                    menubar: false,
                                    icons_url: '/icons/savetext/icons.js',
                                    icons: 'savetext',
                                    plugins: ' autoresize save  searchreplace autolink fullscreen link charmap pagebreak insertdatetime advlist lists wordcount',
                                    toolbar: ' link  newdocument save print searchreplace undo redo cut copy paste blockquote removeformat forecolor backcolor bold italic underline strikethrough charmap blocks fontsize alignleft aligncenter alignright alignjustify outdent indent pagebreak insertdatetime  fullscreen',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
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

                            <div style={{ display: 'inline-block' }}>
                                <button style={this.buttonStyle} id="text_download" >下载当前文本</button>
                            </div>
                            <div style={{ display: 'inline-block' }}>
                                <button id='btn_analyze2' style={this.buttonStyle}>再次分析</button>
                            </div>
                            <button name="submitbtn" style={this.buttonStyle} onClick={this.log}>获取当前文本</button>
                            <FlavorForm/>
                        </form>
                    </div>
                    <div style={this.rightStyle}>
                        <strong style={this.fontStlye}>统计信息：</strong>
                        <DataToTable tableID="table-to-xls" setone={this.setOne} settwo={this.setTwo}/>

                        {/* <table border="1" style={{ margin: '0 auto', width: '500px', height: ' 100px' }}>
                            <thead>
                                <tr>
                                    <th>级别</th>
                                    <th onClick={this.setOne}>1</th>
                                    <th onClick={this.setTwo}>2</th>
                                    <th>3</th>
                                    <th>4</th>
                                    <th>5</th>
                                    <th>6</th>
                                    <th>7</th>
                                    <th>8</th>
                                    <th>9</th>
                                    <th>未录入</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>词数</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>占比</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>

                        </table> */}
                        <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button"
                            table="table-to-xls"
                            filename="tablexls"
                            sheet="tablexls"
                            buttonText="下载分析明细" />

                        {/* <AllPostPage tableData1={dataToDisplay1} csvData1={dataToDownload1}
                    tableData2={dataToDisplay2} csvData2={dataToDownload2}/> */}
                    </div>
                </div>
            </>
        );
    }
    
}

export default Page2