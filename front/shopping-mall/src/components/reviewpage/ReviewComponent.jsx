import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StarRating from "./StarRating";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getShopOne } from "../../api/productShopApi";
import { getDealOne } from "../../api/productDealApi";
import { postReview } from "../../api/reviewApi";
import { getCookie } from "../../util/cookieUtil";
import { API_SERVER_HOST } from "../../api/HostUrl";
import {
  ReviewContainer,
  ReviewProductInfo,
  ReviewInputSection,
  ReviewSubmitSection,
} from "./ReviewComponentStyle";

const ReviewComponent = () => {
  const [product, setProduct] = useState({
    productName: "",
    price: 0,
    images: [],
  });
  const memberId = getCookie("member").memberId;

  const [reviewText, setReviewText] = useState("");
  const [files, setFiles] = useState([]);
  const [rating, setRating] = useState(0);
  const { productNo } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isType = !!location.state?.type;
  const isLogNo = location.state?.logNo;

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
            images: data.images ?? [],
          });
        }
      })
      .catch((err) => {
        console.error("Failed to load product:", err);
      });
  }, [productNo, isType]);

  const handleSubmit = () => {
    const sendData = new FormData();

    if (files[0]) {
      sendData.append("uploadFile", files[0]);
    }
    sendData.append("rating", rating);
    sendData.append("content", reviewText);
    sendData.append("productNo", parseInt(productNo));
    sendData.append("memberId", memberId);
    sendData.append("logNo", isLogNo);

    for (let pair of sendData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
      console.log(typeof pair[0]);
    }

    postReview(sendData).then((data) => {
      console.log(data);
    });

    if (isType) {
      navigate(`/dealdetail/${productNo}`, { state: { focusReview: true } });
    } else {
      navigate(`/shopdetail/${productNo}`, { state: { focusReview: true } });
    }
  };

  return (
    <ReviewContainer>
      <ReviewProductInfo>
        <div className="product-image">
          {product.images?.[0]?.img && (
            <img
              src={`${API_SERVER_HOST}${product.images[0].img}`}
              alt="제품 이미지"
            />
          )}
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
      <input type="file" onChange={handleFileChange} />

      <ReviewSubmitSection>
        <button onClick={handleSubmit}>등록하기</button>
      </ReviewSubmitSection>
    </ReviewContainer>
  );
};

export default ReviewComponent;
