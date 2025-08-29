import React, { Children, useEffect, useRef, useState } from "react";
import DetailCarousel from "./DetailCarousel";
import SelectOption from "./SelectOption";
import ProductImageList from "./ProductImageList";
import Review from "./Review";
import styled from "styled-components";
import { useParams, useLocation } from "react-router-dom";
import { getShopOne } from "../../api/productShopApi";
import { getReviewList, reviewCount } from "../../api/reviewApi";
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
  const [shopProductData, setShopProductData] = useState(null);
  const [count, setCount] = useState(0);
  const reviewRef = useRef(null);
  const param = useParams();
  const location = useLocation();
  const [reviewList, setReviewList] = useState({ content: [], totalCount: 0 });
  const { reviewPage, reviewSize, moveToReviewList } = useCustomMove();

  // 리뷰 목록 재요청 (삭제/추가 후 카운트 반영용)
  const reloadReviews = () => {
    getReviewList({ page: reviewPage, size: reviewSize }, param.productNo)
      .then((data) => setReviewList(data))
      .catch(() => setReviewList({ content: [], totalCount: 0 }));
  };

  useEffect(() => {
    getShopOne(param.productNo).then((data) => {
      setShopProductData(data);
    });

    reviewCount(param.productNo)
      .then((cnt) => setCount(cnt ?? 0))
      .catch(() => setCount(0));

    reloadReviews();
  }, [reviewPage, reviewSize, param.productNo]);

  // 기존 useEffect 삭제하고 아래로 교체
  useEffect(() => {
    if (!location.state?.focusReview) return;
    if (!reviewRef.current) return;

    const timer = setTimeout(() => {
      scrollToReview();

      // 한번 스크롤했으면 state 제거(새로고침/재방문시 재스크롤 방지)
      window.history.replaceState(
        {},
        document.title,
        location.pathname + location.search
      );
    }, 300); // 0.3초 지연 후 실행

    reloadReviews();

    return () => clearTimeout(timer);
  }, [location.state?.focusReview, location.key, reviewList.content?.length]);

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
        {shopProductData ? (
          <SelectOption
            productData={shopProductData}
            scrollToReview={scrollToReview}
            reviewListCount={count}
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
        <Review
          reviewList={reviewList}
          onChanged={reloadReviews}
          count={count}
        />
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
