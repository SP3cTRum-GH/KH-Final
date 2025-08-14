import React from "react";
import { Container } from "../../components/Container";
import Header from "../../include/Header";
import Footer from "../../include/Footer";
import SalesChartPageComponent from "../../components/admin/SalesChartPageComponent"

const SalesChartPage = () => {
  return (
    <div>
      <Header />
      <Container>
        <SalesChartPageComponent />
      </Container>
      <Footer />
    </div>
  );
};

export default SalesChartPage;
