import React from 'react'
import './tabIndex.css'
import ReactHTMLTableToExcel from "react-html-table-to-excel";

class TabSetup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tabActiveIndex: 0
        }
    }

    render() {
        let tabActiveIndex = this.state.tabActiveIndex;
        return (
            <div className="m-sys-wrap">
                <div className="m-sys-inner">
                    <div className="m-sys-header">
                        <ul className="m-sys-tab-wrap">
                            <li className={"m-sys-tab " + (tabActiveIndex === 0 ? 'active' : '')} onClick={this.handleTabClick.bind(this, 0)}>
                                <span className="m-sys-tab-text">基本信息</span>
                            </li>
                            <li className={"m-sys-tab " + (tabActiveIndex === 1 ? 'active' : '')} onClick={this.handleTabClick.bind(this, 1)}>
                                <span className="m-sys-tab-text">高阶信息1</span>
                            </li>
                            <li className={"m-sys-tab " + (tabActiveIndex === 2 ? 'active' : '')} onClick={this.handleTabClick.bind(this, 2)}>
                                <span className="m-sys-tab-text">高阶信息2</span>
                            </li>
                        </ul>
                    </div>
                    <div className="m-sys-content">
                        <div className={"m-sys-view " + (tabActiveIndex === 0 ? 'active' : '')}>
                            <div style={{
                                width: '85%',
                                // height: '100 %',
                                border: '2px solid #900',
                                padding: '3px',
                                alignItems: 'center'
                                // margin: 'auto'
                            }}>
                                <p style={{fontSize:'16px'}}>分析结果： 适合HSK 6级以上的学习者</p>
                            </div>
                        </div>
                        <div className={"m-sys-view " + (tabActiveIndex === 1 ? 'active' : '')}>
                            <table id="table-to-xls" border="1" style={{ margin: '0 auto', width: '500px', height: ' 70px',fontSize:'16px' }}>
                                <thead>
                                    <tr>
                                        <th>级别</th>
                                        <th >1</th>
                                        <th>2</th>
                                        <th>3</th>
                                        <th>4</th>
                                        <th>5</th>
                                        <th>6</th>
                                        <th>7</th>
                                        <th>8</th>
                                        <th>9</th>
                                        <th>未录入</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>词数</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>占比</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                            <button style={{fontSize: '16px',padding:0}}>
                                <ReactHTMLTableToExcel
                                    id="test-table-xls-button"
                                    className="download-table-xls-button"
                                    table="table-to-xls"
                                    filename="tablexls"
                                    sheet="tablexls"
                                    buttonText="下载分析明细" />
                            </button>
                            
                            
                        </div>
                        <div className={"m-sys-view " + (tabActiveIndex === 2 ? 'active' : '')}>
                            2
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Object.assign(TabSetup.prototype, {
    handleTabClick(tabActiveIndex) {
        this.setState({
            tabActiveIndex
        })
    }
})

export default TabSetup