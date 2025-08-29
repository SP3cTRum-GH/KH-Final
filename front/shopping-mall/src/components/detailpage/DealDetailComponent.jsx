import React, { useEffect, useRef, useState } from "react";
import DetailCarousel from "./DetailCarousel";
import SelectOption from "./SelectOption";
import ProductImageList from "./ProductImageList";
import Review from "./Review";
import styled from "styled-components";
import DealModal from "./DealModal";
import { getDealOne } from "../../api/productDealApi";
import { useLocation, useParams } from "react-router-dom";
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

const DealDetailComponent = () => {
  const location = useLocation();
  const [dealProductData, setDealProductData] = useState();
  const reviewRef = useRef(null);
  const [count, setCount] = useState(0);
  const [result, setResult] = useState(false); // 모달 창
  const param = useParams();
  const [reviewList, setReviewList] = useState({});
  const { reviewPage, reviewSize, moveToReviewList } = useCustomMove();

  // 리뷰 목록 재요청 (삭제/추가 후 카운트 반영용)
  const reloadReviews = () => {
    return getReviewList(
      { page: reviewPage, size: reviewSize },
      param.productNo
    )
      .then((data) => {
        setReviewList(data);
        return reviewCount(param.productNo);
      })
      .then((cnt) => setCount(cnt ?? 0))
      .catch(() => {
        setReviewList({ content: [], totalCount: 0 });
        setCount(0);
      });
  };

  useEffect(() => {
    getDealOne(param.productNo).then((data) => {
      setDealProductData(data);
    });

    reviewCount(param.productNo)
      .then((cnt) => setCount(cnt ?? 0))
      .catch(() => setCount(0));

    getReviewList({ page: reviewPage, size: reviewSize }, param.productNo).then(
      (data) => {
        setReviewList(data);
      }
    );
  }, [reviewPage, reviewSize, param.productNo]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!location.state?.focusReview) return;
      if (!reviewRef.current) return;

      // 1) 레이아웃 안정화 대기(약간의 딜레이)
      await new Promise((r) => setTimeout(r, 300));
      if (cancelled) return;

      // 2) 스크롤
      scrollToReview();

      // 3) 최신 리스트/카운트 먼저 로딩 완료까지 기다림
      await reloadReviews();

      // 4) state 제거(재방문/새로고침 시 재스크롤 방지)
      window.history.replaceState(
        {},
        document.title,
        location.pathname + location.search
      );
    }

    run();
    return () => {
      cancelled = true;
    };
    // location.key만으로도 재진입 시 재평가가 되고, 제품이 바뀌면 param.productNo도 의존성에 포함
  }, [location.state?.focusReview, location.key, param.productNo]);

  const scrollToReview = () => {
    if (reviewRef.current) {
      const offset = 100;
      const top =
        reviewRef.current.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleConfirmBid = (val) => {
    // 숫자로 변환 (객체가 와도 안전하게 처리)
    const bid =
      typeof val === "number"
        ? val
        : Number((val && (val.price ?? val.bidAmount ?? val.amount)) ?? val);

    const currentPrice = Number(dealProductData?.dealCurrent ?? 0);

    if (Number.isNaN(bid)) {
      alert("입찰가를 숫자로 입력해 주세요.");
      return false; // 유효하지 않음
    }

    if (bid <= currentPrice) {
      alert(`입찰가는 ${currentPrice.toLocaleString()}원 보다 높아야 합니다.`);
      return false; // 유효하지 않음
    }

    // 유효하면 모달 닫기
    setResult(false);
    return true; // 유효함
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
        <Review reviewList={reviewList} count={count} />
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
