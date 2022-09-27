import React, { useRef } from 'react';
import './App.css';
import { Editor } from '@tinymce/tinymce-react';
// import '../public/tinymce/icons/savetext/icons';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'; //导表
import AllPostPage from './AllPostPage';
import DataToTable from './DataToTable'
import FlavorForm from './FlavorForm';
import FileSaver from 'file-saver';
import { exportPDF } from './exportPDF';
import { wordExport } from './jquery.wordexport';
import $ from 'jquery';
import './asset/editableStyle.css'
import { MeiliSearch } from "meilisearch";
import htmlDocx from 'html-docx-js/dist/html-docx';
import { findAllByRole } from '@testing-library/react';
import PtopTypes from "prop-types";
import TabSetup from './TabSetup';

class Page2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array1: [
                ['字数', '10', '20', '30', '40', '50', '60', '70', '80', '90', '6',],
                ['占比', '8%', '8%', '8%', '8%', '8%', '8%', '8%', '8%', '8%', '9%'],
            ],
            array2: [
                ['词数', '11', '22', '33', '44', '55', '65', '75', '85', '9', '23',],
                ['占比', '9%', '9%', '9%', '9%', '9%', '9%', '20%', '23%', '18%', '55%'],

            ]
        }
        this.myRef = React.createRef();
        // const centerStyle = {
        //     textAlign: 'center'
        // }
        this._downloadWord = this._downloadWord.bind(this);
        this.enableEdit = this.enableEdit.bind(this);
        this.editable = false
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
        // this.array1 = [
        //     ['字数', '10', '20', '30', '40', '50', '60', '70', '80', '90', '6',],
        //     ['占比', '8%', '8%', '8%', '8%', '8%', '8%', '8%', '8%', '8%', '9%'],
        // ];
        // this.array2 = [
        //     ['词数', '11', '22', '33', '44', '55', '65', '75', '85', '9', '23',],
        //     ['占比', '9%', '9%', '9%', '9%', '9%', '9%', '20%', '23%', '18%', '55%'],

        // ];
    }
    static proptype = {
        itemClick: PtopTypes.func.isRequired,
    };
    title = ["玄幻", "武侠", "校园"];
    state = {
        currentTitle: "玄幻",
    };

    // 子组件向父组件(app)传递函数
    itemClick = (idx) => {
        // console.log("父组件idx", idx);
        this.setState({
            currentTitle: this.title[idx],
        });
    };

    /**
  * 下载word
  */
    _downloadWord = () => {
        let tinyContent = this.myRef.current.getContent();
        let node = tinyContent;


        let style = ".title-span{ font-size:16px; color:red }";
        let html = this._creatHtmlTree(node, style);
        let blob = new Blob([html], { type: "application/vnd.ms-word;charset=UTF-8" });
        FileSaver.saveAs(blob, "文档名称.docx");
        // var converted = htmlDocx.asBlob(html);

        // FileSaver.saveAs(converted, 'test.docx');
    }
    /**
     * 生成HTML
     * @param {String} htmlTree html
     * @param {String} style 样式
     */
    _creatHtmlTree = (htmlTree, style = '') => {
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
                    </html>`
    }
    //直接调用   _downloadWord方法即可。
    onExportPDF = () => {
        exportPDF('测试导出PDF', this.myRef.current.getContent())
    }
    reAnalyze = () => {
        this.setState({
            array1: [
                ['字数', '9', '5', '77', '54', '8', '73', '33', '22', '75', '3',],
                ['占比', '21%', '4%', '6%', '14%', '9%', '24%', '22%', '6%', '11%', '4%'],
            ],
            array2: [
                ['词数', '9', '5', '77', '54', '8', '73', '33', '22', '75', '3',],
                ['占比', '21%', '4%', '6%', '14%', '9%', '24%', '22%', '6%', '11%', '4%'],
            ]
        })
        console.log(this);
    }
    addAnalyze = (curIndex, hit) => {
        const client = new MeiliSearch({ host: "http://106.75.250.96:3000/api2/", apiKey: "MASTER_KEY" });
        client.index(curIndex).updateDocuments([{
            id: hit.id,
            array1: this.state.array1,
            array2: this.state.array2
        }])
    }
    log = () => {
        alert(this.myRef.current.getContent());
        // this.myRef.current.getContent().wordExport('生成word文档');
    };
    setOne = () => {
        const contentOne = '<div class="comeOn"><p style="color:orange">一级文本,</p> <p style="color:black">二级文本. </p></div>'
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
    onFormSubmit = (evt) => {
        //this.prohibitRefresh();
        evt.preventDefault();
        //console.log(this.array1);
    };
    enableEdit = () => { //使不可编辑变为可编辑
        this.editable = true;
        this.forceUpdate();
    }
    render() {
        const title = this.title;
        const { currentTitle } = this.state;
        return (
            <>
                <div style={this.upStyle} >
                    分析结果： 适合HSK 6级以上的学习者
                </div>
                <div style={this.downStyle}>
                    <div style={{ float: 'left' }}>
                        <form onSubmit={this.onFormSubmit}>
                            <div style={this.editable ? {
                                opacity: 60,
                                position: 'relative',
                                // top: '50px',
                                // left: '50px',
                                width: '100%',
                                height: '100%',
                                // pointerEvents: 'none',
                            } : {
                                opacity: 60,
                                position: 'relative',
                                // top: '50px',
                                // left: '50px',
                                width: '100%',
                                height: '100%',
                                pointerEvents: 'none',
                            }
                            }>
                                <Editor
                                    tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
                                    onInit={(evt, editor) => this.myRef.current = editor}
                                    initialValue='<p>一级文本,</p><p>二级文本.</p>'
                                    init={{
                                        id: 'tiny2',
                                        language: 'zh-Hans',
                                        min_height: 540,
                                        width: 590,
                                        // mode:'readonly',
                                        // readonly: this.readonly,
                                        // readonly: true,
                                        // contenteditable:false,
                                        menubar: false,
                                        // icons_url: '/icons/default/icons.js',
                                        icons: 'savetext3',
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
                            </div>
                            <div style={{ display: 'inline-block' }}>
                                <button style={this.buttonStyle} id="text_download" onClick={this._downloadWord}>下载当前文本</button>
                                <button style={this.buttonStyle} id="text_download_pdf" onClick={this.enableEdit()}>编辑文本</button>
                                <button id='btn_analyze2' style={this.buttonStyle} onClick={this.reAnalyze}>再次分析</button>
                                <button style={this.buttonStyle} onClick={this.log}>获取当前文本</button>
                            </div>


                            <FlavorForm />



                        </form>
                    </div>
                    <div style={this.rightStyle}>
                        <TabSetup />
                        {/* <div>
                            <TabControl key={this.state.array1} title={title} itemClick={(idx) => this.itemClick(idx)} />
                            <h2>{currentTitle} </h2>
                        </div> */}
                        {/* <strong style={this.fontStlye}>统计信息：</strong>
                        <DataToTable key={this.state.array1} tableID="table-to-xls" arr1={this.state.array1} arr2={this.state.array2} setone={this.setOne} settwo={this.setTwo}/> */}

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
                        {/* <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button"
                            table="table-to-xls"
                            filename="tablexls"
                            sheet="tablexls"
                            buttonText="下载分析明细" /> */}

                        {/* <AllPostPage tableData1={dataToDisplay1} csvData1={dataToDownload1}
                    tableData2={dataToDisplay2} csvData2={dataToDownload2}/> */}
                    </div>
                </div>
            </>
        );
    }

}

export default Page2