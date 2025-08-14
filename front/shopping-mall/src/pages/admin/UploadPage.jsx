import React from "react";
import { Container } from "../../components/Container";
import Header from "../../include/Header";
import Footer from "../../include/Footer";
import UploadPageComponent from "../../components/admin/UploadPageComponent"

const UploadPage = () => {
    return (
        <div>
            <Header />
            <Container>
                <UploadPageComponent />
            </Container>
            <Footer />
        </div>
    );
};

export default UploadPage;