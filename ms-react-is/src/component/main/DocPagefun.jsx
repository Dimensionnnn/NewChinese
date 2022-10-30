import "instantsearch.css/themes/algolia-min.css";
import React, { useState, useEffect } from "react";
import { MeiliSearch } from "meilisearch";
import IndexList from "../index/IndexList";
import IndexRefine from "../index/IndexRefine";
import { Snippet, ScrollTo } from "react-instantsearch-dom";
import PubSub from "pubsub-js";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { memorizeSelect } from "../store/setting/docpageSet";

import {
  InstantSearch,
  Hits,
  Pagination,
  HitsPerPage,
  Configure,
  Stats,
  SearchBox,
  CurrentRefinements,
} from "react-instantsearch-dom";

import "./DocPage.css";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { current } from "@reduxjs/toolkit";

const client = new MeiliSearch({
  host: "http://106.75.250.96:3000/api2/",
  apiKey: "MASTER_KEY",
});

function DocPage(props) {
  const [apikey, setApikey] = useState(
    "b8816e913cdcb1e2bcedcf15f4f9f0d8ef5d64ac92738a4b2d5a83648e3f8397"
  );
  const [tenant_token, setTenant_token] = useState("");
  const [keyword, setKeyword] = useState("");
  const location = useLocation();
  const token = useSelector((state) => state.userInfo.token);
  const searchWord = useSelector((state) => state.docpageSet.searchWord);
  const _userid = useSelector((state) => state.userInfo.userid);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token === "") {
      setApikey("");
      props.updateIndexs(
        "23b7efa5284b126c0be49c9870bb286b594afaf09f8a6ed654db5f1e1f43b129"
      );
      createToken(token);
    } else if (_userid === 170) {
      props.updateIndexs(
        "79faa77f5e607344810fe45d433b11bf36fcf70a8184ed45bd51ee61c153b8b0"
      );
      createToken(token);
    } else {
      props.updateIndexs(
        "606be96bcf96949725e0a0d1d2bb666e15b99fba812d3b1cf7d49e8c370476b6"
      );
      createToken(token);
    }
    if (location.state !== null && location.state.toIndex !== null) {
      setTimeout(() => refreshIndex(location.state.toIndex), 500);
    } else {
      setTimeout(() => refreshIndex("real_text"), 500);
    }
    document.getElementsByClassName("ais-SearchBox-input")[0].value =
      searchWord;
  }, []);

  useEffect(() => {
    //滚动到高亮
    setTimeout(() => {
      if (keyword !== "") {
        testScroll();
      }
    }, 500);
  });
  const testScroll = () => {
    let pArray = document.getElementsByClassName("passages");
    let bArray = document.getElementsByClassName("box");
    for (let i = 0; i < pArray.length; i++) {
      let s2 = pArray[i].offsetHeight;
      let s1 = pArray[i].getElementsByClassName("ais-Snippet-nonHighlighted")[0]
        .offsetHeight;
      bArray[i].scrollTop =
        (s1 / (s2 + 0) - 0.06) *
        document.getElementsByClassName("passages")[i].offsetHeight;
    }
  };
  const createToken = (usertoken) => {
    var usertoken = usertoken;
    axios
      .get("http://106.75.250.96:3000/api1/newTenantToken_dev", {
        params: { usertoken: usertoken },
      })
      .then((response) => {
        // console.log("成功了", response.data);
        setTenant_token(response.data);
      });
  };

  const refreshIndex = (indexName) => {
    PubSub.publish("refreshIndex", indexName);
  };
  const deleteItem = (props, hit) => {
    if (window.confirm("确认删除？")) {
      client.index(props.selectedIndex).deleteDocument(hit.id);
      refreshIndex(props.selectedIndex);
    }
  };
  const updateDocIndexs = () => {
    props.updateIndexs(apikey);
  };
  const Hit = ({ hit }) => {
    let navigate = useNavigate();
    const routeChange = () => {
      let name = document.getElementsByClassName("ais-SearchBox-input")[0]
        .value;
      const payload = {
        searchWord: name,
      };
      dispatch(memorizeSelect(payload));
      let path = `/result`;
      navigate(path, {
        state: {
          value: hit.text,
          hit: hit,
          selectedIndex: props.selectedIndex,
          userid: _userid,
          refreshIndex: refreshIndex(),
        },
      });
    };
    return (
      <div key={hit.id} className="hit-description">
        {props.displayedAttributes.map((attribute) => {
          return attribute === "public" ? (
            <div key={hit.id + attribute}>
              已公开：
              {hit.public === "true" ? "是" : "否"}
            </div>
          ) : attribute === "id" ? (
            <></>
          ) : attribute === "genre" ? (
            <div key={hit.id + attribute}>
              {"体裁"}：{hit.genre}
            </div>
          ) : attribute === "url" ? (
            <></>
          ) : attribute === "text" || attribute === "文本内容" ? (
            <div className="hit-passage box" key={hit.id + attribute}>
              {"文章"}：
              <Snippet attribute={attribute} hit={hit} className="passages" />
            </div>
          ) : attribute === "审核状态" ? (
            <div key={hit.id + attribute}>
              审核状态：
              {hit.审核状态}
            </div>
          ) : (
            <div key={hit.id + attribute}>
              {attribute === "title" ? "标题" : attribute}：
              <Snippet attribute={attribute} hit={hit} />
            </div>
          );
        })}
        <button onClick={routeChange} className="btn btn-default">
          浏览文本
        </button>
        {token.slice(0, 7) === "" ? (
          <></>
        ) : token.slice(0, 7) === "MTcwXzI" ? (
          props.selectedIndex === "doc_wiki_05" ||
          props.selectedIndex === "real_text" ? (
            <button
              onClick={() => deleteItem(props, hit)}
              className="btn btn-default"
            >
              删除数据
            </button>
          ) : props.selectedIndex === "wait_to_check" ? (
            <button
              onClick={() => deleteItem(props, hit)}
              className="btn btn-default"
            >
              删除数据
            </button>
          ) : (
            <></>
          )
        ) : props.selectedIndex === "all_private" ? (
          <button
            onClick={() => deleteItem(props, hit)}
            className="btn btn-default"
          >
            删除数据
          </button>
        ) : props.selectedIndex === "wait_to_submit" ? (
          <button
            onClick={() => deleteItem(props, hit)}
            className="btn btn-default"
          >
            删除数据
          </button>
        ) : (
          <></>
        )}
      </div>
    );
  };
  return (
    <InstantSearch
      indexName={props.selectedIndex}
      searchClient={instantMeiliSearch(
        "http://106.75.250.96:3000/api2/",
        tenant_token,
        { keepZeroFacets: true }
      )}
    >
      <div className="ais-InstantSearch">
        <div className="left-panel">
          <IndexList
            indexs={props.indexs}
            setIndex={props.setIndex}
            {...props}
            userid={token.slice(0, 7)}
          />
          {props.selectedIndex === "doc_wiki_05" ? (
            <IndexRefine filterableAttributes={props.filterableAttributes} />
          ) : props.selectedIndex === "wait_to_check" ? (
            <IndexRefine filterableAttributes={props.filterableAttributes} />
          ) : props.selectedIndex === "real_text" ? (
            <IndexRefine filterableAttributes={props.filterableAttributes} />
          ) : props.selectedIndex === "all_private" ? (
            <IndexRefine filterableAttributes={props.filterableAttributes} />
          ) : (
            <></>
          )}

          <Configure
            attributesToSnippet={["description"]}
            snippetEllipsisText={"..."}
          />
        </div>
        <div className="right-panel">
          <CurrentRefinements />
          <SearchBox
            onChange={(event) => setKeyword(event.currentTarget.value)}
            translations={{
              placeholder: "请输入要搜索的文章或关键字，可在左侧进行过滤",
            }}
            defaultRefinement={searchWord}
          />
          <div className="stats">
            <Stats />
            <HitsPerPage
              defaultRefinement={20}
              items={[
                { value: 10, label: "显示 10 条每页" },
                { value: 20, label: "显示 20 条每页" },
                { value: 40, label: "显示 40 条每页" },
              ]}
            />
            <ScrollTo>
              <Hits hitComponent={Hit} />
            </ScrollTo>
            <Pagination showLast={true} />
          </div>
        </div>
      </div>
    </InstantSearch>
  );
}

export default DocPage;
