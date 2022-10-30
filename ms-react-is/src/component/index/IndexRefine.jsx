import React, { Component } from "react";
import { ClearRefinements } from "react-instantsearch-dom";
import IndexRefineItem from "./IndexRefineItem";

export default class IndexRefine extends Component {
  render() {
    const { filterableAttributes } = this.props;
    const filterArray = ["级别", "主题", "子主题", "体裁"];
    return (
      <div>
        <ClearRefinements />
        {filterableAttributes.includes("子主题")
          ? filterArray.map((attribute) => {
              return attribute === "userid" ? (
                <></>
              ) : (
                <IndexRefineItem key={attribute} attribute={attribute} />
              );
            })
          : filterableAttributes.map((attribute) => {
              return attribute === "userid" ? (
                <></>
              ) : (
                <IndexRefineItem key={attribute} attribute={attribute} />
              );
            })}
        {/* {filterableAttributes &&
          filterableAttributes.map((attribute) => {
            return attribute === "userid" ? (
              <></>
            ) : (
              <IndexRefineItem key={attribute} attribute={attribute} />
            );
          })} */}
      </div>
    );
  }
}
