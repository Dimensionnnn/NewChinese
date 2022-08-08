import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { MeiliSearch } from "meilisearch";

import Instance from "../meili/instance";

function WordSearch() {
  const theme = useTheme();
  const [indexs, setIndexs] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState("");
  const [filterableAttributes, setFilterableAttributes] = useState([]);
  const [displayedAttributes, setDisplayedAttributes] = useState([]);
  const updateIndexs = (apiKey) => {
    const client = new MeiliSearch({
      host: "http://127.0.0.1:7700/",
      apiKey: apiKey,
    });
    const index = client.getIndexes();
    let newIndex = [];
    index.then((res) => {
      for (let i = 0; i < res.results.length; i++) {
        newIndex.push(res.results[i].uid);
      }
      setIndexs(newIndex);
    });
  };
  const getFilterableAttributes = (selectedIndex) => {
    const client = new MeiliSearch({
      host: "http://127.0.0.1:7700/",
      apiKey: "MASTER_KEY",
    });
    const settings = client.index(selectedIndex).getSettings();
    settings.then((res) => {
      setFilterableAttributes(res.filterableAttributes);
    });
  };
  const getDisplayedAttributes = (selectedIndex) => {
    const client = new MeiliSearch({
      host: "http://127.0.0.1:7700",
      apiKey: "MASTER_KEY",
    });
    const displayedAttributes = client
      .index(selectedIndex)
      .getDisplayedAttributes();
    let newDisplayedAttributes = [];
    displayedAttributes.then((res) => {
      for (let i = 0; i < res.length; i++) {
        newDisplayedAttributes.push(res[i]);
      }
      setDisplayedAttributes(newDisplayedAttributes);
    });
  };
  const setIndex = (indexName) => {
    setSelectedIndex(indexName);
    getFilterableAttributes(indexName);
    getDisplayedAttributes(indexName);
  };
  return (
    <>
      <Container maxWidth="xl" sx={{ m: 2 }}>
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
            minHeight="50vh"
          ></Box>
        </motion.div>
      </Container>
      <Container>
        <Instance
          updateIndexs={updateIndexs}
          indexs={indexs}
          setIndex={setIndex}
          selectedIndex={selectedIndex}
          filterableAttributes={filterableAttributes}
          displayedAttributes={displayedAttributes}
        />
      </Container>
    </>
  );
}

export default WordSearch;
