import React from "react";
import ItemCard from "../../components/ItemCard";
import SortButton from "../../components/SortButton";
import { Container } from "../../components/Container";
import Header from "../../include/Header";
import Footer from "../../include/Footer";

const ShopPage = () => {
  return (
    <div>
      <Header />
      <Container>
        <SortButton menu={"판매순"} />
        <ItemCard page={"shopdetail"} />
      </Container>
      <Footer />
    </div>
  );
};

export default ShopPage;
