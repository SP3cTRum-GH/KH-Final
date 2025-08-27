import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import StarRating from "./StarRating";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getShopOne } from "../../api/productShopApi";
import { getDealOne } from "../../api/productDealApi";
import { getReviewOne, postReview, updateReview } from "../../api/reviewApi";
import { getCookie } from "../../util/cookieUtil";
import { API_SERVER_HOST } from "../../api/HostUrl";
import {
  ReviewContainer,
  ReviewProductInfo,
  ReviewInputSection,
  PreviewWrap,
  PreviewImage,
  CloseBtn,
  ReviewSubmitSection,
} from "./ReviewModifyComponentStyle";

const ReviewModifyComponent = () => {
  const [product, setProduct] = useState({
    productName: "",
    price: 0,
    images: [],
  });
  const memberId = getCookie("member").memberId;

  const [reviewText, setReviewText] = useState("");
  const [files, setFiles] = useState([]);
  const [rating, setRating] = useState(0);
  const [currentImage, setCurrentImage] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const { reviewNo } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isType = !!location.state?.type;
  const productNo = location.state?.productNo;
  const isLogNo = location.state?.logNo;
  const [productNoForSubmit, setProductNoForSubmit] = useState(
    productNo ?? null
  );

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!reviewNo) return;
    getReviewOne(reviewNo)
      .then((data) => {
        if (!data) return;
        setReviewText(data.content ?? "");
        setRating(Number(data.rating ?? 0));
        setCurrentImage(data.reviewImg || null);
        setDeleted(false);
        // productNo or logNo 보완: 라우트 state가 없으면 응답값 사용
        if (!location.state?.productNo && data.productNo) {
          setProductNoForSubmit(data.productNo);
        }
      })
      .catch((e) => console.error("Failed to load review:", e));
  }, [reviewNo]);

  useEffect(() => {
    let revokeUrl;
    if (files && files[0] instanceof File) {
      const url = URL.createObjectURL(files[0]);
      setPreviewSrc(url);
      revokeUrl = url;
    } else if (currentImage) {
      setPreviewSrc(`${API_SERVER_HOST}${currentImage}`);
    } else {
      setPreviewSrc(null);
    }

    return () => {
      if (revokeUrl) URL.revokeObjectURL(revokeUrl);
    };
  }, [files, currentImage]);

  useEffect(() => {
    if (!productNo) return;
    const fetch = isType ? getDealOne : getShopOne;
    fetch(productNo)
      .then((data) => {
        if (!data) return;
        setProduct({
          productName: data.productName ?? "",
          price: data.price ?? 0,
          images: Array.isArray(data.images) ? data.images : [],
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
    if (list[0]) setDeleted(false);
  };

  const handleClearImage = () => {
    // 초기화: 새로 선택한 파일과 기존 이미지를 모두 제거
    setFiles([]);
    setCurrentImage(null);
    setPreviewSrc(null);
    // 파일 인풋 값도 비워서 동일 파일 재선택 가능
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setDeleted(true);
  };

  // StarRating 값 변경 콜백 (StarRating이 어떤 콜백명을 쓰든 대응하도록 여러 prop에 연결할 예정)
  const handleRateChange = (value) => {
    setRating(value || 0);
  };

  async function urlToFile(url) {
    const res = await fetch(url, { credentials: "include" }); // 필요 시
    const blob = await res.blob();
    const name = url.split("/").pop() || "image.jpg";
    return new File([blob], name, { type: blob.type || "image/jpeg" });
  }

  const handleSubmit = async () => {
    const fd = new FormData();
    fd.append("reviewNo", String(reviewNo));
    fd.append("productNo", String(productNo ?? productNoForSubmit));
    fd.append("memberId", memberId);
    if (isLogNo != null) fd.append("logNo", String(isLogNo));
    fd.append("content", reviewText ?? "");
    fd.append("rating", String(rating ?? 0));

    if (files[0] instanceof File) {
      fd.append("uploadFile", files[0]); // 새 파일
    } else if (currentImage) {
      // 기존 이미지를 파일로 만들어 다시 업로드
      const absoluteUrl = currentImage.startsWith("http")
        ? currentImage
        : `${API_SERVER_HOST}${currentImage}`;

      const file = await urlToFile(absoluteUrl);
      fd.append("uploadFile", file);
    }

    updateReview(reviewNo, fd)
      .then(() => navigate("/mypage"))
      .catch(console.error);
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
      {/* 파일 선택 */}
      <input type="file" ref={fileInputRef} onChange={handleFileChange} />

      {/* 미리보기: 새 파일이 있으면 새 파일, 없으면 기존 이미지 */}
      {previewSrc && (
        <PreviewWrap>
          <CloseBtn
            type="button"
            onClick={handleClearImage}
            aria-label="이미지 제거"
          >
            ×
          </CloseBtn>
          <PreviewImage src={previewSrc} alt="리뷰 이미지 미리보기" />
        </PreviewWrap>
      )}

      <ReviewSubmitSection>
        <button onClick={handleSubmit}>수정하기</button>
      </ReviewSubmitSection>
    </ReviewContainer>
  );
};

export default ReviewModifyComponent;
