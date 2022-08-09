import React, { Component } from 'react'
import PubSub from 'pubsub-js'

export default class IndexItem extends Component {

  handleChange = (event) => {
    this.props.setIndex(event.target.innerHTML)
  }
  handleRefresh = (index) => {
    this.props.setIndex(index)
  }
  componentDidMount(){
    this.token = PubSub.subscribe('refreshIndex', (_, indexName) => {
      this.handleRefresh(indexName)
    })
  }
  componentWillUnmount() {
    PubSub.unsubscribe(this.token)
  }
  render() {
    const { indexStr } = this.props
    return (
        <li class="btn btn-default" value={{ indexStr }} onClick={this.handleChange}>{indexStr}</li>
    )
  }
}