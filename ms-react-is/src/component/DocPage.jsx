import "instantsearch.css/themes/algolia-min.css";
import React, { Component } from "react";
import { MeiliSearch } from "meilisearch";
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

const searchClient = instantMeiliSearch("http://127.0.0.1:7700/", "MASTER_KEY")
const client = new MeiliSearch({ host: "http://127.0.0.1:7700", apiKey: "MASTER_KEY" });
export default class DocPage extends Component {
  state = {
    curIndex: 1
  }
  setWaitPublicCheck = (hit) => {// 私有或公有加入待审核
    //加入到待审核index，同时需要携带该用户的userid，以便后续限制此用户只能访问用户id是自己的数据
    // hit数据中加入userid
    client.index('wait_to_check').addDocuments([{
      id: hit.id,
      url: hit.url,
      title: hit.title,
      text: hit.text,
      public: 'false',
      userid: 'admin' //后续根据当前登录用户进行修改
    }])
    this.setState({ curIndex: this.state.curIndex + 1 })// 防止页面缓存不加载新加入的待审核
    window.location.reload()
  }
  setWaitPrivateCheck = (hit) => {// 私有或公有加入待审核
    //加入到待审核index，同时需要携带该用户的userid，以便后续限制此用户只能访问用户id是自己的数据
    // hit数据中加入userid
    client.index('wait_to_check').addDocuments([{
      id: hit.id,
      url: hit.url,
      title: hit.title,
      text: hit.text,
      public: "true",
      userid: 'admin' //后续根据当前登录用户进行修改
    }])
    this.setState({ curIndex: this.state.curIndex + 1 })// 防止页面缓存不加载新加入的待审核
    window.location.reload()
  }
  setPrivate = (hit) => {// 通过私有化申请
    client.index('all_private').addDocuments([{
      id: hit.id,
      url: hit.url,
      title: hit.title,
      text: hit.text,
      public: "false",
      userid: 'admin' //后续根据当前登录用户进行修改
    }])
    //设为私有从此index删除
    client.index('wait_to_check').deleteDocument(hit.id)
    client.index('doc_wiki_05').deleteDocument(hit.id)
    this.setState({ curIndex: this.state.curIndex + 1 })// 防止页面缓存不加载新加入的待审核
    window.location.reload()
  }
  setPublic = (hit) => {// 通过公有化申请 （未实现公开到哪个index，还需选择）
    client.index('doc_wiki_05').addDocuments([{
      id: hit.id,
      url: hit.url,
      title: hit.title,
      text: hit.text,
      public: "true",
      userid: 'admin' //后续根据当前登录用户进行修改
    }])
    //设为私有从此index删除
    client.index('wait_to_check').deleteDocument(hit.id)
    client.index('all_private').deleteDocument(hit.id)
    this.setState({ curIndex: this.state.curIndex + 1 })// 防止页面缓存不加载新加入的待审核
    window.location.reload()
  }
  updateDocIndexs = () => {
    this.props.updateIndexs('puQ8edwLae5cf8cd8b9c91c1f22ab17756e1f973dd621cd172e939e192a8908f5d99e4d2');
  };
  render() {
    const { filterableAttributes, selectedIndex, indexs, setIndex, displayedAttributes } = this.props;
    const Hit = ({ hit }) => {
      let navigate = useNavigate();
      const routeChange = () => {
        let path = `/analysis`;
        navigate(path, { state: { value: hit.text } });
      };
      return (
        <div key={hit.id}>
          {
            displayedAttributes.map((attribute) => {
              return (
                attribute === "public" ?
                  <div className="hit-description">
                    已公开：
                    {hit.public === 'true' ? '是' : '否'}
                  </div> :
                  <div className="hit-description">
                    {attribute}:
                    <Snippet attribute={attribute} hit={hit} />
                  </div>
              );
            })
          }
          {

            this.props.selectedIndex === 'wait_to_check' ?
              hit.public === 'true' ?
                <button onClick={() => this.setPrivate(hit)} className="btn btn-default">通过私有化申请</button> :
                <button onClick={() => this.setPublic(hit)} className="btn btn-default">通过公有化申请</button> :
              this.props.selectedIndex === 'all_private' ?
                <button onClick={() => this.setWaitPublicCheck(hit)} className="btn btn-default">公开此条</button> :
                <button onClick={() => this.setWaitPrivateCheck(hit)} className="btn btn-default">点击设为私有</button>
          }
          <button onClick={routeChange} className="btn btn-default">分析文本</button>
        </div>
      );
    };
    return (

      <InstantSearch indexName={selectedIndex} searchClient={searchClient}>
        <div className="left-panel">
          <button onClick={this.updateDocIndexs} class="btn btn-default">加载indexs</button>
          <IndexList indexs={indexs} setIndex={setIndex} />
          <IndexRefine filterableAttributes={filterableAttributes} />

          <Configure
            attributesToSnippet={["description:"]}
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

