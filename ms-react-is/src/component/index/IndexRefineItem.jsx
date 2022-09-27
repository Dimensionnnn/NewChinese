import React, { Component } from 'react'
import {
  RefinementList,
} from "react-instantsearch-dom";

export default class IndexRefineItem extends Component {
  render() {
    const { attribute } = this.props
    return (
      <div>
        <h2>{attribute === "genre" ? "体裁" : attribute}</h2>
        <RefinementList attribute={attribute} limit={20}/>
      </div>
    )
  }
}
