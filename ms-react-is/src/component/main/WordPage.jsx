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
} from "react-instantsearch-dom";
import "./WordPage.css";
import { motion } from "framer-motion";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const searchClient = instantMeiliSearch(
  "http://106.75.250.96:3000/api2",
  "1854f0d8befc8abed938cc18ecf327582f1b1eb3625fbd0a689e8c9edc0c4c94"
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
          bgcolor: "#C7D8DF",
          borderRadius: 2,
          boxShadow: 2
        }}
        minHeight="10vh"
      >
        <Box sx={{
          bgcolor: "white",
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
var displayedAttributes = []
export default class wordPage extends Component {
  updateWordIndexs = () => {
    this.props.updateIndexs(
      "1854f0d8befc8abed938cc18ecf327582f1b1eb3625fbd0a689e8c9edc0c4c94"
    );
  };
  componentDidMount(){
    this.updateWordIndexs()
  }
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
        <div>
          {
            hit["生词"] === "本结果非词库数据，展示包含的所有等级与词性" || hit["生词"] === "没搜到想搜的？点我试试" ?
              <></> :
              displayedAttributes.map((attribute) => {
                return (
                  <div className="hit-description">
                    {attribute}:
                    {
                      selectedIndex === "words_3d9j_space0" ?
                        attribute === "生词" ?
                          <span>{hit[attribute].split(" ").join('')}</span> :
                          <Snippet attribute={attribute} hit={hit} style="white-space;" /> :
                        selectedIndex === "HSK_utf8_id_space" ?
                          attribute === "生词" ?
                            <span>{hit[attribute].split(" ").join('')}</span> :
                            <Snippet attribute={attribute} hit={hit} style="white-space;" /> :
                          <Snippet attribute={attribute} hit={hit} style="white-space;" />
                    }
                  </div>
                );
              })
          }
        </div>
      );
    };
    return (
      <InstantSearch indexName={selectedIndex} searchClient={searchClient}>
        <div className="ais-InstantSearch">
          <div className="left-panel">
            <IndexList indexs={indexs} setIndex={setIndex} />
            <IndexRefine filterableAttributes={filterableAttributes} />
          </div>
          <div className="right-panel">
            <CurrentRefinements />
            <CustomSearchBox />
            <div className="stats">
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
        </div>
      </InstantSearch>
    );
  }
}
