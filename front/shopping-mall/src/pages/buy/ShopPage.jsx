import React, { useEffect, useState } from "react";
import ItemCard from "../../components/ItemCard";
import SortButton from "../../components/SortButton";
import { Container } from "../../components/Container";
import Header from "../../include/Header";
import Footer from "../../include/Footer";
import useCustomMove from "../../hooks/useCustomMove";
import { getShopProductList } from "../../api/productShopApi";
import PageComponent from "../../components/common/PageComponent";

const initData = {
  dtoList: [],
  next: false,
  nextPage: 0,
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  prevPage: 0,
  totalCount: 0,
  current: 0,
};

const ShopPage = () => {
  const { page, size, moveToProductList } = useCustomMove();
  const [listData, setListData] = useState(initData);

  useEffect(() => {
    getShopProductList({ page, size }).then((data) => {
      setListData(data);
    });
  }, [page, size]);

  return (
    <div>
      <Header />
      <Container>
        <SortButton menu={"판매순"} />
        <ItemCard page={"shopdetail"} dtoList={listData.dtoList} />
        <PageComponent
          type={"shop"}
          listData={listData}
          moveToProductList={moveToProductList}
        />
      </Container>
      <Footer />
    </div>
  );
};

export default ShopPage;
