import React, { Component } from 'react';
import { useNavigate } from "react-router-dom";

class AnalyzePage extends Component {
    state = {
        text_to_analyze: ""
    }
    handeChange(item, event) {
        for (let StateItem in this.state) {
            if (item === StateItem) {
                this.state[item] = event.target.value;
                this.setState(this.state)
            }
        }
    }
    routeChange = () => {
        let navigate = useNavigate();
        let path = `/result`;
        navigate(path, {
            state: {
                userid: this.props.userid,
                text_to_analyze: this.state.text_to_analyze,
                value: this.state.text_to_analyze,
                hit: {userid:"admin",title: "null",text:this.state.text_to_analyze},
                selectedIndex: "doc_wiki_05"
            }
        });
    };
    render() {
        return (
            <div>
                <div className="input-box">
                    <label htmlFor="" ></label><input type="text" onChange={this.handeChange.bind(this, "text_to_analyze")} placeholder='请输入' value={this.state.text_to_analyze} />
                </div>
                <button onClick={this.routeChange} className="btn btn-default">分析文本</button>
            </div>
        );
    }
}

export default AnalyzePage;