import React, { useState } from "react";
import styled from "styled-components";
import StarRating from "./StarRating";

const ReviewComponent = () => {
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
          <h2>제품명</h2>
          <p>청바지</p>
          <p>제품 옵션 : M</p>
          <p>가격 : 50,000원</p>
          <StarRating max={5} size={40} color={"#fcc419"} defaultRate={0} />
        </div>
      </ReviewProductInfo>

      <h3>제품 후기</h3>
      <ReviewInputSection>
        <textarea placeholder="다른 회원들에게 도움이 될 수 있도록 상품에 대한 의견을 자세히 공유해주세요." />
      </ReviewInputSection>
      <input type="file" />

      <ReviewSubmitSection>
        <button>등록하기</button>
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
