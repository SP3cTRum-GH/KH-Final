import React, { useState, useRef, useEffect } from "react";
import {
  CarouselContainer,
  Cell,
  NextBtn,
  PrevBtn,
  CurrentValue,
} from "./CarouselStyle";
import { getAllEvents, getEventImageUrl } from "../../api/eventApi";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const [events, setEvents] = useState([]);
  const activeEvents = events.filter((event) => !event.enable);

  const [current, setCurrent] = useState(0);
  const carouselRef = useRef(null);
  const imgLength = activeEvents?.length;
  const CAROUSEL_LENGTH = imgLength - 1; // 0부터 시작

  const [imgSize, setImgSize] = useState(
    window.innerWidth > 500 ? 1200 : window.innerWidth
  );

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setImgSize(window.innerWidth > 500 ? 1200 : window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 이벤트 가져오기
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents();
        setEvents(data);
      } catch (err) {
        console.error("이벤트 불러오기 실패:", err);
      }
    };
    fetchEvents();
  }, []);

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
        {activeEvents.map((event, idx) => (
          <Cell
            key={idx}
            onClick={() => navigate(`/event/${event.no}`)} // 클릭 시 이동
            style={{ cursor: "pointer" }}
          >
            <img
              src={
                getEventImageUrl(event.imageFileNames) ||
                "https://www.news1.kr/_next/image?url=https%3A%2F%2Fi3n.news1.kr%2Fsystem%2Fphotos%2F2023%2F12%2F10%2F6371071%2Fhigh.jpg&w=1920&q=75"
              }
              alt={event.title || "이벤트 이미지"}
            />
            <h3>{event.title}</h3>
            <p>{event.content}</p>
          </Cell>
        ))}
      </div>
      {imgLength > 0 && (
        <div>
          <PrevBtn onClick={prevEvent}>{"<"}</PrevBtn>
          <NextBtn onClick={nextEvent}>{">"}</NextBtn>
          <CurrentValue>
            {current + 1} / {CAROUSEL_LENGTH + 1}
          </CurrentValue>
        </div>
      )}
    </CarouselContainer>
  );
};

export default Carousel;
