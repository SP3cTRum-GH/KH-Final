import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import Carousel from "../components/mainpage/Carousel";
import Header from "../include/Header";
import { Container } from "../components/Container";
import Footer from "../include/Footer";
import { getShopProductList } from "../api/productShopApi";
import useCustomMove from "../hooks/useCustomMove";
import { bestItems } from "../api/purchaseApi";

const initData = {};

const MainPage = () => {
  const [listData, setListData] = useState(initData);

  useEffect(() => {
    bestItems().then((data) => {
      setListData(data);
    });
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Carousel imgLength={5} />
        <div style={{ width: "100%" }}>
          <h1 style={{ margin: "1rem 0 1rem 100px" }}>Shop Top5</h1>
          <ItemCard
            page={"shopdetail"}
            dtoList={listData.shopMain}
            pageType="shop"
          />
        </div>
        <div style={{ width: "100%" }}>
          <h1 style={{ margin: "1rem 0 1rem 100px" }}>Deal Top5</h1>
          <ItemCard
            page={"dealdetail"}
            dtoList={listData.dealMain}
            pageType="shop"
          />
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default MainPage;
