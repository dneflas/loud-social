import React, { useState } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";

const Home = () => {
  const [currentPage, setCurrentPage] = useState("");
  return (
    <>
      <Header setCurrentPage={setCurrentPage}></Header>
      <Menu setCurrentPage={setCurrentPage}></Menu>
    </>
  );
};

export default Home;
