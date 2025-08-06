import React from "react";
import ItemCard from "../../components/ItemCard";
import SortButton from "../../components/SortButton";
import { Container } from "../../components/Container";
import Header from "../../include/Header";
import Footer from "../../include/Footer";

const DealPage = () => {
  return (
    <div>
      <Header />
      <Container>
        <SortButton menu={"거래순"} />
        <ItemCard page={"dealdetail"} />
      </Container>
      <Footer />
    </div>
  );
};

export default DealPage;
