import React from "react";
import { Container } from "../../components/Container";
import Header from "../../include/Header";
import Footer from "../../include/Footer";
import MyPageComponent from "../../components/member/MyPageComponent";

const MyPage = () => {
  return (
    <div>
      <Header />
      <Container>
        <MyPageComponent />
      </Container>
      <Footer />
    </div>
  );
};

export default MyPage;
