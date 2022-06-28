import "instantsearch.css/themes/algolia-min.css";
import React, { Component } from 'react'
import { MeiliSearch } from 'meilisearch'
import IndexList from "./component/IndexList";

import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  ClearRefinements,
  RefinementList,
  Highlight,
  Snippet,
  Configure
} from "react-instantsearch-dom";

import "./App.css";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const searchClient = instantMeiliSearch(
  "http://127.0.0.1:7700/"
);

export default class App extends Component {
  state = {
    indexs: [],
    selectedIndex:''
  }
  updateState = () => {
    //获取现在所有的indexs
    const client = new MeiliSearch({ host: 'http://127.0.0.1:7700' })
    const curIndex = client.getIndexes()
    //API取得的数据是Promise {<pending>}类型，使用此then方法获取数据
    var newIndex = []
    curIndex.then(
      // response =>{console.log('resopnse.data',response.data);}
      res => {
      for (var i = 0; i < res.length; i++) {
        newIndex.push(res[i].uid)
      }
      this.setState({ indexs: newIndex })
    }
    )

  }
  setIndex = (indexName) => {
    this.setState({selectedIndex:indexName})
  }
  render() {
    const { indexs,selectedIndex } = this.state
    return (
      <div className="ais-InstantSearch">
        <h1>新中文分级检索系统</h1>
        <h3>
          华东师范大学·国际汉语文化学院
          <span role="img" aria-label="emoji">
            👩‍🏫👨‍🎓
          </span>
        </h3>
        <p>
          在语料库中搜索
        </p>
        <InstantSearch indexName={selectedIndex} searchClient={searchClient}>
          <div className="left-panel">
            <button onClick={this.updateState}>点击更新索引数据</button>
            <IndexList indexs={indexs} setIndex={this.setIndex} updateIndexs={this.updateState} />
            <ClearRefinements />
            <h2>HSK级别</h2>
            <RefinementList attribute="HSK级别" />
            <h2>词性</h2>
            <RefinementList attribute="备注" />
            <Configure
              hitsPerPage={12}
              attributesToSnippet={["description:50"]}
              snippetEllipsisText={"..."}
            />
          </div>
          <div className="right-panel">
            <SearchBox />
            <Hits hitComponent={Hit} />
            <Pagination showLast={true} />
          </div>
        </InstantSearch>
      </div>
    )
  }
}





const Hit = ({ hit }) => (
  <div key={hit.id}>
    <div className="hit-name">
      ID: <Highlight attribute="id" hit={hit} />
    </div>
    <div className="hit-description">
      <Snippet attribute="生词" hit={hit} />
    </div>
    <div className="hit-info">HSK级别: {hit.HSK级别}</div>
    <div className="hit-info">词性: {hit.备注}</div>
  </div>
);




