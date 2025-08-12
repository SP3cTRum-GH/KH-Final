import React from "react";
import { Container } from "../../components/Container";
import Header from "../../include/Header";
import Footer from "../../include/Footer";
import ModifyPageComponent from "../../components/admin/ModifyPageComponent"

const ModifyPage = () => {
  return (
    <div>
      <Header />
      <Container>
        <ModifyPageComponent />
      </Container>
      <Footer />
    </div>
  );
};

export default ModifyPage;
