import React, { useState } from "react";
import {
    Container,
    Header,
    Profile,
    Avatar,
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
    ReviewStatus
} from "./MyPageStyle";


const MyPageComponent = () => {
    const [showAll, setShowAll] = useState(false);

    const purchaseHistory = [
        { id: 1, name: "Adidas Superstar Core Black White", size: "260", date: "25/03/22", status: "결제 완료" },
        { id: 2, name: "Nike Air Force 1", size: "270", date: "25/03/23", status: "결제 완료" },
        { id: 3, name: "Converse Chuck 70", size: "250", date: "25/03/24", status: "주문 완료" },
        { id: 4, name: "Vans Old Skool", size: "280", date: "25/03/25", status: "결제 완료" },
        { id: 5, name: "New Balance 574", size: "265", date: "25/03/26", status: "결제 완료" },
        { id: 6, name: "Puma Suede Classic", size: "275", date: "25/03/27", status: "결제 완료" },
        { id: 7, name: "Reebok Club C 85", size: "255", date: "25/03/28", status: "주문 완료" },
    ];

    const displayedItems = showAll ? purchaseHistory : purchaseHistory.slice(0, 5);

    return (
        <>
            <Container>
                <Header>
                    <Profile>
                        <Avatar />
                        <div>
                            <p>test@jjjj.com</p>
                            <p>닉네임</p>
                        </div>
                    </Profile>
                    <Button>프로필 수정</Button>
                </Header>

                <InfoBox>
                    Lv. 1 <Highlight>브론즈</Highlight>
                </InfoBox>

                <ReviewInfo>
                    작성 가능한 후기 <Emphasize>17개</Emphasize>
                </ReviewInfo>
            </Container>

            <Section>
                <Title>구매 내역</Title>

                <StatusBox>
                    <StatusItem>
                        <StatusLabel>전체</StatusLabel>
                        <StatusValue color="red">294</StatusValue>
                    </StatusItem>
                    <StatusItem>
                        <StatusLabel>주문 완료</StatusLabel>
                        <StatusValue>6</StatusValue>
                    </StatusItem>
                    <StatusItem>
                        <StatusLabel>결제 완료</StatusLabel>
                        <StatusValue>288</StatusValue>
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
                                <ReviewStatus href="#">리뷰 올리기</ReviewStatus>
                            </ProductStatus>
                        </ProductMeta>
                    </ListItem>
                ))}

                {!showAll && purchaseHistory.length > 5 && (
                    <Button onClick={() => setShowAll(true)}>전체 보기</Button>
                )}
            </Section>
        </>
    )
}

export default MyPageComponent;