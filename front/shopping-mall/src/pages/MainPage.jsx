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
      console.log(data);
      setListData(data);
    });
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Carousel imgLength={5} />
        <ItemCard
          page={"shopdetail"}
          dtoList={listData.shopMain}
          pageType="shop"
        />
        <ItemCard
          page={"dealdetail"}
          dtoList={listData.dealMain}
          pageType="shop"
        />
      </Container>
      <Footer />
    </>
  );
};

export default MainPage;
