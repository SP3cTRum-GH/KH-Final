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
      img: "https://xkxqjlzvieat874751.gcdn.ntruss.com/2/2025/ee43/2ee4395d1feb5133785e230fad3d0b61008678c14c5606506624ceeaf1dd6aaa3_o_mv.gif",
    },
    {
      no: 2,
      title: "가을 페스티벌",
      startDate: "25.09.10",
      endDate: "25.09.20",
      img: "https://blog.kakaocdn.net/dna/s0Xai/btsGidZB1JE/AAAAAAAAAAAAAAAAAAAAAOG41CVYZXLIaejdgQSPwDfiPwAwVWY6eYDO2ZYwfQ6o/img.gif?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1756652399&allow_ip=&allow_referer=&signature=ejR7R%2BLVXQzIjRA58UwRYxTkiTI%3D",
    },
    {
      no: 3,
      title: "겨울 세일",
      startDate: "25.12.01",
      endDate: "25.12.15",
      img: "https://i.namu.wiki/i/DfzlaTHEJiDhRYeE4Ug4ohu_KdDDnwZj9CSJldP6Qz-a4gSceW3NkB49dR_Po6XMUheD9EdDuRt_iCReljfdMQ.gif",
    },
    {
      no: 4,
      title: "겨울 세일",
      startDate: "25.12.01",
      endDate: "25.12.15",
      img: "https://blog.kakaocdn.net/dna/dEP3bF/btsPDIJM5o8/AAAAAAAAAAAAAAAAAAAAAKmTe_TM9I06orIzljkTBBfFr6EvmTqPVAJ9HxcmZ1Ff/img.gif?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1756652399&allow_ip=&allow_referer=&signature=YbUw74xIxQLLe9MIwPw3ma3doRc%3D",
    },
    {
      no: 5,
      title: "겨울 세일",
      startDate: "25.12.01",
      endDate: "25.12.15",
      img: "https://i.pinimg.com/originals/0a/ee/c2/0aeec2ba41778699b398dfeead09e41a.gif",
    },
    {
      no: 6,
      title: "여름 이벤트",
      startDate: "25.06.10",
      endDate: "25.06.25",
      img: "https://i.pinimg.com/originals/d6/f4/17/d6f4173864da959e624999e9b5a7335c.gif",
    },
    {
      no: 7,
      title: "가을 이벤트",
      startDate: "25.09.10",
      endDate: "25.09.25",
      img: "https://i.pinimg.com/originals/47/1a/3b/471a3ba086b56e21e5e92186c4a889fb.gif",
    },
    {
      no: 8,
      title: "겨울 이벤트",
      startDate: "25.12.05",
      endDate: "25.12.20",
      img: "https://blog.kakaocdn.net/dna/cJFfF4/btsLSgb4PDR/AAAAAAAAAAAAAAAAAAAAADhtJGGyJXP1peL3TqiGUSlixA-WMZD48nUd5muhzJRo/img.gif?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1756652399&allow_ip=&allow_referer=&signature=PYogSJnk5CsHspvSh2uwOupGMjI%3D",
    },
    {
      no: 9,
      title: "봄 이벤트",
      startDate: "25.03.10",
      endDate: "25.03.25",
      img: "https://i.namu.wiki/i/f7ibHrdE1Xg5I7N5VxwnBW7SEw6PnmyGsBUOmNmz6PtJ0WwAHd8qwNHU9xMfN5v_EeyKkg7eHJxHiZN0GpHgRA.gif",
    },
    {
      no: 10,
      title: "여름 할인",
      startDate: "25.06.15",
      endDate: "25.06.30",
      img: "https://i.namu.wiki/i/Q8fXgsPM_4_iJCPJILyj0VMQOx5uH3E3ZLALmgC4BSe2FyLyI5_Ih4r7Zy6tX80Zt9Al060fvIYzR8-JxsYSNQ.gif",
    },
    {
      no: 11,
      title: "가을 세일",
      startDate: "25.09.15",
      endDate: "25.09.30",
      img: "https://mblogthumb-phinf.pstatic.net/MjAxODEwMTlfMTEz/MDAxNTM5ODkyNTA1NjQ0._qkjw1qs1XK6MHYbCrMQ0ijvk5O4ZAOszlMVRfZgjPcg.S8YfO0vBFTU5j7X4wHsESTUhtTJmXdZ9lBsmTn8hNLog.GIF.zigzag121/181018_%ED%9A%8C%EB%B3%B5%ED%9A%8C_006-1.gif?type=w800",
    },
    {
      no: 12,
      title: "겨울 세일",
      startDate: "25.12.10",
      endDate: "25.12.25",
      img: "https://blinkarea.synology.me/xe/files/attach/images/138/895/122/f751b56660150b4549891fbfc4863ca5.gif",
    },
    {
      no: 13,
      title: "봄 할인 이벤트",
      startDate: "25.03.15",
      endDate: "25.03.30",
      img: "https://i.pinimg.com/originals/ab/de/9e/abde9edc0abe720f7040530c44f706bd.gif",
    },
    {
      no: 14,
      title: "여름 페스티벌",
      startDate: "25.06.20",
      endDate: "25.07.05",
      img: "https://i.pinimg.com/originals/52/12/75/5212752f4225f8f6adad020102c17a1b.gif",
    },
    {
      no: 15,
      title: "가을 페스티벌",
      startDate: "25.09.20",
      endDate: "25.10.05",
      img: "https://i3.ruliweb.com/ori/23/11/20/18be912be4b17fc3a.gif",
    },
    {
      no: 16,
      title: "겨울 이벤트",
      startDate: "25.12.15",
      endDate: "25.12.31",
      img: "https://i.namu.wiki/i/SjyWoVW350Q4HJny005F-O5HV7eIyfffG6dAPlGnbCZAaG4C1XYA68oRRyQehtcDAvnlUi9wT1YBhQlVcuNE-g.gif",
    },
    {
      no: 17,
      title: "봄 페스티벌",
      startDate: "25.03.20",
      endDate: "25.04.05",
      img: "https://via.placeholder.com/150/00FA9A/000000?text=17",
    },
    {
      no: 18,
      title: "여름 세일",
      startDate: "25.06.25",
      endDate: "25.07.10",
      img: "https://via.placeholder.com/150/FF8C00/000000?text=18",
    },
    {
      no: 19,
      title: "가을 세일",
      startDate: "25.09.25",
      endDate: "25.10.10",
      img: "https://via.placeholder.com/150/4169E1/000000?text=19",
    },
    {
      no: 20,
      title: "겨울 세일",
      startDate: "25.12.20",
      endDate: "25.12.31",
      img: "https://via.placeholder.com/150/BA55D3/000000?text=20",
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
