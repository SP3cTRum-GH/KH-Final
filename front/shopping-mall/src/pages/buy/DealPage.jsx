import React, { useEffect, useState } from "react";
import ItemCard from "../../components/ItemCard";
import SortButton from "../../components/SortButton";
import { Container } from "../../components/Container";
import Header from "../../include/Header";
import Footer from "../../include/Footer";
import PageComponent from "../../components/common/PageComponent";
import useCustomMove from "../../hooks/useCustomMove";
import { getDealProductList } from "../../api/productDealApi";

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

const DealPage = () => {
  const { page, size, moveToProductList } = useCustomMove();
  const [listData, setListData] = useState(initData);

  useEffect(() => {
    getDealProductList({ page, size }).then((data) => {
      setListData(data);
    });
  }, [page, size]);

  return (
    <div>
      <Header />
      <Container>
        <SortButton menu={"거래순"} />
        <ItemCard page={"dealdetail"} dtoList={listData.dtoList} />
        <PageComponent
          type={"deal"}
          listData={listData}
          moveToProductList={moveToProductList}
        />
      </Container>
      <Footer />
    </div>
  );
};

export default DealPage;
