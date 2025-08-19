import { useParams } from "react-router-dom";
import { useState } from "react";
import { Container } from "../../components/Container";
import Header from "../../include/Header";
import Footer from "../../include/Footer";
import AddComponent from "../../components/eventpage/AddComponent";
import ImageUploader from "../../components/admin/ImageUploader";

const EventAddPage = () => {
  const { no } = useParams();

  return (
    <div>
      <Header />
      <Container>
        <AddComponent />
      </Container>
      <Footer />
    </div>
  );
};

export default EventAddPage;
