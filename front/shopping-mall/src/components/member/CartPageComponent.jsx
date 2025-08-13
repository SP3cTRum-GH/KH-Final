import React, { useState, useEffect } from 'react';

import {
    CartContainer,
    LeftSection,
    RightSection,
    Title,
    DeliveryGroup,
    ItemBox,
    Checkbox,
    ItemImage,
    ItemInfo,
    ItemName,
    ItemOptions,
    OptionButton,
    Price,
    SummaryBox,
    SummaryRow,
    PurchaseButton,
    Notice,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    Dropdown,
    QuantityControl,
    PriceDisplay,
    ModalActions,
    MobileSection
} from './CartPageStyle';

const CartPageComponent = ({ list }) => {

    const initialData = [
        {
            id: 1,
            img: "https://s3.marpple.co/f1/2022/6/1330618_1655959465368_49189.png",
            productName: "white t-shirt",
            price: "140000",
            sizes: ['S', 'M', 'L', 'XL'],
            selectedSize: 'M',
            quantity: 1,
        },
        {
            id: 2,
            img: "https://s3.marpple.co/f1/2022/6/1330618_1655959465368_491.png",
            productName: "black t-shirt",
            price: "150000",
            sizes: ['S', 'M', 'L', 'XL'],
            selectedSize: 'L',
            quantity: 2,
        },
    ];

    const [cartItems, setCartItems] = useState(list || initialData);
    const [allChecked, setAllChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [changeValue, setChangeValue] = useState(false);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalQuantity, setModalQuantity] = useState(1);
    const [modalSize, setModalSize] = useState('');
    const [prevValue, setPrevValue] = useState({ size: '', quantity: 0 });


    useEffect(() => {
        setCheckedItems(new Array(cartItems.length).fill(false));
    }, [cartItems.length]);

    useEffect(() => {
        calculateTotalPrice();
    }, [checkedItems, cartItems]);

    // const chgangeOption = () => {
    //     if(changeValue) {

    //     }
    // }
    const calculateTotalPrice = () => {
        let total = 0;
        checkedItems.forEach((isChecked, index) => {
            if (isChecked) {
                const item = cartItems[index];
                total += parseInt(item.price, 10) * item.quantity;
            }
        });
        setTotalPrice(total);
    };

    const handleAllCheck = () => {
        const newAllChecked = !allChecked;
        setAllChecked(newAllChecked);
        setCheckedItems(new Array(cartItems.length).fill(newAllChecked));
    };

    const handleSingleCheck = (index) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = !newCheckedItems[index];
        setCheckedItems(newCheckedItems);
        setAllChecked(newCheckedItems.every(Boolean));
    };

    const openModal = (item) => {
        setSelectedItem(item);
        setModalQuantity(item.quantity);
        setModalSize(item.selectedSize);
        setPrevValue({ size: item.selectedSize, quantity: item.quantity });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    const handleModalQuantityChange = (amount) => {
        setModalQuantity((prev) => Math.max(1, prev + amount));
    };

    const handleOptionChange = () => {
        const newCartItems = cartItems.map(item => {
            if (item.id === selectedItem.id) {
                return { ...item, quantity: modalQuantity, selectedSize: modalSize };
            }
            return item;
        });
        setCartItems(newCartItems);
        closeModal();
    };


    const checkedCount = checkedItems.filter(Boolean).length;
    const expectedPoints = Math.floor(totalPrice * 0.01);


    return (
        <CartContainer>
            {/* 왼쪽 장바구니 목록 */}
            <LeftSection>
                <Title>장바구니</Title>
                <DeliveryGroup>
                    <Checkbox checked={allChecked} onChange={handleAllCheck} /> 전체 선택
                    {cartItems && cartItems.length > 0 ? (
                        cartItems.map((item, index) => (
                            <ItemBox key={item.id}>
                                <Checkbox checked={checkedItems[index]} onChange={() => handleSingleCheck(index)} />
                                <ItemImage src={item.img} alt={item.productName} />
                                <ItemInfo>
                                    <ItemName>{item.productName}</ItemName>
                                    <p>사이즈: {item.selectedSize} / 수량: {item.quantity}개</p>
                                    <Price>{(Number(item.price) * item.quantity).toLocaleString()}원</Price>
                                    <ItemOptions>
                                        <OptionButton onClick={() => openModal(item)}>옵션 변경</OptionButton>
                                    </ItemOptions>
                                </ItemInfo>
                            </ItemBox>
                        ))
                    ) : (
                        <p>장바구니에 담긴 상품이 없습니다.</p>
                    )}
                </DeliveryGroup>
            </LeftSection>

            {/* 오른쪽 결제 박스 */}
            <RightSection>
                <Title>구매 금액</Title>
                <SummaryBox>
                    <SummaryRow>
                        <span>상품 금액</span>
                        <span>{totalPrice.toLocaleString()}원</span>
                    </SummaryRow>
                    <SummaryRow>
                        <span>배송비</span>
                        <span>무료배송</span>
                    </SummaryRow>
                    <SummaryRow>
                        <strong>총 구매 금액</strong>
                        <strong>{totalPrice.toLocaleString()}원</strong>
                    </SummaryRow>
                </SummaryBox>

                <Notice>적립 혜택 예상 최대 {expectedPoints.toLocaleString()}원</Notice>

                <PurchaseButton>구매하기 ({checkedCount}개)</PurchaseButton>
            </RightSection>

            {isModalOpen && selectedItem && (
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>옵션 변경</ModalHeader>
                        <Dropdown value={modalSize} onChange={(e) => setModalSize(e.target.value)}>
                            {selectedItem.sizes.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </Dropdown>
                        <QuantityControl>
                            <button onClick={() => handleModalQuantityChange(-1)}>-</button>
                            <span>{modalQuantity}</span>
                            <button onClick={() => handleModalQuantityChange(1)}>+</button>
                        </QuantityControl>
                        <PriceDisplay>
                            가격: {(parseInt(selectedItem.price, 10) * modalQuantity).toLocaleString()}원
                        </PriceDisplay>
                        <ModalActions>
                            <button onClick={closeModal}>취소</button>

                            <button
                                onClick={handleOptionChange}
                                disabled={modalSize === prevValue.size && modalQuantity === prevValue.quantity}
                            >
                                변경
                            </button>
                        </ModalActions>
                    </ModalContent>
                </ModalOverlay>
            )}
            {/* 모바일용 하단 요약 구매 버튼 */}
            <MobileSection>
                <span>{totalPrice.toLocaleString()}원</span>
                <button>구매하기 ({checkedCount}개)</button>
            </MobileSection>

        </CartContainer>
    );
};

export default CartPageComponent;
