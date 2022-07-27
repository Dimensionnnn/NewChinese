import "instantsearch.css/themes/algolia-min.css";
import React, { Component } from "react";
import { MeiliSearch } from "meilisearch";
import IndexList from "./IndexList";
import { Snippet } from "react-instantsearch-dom";
import PubSub from 'pubsub-js';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  HitsPerPage,
  Configure,
} from "react-instantsearch-dom";

import "../App.css";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const client = new MeiliSearch({ host: "http://127.0.0.1:7700", apiKey: "MASTER_KEY" });
export default class DocPage extends Component {
  state = {
    token: '47b83daac247b48aa570d8fd01d7b9bac651a8416ef0c8eb6b6a1ba749bba571'
  }

  createToken = () => {
    axios.get("http://localhost:3000/students").then(
      response => {console.log("成功了",response.data);}
    )

    
    // const searchRules = {
    //   all_private: {
    //     filter: 'userid = admin'
    //   }
    // }
    // const apiKey = 'yari9Jc576d08458114246e24760cfb138b8ed470096b56e9fe8414af90e042ac2709fca'
    // const expiresAt = new Date('2025-12-20') // optional

    // const token = client.generateTenantToken(searchRules, {
    //   apiKey: apiKey,
    //   expiresAt: expiresAt,
    // })
    // console.log(token)
    // console.log('window',window)

    // const searchRules = {
    //   all_private: {
    //     filter: 'userid = admin'
    //   }
    // }
    // var token = "";
    // const expiresAt = new Date('2026-12-20') // optional
    // // this.props.selectedIndex === "all_private" ?
    // window.close()

    // token = client.generateTenantToken(searchRules, {
    //   apiKey: this.state.token,
    //   expiresAt: expiresAt
    // });
    // window.open("http://localhost:3000/")
    // console.log("token:", token);
    // const searchRules = {
    //   all_private: {
    //     filter: 'userid = admin'
    //   }
    // }
    // var token = "";
    // const expiresAt = new Date('2026-12-20') // optional
    // // this.props.selectedIndex === "all_private" ?

    // token = Token.generateTenantToken(searchRules, {
    //   apiKey: token,
    //   expiresAt: expiresAt
    // })
    // // :
    // console.log("token:", token);
  }
  refreshIndex(indexName) {
    PubSub.publish('refreshIndex', indexName)
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
        userid: '' //后续根据当前登录用户进行修改
      }])
      //设为私有从此index删除
      client.index('wait_to_check').deleteDocument(hit.id)
      client.index('all_private').deleteDocument(hit.id)
      this.refreshIndex('wait_to_check')
    }
  }
  updateDocIndexs = () => {
    this.props.updateIndexs(this.state.token);
  };
  render() {
    const { selectedIndex, indexs, setIndex, displayedAttributes } = this.props;
    const Hit = ({ hit }) => {
      let navigate = useNavigate();
      const routeChange = () => {
        let path = `/analysis`;
        navigate(path, { state: { value: hit.text, hit: hit } });
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
              <></>
          }
          <button onClick={routeChange} className="btn btn-default">分析文本</button>
        </div>
      );
    };
    return (
      <InstantSearch indexName={selectedIndex} searchClient={instantMeiliSearch("http://127.0.0.1:7700/", "gt5EzAOSKjjX0srJZO3_RZr2YWsz6YVg3Jy3M8jxjw0")}>
        <div className="left-panel">
          <button onClick={this.updateDocIndexs} className="btn btn-default">加载文本库</button>
          <IndexList indexs={indexs} setIndex={setIndex} />
          <button onClick={this.createToken}>点击过滤</button>
          <Configure
            attributesToSnippet={["description:"]}
            snippetEllipsisText={"..."}
          />
        </div>
        <div className="right-panel">
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

