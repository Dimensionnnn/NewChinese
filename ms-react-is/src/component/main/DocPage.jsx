import "instantsearch.css/themes/algolia-min.css";
import React, { Component } from "react";
import { MeiliSearch } from "meilisearch";
import IndexList from "../index/IndexList";
import IndexRefine from "../index/IndexRefine";
import { Snippet } from "react-instantsearch-dom";
import PubSub from 'pubsub-js';
import { useNavigate } from "react-router-dom";
import axios from "axios";


import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  HitsPerPage,
  Configure,
  Stats,
  CurrentRefinements
} from "react-instantsearch-dom";

import "../../App.css";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const client = new MeiliSearch({ host: "http://127.0.0.1:7700", apiKey: "MASTER_KEY" });
export default class DocPage extends Component {
  state = {
    apikey: 'b8816e913cdcb1e2bcedcf15f4f9f0d8ef5d64ac92738a4b2d5a83648e3f8397',
    tenant_token: ''
  }

  createToken = () => {  //应在登陆成功后调用，登录后向state传递一个userid，产生其tenant_token
    axios.get("http://localhost:3000/newTenantToken", { params: { 'userid': this.props.userid } }).then(
      response => {
        console.log("成功了", response.data);
        this.setState({ tenant_token: response.data })
      }
    )
  }
  componentDidMount(){
    this.createToken()
  }
  refreshIndex(indexName) {
    PubSub.publish('refreshIndex', indexName)
  }
  updateDocIndexs = () => {
    this.props.updateIndexs(this.state.apikey);
  };
  render() {
    const { selectedIndex, indexs, setIndex, displayedAttributes, filterableAttributes } = this.props;
    const Hit = ({ hit }) => {
      let navigate = useNavigate();
      const routeChange = () => {
        let path = `/result`;
        navigate(path, { state: { value: hit.text, hit: hit, selectedIndex: selectedIndex,userid:this.props.userid } });
      };
      return (
        <div key={hit.id + hit.title} className="hit-description">
          {
            displayedAttributes.map((attribute) => {
              return (
                attribute === "public" ?
                  <div key={hit.id + attribute} >
                    已公开：
                    {hit.public === 'true' ? '是' : '否'}
                  </div> :
                  attribute === "id" ?
                    <></> :
                    attribute === "url" ?
                      <></> :
                      attribute === "text" ?
                        <div className='hit-passage' key={hit.id + attribute}>
                          {"文章"}：
                          <Snippet attribute={attribute} hit={hit} />
                        </div> :
                        <div key={hit.id + attribute}>
                          {attribute === "title" ? "标题" : attribute}：
                          <Snippet attribute={attribute} hit={hit} />
                        </div>
              );
            })
          }
          {/* { //在审核页面显示
          this.props.userid==="admin"?
            this.props.selectedIndex === 'wait_to_check' ?
              hit.public === 'true' ?
                <button onClick={() => this.setPrivate(hit)} className="btn btn-default">通过私有化申请</button> :
                <button onClick={() => this.setPublic(hit)} className="btn btn-default">通过公有化申请</button> :
              <></>:<></>
          } */}
          <button onClick={routeChange} className="btn btn-default">浏览文本</button>
        </div>
      );
    };
    return (
      <InstantSearch indexName={selectedIndex} searchClient={instantMeiliSearch("http://127.0.0.1:7700/", this.state.tenant_token)}>
        <div className="left-panel">
          <button onClick={this.updateDocIndexs} className="btn btn-default">加载文本库</button>
          <IndexList indexs={indexs} setIndex={setIndex} />
          {
            selectedIndex === "doc_wiki_05"?<IndexRefine filterableAttributes={filterableAttributes} />:<></>
          }
          
          <Configure
            attributesToSnippet={["description:"]}
            snippetEllipsisText={"..."}
          />
        </div>
        <div className="right-panel">
          <CurrentRefinements />
          <SearchBox />
          <Stats />
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

