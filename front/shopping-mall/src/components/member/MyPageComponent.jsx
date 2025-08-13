import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const MyPageComponent = () => {
    const navigate = useNavigate();
    const [showAll, setShowAll] = useState(false);
    const [purchaseHistory, setPurchaseHistory] = useState([
        { id: 1, name: "Adidas Superstar Core Black White", size: "260", date: "25/03/22", status: "결제 완료", reviewed: false },
        { id: 2, name: "Nike Air Force 1", size: "270", date: "25/03/23", status: "결제 완료", reviewed: true },
        { id: 3, name: "Converse Chuck 70", size: "250", date: "25/03/24", status: "결제 완료", reviewed: false },
        { id: 4, name: "Vans Old Skool", size: "280", date: "25/03/25", status: "결제 완료", reviewed: false },
        { id: 5, name: "New Balance 574", size: "265", date: "25/03/26", status: "결제 완료", reviewed: false },
        { id: 6, name: "Puma Suede Classic", size: "275", date: "25/03/27", status: "결제 완료", reviewed: true },
        { id: 7, name: "Reebok Club C 85", size: "255", date: "25/03/28", status: "결제 완료", reviewed: false },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [user, setUser] = useState({ email: "test@jjjj.com", name: "이름" });
    const [filterType, setFilterType] = useState('all'); // 'all', 'toReview', 'reviewed'
    const purchaseCount = 7; // 예시 값 (props나 API로 받아오도록 나중에 변경 가능)

    const levelInfo = [
        { level: 1, name: '브론즈', min: 0, max: 9 },
        { level: 2, name: '실버', min: 10, max: 19 },
        { level: 3, name: '골드', min: 20, max: 29 },
        { level: 4, name: '플래티넘', min: 30, max: 39 },
        { level: 5, name: '다이아몬드', min: 40, max: Infinity },
    ];

    const currentLevel = levelInfo.find(lvl => purchaseCount >= lvl.min && purchaseCount <= lvl.max);
    const nextLevel = levelInfo.find(lvl => lvl.level === currentLevel.level + 1);

    const percent = nextLevel
        ? ((purchaseCount - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100
        : 100;



    const handleReview = (itemId) => {
        alert("리뷰 작성이 완료되었습니다");
        setPurchaseHistory(prevHistory =>
            prevHistory.map(item =>
                item.id === itemId ? { ...item, reviewed: true } : item
            )
        );
    };

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        navigate("/modifymypage");
    };

    const paymentCompletedCount = purchaseHistory.filter(item => item.status === "결제 완료").length;
    const reviewedCount = purchaseHistory.filter(item => item.reviewed).length;
    const toReviewCount = paymentCompletedCount - reviewedCount;

    const filteredHistory = purchaseHistory.filter(item => {
        if (filterType === 'all') {
            return true;
        } else if (filterType === 'toReview') {
            return item.status === "결제 완료" && !item.reviewed;
        } else if (filterType === 'reviewed') {
            return item.reviewed;
        }
        return true;
    });

    const displayedItems = showAll ? filteredHistory : filteredHistory.slice(0, 5);

    return (
        <>
            <ProfileBox>
                <Header>
                    <Profile>
                        <div>
                            <p>{user.email}</p>
                            <p>{user.name}</p>
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
                    <StatusItem onClick={() => setFilterType('all')} style={{ cursor: 'pointer' }}>
                        <StatusLabel>결제 완료</StatusLabel>
                        <StatusValue color="red">{paymentCompletedCount}</StatusValue>
                    </StatusItem>
                    <StatusItem onClick={() => setFilterType('toReview')} style={{ cursor: 'pointer' }}>
                        <StatusLabel>리뷰 올리기</StatusLabel>
                        <StatusValue>{toReviewCount}</StatusValue>
                    </StatusItem>
                </StatusBox>

                {displayedItems.map(item => (
                    <ListItem key={item.id}>
                        <ProductImage src="" alt={item.name} />
                        <ProductInfo>
                            <ProductName>{item.name}</ProductName>
                            <ProductSize>{item.size}</ProductSize>
                        </ProductInfo>
                        <ProductMeta>
                            <ProductDate>{item.date}</ProductDate>
                            <ProductStatus>
                                {item.status}
                                {item.status === '결제 완료' && (
                                    item.reviewed ? (
                                        <ReviewStatus as="span">리뷰 완료</ReviewStatus>
                                    ) : (
                                        <ReviewStatus href="#" onClick={(e) => { e.preventDefault(); handleReview(item.id); }}>리뷰 올리기</ReviewStatus>
                                    )
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
                            현재 등급: <strong>{currentLevel.name}</strong> ({purchaseCount}회 구매)
                        </LevelStatus>

                        <ProgressBar>
                            <ProgressFill percent={percent} />
                        </ProgressBar>
                        <LevelRange>
                            {currentLevel.name}
                            {nextLevel && <span>{nextLevel.name}까지 {nextLevel.min - purchaseCount}회 남음</span>}
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
                    <ModalContent as="form" onSubmit={handleProfileUpdate} onClick={(e) => e.stopPropagation()}>
                        <h3>비밀번호 확인</h3>
                        <ul>
                            <li>
                                <label>정보를 보호하기 위해 비밀번호를 다시 한 번 입력해주세요</label>
                                <input type="password" name="password" defaultValue={user.password} placeholder="비밀번호 입력" />
                            </li>
                        </ul>
                        <ProfileBtnWrapper>
                            <CloseBtn type="submit">입력</CloseBtn>
                            <CloseBtn onClick={() => setIsProfileModalOpen(false)}>닫기</CloseBtn>
                        </ProfileBtnWrapper>
                    </ModalContent>
                </ModalOverlay>
            )}

        </>
    )
}

export default MyPageComponent;
