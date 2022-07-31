import "instantsearch.css/themes/algolia-min.css";
import React, { Component } from "react";
import IndexList from "./IndexList";
import IndexRefine from "./IndexRefine";
import { Snippet, Stats } from "react-instantsearch-dom";
import { useNavigate } from "react-router-dom";

import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  HitsPerPage,
  CurrentRefinements,
  Configure,
} from "react-instantsearch-dom";

// import "../App.css";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const searchClient = instantMeiliSearch("http://127.0.0.1:7700/","0fd3796be6b4d2bf5b5e5c4ae1f42a21fc3b05c8ff324f7c0bbbfb44dd2b69bb");

export default class wordPage extends Component {
  updateWordIndexs = () => {
    this.props.updateIndexs("0fd3796be6b4d2bf5b5e5c4ae1f42a21fc3b05c8ff324f7c0bbbfb44dd2b69bb");
  };

  render() {
    const { filterableAttributes, selectedIndex, indexs, setIndex, displayedAttributes } = this.props;
    const Hit = ({ hit }) => {
      return (
        <div key={hit.id}>
          {
            displayedAttributes.map((attribute) => {
              return (
                <div className="hit-description">
                  {attribute}:
                  <Snippet  attribute={attribute} hit={hit} />
                </div>
              );
            })
          }
        </div>
      );
    };
    return (
      <InstantSearch indexName={selectedIndex} searchClient={searchClient}>
        <div className="left-panel">
          <button onClick={this.updateWordIndexs} className="btn btn-default">加载单词库</button>
          <IndexList indexs={indexs} setIndex={setIndex} />
          <IndexRefine filterableAttributes={filterableAttributes} />
        </div>
        <div className="right-panel">
          <CurrentRefinements />
          <SearchBox />
          <Stats />
          <HitsPerPage
            defaultRefinement={20}
            items={[
              { value: 10, label: "显示 10 条每页" },
              { value: 20, label: "显示 20 条每页" },
              { value: 40, label: "显示 40 条每页" },
            ]}
          />
          <Hits hitComponent={Hit} />
          <Pagination showLast={true} />
        </div>
      </InstantSearch>
    );
  }
}

