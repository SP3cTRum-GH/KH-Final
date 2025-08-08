import React from "react";
import { Container } from "../../components/Container";
import Header from "../../include/Header";
import Footer from "../../include/Footer";
import CartPageComponent from "../../components/member/CartPageComponent";

const CartPage = () => {
  return (
    <div>
      <Header />
      <Container>
        <CartPageComponent />
      </Container>
      <Footer />
    </div>
  );
};

export default CartPage;
