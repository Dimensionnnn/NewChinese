import "instantsearch.css/themes/algolia-min.css";
import React from "react";
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  ClearRefinements,
  RefinementList,
  // Highlight,
  // Snippet,
  Configure
} from "react-instantsearch-dom";
import "./App.css";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const searchClient = instantMeiliSearch(
  "http://127.0.0.1:7700/",
);

const App = () => (
  <div className="ais-InstantSearch">
    <h1>新中文分级检索系统</h1>
    <h2>
      在语料库中搜索{" "}
      <span role="img" aria-label="emoji">
        🎮
      </span>
    </h2>
    <p>
      华东师范大学国际汉学院
    </p>
    <InstantSearch indexName="HSK_words_all_id" searchClient={searchClient}>
      <div className="left-panel">
        <ClearRefinements />
        {/* <SortBy
          defaultRefinement="title"
          items={[
            { value: "steam-video-games", label: "Relevant" },
            {
              value: "steam-video-games:recommendationCount:desc",
              label: "Most Recommended"
            },
            {
              value: "steam-video-games:recommendationCount:asc",
              label: "Least Recommended"
            }
          ]}
        /> */}
        {/* <h2>Genres</h2>
        <RefinementList attribute="genres" />
        <h2>Players</h2>
        <RefinementList attribute="players" />
        <h2>Platforms</h2>
        <RefinementList attribute="platforms" />
        <h2>Misc</h2>
        <RefinementList attribute="misc" /> 
        */}
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
);

const Hit = ({ hit }) => (
  <div key={hit.id}>
    {/* <div className="hit-name">
      <Highlight attribute="name" hit={hit} />
    </div> */}
    {/* <img src={hit.poster} align="left" alt={hit.name} /> */}
    {/* <div className="hit-description">
      <Snippet attribute="description" hit={hit} />
    </div> */}
    <div className="hit-name">{hit.id}</div>
    <div className="hit-info">生词: {hit.生词}</div>
    <div className="hit-info">HSK级别: {hit.HSK级别}</div>
    <div className="hit-info">词性: {hit.备注}</div>
  </div>
);

export default App;
