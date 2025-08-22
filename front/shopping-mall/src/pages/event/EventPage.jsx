import React from "react";
import { Container } from "../../components/Container";
import Header from "../../include/Header";
import Footer from "../../include/Footer";
import ListComponent from "../../components/eventpage/ListComponent";

const EventPage = () => {
  return (
    <div>
      <Header />
      <Container>
        <ListComponent />
      </Container>
      <Footer />
    </div>
  );
};

export default EventPage;
