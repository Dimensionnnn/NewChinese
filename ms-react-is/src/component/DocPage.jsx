import "instantsearch.css/themes/algolia-min.css";
import React, { Component } from "react";
import { MeiliSearch } from "meilisearch";
import IndexList from "./IndexList";
import IndexRefine from "./IndexRefine";
import { Snippet } from "react-instantsearch-dom";
import PubSub from 'pubsub-js'
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

const client = new MeiliSearch({ host: "http://127.0.0.1:7700", apiKey: "MASTER_KEY" });
export default class DocPage extends Component {

  refreshIndex(indexName) {
    PubSub.publish('refreshIndex', indexName)
  }
  setWaitPublicCheck = (hit) => {// 公有加入待审核
    //加入到待审核index，同时需要携带该用户的userid，以便后续限制此用户只能访问用户id是自己的数据
    // hit数据中加入userid
    if (window.confirm('确定公开该条吗？管理员通过后将从私有index删除，可在公有库搜索', hit.title, '，若存在则为审核通过')) {
      client.index('wait_to_check').addDocuments([{
        id: hit.id,
        url: hit.url,
        title: hit.title,
        text: hit.text,
        public: 'false',
        userid: 'admin' //后续根据当前登录用户进行修改
      }])
    }
  }
  setWaitPrivateCheck = (hit) => {// 私有加入待审核
    //加入到待审核index，同时需要携带该用户的userid，以便后续限制此用户只能访问用户id是自己的数据
    // hit数据中加入userid
    if (window.confirm('确定私有该条吗？管理员通过后将从公有index删除，可在私有库搜索', hit.title, '，若存在则为审核通过')) {
      client.index('wait_to_check').addDocuments([{
        id: hit.id,
        url: hit.url,
        title: hit.title,
        text: hit.text,
        public: "true",
        userid: 'admin' //后续根据当前登录用户进行修改
      }])
    }
  }
  setPrivate = (hit) => {// 通过私有化申请
    if (window.confirm('确定通过私有申请吗？通过后将从公有index删除，可在私有index搜索', hit.title, '查找私有后的信息')) {
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
      this.refreshIndex('wait_to_check')

    }
  }
  setPublic = (hit) => {// 通过公有化申请 （未实现公开到哪个index，还需选择）
    if (window.confirm('确定公开吗？公开后将从私有index与待审核index删除，可在公开库搜索', hit.title, '查找公开后的数据')) {
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
      this.refreshIndex('wait_to_check')
    }
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
        <div key={hit.id + hit.title}>
          {
            displayedAttributes.map((attribute) => {
              return (
                attribute === "public" ?
                  <div key={hit.id + attribute} className="hit-description">
                    已公开：
                    {hit.public === 'true' ? '是' : '否'}
                  </div> :
                  <div className="hit-description" key={hit.id + attribute}>
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
      <InstantSearch indexName={selectedIndex} searchClient={instantMeiliSearch("http://127.0.0.1:7700/", "MASTER_KEY")}>
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

