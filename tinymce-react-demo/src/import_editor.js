import React, { useRef } from 'react';
import './App.css';
import $ from 'jquery';
import './jquery.wordexport.js';
import { Editor } from '@tinymce/tinymce-react'



function Page2() {
    const editorRef = useRef(null);
    // const centerStyle = {
    //     textAlign: 'center'
    // }
    const fontStlye = {
        fontSize: '18px',
        color: 'red'
    }
    const upStyle = {
        height: '100 %',
        width: '1180px',
        border: '2px solid #900',
        padding: '10px',
        margin: 'auto'
    };
    const downStyle = {
        width: '1200px',
        padding: '10px',
        margin: 'auto'
    }
    const rightStyle = {
        float: 'right',
        height: '550px',
        width: '590px',
        textAlign: 'center',
        border: '1px solid #900'
    }
    const blankStyle = {
        width: '570px',
        height: '100px',
        border: '1px',
        margin: '10px'
    }
    const buttonStyle = {
        width: '100px',
        height: '30px',

    }

    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    const setOne = () => {
        const contentOne = '<p style="color:orange">一级文本,</p> <p style="color:black">二级文本. </p>'
        if (editorRef.current) {
            editorRef.current.setContent(contentOne);
        }
    };
    const setTwo = () => {
        const contentTwo = '<p style="color:black;">一级文本, <p style="color:orange">二级文本.</p></p>'
        if (editorRef.current) {
            editorRef.current.setContent(contentTwo);
        }
    };
    const text_download_word = () => {
        // const dom = document.getElementById('text_to_download');
        // var dom = editorRef.current;
        $('.btn_analyze2').wordExport('生成word文档');
    };
    return (
        <>
            <div style={upStyle} >
                分析结果： 适合HSK 6级以上的学习者
            </div>
            <div style={downStyle}>
                <div style={{ float: 'left' }}>
                    <form method="post">
                        <Editor
                            tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue='<p>This is the initial content of the editor.</p>'
                            init={{
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

                            }}
                        />

                        <div style={{ display: 'inline-block' }}>
                            <button style={buttonStyle} id="text_download" onClick={text_download_word}>下载当前文本</button>
                        </div>
                        <div style={{ display: 'inline-block' }}>
                            <button id='btn_analyze2' style={buttonStyle}>再次分析</button>
                        </div>
                        <button name="submitbtn" style={buttonStyle} onClick={log}>获取当前文本</button>

                    </form>
                </div>
                <div style={rightStyle}>
                    <strong style={fontStlye}>统计信息：</strong>
                    <br />
                    <br />
                    总字数：
                    <br />
                    等级大纲字数/%:
                    <table border="1" style={{ margin: '0 auto', width: '500px', height: ' 100px' }}>
                        <tbody>
                            <tr>
                                <th>级别</th>
                                <th onClick={setOne}>1</th>
                                <th onClick={setTwo}>2</th>
                                <th>3</th>
                                <th>4</th>
                                <th>5</th>
                                <th>6</th>
                                <th>7</th>
                                <th>8</th>
                                <th>9</th>
                                <th>未录入</th>
                            </tr>
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

                    </table>
                    <br />
                    总词数：
                    <br />
                    等级大纲词数/%:
                    <table border="1" style={{ margin: '0 auto', width: '500px', height: ' 100px' }}>
                        <tbody>
                            <tr>
                                <th>级别</th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                                <th>4</th>
                                <th>5</th>
                                <th>6</th>
                                <th>7</th>
                                <th>8</th>
                                <th>9</th>
                                <th>未录入</th>
                            </tr>
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

                    </table>
                    <p>等级大纲语法数：</p>
                    <div style={blankStyle}>

                    </div>
                    <div >

                        <input type="button" style={{ height: '30px' }} id="result_download" value="下载统计信息及明细" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page2