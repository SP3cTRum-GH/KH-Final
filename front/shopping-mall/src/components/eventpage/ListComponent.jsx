import { useEffect, useState } from "react";
import styled from "styled-components";
// import { getList } from "../../api/eventApi";  // 👈 목업 모드에서는 주석 처리
import useCustomMove from "../../hooks/useCustomMove";
import { API_SERVER_HOST } from "../../api/eventApi";

const host = API_SERVER_HOST;

const initState = {
  dtoList: [],
};

// 🔹 목업 데이터
const mockData = {
  dtoList: [
    {
      no: 1,
      title: "여름 할인 이벤트",
      startDate: "25.08.01",
      endDate: "25.08.31",
      img: "https://image.oliveyoung.co.kr/uploads/images/display/900000100050006/566/2168515048255777267.jpg",
    },
    {
      no: 2,
      title: "가을 페스티벌",
      startDate: "25.09.10",
      endDate: "25.09.20",
      img: "https://image.oliveyoung.co.kr/uploads/images//event/730845208867399951.jpg",
    },
    {
      no: 3,
      title: "겨울 세일",
      startDate: "25.12.01",
      endDate: "25.12.15",
      img: "https://image.oliveyoung.co.kr/uploads/images//event/2356257364818237264.jpg",
    },
    {
      no: 4,
      title: "겨울 세일",
      startDate: "25.12.01",
      endDate: "25.12.15",
      img: "https://image.oliveyoung.co.kr/uploads/images//event/8284862242650831159.jpg",
    },
    {
      no: 5,
      title: "겨울 세일",
      startDate: "25.12.01",
      endDate: "25.12.15",
      img: "https://image.oliveyoung.co.kr/uploads/images//event/734670793604235040.jpg",
    },
    {
      no: 6,
      title: "여름 이벤트",
      startDate: "25.06.10",
      endDate: "25.06.25",
      img: "https://image.oliveyoung.co.kr/uploads/images//event/1589376078719142039.jpg",
    },
    {
      no: 7,
      title: "가을 이벤트",
      startDate: "25.09.10",
      endDate: "25.09.25",
      img: "https://image.oliveyoung.co.kr/uploads/images//event/2209281658300075546.jpg",
    },
    {
      no: 8,
      title: "겨울 이벤트",
      startDate: "25.12.05",
      endDate: "25.12.20",
      img: "https://image.oliveyoung.co.kr/uploads/images//event/7829108581723065643.png",
    },
    {
      no: 9,
      title: "봄 이벤트",
      startDate: "25.03.10",
      endDate: "25.03.25",
      img: "https://image.oliveyoung.co.kr/uploads/images//event/2322732644424487339.jpg",
    },
    {
      no: 10,
      title: "여름 할인",
      startDate: "25.06.15",
      endDate: "25.06.30",
      img: "https://image.oliveyoung.co.kr/uploads/images//event/599745112288421759.jpg",
    },
    {
      no: 11,
      title: "가을 세일",
      startDate: "25.09.15",
      endDate: "25.09.30",
      img: "https://image.oliveyoung.co.kr/uploads/images//event/4563951643869464983.jpg",
    },
    {
      no: 12,
      title: "겨울 세일",
      startDate: "25.12.10",
      endDate: "25.12.25",
      img: "https://image.oliveyoung.co.kr/uploads/images//event/8886174669525415278.jpg",
    },
    {
      no: 13,
      title: "봄 할인 이벤트",
      startDate: "25.03.15",
      endDate: "25.03.30",
      img: "https://image.oliveyoung.co.kr/uploads/images//event/5028824835618889815.jpg",
    },
  ],
};

const CardContainer = styled.div`
  /* padding: 0 5rem; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 3rem;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 3rem;
  grid-gap: 25px 15px;
  padding: 10px;

  @media (max-width: 651px) {
    justify-content: center;
  }
`;

const Card = styled.div`
  width: 382px;
  height: 200px; // 카드 높이 지정
  cursor: pointer;
  /* border: 1px solid rgba(56, 12, 12, 0.125); */
  border-radius: 0.5rem;
  overflow: hidden; // 이미지가 카드 영역 벗어나지 않도록
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardBody = styled.div``;

const CardTitle = styled.h5`
  margin-bottom: 0.5rem;
  font-weight: 500;
`;
const CardContent = styled.h5`
  color: gray;
  font-size: smaller;
`;

const ListComponent = () => {
  const { moveToEventList, moveToEventRead } = useCustomMove();
  const [serverData, setServerData] = useState(initState);

  useEffect(() => {
    // 🔹 실제 API 호출 대신 목업 데이터 사용
    setTimeout(() => {
      console.log("Mock Fetched data:", mockData);
      setServerData(mockData);
    }, 500); // 로딩 느낌 주려고 딜레이
  }, []);

  return (
    <>
      <Row>
        {serverData.dtoList.map((event) => {
          // const imageUrl = event.img
          //   ? `${host}/api/events/view/s_${event.img}`
          //   : "https://via.placeholder.com/150"; // 기본 이미지
          const imageUrl = event.img
            ? event.img.startsWith("http")
              ? event.img // 절대경로(외부 URL) 그대로 사용
              : `${host}/api/events/view/s_${event.img}` // 서버 내부 이미지
            : "https://via.placeholder.com/150";

          return (
            <CardContainer>
              <Card key={event.no} onClick={() => moveToEventRead(event.no)}>
                <CardImage alt="event" src={imageUrl} />
              </Card>
              <CardBody>
                <CardTitle>{event.title}</CardTitle>
                <CardContent>
                  {event.startDate} ~ {event.endDate}
                </CardContent>
              </CardBody>
            </CardContainer>
          );
        })}
      </Row>
    </>
  );
};

export default ListComponent;
