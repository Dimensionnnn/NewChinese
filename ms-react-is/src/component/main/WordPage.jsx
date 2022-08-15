import "instantsearch.css/themes/algolia-min.css";
import React, { Component } from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import { useTheme } from "@mui/material/styles";
import IndexList from "../index/IndexList";
import IndexRefine from "../index/IndexRefine";
import { Snippet, Stats } from "react-instantsearch-dom";
import {
  InstantSearch,
  Hits,
  Pagination,
  HitsPerPage,
  CurrentRefinements,
  connectSearchBox,
  Configure,
} from "react-instantsearch-dom";
import "./WordPage.css";
import { motion } from "framer-motion";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const searchClient = instantMeiliSearch(
  "http://127.0.0.1:7700/",
  "0fd3796be6b4d2bf5b5e5c4ae1f42a21fc3b05c8ff324f7c0bbbfb44dd2b69bb"
);

const SearchBox = ({ currentRefinement, refine }) => {
  const theme = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          bgcolor: `${theme.palette.primary.light}`,
          borderRadius: 2,
        }}
        minHeight="10vh"
      >
        <Box sx={{
          bgcolor: `${theme.palette.secondary.main}`,
        }}>
        <Input
          type="search"
          playholder="搜索"
          disableUnderline={true}
          value={currentRefinement}
          onChange={(event) => refine(event.currentTarget.value)}
        />
        </Box>
      </Box>
    </motion.div>
  );
};

const CustomSearchBox = connectSearchBox(SearchBox);

export default class wordPage extends Component {
  updateWordIndexs = () => {
    this.props.updateIndexs(
      "0fd3796be6b4d2bf5b5e5c4ae1f42a21fc3b05c8ff324f7c0bbbfb44dd2b69bb"
    );
  };

  render() {
    const {
      filterableAttributes,
      selectedIndex,
      indexs,
      setIndex,
      displayedAttributes,
    } = this.props;
    const Hit = ({ hit }) => {
      return (
        <div key={hit.id}>
          {displayedAttributes.map((attribute) => {
            return (
              <div className="hit-description">
                {attribute}:
                <Snippet attribute={attribute} hit={hit} />
              </div>
            );
          })}
        </div>
      );
    };
    return (
      <InstantSearch indexName={selectedIndex} searchClient={searchClient}>
        <div className="ais-InstantSearch">
          <div className="left-panel">
            <button onClick={this.updateWordIndexs} className="btn btn-default">
              加载单词库
            </button>
            <IndexList indexs={indexs} setIndex={setIndex} />
            <IndexRefine filterableAttributes={filterableAttributes} />
          </div>
          <div className="right-panel">
            <CurrentRefinements />
            <CustomSearchBox />
            <Stats />
            <HitsPerPage
              defaultRefinement={40}
              items={[
                { value: 10, label: "显示 10 条每页" },
                { value: 20, label: "显示 20 条每页" },
                { value: 40, label: "显示 40 条每页" },
              ]}
            />
            <Hits hitComponent={Hit} />
            <Pagination showLast={true} />
          </div>
        </div>
      </InstantSearch>
    );
  }
}
