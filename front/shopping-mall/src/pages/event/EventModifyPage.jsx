import { useParams } from "react-router-dom";
import ModifyComponent from "../../components/eventpage/ModifyComponent";
import { Container } from "../../components/Container";
import Header from "../../include/Header";
import Footer from "../../include/Footer";

const EventModifyPage = () => {
  const { no } = useParams();

  return (
    <div>
      <Header />
      <Container>
        <ModifyComponent no={no} />
      </Container>
      <Footer />
    </div>
  );
};

export default EventModifyPage;
