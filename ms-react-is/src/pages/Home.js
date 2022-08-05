import "instantsearch.css/themes/algolia-min.css";
import React, { Component, useContext } from "react";
import { MeiliSearch } from "meilisearch";

import { Button, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Footer from "../component/footer";
import WordPage from "../component/WordPage";
import DocPage from "../component/DocPage";
import AnalyzePage from "../component/AnalyzePage";
import NavBar from "../component/navbar/NavBar";
import { UserContext } from "../component/utils/userContext";


class Home extends Component {
  state = {
    indexs: [],
    selectedIndex: "",
    filterableAttributes: [],
    displayedAttributes: [],
    tab: "word",
    userid: "admin"
  };
  updateIndexs = (apiKey) => {
    //获取现在所有的indexs
    const client = new MeiliSearch({
      host: "http://127.0.0.1:7700/",
      apiKey: apiKey
    });
    const curIndex = client.getIndexes();
    var newIndex = [];
    curIndex.then((res) => {
      for (var i = 0; i < res.results.length; i++) {
        console.log(res.results)
        newIndex.push(res.results[i].uid);
      }
      this.setState({ indexs: newIndex });
    });
  };
  getFilterableAttributes = (selectedIndex) => {
    const client = new MeiliSearch({
      host: "http://127.0.0.1:7700/",
      apiKey: "MASTER_KEY"
    });
    //获取所有filterableAttributes
    const settings = client.index(selectedIndex).getSettings();
    settings.then((res) => {
      this.setState({ filterableAttributes: res.filterableAttributes });
      // console.log(res.filterableAttributes);
    });
  };
  getDisplayedAttributes = (selectedIndex) => {
    const client = new MeiliSearch({
      host: "http://127.0.0.1:7700",
      apiKey: "MASTER_KEY",
    });
    const displayedAttributes = client
      .index(selectedIndex)
      .getDisplayedAttributes();
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
  getLogin = (value) => {
    this.setState({ login: value });
  };


  render() {
    return (
      <>
        <>
          <NavBar user={this.props.user} />
          <Tabs isFitted variant="enclosed">
            <TabList>
              <Tab
                _selected={{ color: "white", bg: "blue.500" }}
                onClick={
                  this.state.tab === "doc"
                    ? () => this.setState({ tab: "word", indexs: [] })
                    : () => this.setState({ tab: "word" })
                }
              >
                生词检索
              </Tab>
              <Tab
                _selected={{ color: "white", bg: "green.400" }}
                onClick={
                  this.state.tab === "word"
                    ? () => this.setState({ tab: "doc", indexs: [] })
                    : () => this.setState({ tab: "doc" })
                }
              >
                句子检索
              </Tab>
              <Tab
                _selected={{ color: "white", bg: "red.400" }}
                onClick={
                  this.state.tab === "analyze"
                    ? () => this.setState({ tab: "analyze", indexs: [] })
                    : () => this.setState({ tab: "analyze" })
                }
              >
                分析文本
              </Tab>
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
                <DocPage
                  updateIndexs={this.updateIndexs}
                  setIndex={this.setIndex}
                  {...this.state}
                />
              </TabPanel>
              <TabPanel>
                <AnalyzePage
                  updateIndexs={this.updateIndexs}
                  setIndex={this.setIndex}
                  {...this.state}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Footer />
        </>
      </>
    );
  }
}


export default () => {
  const {user, setUser} = useContext(UserContext);
  return (
    <Home user={user} />
  )
}