import React from "react";
import { Container } from "../../components/Container";
import Header from "../../include/Header";
import Footer from "../../include/Footer";
import ModifyMyPageComponent from "../../components/member/ModifyMyPageComponent";

const ModifyMyPage = () => {
    const user = {
        name: "승민",
        id: "dltmdals410",
    };

    return (
        <div>
            <Header />
            <Container>
                <ModifyMyPageComponent user={user} />
            </Container>
            <Footer />
        </div>
    );
};

export default ModifyMyPage;