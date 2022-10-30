import React from "react";
import { MeiliSearch } from "meilisearch";
import Button from "@mui/material/Button";
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      changed: false, //修改保存后改为true
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  setWaitPublicCheck = (hit) => {
    // 公有加入待审核
    const client = new MeiliSearch({
      host: "http://106.75.250.96:3000/api2/",
      apiKey: "MASTER_KEY",
    });
    //加入到待审核index，同时需要携带该用户的userid，以便后续限制此用户只能访问用户id是自己的数据
    // hit数据中加入userid
    if (
      window.confirm(
        "确定公开该条吗？管理员通过后将从私有index删除，可在公有库搜索",
        hit.title,
        "，若存在则为审核通过"
      )
    ) {
      // 此处要根据修改后tiny内的值进行修改，例如下面text所述
      client.index("wait_to_check").addDocuments([
        {
          id: hit.id,
          title: hit.title,
          text: hit.text, // 将hit.text替换成tiny内新保存的值
          主题: hit.主题,
          子主题: hit.子主题,
          级别: hit.级别,
          年份: hit.年份,
          出处: hit.出处,
          作者: hit.作者,
          分级结果: hit.分级结果,
          public: "false",
          userid: this.props.userid, //后续根据当前登录用户进行修改
        },
      ]);
    }
  };

  render() {
    return (
      <div>
        {this.props.selectedIndex === "real_text" ? (
          this.state.changed === true ? (
            <Button
              onClick={() => this.setWaitPublicCheck(this.props.hit)}
              style={{ backgroundColor: "#F0F2F5" }}
            >
              公开此条
            </Button>
          ) : (
            //此事件应在保存后执行
            <></>
          )
        ) : this.props.selectedIndex === "all_private" ? (
          this.props.hit.public === "true" ? (
            this.state.changed === false ? (
              <></>
            ) : (
              <Button
                onClick={() => this.setWaitPublicCheck(this.props.hit)}
                style={{ backgroundColor: "#F0F2F5" }}
              >
                公开此条
              </Button>
            )
          ) : (
            //此事件应在保存后执行
            <Button
              onClick={() => this.setWaitPublicCheck(this.props.hit)}
              style={{ backgroundColor: "#F0F2F5" }}
            >
              公开此条
            </Button>
          )
        ) : (
          // 此按钮用于原本私有的文章，直接设为公有
          <></>
        )}
      </div>
    );
  }
}
export default FlavorForm;
