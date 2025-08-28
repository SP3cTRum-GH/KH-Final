import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getCookie } from "../../util/cookieUtil";
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
  ReviewBtn,
} from "./MyPageStyle";
import { getPurchaseList } from "../../api/purchaseApi";
import { deleteReview, getUserReviewList } from "../../api/reviewApi";
import { API_SERVER_HOST } from "../../api/HostUrl";
import { checkPassword } from "../../api/memberApi";

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
      enable: false,
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [user, setUser] = useState({ email: "test@jjjj.com", name: "이름" });
  const [filterType, setFilterType] = useState("all"); // 'all', 'toReview', 'reviewed', 'disableReview'
  const purchaseCount = purchaseHistory.length;
  const [editForm, setEditForm] = useState({ memberName: "", memberEmail: "" });
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [reviews, setReviews] = useState([]); // 리뷰 목록 (enabled)
  const [disabledReviews, setDisabledReviews] = useState([]); // 삭제된 리뷰 목록 (disabled)
  const [reviewCount, setReviewCount] = useState(0);

  const member = getCookie("member");

  useEffect(() => {
    getPurchaseList(getCookie("member").memberId).then((data) => {
      setPurchaseHistory(data);
    });

    if (member) {
      getUserReviewList(member.memberId).then((data) => {
        // 리뷰 목록에서 enable === true 인 것만 필터링
        const enabledReviews = Array.isArray(data)
          ? data.filter((review) => review.enable === true)
          : [];

        // enable === false 인 삭제된 리뷰 필터링
        const disabledReviewsList = Array.isArray(data)
          ? data.filter((review) => review.enable === false)
          : [];

        setReviewCount(enabledReviews.length);
        setReviews(enabledReviews);
        setDisabledReviews(disabledReviewsList);
      });
    }
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

  const paymentCompletedCount = purchaseHistory.length;

  const toReviewCount = purchaseHistory.filter(
    (item) => !item.isReviewed
  ).length;

  const filteredHistory = purchaseHistory.filter((item) => {
    if (filterType === "all") {
      return true;
    } else if (filterType === "toReview") {
      return !item.isReviewed;
    } else if (filterType === "reviewed") {
      return item.isReviewed;
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

    getPurchaseList(member.memberId).then((data) => {
      setPurchaseHistory(data);
    });
  }, []);

  if (!user) return <div>로딩 중...</div>;

  const displayedItems = showAll
    ? filteredHistory
    : filteredHistory.slice(0, 5);

  const handlePasswordCheck = async (e) => {
    e.preventDefault();

    try {
      const result = await checkPassword(user.memberId, password);
      if (result === true) {
        navigate("/modifymypage");
      }
    } catch (err) {
      setErrorMsg("비밀번호가 일치하지 않습니다.");
    }
  };

  const handleReviewDelete = async (reviewNo) => {
    if (!reviewNo) return;

    // 1) 낙관적 업데이트: 화면에서 먼저 제거
    setReviews((prev) => prev.filter((r) => r.reviewNo !== reviewNo));

    try {
      // 2) 서버 삭제 완료를 보장
      await deleteReview(reviewNo);
    } catch (err) {
      console.error(err);
    } finally {
      // 3) 서버 상태와 동기화
      if (member?.memberId) {
        try {
          const data = await getUserReviewList(member.memberId);
          const enabledReviews = Array.isArray(data)
            ? data.filter((review) => review.enable === true)
            : [];
          const disabledReviewsList = Array.isArray(data)
            ? data.filter((review) => review.enable === false)
            : [];
          setReviews(enabledReviews);
          setDisabledReviews(disabledReviewsList);
        } catch (e) {
          console.error(e);
        }
      }
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
          Lv. {currentLevel.level} <Highlight>{currentLevel.name}</Highlight>
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
          <StatusItem
            onClick={() => setFilterType("reviewed")}
            style={{ cursor: "pointer" }}
          >
            <StatusLabel>작성된 리뷰</StatusLabel>
            <StatusValue>{reviewCount}</StatusValue>
          </StatusItem>
          <StatusItem
            onClick={() => setFilterType("disableReview")}
            style={{ cursor: "pointer" }}
          >
            <StatusLabel>삭제된 리뷰</StatusLabel>
            <StatusValue>{disabledReviews.length}</StatusValue>
          </StatusItem>
        </StatusBox>

        {filterType === "reviewed" ? (
          <>
            {reviews.length === 0 ? (
              <p>아직 작성된 리뷰가 없습니다.</p>
            ) : (
              reviews.map((review, idx) => (
                <ListItem key={review.reviewNo ?? idx}>
                  {review.reviewImg ? (
                    <ProductImage
                      src={`${API_SERVER_HOST}${review.reviewImg}`}
                      onError={(e) => {
                        e.currentTarget.style.visibility = "hidden";
                      }}
                    />
                  ) : (
                    <></>
                  )}
                  <ProductInfo>
                    <ProductName>{review.productName}</ProductName>
                    <ProductSize>
                      평점 : {review.rating} 점
                      <br />
                      내용 : {review.content}
                    </ProductSize>
                  </ProductInfo>
                  <ProductMeta>
                    <ReviewBtn>
                      <p
                        onClick={() =>
                          navigate(`/reviewmodify/${review.reviewNo}`, {
                            state: {
                              type: review.type,
                              productNo: review.productNo,
                            },
                          })
                        }
                      >
                        수정
                      </p>
                      <p onClick={() => handleReviewDelete(review.reviewNo)}>
                        삭제
                      </p>
                    </ReviewBtn>
                  </ProductMeta>
                </ListItem>
              ))
            )}
          </>
        ) : filterType === "disableReview" ? (
          <>
            {disabledReviews.length === 0 ? (
              <p>삭제된 리뷰가 없습니다.</p>
            ) : (
              disabledReviews.map((review, idx) => (
                <ListItem key={review.reviewNo ?? idx}>
                  {review.reviewImg ? (
                    <ProductImage
                      src={`${API_SERVER_HOST}${review.reviewImg}`}
                      onError={(e) => {
                        e.currentTarget.style.visibility = "hidden";
                      }}
                    />
                  ) : (
                    <></>
                  )}
                  <ProductInfo>
                    <ProductName>{review.productName}</ProductName>
                    <ProductSize>
                      평점 : {review.rating} 점
                      <br />
                      내용 : {review.content}
                    </ProductSize>
                  </ProductInfo>
                  <ProductMeta>
                    <ReviewStatus>관리자의 의해 삭제 되었습니다</ReviewStatus>
                  </ProductMeta>
                </ListItem>
              ))
            )}
          </>
        ) : (
          <>
            {displayedItems.map((item, idx) => (
              <ListItem
                key={
                  item.logNo ?? `${item.productNo}-${item.regDate ?? ""}-${idx}`
                }
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(
                    item.type
                      ? `/dealdetail/${item.productNo}`
                      : `/shopdetail/${item.productNo}`
                  );
                  window.scrollTo(0, 0);
                }}
              >
                {item.img ? (
                  <ProductImage
                    src={`${API_SERVER_HOST}${item.img}`}
                    alt={item.productName || "product"}
                    onError={(e) => {
                      e.currentTarget.style.visibility = "hidden";
                    }}
                  />
                ) : (
                  <div
                    style={{ width: 60, height: 60, background: "#f2f2f2" }}
                  />
                )}
                <ProductInfo>
                  <ProductName>{item.productName}</ProductName>
                  <ProductSize>
                    사이즈 : {item.size} <br /> 구매 수량 : {item.quantity}개
                  </ProductSize>
                </ProductInfo>
                <ProductMeta>
                  <ProductDate>
                    {item.regDate
                      ? item.regDate.split("-").join(".").slice(0, 10)
                      : "-"}
                  </ProductDate>
                  <ProductStatus>
                    결제 완료
                    {item.isReviewed ? (
                      <ReviewStatus>리뷰 완료</ReviewStatus>
                    ) : (
                      <ReviewStatus
                        as={Link}
                        to={`/review/${item.productNo}`}
                        state={{ type: item.type, logNo: item.logNo }}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.scrollTo(0, 0);
                        }}
                      >
                        리뷰 올리기
                      </ReviewStatus>
                    )}
                  </ProductStatus>
                </ProductMeta>
              </ListItem>
            ))}

            {!showAll && purchaseHistory.length > 5 && (
              <ViewAllBtn onClick={() => setShowAll(true)}>
                전체 보기
              </ViewAllBtn>
            )}
          </>
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
