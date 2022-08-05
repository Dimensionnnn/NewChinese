import React, { Component, useState  } from 'react';
import { useNavigate } from "react-router-dom";


// class AnalyzePage extends Component {
//     state = {
//         text_to_analyze: ""
//     }
//     handeChange(item, event) {
//         for (let StateItem in this.state) {
//             if (item === StateItem) {
//                 this.state[item] = event.target.value;
//                 this.setState(this.state)
//             }
//         }
//     }
//     routeChange = () => {
//         let navigate = useNavigate();
//         let path = `/result`;
//         navigate(path, {
//             state: {
//                 userid: this.props.userid,
//                 text_to_analyze: this.state.text_to_analyze,
//                 value: this.state.text_to_analyze,
//                 hit: { userid: "admin", title: "null", text: this.state.text_to_analyze },
//                 selectedIndex: "doc_wiki_05"
//             }
//         });
//     };
//     render() {
//         return (
//             <div>
//                 <div className="input-box">
//                     <label htmlFor="" ></label><input type="text" onChange={this.handeChange.bind(this, "text_to_analyze")} placeholder='请输入' value={this.state.text_to_analyze} />
//                 </div>
//                 <button onClick={this.routeChange} className="btn btn-default">分析文本</button>
//             </div>
//         );
//     }
// }

// export default AnalyzePage;

// import React from "react";
import { useLocation } from 'react-router-dom';
import { Button } from '@chakra-ui/react';


const AnalyzePage = (props) => {
    // let text_to_analyze = '';
    const [text_to_analyze, setText_to_analyze] = useState('');
    let navigate = useNavigate();
    const location = useLocation();
    // const handeChange = (event) => {
    //     // for (let StateItem in this.state) {
    //     //     if (item === StateItem) {
    //     //         this.state[item] = event.target.value;
    //     //         this.setState(this.state)
    //     //     }
    //     // }
    //     // console.log(item)
    //     text_to_analyze=event.target.value
    // }
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