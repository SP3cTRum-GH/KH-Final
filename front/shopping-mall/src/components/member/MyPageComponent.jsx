import React, { useState } from "react";
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
    CloseBtn
} from "./MyPageStyle";


const MyPageComponent = () => {
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


    const handleReview = (itemId) => {
        alert("리뷰 작성이 완료되었습니다");
        setPurchaseHistory(prevHistory =>
            prevHistory.map(item =>
                item.id === itemId ? { ...item, reviewed: true } : item
            )
        );
    };

    const paymentCompletedCount = purchaseHistory.filter(item => item.status === "결제 완료").length;
    const reviewedCount = purchaseHistory.filter(item => item.reviewed).length;

    const displayedItems = showAll ? purchaseHistory : purchaseHistory.slice(0, 5);

    const grades = [
        { level: 1, name: "브론즈", condition: "구매 0~4건" },
        { level: 2, name: "실버", condition: "구매 5~9건" },
        { level: 3, name: "골드", condition: "구매 10~19건" },
        { level: 4, name: "플래티넘", condition: "구매 20~29건" },
        { level: 5, name: "다이아몬드", condition: "구매 30건 이상" }
    ];

    return (
        <>
            <ProfileBox>
                <Header>
                    <Profile>
                        <div>
                            <p>test@jjjj.com</p>
                            <p>이름</p>
                        </div>
                    </Profile>
                    <Button>프로필 수정</Button>
                </Header>

                <InfoBox onClick={() => setIsModalOpen(true)}>
                    Lv. 1 <Highlight>브론즈</Highlight>
                </InfoBox>

                <ReviewInfo>
                    작성 가능한 후기 <Emphasize>{paymentCompletedCount - reviewedCount}개</Emphasize>
                </ReviewInfo>
            </ProfileBox>

            <Section>
                <Title>구매 내역 ({purchaseHistory.length})</Title>

                <StatusBox>
                    <StatusItem>
                        <StatusLabel>결제 완료</StatusLabel>
                        <StatusValue color="red">{paymentCompletedCount}</StatusValue>
                    </StatusItem>
                    <StatusItem>
                        <StatusLabel>리뷰 작성</StatusLabel>
                        <StatusValue>{reviewedCount}</StatusValue>
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
                        <ul>
                            <li>Lv. 1 브론즈: 0~9회 구매</li>
                            <li>Lv. 2 실버: 10~19회 구매</li>
                            <li>Lv. 3 골드: 20~29회 구매</li>
                            <li>Lv. 4 플래티넘: 30~39회 구매</li>
                            <li>Lv. 5 다이아몬드: 40회 이상 구매</li>
                        </ul>
                        <CloseBtn onClick={() => setIsModalOpen(false)}>닫기</CloseBtn>
                    </ModalContent>
                </ModalOverlay>
            )}

        </>
    )
}

export default MyPageComponent;