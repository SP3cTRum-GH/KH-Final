import { useEffect, useState } from "react";
import styled from "styled-components";
import useCustomMove from "../../hooks/useCustomMove";
import { getOne } from "../../api/eventApi";
import { API_SERVER_HOST } from "../../api/HostUrl";
import { useSelector } from "react-redux";

const host = API_SERVER_HOST;

const initState = {
  no: "",
  title: "",
  content: "",
  startDate: "",
  endDate: "",
  img: "",
  imageFileNames: [],
};

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

const ExtraImages = styled.div`
  margin-top: 2rem;

  img {
    width: 100%;
    max-height: 400px;
    object-fit: contain;
    border-radius: 0.5rem;
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

  const loginState = useSelector((state) => state.loginSlice);

  const isAdmin =
    loginState.roleNames && loginState.roleNames.includes("ADMIN");

  useEffect(() => {
    if (!no) return;

    getOne(no)
      .then((data) => {
        console.log("✅ 이벤트 데이터:", data);
        setEvent(data);
      })
      .catch((err) => {
        console.error("❌ 이벤트 불러오기 실패:", err);
      });
  }, [no]);

  // 대표 이미지 선택
  const bannerImg = event.imageFileNames?.length
    ? `${host}/api/events/view/${encodeURIComponent(event.imageFileNames[0])}`
    : "https://via.placeholder.com/900x450";

  const extraImgs = event.imageFileNames?.slice(1) || [];

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return dateStr.slice(2, 10); // "25-08-21"
  };

  return (
    <Container>
      {/* 상단 배너 */}
      <Banner bg={bannerImg} />

      {/* 이벤트 정보 */}
      <InfoSection>
        <h2>{event.title}</h2>
        <div className="date">
          {formatDate(event.startDate)} ~ {formatDate(event.endDate)}
        </div>
        <p>{event.content}</p>
      </InfoSection>

      {/* 추가 이미지 */}
      {extraImgs.length > 0 && (
        <ExtraImages>
          {extraImgs.map((file, idx) => (
            <img
              key={idx}
              src={`${host}/api/events/view/${encodeURIComponent(file)}`}
              alt={`event-extra-${idx}`}
            />
          ))}
        </ExtraImages>
      )}

      {/* 버튼 영역 */}
      <ButtonGroup>
        {isAdmin && (
          <button
            className="modify"
            type="button"
            onClick={() => moveToEventModify(no)}
          >
            수정하기
          </button>
        )}
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
