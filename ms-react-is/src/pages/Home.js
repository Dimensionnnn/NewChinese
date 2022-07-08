import "instantsearch.css/themes/algolia-min.css";
import React, { Component } from "react";
import { MeiliSearch } from "meilisearch";
// import IndexList from "./component/IndexList";
import WordPage from "../component/WordPage";
import {
  Box,
  Container,
  Flex,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import ThemeButton from "../component/themeButton";
import Footer from "../component/footer";

// import "../App.css";

export default class Home extends Component {
  state = {
    indexs: [],
    selectedIndex: "",
    filterableAttributes: [],
    displayedAttributes: [],
  };
  updateIndexs = () => {
    //获取现在所有的indexs
    const client = new MeiliSearch({ host: "http://127.0.0.1:7700" });
    const curIndex = client.getIndexes();
    //API取得的数据是Promise {<pending>}类型，使用此then方法获取数据
    var newIndex = [];
    curIndex.then((res) => {
      for (var i = 0; i < res.length; i++) {
        newIndex.push(res[i].uid);
      }
      this.setState({ indexs: newIndex });
    });
  };
  getFilterableAttributes = (selectedIndex) => {
    const client = new MeiliSearch({ host: "http://127.0.0.1:7700" });
    //获取所有filterableAttributes
    const settings = client.index(selectedIndex).getSettings();
    console.log(settings);
    settings.then((res) => {
      this.setState({ filterableAttributes: res.filterableAttributes });
      console.log(res.filterableAttributes);
    });
  };
  getDisplayedAttributes = (selectedIndex) => {
    const client = new MeiliSearch({ host: "http://127.0.0.1:7700" });
    const displayedAttributes = client
      .index(selectedIndex)
      .getDisplayedAttributes();
    console.log("displayedAttributes", displayedAttributes);
    var newDisplayedAttributes = [];
    displayedAttributes.then((res) => {
      for (var i = 0; i < res.length; i++) {
        newDisplayedAttributes.push(res[i]);
      }
      this.setState({ displayedAttributes: newDisplayedAttributes });
    });
  };
  setIndex = (indexName) => {
    this.setState({ selectedIndex: indexName });
    this.getFilterableAttributes(indexName);
    this.getDisplayedAttributes(indexName);
  };

  render() {
    const { indexs, selectedIndex, filterableAttributes, displayedAttributes } =
      this.state;
    return (
      <>
        <Box mt={6} mb={15}>
          <Container display="flex" p={2} wrap="wrap" justify="space-between">
            <Flex align="left" mr={10}>
              <Heading as="h2">新中文分级检索系统</Heading>
            </Flex>
            <Box flex={1} align="right">
              <ThemeButton />
            </Box>
          </Container>
        </Box>
        <Tabs isFitted variant="enclosed">
          <TabList>
            <Tab _selected={{ color: "white", bg: "blue.500" }}>生词检索</Tab>
            <Tab _selected={{ color: "white", bg: "green.400" }}>句子检索</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <WordPage
                updateIndexs={this.updateIndexs}
                setIndex={this.setIndex}
                {...this.state}
              />
            </TabPanel>
            <TabPanel>
              <Text>句子</Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Footer />
      </>
    );
  }
}
