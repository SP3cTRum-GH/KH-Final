import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Img, ImgContainer, MoreButton } from "./ProductImageListStyle";
import axios from "axios";

const ProductImageList = () => {
  const { productNo } = useParams();
  const [images, setImages] = useState([]);
  const [view, setView] = useState(false);

  // URL로 type 결정
  const type = window.location.pathname.includes("/deal") ? "deal" : "shop";

  useEffect(() => {
    if (!productNo) return;

    const fetchImages = async () => {
      try {
        const url =
          type === "deal"
            ? `http://localhost:8080/api/product/deal/${productNo}`
            : `http://localhost:8080/api/product/shop/${productNo}`;

        const res = await axios.get(url);
        const imgs = (res.data.images || []).map((i) => i.img).filter(Boolean);
        setImages(imgs);
      } catch (err) {
        console.error("이미지 로드 실패:", err);
      }
    };

    fetchImages();
  }, [productNo, type]);

  // 모든 이미지 표시
  const displayList = view ? images : images.slice(0, 1);

  return (
    <ImgContainer>
      {displayList.map((img, i) => (
        <Img key={i} src={`http://localhost:8080${img}`} alt="제품 이미지" />
      ))}
      {!view && images.length > 1 && (
        <MoreButton onClick={() => setView(true)}>더 보기</MoreButton>
      )}
    </ImgContainer>
  );
};

export default ProductImageList;
