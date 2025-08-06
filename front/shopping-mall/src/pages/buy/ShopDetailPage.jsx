import React from "react";
import Carousel from "../../components/Carousel";
import SelectOption from "../../components/SelectOption";
import { Container } from "../../components/Container";
import Header from "../../include/Header";
import Footer from "../../include/Footer";

const ShopDetailPage = () => {
  return (
    <div>
      <Header />
      <Container>
        <Carousel listLength={1200} imgLength={4} />
        <SelectOption />
      </Container>
      <Footer />
    </div>
  );
};

export default ShopDetailPage;
