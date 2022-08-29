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
                                <span className="m-sys-tab-text">用户管理</span>
                            </li>
                            <li className={"m-sys-tab " + (tabActiveIndex === 1 ? 'active' : '')} onClick={this.handleTabClick.bind(this, 1)}>
                                <span className="m-sys-tab-text">基础配置</span>
                            </li>
                            <li className={"m-sys-tab " + (tabActiveIndex === 2 ? 'active' : '')} onClick={this.handleTabClick.bind(this, 2)}>
                                <span className="m-sys-tab-text">通知配置</span>
                            </li>
                        </ul>
                    </div>
                    <div className="m-sys-content">
                        <div className={"m-sys-view " + (tabActiveIndex === 0 ? 'active' : '')}>
                            0
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