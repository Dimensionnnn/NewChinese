import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@chakra-ui/react';


const AnalyzePage = (props) => {
    const [text_to_analyze, setText_to_analyze] = useState('');
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/result`;
        navigate(path, {
            state: {
                userid: props.userid,
                text_to_analyze: text_to_analyze,
                value: text_to_analyze,
                hit: { userid: "admin", title: "null", text: text_to_analyze },
                selectedIndex: "doc_wiki_05"
            }
        });
    };

    return (
        <div style={{ textAlign: "center" }}>
            <div className="input-box">
                <label htmlFor="" ></label><input type="text"
                    onChange={(e) => {
                        const val = e.target.value;
                        setText_to_analyze(val);
                    }}
                    placeholder='请输入' value={text_to_analyze} />
            </div>
            <h1>{text_to_analyze}</h1>
            <Button
                style={{ backgroundColor: "#F0F2F5" }}
                onClick={routeChange}
                className="r-button"
            >
                分析文本
            </Button>

        </div>

    );
};

export default AnalyzePage;