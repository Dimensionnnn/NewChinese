import React from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {
  InstantSearch,
  Hits,
  ClearRefinements,
  SearchBox,
  Pagination,
  HitsPerPage,
  CurrentRefinements,
  RefinementList,
  Snippet,
  Stats,
} from "react-instantsearch-dom";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const searchClient = instantMeiliSearch(
  "http://127.0.0.1:7700/",
  "0fd3796be6b4d2bf5b5e5c4ae1f42a21fc3b05c8ff324f7c0bbbfb44dd2b69bb"
);

const IndexRefineItem = (props) => {
  return (
    <div>
      <h6>{props.attribute}</h6>
      {/* {console.log(props.attribute)} */}
      {/* {console.log(typeof props.attribute)} */}
      <RefinementList attribute={props.attribute} limit={20} />
    </div>
  );
};

const IndexRefine = (props) => {
  return (
    <>
      <ClearRefinements />
      {/* {console.log(props.filterableAttributes)} */}
      {props.filterableAttributes &&
        props.filterableAttributes.map((attribute) => {
          return <IndexRefineItem key={attribute} attribute={attribute} />;
        })}
    </>
  );
};

const IndexItem = (props) => {
  const handleChange = (event) => { 
    props.setIndex(event.target.innerHTML);
  };
  return (
    <ListItem value={props.indexStr} onClick={handleChange}>
      <ListItemText primary={props.indexStr} />
    </ListItem>
  );
};

const IndexList = (props) => {
  return (
    <List>
      {props.indexs.map((indexStr) => {
        return (
          <IndexItem
            key={indexStr}
            indexStr={indexStr}
            setIndex={props.setIndex}
          />
        );
      })}
    </List>
  );
};

const Instance = (props) => {
  const updateWordIndexs = () => {
    props.updateIndexs(
      "0fd3796be6b4d2bf5b5e5c4ae1f42a21fc3b05c8ff324f7c0bbbfb44dd2b69bb"
    );
  };
  const Hit = ({ hit }) => {
    console.log('fuck');
    return (
      <div key={hit.id}>
        {props.displayedAttributes.map((attribute) => {
          return (
            <div>
              {attribute}:
              <Snippet attribute={attribute} hit={hit} />
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <InstantSearch indexName={props.selectedIndex} searchClient={searchClient}>
      <>
        <Button onClick={updateWordIndexs}>加载单词库</Button>
        <IndexList indexs={props.indexs} setIndex={props.setIndex} />
        <IndexRefine filterableAttributes={props.filterableAttributes} />
      </>
      <>
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
      </>
    </InstantSearch>
  );
};

export default Instance;
