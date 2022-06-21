import React, { useRef } from 'react';
import BundledEditor from './BundledEditor';
import './App.css';

function Page2() {
    const editorRef = useRef(null);
    const centerStyle = {
        textAlign: 'center'
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
        height: '540px',
        width: '590px',
        textAlign: 'center',
        border: '1px solid #900'
    }
    const blankStyle = {
        width: '570px',
        height: '470px',
        border: '1px',
        margin: '10px'
    }
    return (
        <>
            <div style={upStyle}>
                分析结果： 适合HSK 6级以上的学习者
            </div>
            <div style={downStyle }>
                <div style={{float: 'left'}}>
                    <BundledEditor
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue='<p>展示上次输入文本.</p>'
                        init={{
                            language: 'zh-Hans',
                            width: 590,
                            
                            min_height: 540,
                            menubar: false,
                            plugins: 'save print  searchreplace autolink fullscreen link charmap pagebreak insertdatetime advlist lists wordcount paste',
                            toolbar: 'link  newdocument save print searchreplace undo redo cut copy paste blockquote removeformat forecolor backcolor bold italic underline strikethrough charmap\n' +
                                'formatselect fontselect fontsizeselect alignleft aligncenter alignright alignjustify outdent indent pagebreak insertdatetime  fullscreen',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                    <div style={{ display: 'inline-block' }}>
                        <button >下载当前文本</button>
                    </div>
                    <div style={{display: 'inline-block'}}>
                        <button >再次分析</button>
                    </div>
                    
                </div>
                <div style={rightStyle}>
                    <strong>用于展示统计信息及明细</strong>
                    <div style={blankStyle}>
                    </div>
                    <div style={centerStyle}>

                        <input type="button" id="result_download" value="下载统计信息及明细" />
                    </div>
                </div>
                
            </div>
            
        </>
    );
}

export default Page2