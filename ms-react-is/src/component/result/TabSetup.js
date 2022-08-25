import React from 'react'
import './tabIndex.css'

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
                                width: '100%',
                                // height: '100 %',
                                border: '2px solid #900',
                                padding: '5px',
                                // margin: 'auto'
                            }}>
                                <p style={{fontSize:'14px'}}>分析结果： 适合HSK 6级以上的学习者</p>
                            </div>
                        </div>
                        <div className={"m-sys-view " + (tabActiveIndex === 1 ? 'active' : '')}>
                            1
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