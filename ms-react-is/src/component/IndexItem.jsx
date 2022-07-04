import React, { Component } from 'react'

export default class IndexItem extends Component {
  handleChange = (event) => {
    this.props.setIndex(event.target.innerHTML)
  }
  render() {
    const { indexStr } = this.props
    return (

        <li class="btn btn-default" value={{ indexStr }} onClick={this.handleChange}>{indexStr}</li>

    )
  }
}