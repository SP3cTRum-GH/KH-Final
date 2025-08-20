import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StarRating from "./StarRating";
import { useLocation, useParams } from "react-router-dom";
import { getShopOne } from "../../api/productShopApi";
import { getDealOne } from "../../api/productDealApi";
import { postReview } from "../../api/reviewApi";
import { getCookie } from "../../util/cookieUtil";

const ReviewComponent = () => {
  const [product, setProduct] = useState({
    productName: "",
    price: 0,
  });

  const [formData, setFormData] = useState({
    reviewImg: "null",
    rating: 0,
    content: "",
    productNo: 0,
    memberNo: 2, // 수정 필요
  });
  const [reviewText, setReviewText] = useState("");
  const [files, setFiles] = useState([]);
  const [rating, setRating] = useState(0);
  const { productNo } = useParams();
  const location = useLocation();
  const isType = !!location.state?.type;

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

  useEffect(() => {
    if (!productNo) return;

    const fetch = isType ? getDealOne : getShopOne;

    fetch(productNo)
      .then((data) => {
        if (data) {
          setProduct({
            productName: data.productName ?? "",
            price: data.price ?? 0,
          });
        }
      })
      .catch((err) => {
        console.error("Failed to load product:", err);
      });
  }, [productNo, isType]);

  const handleSubmit = () => {
    const sendData = {
      reviewImg: files[0]?.name || null,
      rating: rating,
      content: reviewText,
      productNo: parseInt(productNo),
      memberNo: 2, // 로그인 한 유저로 변경 필요
    };

    postReview(sendData).then((data) => {
      console.log(data);
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
            max={5}
            size={40}
            color={"#fcc419"}
            defaultRate={0}
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

      <ReviewSubmitSection>
        <button onClick={handleSubmit}>등록하기</button>
      </ReviewSubmitSection>
    </ReviewContainer>
  );
};

export default ReviewComponent;

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
