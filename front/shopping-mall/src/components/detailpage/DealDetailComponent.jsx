import React, { useEffect, useRef, useState } from "react";
import DetailCarousel from "./DetailCarousel";
import SelectOption from "./SelectOption";
import ProductImageList from "./ProductImageList";
import Review from "./Review";
import styled from "styled-components";
import DealModal from "./DealModal";
import { getDealOne } from "../../api/productDealApi";
import { useParams } from "react-router-dom";
import { getReviewList } from "../../api/reviewApi";
import useCustomMove from "../../hooks/useCustomMove";
import PageComponent from "../common/PageComponent";

const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 20px;

  @media (max-width: 500px) {
    width: 100%;
    flex-direction: column;
  }
`;

const hrStyle = {
  marginBottom: "80px",
  color: "#a1a0a0",
};

const DealDetailComponent = () => {
  const [dealProductData, setDealProductData] = useState();
  const reviewRef = useRef(null);
  const [result, setResult] = useState(false); // 모달 창
  const param = useParams();
  const [reviewList, setReviewList] = useState({});
  const { reviewPage, reviewSize, moveToReviewList } = useCustomMove();

  useEffect(() => {
    getDealOne(param.productNo).then((data) => {
      setDealProductData(data);
    });

    getReviewList({ page: reviewPage, size: reviewSize }, param.productNo).then(
      (data) => {
        setReviewList(data);
      }
    );
  }, [reviewPage, reviewSize, param.productNo]);

  const scrollToReview = () => {
    if (reviewRef.current) {
      const offset = 100;
      const top =
        reviewRef.current.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleConfirmBid = (amount) => {
    const currentPrice = dealProductData.dealCurrent;
    if (amount <= currentPrice) {
      alert(`입찰가는 ${currentPrice.toLocaleString()}원 보다 높아야 합니다.`);
      return;
    }

    setResult(false);
  };

  const handleOpenModal = () => {
    setResult(true);
  };

  const handleCloseModal = () => {
    setResult(false);
  };

  return (
    <>
      <Div>
        <DetailCarousel listLength={1200} imgLength={5} />
        {dealProductData ? (
          <SelectOption
            productData={dealProductData}
            scrollToReview={scrollToReview}
            handleOpenModal={handleOpenModal}
            reviewListCount={reviewList.totalCount}
          />
        ) : (
          <>Loading...</>
        )}
      </Div>
      <hr style={hrStyle} />
      <div>
        <ProductImageList />
      </div>
      <hr style={hrStyle} />
      <div ref={reviewRef} id="review">
        <Review reviewList={reviewList} />
        <PageComponent
          type={"dealdetail"}
          listData={reviewList}
          moveToProductList={(pageParam) =>
            moveToReviewList(pageParam, `/dealdetail/${param.productNo}`)
          }
        />
      </div>

      {result && (
        <DealModal
          currentPrice={dealProductData.dealCurrent}
          onConfirm={handleConfirmBid}
          onCancel={handleCloseModal}
          param={param}
        />
      )}
    </>
  );
};

export default DealDetailComponent;
