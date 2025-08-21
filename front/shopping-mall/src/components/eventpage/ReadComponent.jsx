import { useEffect, useState } from "react";
import styled from "styled-components";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
  no: "",
  title: "",
  content: "",
  startDate: "",
  endDate: "",
  img: "",
};

const mockDataList = [
  {
    no: 1,
    title: "여름 할인 이벤트",
    content: "여름 맞이 대규모 할인 이벤트!",
    startDate: "2025-08-01",
    endDate: "2025-08-31",
    img: "https://image.oliveyoung.co.kr/uploads/contents/202508/01hyundaiCard/2508_01hyundaiCard_visual.gif",
  },
  {
    no: 2,
    title: "가을 페스티벌",
    content: "가을 맞이 페스티벌 행사 안내",
    startDate: "2025-09-10",
    endDate: "2025-09-20",
    img: "https://blog.kakaocdn.net/dna/s0Xai/btsGidZB1JE/AAAAAAAAAAAAAAAAAAAAAOG41CVYZXLIaejdgQSPwDfiPwAwVWY6eYDO2ZYwfQ6o/img.gif",
  },
  {
    no: 3,
    title: "겨울 세일",
    content: "겨울 시즌 할인 안내",
    startDate: "2025-12-01",
    endDate: "2025-12-15",
    img: "https://i.namu.wiki/i/DfzlaTHEJiDhRYeE4Ug4ohu_KdDDnwZj9CSJldP6Qz-a4gSceW3NkB49dR_Po6XMUheD9EdDuRt_iCReljfdMQ.gif",
  },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
`;

const Banner = styled.div`
  position: relative;
  width: 100%;
  height: 450px;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  border-radius: 1rem;
  /* 밑으로 갈수록 어두워지면서 흐려지는 효과 */
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30%;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.6) 100%
    );
  }
`;

const InfoSection = styled.div`
  /* text-align: center; */
  margin-top: 2rem;
  margin-left: 10px;

  h2 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    z-index: 1;
    position: relative;
    margin-top: -45px;
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: #555;
  }

  .date {
    font-size: 1rem;
    color: #888;
    margin-bottom: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;

  button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;

    &.modify {
      background: #6c757d;
      color: white;
      font-weight: 400;
    }
    &.list {
      background: #17a2b8;
      color: white;
      font-weight: 400;
    }

    &:hover {
      opacity: 0.85;
    }
  }
`;

const ReadComponent = ({ no }) => {
  const [event, setEvent] = useState(initState);
  const { moveToEventModify, moveToEventList } = useCustomMove();

  useEffect(() => {
    // const data = mockDataList.find((item) => item.no === no) || initState;
    // setEvent(data);
    setEvent(mockDataList[0]);
  }, [no]);

  return (
    <Container>
      {/* 상단 배너 */}
      <Banner bg={event.img} />

      {/* 이벤트 정보 */}
      <InfoSection>
        <h2>{event.title}</h2>
        <div className="date">
          {event.startDate} ~ {event.endDate}
        </div>
        <p>{event.content}</p>
      </InfoSection>

      {/* 버튼 영역 */}
      <ButtonGroup>
        <button
          className="modify"
          type="button"
          onClick={() => moveToEventModify(no)}
        >
          수정하기
        </button>
        <button
          className="list"
          type="button"
          onClick={() => moveToEventList()}
        >
          리스트 보기
        </button>
      </ButtonGroup>
    </Container>
  );
};

export default ReadComponent;
