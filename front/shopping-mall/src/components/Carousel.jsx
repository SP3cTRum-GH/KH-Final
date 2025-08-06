import React, { useState, useRef, useEffect } from "react";
import {
  CarouselContainer,
  Cell,
  NextBtn,
  PrevBtn,
  CurrentValue,
} from "./CarouselStyle";
import styled from "styled-components";

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
    window.innerWidth > 1200 ? 1200 : window.innerWidth
  );

  useEffect(() => {
    const handleResize = () => {
      // setImgSize(window.innerWidth < 400 ? window.innerWidth : listLength);
      setImgSize(window.innerWidth);
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
    }, 5000);
    return () => clearInterval(interval);
  }, [CAROUSEL_LENGTH, imgSize]);

  return (
    <CarouselContainer>
      <div ref={carouselRef}>
        <Cell>
          <img
            src="https://i.ytimg.com/vi/xW44MoAKzpQ/maxresdefault.jpg"
            alt="장원영"
          />
          <h3>아이브</h3>
          <p>장원영입니다.</p>
        </Cell>
        <Cell>
          <img
            src="https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2023/08/07/60ebdeee-d87c-4e30-8003-76565694815c.jpg"
            alt="카리나"
          />
          <h3>에스파</h3>
          <p>카리나입니다.</p>
        </Cell>
        <Cell>
          <img
            src="https://image.fmkorea.com/files/attach/new3/20230702/4366334379/3971144225/5928320070/e061f642067dca00cca1312addedd9aa.jpg"
            alt="설윤"
          />
          <h3>엔믹스</h3>
          <p>설윤입니다.</p>
        </Cell>
        <Cell>
          <img
            src="https://i.ytimg.com/vi/90O9yt7biPE/maxresdefault.jpg"
            alt="유나"
          />
          <h3>있지</h3>
          <p>유나입니다.</p>
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
