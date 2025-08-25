import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StarRating from "./StarRating";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getShopOne } from "../../api/productShopApi";
import { getDealOne } from "../../api/productDealApi";
import { getReviewOne, postReview, updateReview } from "../../api/reviewApi";
import { getCookie } from "../../util/cookieUtil";

const ReviewModifyComponent = () => {
  const [product, setProduct] = useState({
    productName: "",
    price: 0,
  });
  const memberId = getCookie("member").memberId;

  const [reviewText, setReviewText] = useState("");
  const [files, setFiles] = useState([]);
  const [rating, setRating] = useState(0);
  const [currentImage, setCurrentImage] = useState(null);
  const { reviewNo } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isType = !!location.state?.type;
  const productNo = location.state?.productNo;
  const isLogNo = location.state?.logNo;

  useEffect(() => {
    if (!reviewNo) return;
    getReviewOne(reviewNo)
      .then((data) => {
        if (!data) return;
        setReviewText(data.content ?? "");
        setRating(Number(data.rating ?? 0));
        setCurrentImage(data.reviewImg || null);
        // productNo or logNo 보완: 라우트 state가 없으면 응답값 사용
        if (!location.state?.productNo && data.productNo) {
          // 제품 정보 갱신을 위해 location state 대체값을 임시로 세팅
          // 단, 아래 제품 조회 useEffect는 productNo 의존이므로 별도 상태로 보완
        }
      })
      .catch((e) => console.error("Failed to load review:", e));
  }, [reviewNo]);

  useEffect(() => {
    if (!productNo) return;
    const fetch = isType ? getDealOne : getShopOne;
    fetch(productNo)
      .then((data) => {
        if (!data) return;
        setProduct({
          productName: data.productName ?? "",
          price: data.price ?? 0,
        });
      })
      .catch((err) => console.error("Failed to load product:", err));
  }, [productNo, isType]);

  const handleTextChange = (e) => {
    const value = e.target.value;
    setReviewText(value);
  };

  const handleFileChange = (e) => {
    const list = Array.from(e.target.files || []);
    setFiles(list);
  };

  // StarRating 값 변경 콜백 (StarRating이 어떤 콜백명을 쓰든 대응하도록 여러 prop에 연결할 예정)
  const handleRateChange = (value) => {
    setRating(value || 0);
  };

  const handleSubmit = () => {
    const sendData = {
      reviewImg: files[0]?.name || currentImage || null,
      rating: rating,
      content: reviewText,
      productNo: parseInt(productNo),
      memberId: memberId,
      logNo: isLogNo,
      reviewNo: parseInt(reviewNo),
    };

    updateReview(reviewNo, sendData)
      .then((data) => {
        alert("수정완료");
        navigate("/mypage"), { state: { value: "reviewed" } };
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ReviewContainer>
      <ReviewProductInfo>
        <div className="product-image">
          <img
            src="https://cdn-icons-png.flaticon.com/512/7596/7596292.png"
            alt="제품 이미지"
          />
        </div>
        <div className="product-details">
          <h2>{product.productName}</h2>
          <p>가격 : {product.price.toLocaleString()}원</p>
          <StarRating
            key={`rate-${rating}`}
            max={5}
            size={40}
            color={"#fcc419"}
            defaultRate={rating}
            onSetRate={handleRateChange}
          />
        </div>
      </ReviewProductInfo>

      <h3>제품 후기</h3>
      <ReviewInputSection>
        <textarea
          placeholder="다른 회원들에게 도움이 될 수 있도록 상품에 대한 의견을 자세히 공유해주세요."
          value={reviewText}
          onChange={handleTextChange}
        />
      </ReviewInputSection>
      <input type="file" multiple onChange={handleFileChange} />
      {currentImage && files.length === 0 && (
        <p style={{ marginTop: 8, color: "#666" }}>
          현재 이미지: {currentImage}
        </p>
      )}

      <ReviewSubmitSection>
        <button onClick={handleSubmit}>수정하기</button>
      </ReviewSubmitSection>
    </ReviewContainer>
  );
};

export default ReviewModifyComponent;

const ReviewContainer = styled.div`
  max-width: 50%;
  margin: 40px auto;
  padding: 24px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 12px;

  @media (max-width: 500px) {
    max-width: 80%;
  }
`;

const ReviewProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;

  .product-image img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
  }

  .product-details {
    h2 {
      margin: 0;
      font-size: 18px;
    }
    p {
      margin: 4px 0;
      color: #666;
    }
  }
`;

const ReviewInputSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  width: 100%;

  textarea {
    width: 95%;
    height: 100px;
    resize: none;
    padding: 12px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 12px;
  }
`;

const ReviewSubmitSection = styled.div`
  text-align: center;
  margin-top: 24px;

  button {
    width: 100%;
    background-color: black;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
  }
`;
