import { useEffect, useState } from "react";
import styled from "styled-components";
// import { getList } from "../../api/eventApi";  // 👈 목업 모드에서는 주석 처리
import useCustomMove from "../../hooks/useCustomMove";
import { getList } from "../../api/eventApi";
import { API_SERVER_HOST } from "../../api/HostUrl";

const host = API_SERVER_HOST;

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
  const { moveToEventRead } = useCustomMove();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getList()
      .then((data) => {
        console.log("✅ 이벤트 리스트:", data);
        setEvents(data);
      })
      .catch((err) => {
        console.error("❌ 이벤트 불러오기 실패:", err);
      });
  }, []);

  return (
    <>
      <Row>
        {events.map((event) => {
          const imageUrl = event.imageFileNames?.length
            ? `${host}/api/events/view/${event.imageFileNames[0]}`
            : "https://via.placeholder.com/150";

          return (
            <CardContainer key={event.no}>
              <Card onClick={() => moveToEventRead(event.no)}>
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
