import React, { useRef } from 'react';


import BundledEditor from './BundledEditor';
import './App.css';

function Page1() {
    const editorRef = useRef(null);
    return (
        <>
            
            <BundledEditor
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue='<p>请输入待分析文本.</p>'
                init={{
                    language: 'zh-Hans',
                    height: 500,
                    menubar: false,
                    plugins: [
                        'fullscreen', 'link', 'wordcount'
                    ],
                    toolbar: 'link',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            
            <div style={{ textAlign: 'center' }}>
                <button style={{ backgroundColor: '#F0F2F5' }}

                    onClick={() => { window.location.href = "/Page2" }}

                    className="r-button">
                    分析文本
                </button>
            </div>
            
            
        </>
    );
}

export default Page1;