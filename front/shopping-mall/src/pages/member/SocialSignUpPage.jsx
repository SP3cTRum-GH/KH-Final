import React from "react";
import Header from "../../include/Header";
import Footer from "../../include/Footer";
import { Container } from "../../components/Container";
import SocialSignUpComponent from "../../components/member/SocialSignUpComponent";

const SocialSignUp = () => {
  return (
    <div>
      <Header />
      <Container>
        <SocialSignUpComponent />
      </Container>
      <Footer />
    </div>
  );
};

export default SocialSignUp;
