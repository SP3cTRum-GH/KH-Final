import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getCookie } from "../../util/cookieUtil";
import axios from "axios";
import {
  ProfileBox,
  Header,
  Profile,
  Button,
  InfoBox,
  Highlight,
  ReviewInfo,
  Emphasize,
  Section,
  Title,
  StatusBox,
  StatusItem,
  StatusLabel,
  StatusValue,
  ListItem,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductSize,
  ProductMeta,
  ProductDate,
  ProductStatus,
  ReviewStatus,
  ViewAllBtn,
  ModalOverlay,
  ModalContent,
  CloseBtnWrapper,
  CloseBtn,
  LevelStatus,
  ProgressBar,
  ProgressFill,
  LevelRange,
  ProfileBtnWrapper,
} from "./MyPageStyle";
import { getPuchaseList } from "../../api/purchaseApi";

const MyPageComponent = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [purchaseHistory, setPurchaseHistory] = useState([
    {
      img: "",
      isReviewed: false,
      logNo: 0,
      memberId: "",
      price: 0,
      productName: "",
      productNo: 0,
      regDate: "",
      size: "",
      type: false,
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [user, setUser] = useState({ email: "test@jjjj.com", name: "이름" });
  const [filterType, setFilterType] = useState("all"); // 'all', 'toReview', 'reviewed'
  const purchaseCount = 7; // 예시 값 (props나 API로 받아오도록 나중에 변경 가능)
  const [editForm, setEditForm] = useState({ memberName: "", memberEmail: "" });
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    getPuchaseList(getCookie("member").memberId).then((data) => {
      setPurchaseHistory(data);
    });
  }, []);

  const levelInfo = [
    { level: 1, name: "브론즈", min: 0, max: 9 },
    { level: 2, name: "실버", min: 10, max: 19 },
    { level: 3, name: "골드", min: 20, max: 29 },
    { level: 4, name: "플래티넘", min: 30, max: 39 },
    { level: 5, name: "다이아몬드", min: 40, max: Infinity },
  ];

  const currentLevel = levelInfo.find(
    (lvl) => purchaseCount >= lvl.min && purchaseCount <= lvl.max
  );
  const nextLevel = levelInfo.find(
    (lvl) => lvl.level === currentLevel.level + 1
  );

  const percent = nextLevel
    ? ((purchaseCount - currentLevel.min) /
        (nextLevel.min - currentLevel.min)) *
      100
    : 100;

  const handleReview = (itemId) => {
    alert("리뷰 작성이 완료되었습니다");
    setPurchaseHistory((prevHistory) =>
      prevHistory.map((item) =>
        item.id === itemId ? { ...item, reviewed: true } : item
      )
    );
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    navigate("/modifymypage");
  };

  const paymentCompletedCount = purchaseHistory.filter(
    (item) => item.status === "결제 완료"
  ).length;
  const reviewedCount = purchaseHistory.filter((item) => item.reviewed).length;
  const toReviewCount = paymentCompletedCount - reviewedCount;

  const filteredHistory = purchaseHistory.filter((item) => {
    if (filterType === "all") {
      return true;
    } else if (filterType === "toReview") {
      return item.status === "결제 완료" && !item.reviewed;
    } else if (filterType === "reviewed") {
      return item.reviewed;
    }
    return true;
  });

  // 쿠키 기반으로 사용자 정보 세팅
  useEffect(() => {
    const member = getCookie("member");
    console.log("🍪 쿠키 값:", member);

    if (!member) {
      console.error("❌ member 쿠키가 없습니다.");
      return;
    }

    setUser(member);
    setEditForm({
      memberName: member.memberName || "",
      memberEmail: member.memberEmail || "",
    });
  }, []);

  if (!user) return <div>로딩 중...</div>;

  const displayedItems = showAll
    ? filteredHistory
    : filteredHistory.slice(0, 5);

  const handlePasswordCheck = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:8080/api/member/checkpw?memberId=${user.memberId}`,
        password,
        {
          headers: { "Content-Type": "text/plain" },
          withCredentials: true,
        }
      );

      if (res.data === true) {
        navigate("/modifymypage");
      }
    } catch (err) {
      setErrorMsg("❌ 비밀번호가 일치하지 않습니다.");
    }
  };
  return (
    <>
      <ProfileBox>
        <Header>
          <Profile>
            <div>
              <p>ID {user.memberId}</p>
              <p>이름 {user.memberName}</p>
            </div>
          </Profile>
          <Button onClick={() => setIsProfileModalOpen(true)}>설정</Button>
        </Header>

        <InfoBox onClick={() => setIsModalOpen(true)}>
          Lv. 1 <Highlight>브론즈</Highlight>
        </InfoBox>

        <ReviewInfo>
          작성 가능한 후기 <Emphasize>{toReviewCount}개</Emphasize>
        </ReviewInfo>
      </ProfileBox>

      <Section>
        <Title>구매 내역 ({purchaseHistory.length})</Title>

        <StatusBox>
          <StatusItem
            onClick={() => setFilterType("all")}
            style={{ cursor: "pointer" }}
          >
            <StatusLabel>결제 완료</StatusLabel>
            <StatusValue color="red">{paymentCompletedCount}</StatusValue>
          </StatusItem>
          <StatusItem
            onClick={() => setFilterType("toReview")}
            style={{ cursor: "pointer" }}
          >
            <StatusLabel>리뷰 올리기</StatusLabel>
            <StatusValue>{toReviewCount}</StatusValue>
          </StatusItem>
        </StatusBox>

        {displayedItems.map((item) => (
          <ListItem key={item.productNo}>
            <ProductImage src={item.img} alt={item.name} />
            <ProductInfo>
              <ProductName>{item.productName}</ProductName>
              <ProductSize>사이즈 : {item.size}</ProductSize>
            </ProductInfo>
            <ProductMeta>
              <ProductDate>
                {item.regDate.split("-").join(".").slice(0, 10)}
              </ProductDate>
              <ProductStatus>
                결재 완료
                {item.isReviewed ? (
                  <ReviewStatus as="span">리뷰 완료</ReviewStatus>
                ) : (
                  <ReviewStatus
                    as={Link}
                    to={`/review/${item.productNo}`}
                    state={{ type: item.type }}
                  >
                    리뷰 올리기
                  </ReviewStatus>
                )}
              </ProductStatus>
            </ProductMeta>
          </ListItem>
        ))}

        {!showAll && purchaseHistory.length > 5 && (
          <ViewAllBtn onClick={() => setShowAll(true)}>전체 보기</ViewAllBtn>
        )}
      </Section>

      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h3>등급 안내</h3>

            <LevelStatus>
              현재 등급: <strong>{currentLevel.name}</strong> ({purchaseCount}회
              구매)
            </LevelStatus>

            <ProgressBar>
              <ProgressFill percent={percent} />
            </ProgressBar>
            <LevelRange>
              {currentLevel.name}
              {nextLevel && (
                <span>
                  {nextLevel.name}까지 {nextLevel.min - purchaseCount}회 남음
                </span>
              )}
            </LevelRange>
            <ul>
              <li>Lv. 1 브론즈: 0~9회 구매</li>
              <li>Lv. 2 실버: 10~19회 구매</li>
              <li>Lv. 3 골드: 20~29회 구매</li>
              <li>Lv. 4 플래티넘: 30~39회 구매</li>
              <li>Lv. 5 다이아몬드: 40회 이상 구매</li>
            </ul>
            <CloseBtnWrapper>
              <CloseBtn onClick={() => setIsModalOpen(false)}>닫기</CloseBtn>
            </CloseBtnWrapper>
          </ModalContent>
        </ModalOverlay>
      )}

      {isProfileModalOpen && (
        <ModalOverlay onClick={() => setIsProfileModalOpen(false)}>
          <ModalContent
            as="form"
            onSubmit={handlePasswordCheck}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>비밀번호 확인</h3>
            <ul>
              <li>
                <label>
                  정보를 보호하기 위해 비밀번호를 다시 한 번 입력해주세요
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호 입력"
                />
              </li>
            </ul>
            {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
            <ProfileBtnWrapper>
              <CloseBtn type="submit">입력</CloseBtn>
              <CloseBtn onClick={() => setIsProfileModalOpen(false)}>
                닫기
              </CloseBtn>
            </ProfileBtnWrapper>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default MyPageComponent;
