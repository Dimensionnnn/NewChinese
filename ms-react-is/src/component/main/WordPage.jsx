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
  Highlight
} from "react-instantsearch-dom";
import "./WordPage.css";
import { motion } from "framer-motion";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const searchClient = instantMeiliSearch(
  "http://127.0.0.1:7700/",
  "1dfeef3fea9ea20cb4f8e6e51f5516884b9abb0704e3fe8ae37c68845a2bba0f"
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
      "1dfeef3fea9ea20cb4f8e6e51f5516884b9abb0704e3fe8ae37c68845a2bba0f"
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
        <div key={hit["id"]}>
          {
            hit["白皮书词语"] === "本结果非词库数据，展示包含的所有等级与词性" || hit["生词"] === "没搜到想搜的？点我试试" ?
              <></> :
              displayedAttributes.map((attribute) => {
                return (
                  <div className="hit-description">
                    {attribute}:
                    {console.log(hit["白皮书词语"])}
                    {
                      selectedIndex === "words_3d9j_space" ?
                        attribute === "白皮书词语" ?
                          <span>{hit["白皮书词语"].split(" ").join('')}</span> :
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
