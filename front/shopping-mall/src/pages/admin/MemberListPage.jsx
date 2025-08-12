import React from "react";
import { Container } from "../../components/Container";
import Header from "../../include/Header";
import Footer from "../../include/Footer";
import MemberListPageComponent from "../../components/admin/MemberListPageComponent"

const MemberListPage = () => {
  return (
    <div>
      <Header />
      <Container>
        <MemberListPageComponent />
      </Container>
      <Footer />
    </div>
  );
};

export default MemberListPage;
