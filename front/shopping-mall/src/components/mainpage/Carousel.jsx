import React, { useState, useRef, useEffect } from "react";
import {
  CarouselContainer,
  Cell,
  NextBtn,
  PrevBtn,
  CurrentValue,
} from "./CarouselStyle";

const Carousel = ({ listLength, imgLength }) => {
  const [current, setCurrent] = useState(0);
  const carouselRef = useRef(null);
  const CAROUSEL_LENGTH = imgLength - 1; // 0 to 3 (4 images)
  // const [imgSize, setImgSize] = useState(
  //   listLength === 300
  //     ? 300
  //     : window.innerWidth < 400
  //     ? window.innerWidth
  //     : listLength
  // );

  const [imgSize, setImgSize] = useState(
    window.innerWidth > 500 ? 1200 : window.innerWidth
  );

  useEffect(() => {
    const handleResize = () => {
      // setImgSize(window.innerWidth < 400 ? window.innerWidth : listLength);
      setImgSize(window.innerWidth > 500 ? 1200 : window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [listLength]);

  const nextEvent = () => {
    const nextIndex = current < CAROUSEL_LENGTH ? current + 1 : 0;
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(${
        -imgSize * nextIndex
      }px)`;
    }
    setCurrent(nextIndex);
  };

  const prevEvent = () => {
    const prevIndex = current > 0 ? current - 1 : CAROUSEL_LENGTH;
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(${
        -imgSize * prevIndex
      }px)`;
    }
    setCurrent(prevIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => {
        const nextIndex = prev < CAROUSEL_LENGTH ? prev + 1 : 0;
        if (carouselRef.current) {
          carouselRef.current.style.transform = `translateX(${
            -imgSize * nextIndex
          }px)`;
        }
        return nextIndex;
      });
    }, 7000);
    return () => clearInterval(interval);
  }, [CAROUSEL_LENGTH, imgSize]);

  return (
    <CarouselContainer>
      <div ref={carouselRef}>
        <Cell>
          <img
            src="https://i.pinimg.com/originals/7c/9d/b1/7c9db1248225330a82c35080eda74eb0.gif"
            alt="장원영"
          />
          <h3>아이브</h3>
          <p>장원영</p>
        </Cell>
        <Cell>
          <img
            src="https://image.baestmath.com/board-images/1624337b3c62d.gif"
            alt="카리나"
          />
          <h3>에스파</h3>
          <p>카리나</p>
        </Cell>
        <Cell>
          <img
            src="https://archive.myvibrary.com/original/1679403221374_e0c3ebdcdd.gif"
            alt="설윤"
          />
          <h3>엔믹스</h3>
          <p>설윤</p>
        </Cell>
        <Cell>
          <img
            src="https://i.namu.wiki/i/x2z_-qDM1bENMt2qrlAcONT13qnSNZRc-LNcm5G70dGj1kIhYnkFetgVvIgPRWY8r6tj0DTK3NeVjcppD5-JYg.gif"
            alt="유나"
          />
          <h3>있지</h3>
          <p>유나</p>
        </Cell>
        <Cell>
          <img
            src="https://i.namu.wiki/i/pK1bvyzYXWLuQozJoOre7DEdlVL8wJx4197EqGZPe2HN2KxTEwip50fVT2CFHG_5aDpsOpIdi9vXXmgo8_FLrA.gif"
            alt="이안"
          />
          <h3>하츠투하츠</h3>
          <p>이안</p>
        </Cell>
      </div>
      <div>
        <PrevBtn onClick={prevEvent}>{"<"}</PrevBtn>
        <NextBtn onClick={nextEvent}>{">"}</NextBtn>
        <CurrentValue>
          {current + 1} / {CAROUSEL_LENGTH + 1}
        </CurrentValue>
      </div>
    </CarouselContainer>
  );
};

export default Carousel;
