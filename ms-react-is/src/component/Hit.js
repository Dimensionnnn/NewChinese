import React from "react";
import { Snippet } from "react-instantsearch-dom";
import { useNavigate } from "react-router-dom";

const Hit = ({ hit }) => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/analysis`;
    navigate(path, {state: {value: hit.生词}});
  };
  return (
    <div key={hit.id}>
      <div className="hit-description">
        生词：
        <Snippet attribute="生词" hit={hit} />
      </div>
      <div className="hit-info">HSK级别: {hit.HSK级别}</div>
      <div className="hit-info">词性: {hit.备注}</div>
      <button onClick={routeChange}>分析文本</button>
    </div>
  );
};

export default Hit;
