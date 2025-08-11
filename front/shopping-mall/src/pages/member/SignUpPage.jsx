import React from "react";
import Header from "../../include/Header";
import Footer from "../../include/Footer";
import { Container } from "../../components/Container";
import SignUpComponent from "../../components/member/SignUpComponent";

const SignUp = () => {
  return (
    <div>
      <Header />
      <Container>
        <SignUpComponent />
      </Container>
      <Footer />
    </div>
  );
};

export default SignUp;
