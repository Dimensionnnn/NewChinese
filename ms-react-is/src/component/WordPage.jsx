import "instantsearch.css/themes/algolia-min.css";
import React, { Component } from "react";
import IndexList from "./IndexList";
import IndexRefine from "./IndexRefine";
import { Snippet } from "react-instantsearch-dom";
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

import "../App.css";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const searchClient = instantMeiliSearch("http://127.0.0.1:7700/");

export default class wordPage extends Component {
  componentDidMount = () => {
    this.props.updateIndexs();
  };
  render() {
    const { filterableAttributes, selectedIndex, indexs, setIndex, displayedAttributes } = this.props;
    const Hit = ({ hit }) => {
      let navigate = useNavigate();
      const routeChange = () => {
        let path = `/analysis`;
        navigate(path, { state: { value: hit.白皮书词语 } });
      };
      return (
        <div key={hit.id}>
          {
            displayedAttributes.map((attribute) => {
              return (
                <div className="hit-description">
                  {attribute}:
                  <Snippet attribute={attribute} hit={hit} />
                </div>
              );
            })
          }
          <button onClick={routeChange}>分析文本</button>
        </div>
      );
    };
    return (
      <InstantSearch indexName={selectedIndex} searchClient={searchClient}>
        <div className="left-panel">
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

