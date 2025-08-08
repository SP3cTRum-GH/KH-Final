import { Container } from "../../components/Container";
import Header from "../../include/Header";
import Footer from "../../include/Footer";
import ShopDetailComponent from "../../components/detailpage/ShopDetailComponent";

const ShopDetailPage = () => {
  return (
    <div>
      <Header />
      <Container>
        <ShopDetailComponent />
      </Container>
      <Footer />
    </div>
  );
};

export default ShopDetailPage;
