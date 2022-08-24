import React, { Component } from 'react'
import PubSub from 'pubsub-js'

export default class IndexItem extends Component {

  handleChange = (indexStr) => {
    this.props.setIndex(indexStr)
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
        <li class="btn btn-default" value={{ indexStr }} onClick={() => this.handleChange(indexStr)}>{
          indexStr === "HSK_utf8_id_space"?"HSK词库":
          indexStr === "words_3d9j_space0"?"三等九级词库":
          indexStr === "doc_wiki_05"?"公开文本库":
          indexStr === "all_private"?"私有文本库":
          indexStr === "wait_to_check"?"待审核库":
          indexStr === "wait_to_submit"?"待提交库":
          indexStr
          }</li>
    )
  }
}