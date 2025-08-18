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
            src="https://mblogthumb-phinf.pstatic.net/MjAyMzA0MThfMjUg/MDAxNjgxNzgxMDc4Mzc1.WdguDbRJMAP4wH19nHIP-xqTggUOgFaQj6aZGs95NmEg.xK8jrlesjKMQvmq5q6OYCk6je71xTZUWBPe6G1_v8uAg.GIF.loveydeeply/IMG%EF%BC%BF8303.GIF?type=w800"
            alt="장원영"
          />
          <h3>아이브</h3>
          <p>장원영</p>
        </Cell>
        <Cell>
          <img
            src="https://blog.kakaocdn.net/dna/yCDUW/btsIAP9U39A/AAAAAAAAAAAAAAAAAAAAAIRtAlCtQh2wp-Zn3OBTxjfY1vnBnIQDESXGOdMPpumu/img.gif?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1756652399&allow_ip=&allow_referer=&signature=7no%2Fb%2BAt6ia6XbPwZS8%2BwC%2BgUZE%3D"
            alt="카리나"
          />
          <h3>에스파</h3>
          <p>카리나</p>
        </Cell>
        <Cell>
          <img
            src="https://i.namu.wiki/i/lJFkyGv458HQ5zxoEd1GCA-ZEoQXa99P1llXw-FlLwajvLdvcrvxjSI_MRqZN84n-MHwdSoc51C1bv9LU3IpOw.gif"
            alt="설윤"
          />
          <h3>엔믹스</h3>
          <p>설윤</p>
        </Cell>
        <Cell>
          <img
            src="https://i.namu.wiki/i/U7LmaE_y3-SOgBGus89SgTYcQ5iZwHMP3T4vDDCwjQ3Uwjvd01WN_hOSGNziNeDA5bl1D6Vzr-B-giHJ6xch6g.gif"
            alt="유나"
          />
          <h3>있지</h3>
          <p>유나</p>
        </Cell>
        <Cell>
          <img
            src="https://i.namu.wiki/i/1dwopFuzij_ymDHRkH_w89nrCA0f6u5beJovCSUqCY5vFrIIuMgJqHggDg8_vJ-Kbp72nu5U_mhQ9MircVSaxg.gif"
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
