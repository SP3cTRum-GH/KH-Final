import { useParams } from "react-router-dom";
import ReadComponent from "../../components/eventpage/ReadComponent";
import { Container } from "../../components/Container";
import Header from "../../include/Header";
import Footer from "../../include/Footer";

const EventReadPage = () => {
  const { no } = useParams();

  return (
    <div>
      <Header />
      <Container>
        <ReadComponent no={no} />
      </Container>
      <Footer />
    </div>
  );
};

export default EventReadPage;
