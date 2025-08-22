import { useEffect, useState } from "react";
import styled from "styled-components";
import useCustomMove from "../../hooks/useCustomMove";
import { getAllEvents } from "../../api/eventApi";
import { API_SERVER_HOST } from "../../api/HostUrl";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  height: 200px;
  cursor: pointer;
  border-radius: 0.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isPlus ? "#fff" : "#fff")};
  border: ${(props) => (props.isPlus ? "2px dashed #ccc" : "none")};
  font-size: ${(props) => (props.isPlus ? "3rem" : "inherit")};
  color: ${(props) => (props.isPlus ? "#333" : "inherit")};
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.85;
  }
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

const ListComponent = ({ page }) => {
  const navigate = useNavigate();
  const { moveToEventRead } = useCustomMove();
  const [events, setEvents] = useState([]);
  const loginState = useSelector((state) => state.loginSlice);
  const isAdmin =
    loginState.roleNames && loginState.roleNames.includes("ADMIN");

  useEffect(() => {
    getAllEvents()
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
        {isAdmin && (
          <CardContainer>
            <Card
              isPlus
              onClick={() => {
                console.log("page:", page);
                navigate("/event/add");
                window.scrollTo(0, 0);
              }}
            >
              +
            </Card>
            <CardBody>
              <CardTitle isPlus>새 이벤트 등록</CardTitle>
            </CardBody>
          </CardContainer>
        )}

        {events.map((event) => {
          const imageUrl = event.imageFileNames?.length
            ? `${host}/api/events/view/${event.imageFileNames[0]}`
            : "https://via.placeholder.com/150";

          return (
            <CardContainer key={event.no}>
              <Card
                onClick={() => {
                  moveToEventRead(event.no);
                  window.scrollTo(0, 0);
                }}
              >
                <CardImage alt="event" src={imageUrl} />
              </Card>
              <CardBody>
                <CardTitle>{event.title}</CardTitle>
                <CardContent>
                  {event.startDate
                    ? event.startDate.split("-").join(".").substring(2, 10)
                    : ""}{" "}
                  ~{" "}
                  {event.endDate
                    ? event.endDate.split("-").join(".").substring(2, 10)
                    : ""}
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
