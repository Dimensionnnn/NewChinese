import React from 'react';
import { MeiliSearch } from "meilisearch";
class FlavorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    setWaitPublicCheck = (hit) => {// 公有加入待审核
        const client = new MeiliSearch({ host: "http://127.0.0.1:7700", apiKey: "MASTER_KEY" });
        //加入到待审核index，同时需要携带该用户的userid，以便后续限制此用户只能访问用户id是自己的数据
        // hit数据中加入userid
        if (window.confirm('确定公开该条吗？管理员通过后将从私有index删除，可在公有库搜索', hit.title, '，若存在则为审核通过')) {
          client.index('wait_to_check').addDocuments([{
            id: hit.id,
            url: hit.url,
            title: hit.title,
            text: hit.text,
            public: 'false',
            userid: '' //后续根据当前登录用户进行修改
          }])
        }
      }

    render() {
        return (
            <div>
                {this.props.hit.public === 'true' ?
                    <></> :
                    <button onClick={() => this.setWaitPublicCheck(this.props.hit)} className="btn btn-default">公开此条</button>}
                {/* <label > <input type="radio" name='gender' value="公有"
                    onChange={this.handleChange} />公有</label><br />
                <label > <input type="radio" name='gender' value="私有"
                    onChange={this.handleChange} />私有</label>
                <div>权限设置为: {this.state.value}</div> */}
            </div>
        )
    }
}
export default FlavorForm;
