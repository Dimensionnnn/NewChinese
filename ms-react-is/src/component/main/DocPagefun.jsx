import "instantsearch.css/themes/algolia-min.css";
import React, { useState, useEffect } from "react";
import { MeiliSearch } from "meilisearch";
import IndexList from "../index/IndexList";
import IndexRefine from "../index/IndexRefine";
import { Snippet } from "react-instantsearch-dom";
import PubSub from "pubsub-js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
  InstantSearch,
  Hits,
  Pagination,
  HitsPerPage,
  Configure,
  Stats,
  // connectSearchBox,
  SearchBox,
  CurrentRefinements,
} from "react-instantsearch-dom";

import "./DocPage.css";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import { useTheme } from "@mui/material/styles";

const client = new MeiliSearch({
  host: "http://106.75.250.96:3000/api2/",
  apiKey: "MASTER_KEY",
});

// const SearchBox = ({ currentRefinement, refine }) => {
//     const theme = useTheme();
//     return (
//         <motion.div
//             initial={{ opacity: 0, scale: 0.5 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5 }}
//         >
//             <Box
//                 display="flex"
//                 alignItems="center"
//                 justifyContent="center"
//                 sx={{
//                     bgcolor: "#C7D8DF",
//                     borderRadius: 2,
//                     boxShadow: 2
//                 }}
//                 minHeight="10vh"
//             >
//                 <Box sx={{
//                     bgcolor: "white",
//                 }}
//                 flex="1"
//                 >
//                     <Input
//                         type="search"
//                         playholder="搜索"
//                         disableUnderline={true}
//                         value={currentRefinement}
//                         onChange={(event) => refine(event.currentTarget.value)}
//                     />
//                 </Box>
//             </Box>
//         </motion.div>
//     );
// };

// const CustomSearchBox = connectSearchBox(SearchBox);

function DocPage(props) {
  const [apikey, setApikey] = useState(
    "b8816e913cdcb1e2bcedcf15f4f9f0d8ef5d64ac92738a4b2d5a83648e3f8397"
  );
  const [tenant_token, setTenant_token] = useState("");
  const token = useSelector((state) => state.userInfo.token);
  // const token = "user1"
  let navigate = useNavigate();
  useEffect(() => {
    if (token === "") {
      setApikey("");
      props.updateIndexs(
        "72c339e2647a578e5a60a77bd99aff53ac7d1a424e9c1b6a1ae71e05cec8209d"
      );
      console.log("useSelector", token);
      createToken(token);
    } else if (token.slice(0, 7) === "MTcwXzI") {
      props.updateIndexs(
        "8608eb83e984fa046ef83824e9418ee670471e2a95203b67c47345924c57aa09"
      );
      // props.updateIndexs("b8816e913cdcb1e2bcedcf15f4f9f0d8ef5d64ac92738a4b2d5a83648e3f8397");
      createToken(token);
      console.log(2222, tenant_token);
    } else {
      props.updateIndexs(
        "b8816e913cdcb1e2bcedcf15f4f9f0d8ef5d64ac92738a4b2d5a83648e3f8397"
      );
      createToken(token);
    }

    refreshIndex("doc_wiki_05");
  }, []);

  const createToken = (userid) => {
    console.log("usertoken:", userid.slice(0, 7));
    var usertoken = userid.slice(0, 7);
    // if(usertoken === "MTcwXzI"){
    //   usertoken = "admin"
    // }
    //应在登陆成功后调用，登录后向state传递一个userid，产生其tenant_token
    axios
      .get("http://106.75.250.96:3000/api1/newTenantToken/", {
        params: { userid: usertoken },
      })
      .then((response) => {
        console.log("成功了", response.data);
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
      let path = `/result`;
      navigate(path, {
        state: {
          value: hit.text,
          hit: hit,
          selectedIndex: props.selectedIndex,
          userid: token.slice(0, 7),
        },
      });
    };
    return (
      <div key={hit["id"]} className="hit-description">
        {props.displayedAttributes.map((attribute) => {
          return attribute === "public" ? (
            <div key={hit.id + attribute}>
              已公开：
              {hit.public === "true" ? "是" : "否"}
            </div>
          ) : attribute === "id" ? (
            <></>
          ) : attribute === "genre" ? (
            <>
              {"体裁"}：{hit.genre}
            </>
          ) : attribute === "url" ? (
            <></>
          ) : attribute === "text" ? (
            <div className="hit-passage" key={hit.id + attribute}>
              {"文章"}：
              <Snippet attribute={attribute} hit={hit} />
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
          props.selectedIndex === "doc_wiki_05" ? (
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
          {props.selectedIndex === "doc_wiki_05"}
          <IndexList
            indexs={props.indexs}
            setIndex={props.setIndex}
            userid={token.slice(0, 7)}
          />
          {props.selectedIndex === "doc_wiki_05" ? (
            <IndexRefine filterableAttributes={props.filterableAttributes} />
          ) : props.selectedIndex === "wait_to_check" ? (
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
            translations={{
              placeholder: "可使用 【文体+关键字】 搜索，如：记叙文 今天",
            }}
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
            <Hits hitComponent={Hit} />
            <Pagination showLast={true} />
          </div>
        </div>
      </div>
    </InstantSearch>
  );
}

export default DocPage;
