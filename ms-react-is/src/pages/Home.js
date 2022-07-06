import "instantsearch.css/themes/algolia-min.css";
import React, { Component } from 'react'
import { MeiliSearch } from 'meilisearch'
// import IndexList from "./component/IndexList";
import WordPage from "../component/WordPage";

import "../App.css";


export default class Home extends Component {
  state = {
    indexs: [],
    selectedIndex: '',
    filterableAttributes: []
  }
  updateIndexs = () => {
    //获取现在所有的indexs
    const client = new MeiliSearch({ host: 'http://127.0.0.1:7700' })
    const curIndex = client.getIndexes()
    //API取得的数据是Promise {<pending>}类型，使用此then方法获取数据
    var newIndex = []
    curIndex.then(
      res => {
        for (var i = 0; i < res.length; i++) {
          newIndex.push(res[i].uid)
        }
        this.setState({ indexs: newIndex })
      }
    )
  }
  getFilterableAttributes = (selectedIndex) => {
    const client = new MeiliSearch({ host: 'http://127.0.0.1:7700' })
    //获取所有filterableAttributes
    const settings = client.index(selectedIndex).getSettings()
    console.log(settings)
    settings.then(
      res => {

        this.setState({ filterableAttributes: res.filterableAttributes })
        console.log(res.filterableAttributes)
      }
    )
  }
  setIndex = (indexName) => {
    this.setState({ selectedIndex: indexName })
    this.getFilterableAttributes(indexName)
  }

  render() {
    const { indexs, selectedIndex,filterableAttributes } = this.state
    return (
      <div className="ais-InstantSearch">
        <h1>新中文分级检索系统</h1>
        <h3>
          华东师范大学·国际汉语文化学院
          <span role="img" aria-label="emoji">
            👩‍🏫
          </span>
        </h3>
        <p>
          在语料库中搜索
        </p>

        <WordPage
          selectedIndex={selectedIndex}
          indexs={indexs}
          updateIndexs={this.updateIndexs}
          setIndex={this.setIndex}
          filterableAttributes={filterableAttributes} />
      </div>
    )
  }
}
