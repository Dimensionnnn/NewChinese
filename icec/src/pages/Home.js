import React from "react";
import ResponsiveAppBar from "../component/navbar/navbar";
import Choose from "../component/home/choose";
import WordSearch from "../component/main/wordSearch";
import ArticleSearch from "../component/main/articleSearch";
import Edit from "../component/main/edit";
import { useSelector } from "react-redux";

const Home = () => {
  const display = useSelector((state) => state.homeSet.value);
  switch (display) {
    case 0:
      return (
        <>
          <ResponsiveAppBar />
          <Choose />
        </>
      );
    case 1:
      return (
        <>
          <ResponsiveAppBar />
          <WordSearch />
        </>
      );
    case 2:
      return (
        <>
          <ResponsiveAppBar />
          <ArticleSearch />
        </>
      );
    case 3:
      return (
        <>
          <ResponsiveAppBar />
          <Edit />
        </>
      );
    default:
      return (
        <>
          <ResponsiveAppBar />
          <Choose />
        </>
      );
  }
};

export default Home;
