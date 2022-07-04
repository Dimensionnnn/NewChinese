import "instantsearch.css/themes/algolia-min.css";
import React, { Component } from 'react'
import IndexList from "./IndexList";
import IndexRefine from "./IndexRefine";

import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  // ClearRefinements,
  // RefinementList,
  // Highlight,
  // HierarchicalMenu,
  HitsPerPage,
  Snippet,
  CurrentRefinements,
  Configure
} from "react-instantsearch-dom";

import "../App.css";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const searchClient = instantMeiliSearch(
  "http://127.0.0.1:7700/"
);

export default class wordPage extends Component {
  updateAppState = () => {
    this.props.updateIndexs()
  }
  render() {
    const {
      filterableAttributes,
      selectedIndex,
      indexs,
      setIndex
    } = this.props
    return (
      <InstantSearch indexName={selectedIndex} searchClient={searchClient}>
        <div className="left-panel">
          <button type="button" class="btn btn-default" onClick={this.updateAppState}>点击更新索引数据</button>
          <IndexList indexs={indexs} setIndex={setIndex} />
          <IndexRefine filterableAttributes={filterableAttributes} />


          <Configure
            hitsPerPage={12}
            attributesToSnippet={["description:50"]}
            snippetEllipsisText={"..."}
          />
        </div>
        <div className="right-panel">
          <CurrentRefinements />
          <SearchBox />
          <HitsPerPage
            defaultRefinement={20}
            items={[
              { value: 10, label: '显示 10 条每页' },
              { value: 20, label: '显示 20 条每页' },
              { value: 40, label: '显示 40 条每页' },
            ]}
          />
          <Hits
            hitComponent={Hit}
          />
          <Pagination showLast={true} />
        </div>
      </InstantSearch>
    )
  }
}
const Hit = ({ hit }) => (
  
  <div key={hit.id}>
    <div className="hit-description">
      生词：
      <Snippet attribute="生词" hit={hit} />
    </div>
    <div className="hit-info">HSK级别: {hit.HSK级别}</div>
    <div className="hit-info">词性: {hit.备注}</div>
  </div>
)

