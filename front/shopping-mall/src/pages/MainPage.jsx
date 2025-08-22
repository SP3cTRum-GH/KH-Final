import React from "react";
import ItemCard from "../components/ItemCard";
import Carousel from "../components/mainpage/Carousel";
import Header from "../include/Header";
import { Container } from "../components/Container";
import Footer from "../include/Footer";

const MainPage = () => {
  return (
    <>
      <Header />
      <Container>
        <Carousel imgLength={5} />
        {/* <ItemCard /> */}
      </Container>
      <Footer />
    </>
  );
};

export default MainPage;
