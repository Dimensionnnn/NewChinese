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
    connectSearchBox,
    CurrentRefinements,
} from "react-instantsearch-dom";

import "./DocPage.css";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import { useTheme } from "@mui/material/styles";


const client = new MeiliSearch({
    host: "http://127.0.0.1:7700",
    apiKey: "MASTER_KEY",
});

const SearchBox = ({ currentRefinement, refine }) => {
    const theme = useTheme();
    return (
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
                    bgcolor: `${theme.palette.primary.main}`,
                    borderRadius: 2,
                }}
                minHeight="10vh"
            >
                <Box sx={{
                    bgcolor: `${theme.palette.secondary.main}`,
                }}>
                    <Input
                        type="search"
                        playholder="搜索"
                        disableUnderline={true}
                        value={currentRefinement}
                        onChange={(event) => refine(event.currentTarget.value)}
                    />
                </Box>
            </Box>
        </motion.div>
    );
};

const CustomSearchBox = connectSearchBox(SearchBox);

function DocPage(props) {

    const [apikey, setApikey] = useState('b8816e913cdcb1e2bcedcf15f4f9f0d8ef5d64ac92738a4b2d5a83648e3f8397');
    const [tenant_token, setTenant_token] = useState('');
    const token = useSelector(state => state.userInfo.token);
    useEffect(() => {
        if (token === "") {
            console.log(3333)
            // this.token = PubSub.subscribe('sendtoken', (_, usertoken) => {
            // var newusertoken = usertoken
            // const num=useSelector(state=>state.num)
            // console.log("usertoken",newusertoken)
            // this.createToken(newusertoken)
            // })
            console.log("useSelector", token)
            // this.createToken(useSelector(state=>state.userInfo.token)); 
        }
        else {

            // console.log("useSelector",useSelector(state=>state.userInfo.token))
            createToken(token);
            console.log(2222, tenant_token)
        }
        // const newheader = document.querySelectorAll('#header')[0];
        // setTimeout(() => {
        //   newheader.innerHTML = header;
        // }, 3000);
    }, []);

    const createToken = (userid) => {
        console.log("usertoken:", userid.slice(0, 7))
        var usertoken = userid.slice(0, 7)
        // if(usertoken === "MTcwXzI"){
        //   usertoken = "admin"
        // }
        //应在登陆成功后调用，登录后向state传递一个userid，产生其tenant_token
        axios
            .get("http://localhost:3000/api1/newTenantToken", {
                params: { userid: usertoken },
            })
            .then((response) => {
                console.log("成功了", response.data);
                setTenant_token(response.data)
            });
        
    };

    const refreshIndex = (indexName) => {
        PubSub.publish("refreshIndex", indexName);
    }
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
            <div key={hit.id + hit.title} className="hit-description">
                {props.displayedAttributes.map((attribute) => {
                    return attribute === "public" ? (
                        <div key={hit.id + attribute}>
                            已公开：
                            {hit.public === "true" ? "是" : "否"}
                        </div>
                    ) : attribute === "id" ? (
                        <></>
                    ) : attribute === "url" ? (
                        <></>
                    ) : attribute === "text" ? (
                        <div className="hit-passage" key={hit.id + attribute}>
                            {"文章"}：
                            <Snippet attribute={attribute} hit={hit} />
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
            </div>
        );
    };
    return (
        <InstantSearch
            indexName={props.selectedIndex}
            searchClient={instantMeiliSearch(
                "http://127.0.0.1:7700/",
                tenant_token
            )}
        >
            <div className="ais-InstantSearch">
                <div className="left-panel">
                    <button onClick={updateDocIndexs} className="btn btn-default">
                        加载文本库
                    </button>
                    <IndexList indexs={props.indexs} setIndex={props.setIndex} />
                    {
                        props.selectedIndex === "doc_wiki_05" ? <IndexRefine filterableAttributes={props.filterableAttributes} /> : <></>
                    }

                    <Configure
                        attributesToSnippet={["description:"]}
                        snippetEllipsisText={"..."}
                    />
                </div>
                <div className="right-panel">
                    <CurrentRefinements />
                    <CustomSearchBox />
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
        </InstantSearch>
    );
};

export default DocPage;