import React from "react";
import Header from "../../include/Header";
import { Container } from "../../components/Container";
import Footer from "../../include/Footer";
import ReviewModifyComponent from "../../components/reviewpage/ReviewModifyComponent";

const ReviewModifyPage = () => {
  return (
    <div>
      <Header />
      <Container>
        <ReviewModifyComponent />
      </Container>
      <Footer />
    </div>
  );
};

export default ReviewModifyPage;
