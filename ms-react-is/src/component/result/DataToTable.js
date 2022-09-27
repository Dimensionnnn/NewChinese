import React from "react";
import Button from "@mui/material/Button";

class DataToTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zishu_num: this.props.zishu_num,
      ci_num: this.props.ci_num,
      rate_zi_hsk: 0,
      rate_zi_369: 0,
      rate_ci_hsk: 0,
      rate_ci_369: 0,
      //zishu_hsk: this.props.zishu_hsk,
      str1: "",
      str369: "",
      str_ci: "",
      str369_ci: "",
    };

    this.writeToTable1 = this.writeToTable1.bind(this);
    this.writeToTable = this.writeToTable.bind(this);
    this.writeToTable2 = this.writeToTable2.bind(this);
    this.writeToTable3 = this.writeToTable3.bind(this);
  }

  writeToTable1 = (arr) => {
    let strr = "";
    strr += "<tr><td>字数</td>";
    for (let ele in arr["0"]) {
      strr += `<td>${arr["0"][ele]}</td>`;
      //console.log(ele, arr["0"][ele]);
    }
    strr += "<tr><tr><td>占比</td>";
    for (let ele in arr["1"]) {
      strr += `<td>${arr["1"][ele]}</td>`;
      // console.log(ele, arr["1"][ele]);
    }
    strr += "</tr>";
    this.setState({
      str1: strr,
      zishu_num: this.props.zishu_num,
      rate_zi_hsk: (1 - arr["1"]["未录入"]).toFixed(2),
    });
  };
  writeToTable = (arr) => {
    let strr = "";
    strr += "<tr><td>字数</td>";
    for (let ele in arr["0"]) {
      strr += `<td>${arr["0"][ele]}</td>`;
      //console.log(ele, arr["0"][ele]);
    }
    strr += "<tr><tr><td>占比</td>";
    for (let ele in arr["1"]) {
      strr += `<td>${arr["1"][ele]}</td>`;
      //console.log(ele, arr["1"][ele]);
    }
    strr += "</tr>";

    this.setState({
      str369: strr,
      rate_zi_369: (1 - arr["1"]["未录入"]).toFixed(2),
    });
  };
  writeToTable2 = (arr) => {
    let strr = "";
    strr += "<tr><td>词数</td>";
    for (let ele in arr["0"]) {
      strr += `<td>${arr["0"][ele]}</td>`;
      //console.log(ele, arr["0"][ele]);
    }
    strr += "<tr><tr><td>占比</td>";
    for (let ele in arr["1"]) {
      strr += `<td>${arr["1"][ele]}</td>`;
      //console.log(ele, arr["1"][ele]);
    }
    strr += "</tr>";

    this.setState({
      str_ci: strr,
      ci_num: this.props.ci_num, //重要
      rate_ci_hsk: (1 - arr["1"]["未录入"]).toFixed(2),
    });
  };
  writeToTable3 = (arr) => {
    let strr = "";
    strr += "<tr><td>词数</td>";
    for (let ele in arr["0"]) {
      strr += `<td>${arr["0"][ele]}</td>`;
      //console.log(ele, arr["0"][ele]);
    }
    strr += "<tr><tr><td>占比</td>";
    for (let ele in arr["1"]) {
      strr += `<td>${arr["1"][ele]}</td>`;
      // console.log(ele, arr["1"][ele]);
    }
    strr += "</tr>";

    this.setState({
      str369_ci: strr,
      rate_ci_369: (1 - arr["1"]["未录入"]).toFixed(2),
    });
  };

  render() {
    return (
      <div style={{ fontSize: "16px" }}>
        <p>
          总字数：
          {this.state.zishu_num}; HSK等级大纲字数/%:{this.state.rate_zi_hsk}
        </p>
        <table
          id={this.props.tableID}
          border="1"
          style={{
            margin: "0 auto",
            width: "500px",
            height: " 70px",
            fontSize: "16px",
          }}
        >
          <thead>
            <tr>
              <th>级别</th>
              <th
                onClick={() => {
                  this.props.setOne1();
                }}
              >
                1
              </th>
              <th
                onClick={() => {
                  this.props.setTwo();
                }}
              >
                2
              </th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>高等</th>
              <th>未录入</th>
            </tr>
          </thead>
          <tbody
            dangerouslySetInnerHTML={{
              __html: `<div>${this.state.str1}</div>`,
            }}
          />
        </table>
        <p>
          总字数：
          {this.state.zishu_num}; 369级大纲字数/%:{this.state.rate_zi_369}
        </p>
        <table
          border="1"
          style={{
            margin: "0 auto",
            width: "500px",
            height: " 70px",
            fontSize: "16px",
          }}
        >
          <thead>
            <tr>
              <th>级别</th>
              <th
                onClick={() => {
                  this.props.setOne2();
                }}
              >
                1
              </th>
              <th
                onClick={() => {
                  this.props.setTwo();
                }}
              >
                2
              </th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>高等</th>
              <th>未录入</th>
            </tr>
          </thead>
          <tbody
            dangerouslySetInnerHTML={{
              __html: `<div>${this.state.str369}</div>`,
            }}
          />
        </table>
        <p>
          总词数：
          {this.state.ci_num}; HSK等级大纲词数/%:{this.state.rate_ci_hsk}
        </p>
        <table
          border="1"
          style={{
            margin: "0 auto",
            width: "500px",
            height: " 70px",
            fontSize: "16px",
          }}
        >
          <thead>
            <tr>
              <th>级别</th>
              <th
                onClick={() => {
                  this.props.setOne3();
                }}
              >
                1
              </th>
              <th
                onClick={() => {
                  this.props.setTwo();
                }}
              >
                2
              </th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>高等</th>
              <th>未录入</th>
            </tr>
          </thead>
          <tbody
            dangerouslySetInnerHTML={{
              __html: `<div>${this.state.str_ci}</div>`,
            }}
          />
        </table>
        <p>
          总词数：
          {this.state.ci_num}; 369级大纲词数/%:{this.state.rate_ci_369}
        </p>
        <table
          border="1"
          style={{
            margin: "0 auto",
            width: "500px",
            height: " 70px",
            fontSize: "16px",
          }}
        >
          <thead>
            <tr>
              <th>级别</th>
              <th
                onClick={() => {
                  this.props.setOne4();
                }}
              >
                1
              </th>
              <th
                onClick={() => {
                  this.props.setTwo();
                }}
              >
                2
              </th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>高等</th>
              <th>未录入</th>
            </tr>
          </thead>
          <tbody
            dangerouslySetInnerHTML={{
              __html: `<div>${this.state.str369_ci}</div>`,
            }}
          />
        </table>
        <Button
          style={{ backgroundColor: "#F0F2F5" }}
          onClick={() => {
            this.writeToTable1(this.props.zishu_hsk);
            this.writeToTable(this.props.zishu_369);
            this.writeToTable2(this.props.ci_hsk);
            this.writeToTable3(this.props.ci_369);
            this.props.searchLevel();
          }}
        >
          刷新
        </Button>
      </div>
    );
  }
}
export default DataToTable;
