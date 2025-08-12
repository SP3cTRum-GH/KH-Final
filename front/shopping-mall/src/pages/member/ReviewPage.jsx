import React from "react";
import ReviewComponent from "../../components/reviewpage/ReviewComponent";
import { Container } from "../../components/Container";
import Header from "../../include/Header";
import Footer from "../../include/Footer";

const ReviewPage = () => {
  return (
    <div>
      <Header />
      <Container>
        <ReviewComponent />
      </Container>
      <Footer />
    </div>
  );
};

export default ReviewPage;
