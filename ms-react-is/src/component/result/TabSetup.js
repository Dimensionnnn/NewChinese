import React from "react";
import "./tabIndex.css";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import DataToTable from "./DataToTable";
import ExportToExcel from "./ExportToExcel";

class TabSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabActiveIndex: 0,
      // zishu_hsk: [
      //     {
      //         "一级": 0,
      //         "二级": 0,
      //         "三级": 0,
      //         "四级": 0,
      //         "五级": 0,
      //         "六级": 0,
      //         "高等": 0,
      //         "未录入": 0
      //     },
      //     {
      //         "一级": 0,
      //         "二级": 0,
      //         "三级": 0,
      //         "四级": 0,
      //         "五级": 0,
      //         "六级": 0,
      //         "高等": 0,
      //         "未录入": 0
      //     }
      // ],
      array2: [
        ["字数", "55", "2", "3", "4", "5", "6", "7", "20"],
        ["占比", "34%", "1%", "1%", "8%", "8%", "18%", "18%", "19%"],
      ],
    };
  }

  render() {
    let tabActiveIndex = this.state.tabActiveIndex;
    return (
      <div className="m-sys-wrap">
        <div className="m-sys-inner">
          <div className="m-sys-header">
            <ul className="m-sys-tab-wrap">
              <li
                className={
                  "m-sys-tab " + (tabActiveIndex === 0 ? "active" : "")
                }
                onClick={this.handleTabClick.bind(this, 0)}
              >
                <span className="m-sys-tab-text">基本信息</span>
              </li>
              <li
                className={
                  "m-sys-tab " + (tabActiveIndex === 1 ? "active" : "")
                }
                onClick={this.handleTabClick.bind(this, 1)}
              >
                <span className="m-sys-tab-text">高阶信息</span>
              </li>
              {/* <li className={"m-sys-tab " + (tabActiveIndex === 2 ? 'active' : '')} onClick={this.handleTabClick.bind(this, 2)}>
                                <span className="m-sys-tab-text">高阶信息2</span>
                            </li> */}
            </ul>
          </div>
          <div className="m-sys-content">
            <div
              className={"m-sys-view " + (tabActiveIndex === 0 ? "active" : "")}
            >
              <div
                style={{
                  width: "85%",
                  // height: '100 %',
                  //border: '2px solid #900',
                  padding: "1px",
                  alignItems: "center",
                  // margin: 'auto'
                }}
              >
                <p style={{ fontSize: "16px" }}>
                  分析结果： 适合HSK 6级以上的学习者
                </p>
              </div>

              <DataToTable
                searchLevel={this.props.searchLevel}
                setOne1={this.props.setOne1}
                zishu_num={this.props.zishu_num}
                zishu_hsk={this.props.zishu_hsk}
                zishu_369={this.props.zishu_369}
                ci_num={this.props.ci_num}
                ci_hsk={this.props.ci_hsk}
                ci_369={this.props.ci_369}
              />
              <ExportToExcel
                zishu_hsk={this.props.zishu_hsk}
                zishu_369={this.props.zishu_369}
                ci_hsk={this.props.ci_hsk}
                ci_369={this.props.ci_369}
              />
            </div>
            <div
              className={"m-sys-view " + (tabActiveIndex === 1 ? "active" : "")}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

Object.assign(TabSetup.prototype, {
  handleTabClick(tabActiveIndex) {
    this.setState({
      tabActiveIndex,
    });
  },
});

export default TabSetup;
