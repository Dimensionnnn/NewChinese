import React, { Component } from 'react'
import IndexItem from "./IndexItem"

export default class IndexList extends Component {
    render() {
        const { indexs, setIndex } = this.props
        return (
                <ul class="btn-group-vertical">
                    {
                        indexs.map((indexStr) => {
                            return <IndexItem key={indexStr} indexStr={indexStr} setIndex={setIndex} />
                        })
                    }
                </ul>

        )
    }
}

