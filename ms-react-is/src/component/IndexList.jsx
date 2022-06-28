import React, { Component } from 'react'
import IndexItem from "./IndexItem"

export default class IndexList extends Component {
    render() {
        const { indexs } = this.props
        console.log(indexs)
        return (
            <ul>
                {
                    indexs.map((indexStr) => {
                        return <IndexItem key={indexStr} indexStr={indexStr} setIndex={this.props.setIndex} />
                    })
                }
            </ul>
        )
    }
}

