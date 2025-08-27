import React, { useState, useRef, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  CarouselContainer,
  Cell,
  NextBtn,
  PrevBtn,
} from "./DetailCarouselStyle.js";
import axios from "axios";

const DetailCarousel = () => {
  const { productNo } = useParams();
  const location = useLocation();
  const [current, setCurrent] = useState(0);
  const carouselRef = useRef(null);
  const [images, setImages] = useState([]);
  const CAROUSEL_LENGTH = images?.length ? images.length - 1 : 0; // 0 to 3 (4 images)

  const [imgSize, setImgSize] = useState(
    window.innerWidth > 500 ? 500 : window.innerWidth
  );

  useEffect(() => {
    const handleResize = () => {
      // setImgSize(window.innerWidth < 400 ? window.innerWidth : listLength);
      setImgSize(window.innerWidth > 500 ? 500 : window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 서버에서 이미지 가져오기
  useEffect(() => {
    if (!productNo) return;

    const fetchImages = async () => {
      try {
        // 경로에 따라 URL 결정
        const isDeal = location.pathname.includes("/dealdetail/");
        const url = isDeal
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
  }, [productNo, location.pathname]);

  const nextEvent = () => {
    if (!images || images.length === 0) return;
    const nextIndex = current < CAROUSEL_LENGTH ? current + 1 : 0;
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(${
        -imgSize * nextIndex
      }px)`;
    }
    setCurrent(nextIndex);
  };

  const prevEvent = () => {
    if (!images || images.length === 0) return;
    const prevIndex = current > 0 ? current - 1 : CAROUSEL_LENGTH;
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(${
        -imgSize * prevIndex
      }px)`;
    }
    setCurrent(prevIndex);
  };

  return (
    <CarouselContainer>
      <div ref={carouselRef}>
        {images.length > 0 ? (
          images.map((img, idx) => (
            <Cell key={idx}>
              <img src={`http://localhost:8080${img}`} alt={`image-${idx}`} />
            </Cell>
          ))
        ) : (
          <p>이미지가 없습니다</p>
        )}
      </div>
      {images && images.length > 1 && (
        <div>
          <PrevBtn onClick={prevEvent}>{"<"}</PrevBtn>
          <NextBtn onClick={nextEvent}>{">"}</NextBtn>
        </div>
      )}
    </CarouselContainer>
  );
};

export default DetailCarousel;
