import React, { useRef } from 'react';
import BundledEditor from './BundledEditor'

export default function App() {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    return (
        <>
            <BundledEditor
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue="<p>展示待再次分析文本</p>"
                init={{
                    language: 'zh-Hans',
                    height: 500,
                    menubar: false,
                    noneditable_class: 'mceNonEditable',
                    plugins: 'save print  searchreplace autolink fullscreen link charmap pagebreak insertdatetime advlist lists wordcount paste',
                    toolbar: 'link  newdocument save print searchreplace undo redo cut copy paste blockquote removeformat forecolor backcolor bold italic underline strikethrough charmap\n'+              
                    'formatselect fontselect fontsizeselect alignleft aligncenter alignright alignjustify outdent indent pagebreak insertdatetime  fullscreen',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            <div style={{ textAlign: 'center' }}>
                {/* <link to={{
                    pathname: '/path/newpath',
                    state: {  // 页面跳转要传递的数据，如下
                        data1: {},
                        data2: []
                    },
                }}> */}

                    <button onClick={log}>再次分析</button>
                {/* </link> */}
            </div>
        </>
    );
}