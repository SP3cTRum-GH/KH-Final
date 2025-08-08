import React from "react";
import Header from "../../include/Header";
import { Container } from "../../components/Container";
import Footer from "../../include/Footer";
import DealDetailComponent from "../../components/detailpage/DealDetailComponent";

const DealDetailPage = () => {
  return (
    <div>
      <Header />
      <Container>
        <DealDetailComponent />
      </Container>
      <Footer />
    </div>
  );
};

export default DealDetailPage;
