import React, { Children, useEffect, useRef, useState } from "react";
import DetailCarousel from "./DetailCarousel";
import SelectOption from "./SelectOption";
import ProductImageList from "./ProductImageList";
import Review from "./Review";
import styled from "styled-components";
import { useParams, useNavigate, createSearchParams } from "react-router-dom";
import { getShopOne } from "../../api/productShopApi";
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

const ShopDetailCompont = () => {
  const [shopProductData, setShopProductData] = useState({});
  const reviewRef = useRef(null);
  const param = useParams();
  const [reviewList, setReviewList] = useState({});
  const { reviewPage, reviewSize, moveToReviewList } = useCustomMove();
  const navigate = useNavigate();

  useEffect(() => {
    getShopOne(param.productNo).then((data) => {
      setShopProductData(data);
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

  return (
    <>
      <Div>
        <DetailCarousel listLength={1200} imgLength={5} />
        <SelectOption
          productData={shopProductData}
          scrollToReview={scrollToReview}
        />
      </Div>
      <hr style={hrStyle} />
      <div>
        <ProductImageList />
      </div>
      <hr style={hrStyle} />
      <div ref={reviewRef} id="review">
        <Review reviewList={reviewList} />
        <PageComponent
          type={"shopdetail"}
          listData={reviewList}
          moveToProductList={(pageParam) =>
            moveToReviewList(pageParam, `/shopdetail/${param.productNo}`)
          }
        />
      </div>
    </>
  );
};

export default ShopDetailCompont;
