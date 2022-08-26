import "instantsearch.css/themes/algolia-min.css";
import React, { Component } from "react";
import { MeiliSearch } from "meilisearch";

import Footer from "../component/main/footer";
import WordPage from "../component/main/WordPage";
import DocPage from "../component/main/DocPagefun";
import AnalyzePage from "../component/main/AnalyzePage";
import ResponsiveAppBar from "../component/navbar/NavBar";
import Login from "../component/login/Login";
import PubSub from "pubsub-js";

import Choose from "../component/home/choose";
import { useSelector } from "react-redux";

class Home extends Component {
  state = {
    indexs: [],
    selectedIndex: "",
    filterableAttributes: [],
    displayedAttributes: [],
    tab: "doc",
    userid: "",
  };
  // componentDidMount(){
  //   this.token = PubSub.subscribe('sendtoken', (_, usertoken) => {
  //     this.setState({userid:usertoken})
  //   })
  // }
  componentWillUnmount() {
    PubSub.unsubscribe(this.token)
  }
  updateIndexs = (apiKey) => {
    //获取现在所有的indexs
    const client = new MeiliSearch({
      host: "http://localhost:7700/",
      apiKey: apiKey,
    });
    const curIndex = client.getIndexes();
    var newIndex = [];
    curIndex.then((res) => {
      for (var i = 0; i < res.results.length; i++) {
        console.log(res.results);
        newIndex.push(res.results[i].uid);
      }
      this.setState({ indexs: newIndex });
    });
  };
  getFilterableAttributes = (selectedIndex) => {
    const client = new MeiliSearch({
      host: "http://localhost:7700/",
      apiKey: "MASTER_KEY",
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
      host: "http://localhost:7700/",
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
    switch (this.props.display) {
      case 0:
        return (
          <>
            <ResponsiveAppBar />
            <Choose />
            <Footer />
          </>
        );
      case 1:
        return (
          <>
            <ResponsiveAppBar />
            <WordPage
              updateIndexs={this.updateIndexs}
              setIndex={this.setIndex}
              {...this.state}
            />
            <Footer />
          </>
        );
      case 2:
        return (
          <>
            <ResponsiveAppBar />
            <DocPage
              updateIndexs={this.updateIndexs}
              setIndex={this.setIndex}
              {...this.state}
            />
            <Footer />
          </>
        );
      case 3:
        return (
          <>
            <ResponsiveAppBar />
            <AnalyzePage
              updateIndexs={this.updateIndexs}
              setIndex={this.setIndex}
              {...this.state}
            />
            <Footer />
          </>
        );
      case 4:
        return (
          <>
            <ResponsiveAppBar />
            <Login />
            <Footer />
          </>
        );
      default:
        return (
          <>
            <ResponsiveAppBar />
            <Choose />
            <Footer />
          </>
        );
    }
  }
}

export default () => {
  const display = useSelector((state) => state.homeSet.value);
  return <Home display={display} />;
};
