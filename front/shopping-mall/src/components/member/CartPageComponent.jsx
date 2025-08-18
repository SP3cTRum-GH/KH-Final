import React, { useState, useEffect } from "react";

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
  MobileSection,
  FilterBar,
  FilterButton,
  SectionHeader,
} from "./CartPageStyle";
import { getCart } from "../../api/cartApi";
import { getCookie } from "../../util/cookieUtil";

const initData = [
  // type === true : Deal 아이템 (예: 경매/딜)
  {
    id: 1,
    productName: "한정판 운동화",
    price: 5000,
    quantity: 1,
    selectedSize: "270",
    sizes: ["260", "270", "280"],
    img: "/images/shoes.png",
    type: true, // Deal
    dealCurrent: 3, // 예: 현재 참여수/입찰수 등
    endDate: "2025-08-20 23:59", // 딜 종료일
  },
  {
    id: 3,
    productName: "프로틴 패키지",
    price: 19000,
    quantity: 1,
    selectedSize: "FREE",
    sizes: ["FREE"],
    img: "/images/cap.png",
    type: true,
    dealCurrent: 12,
    endDate: "2025-08-25 18:00",
  },

  // type === false : Shop 아이템 (일반 구매)
  {
    id: 2,
    productName: "청바지",
    price: 3000,
    quantity: 1,
    selectedSize: "32",
    sizes: ["30", "32", "34"],
    img: "/images/jeans.png",
    type: false, // Shop
  },
  {
    id: 4,
    productName: "후드티",
    price: 2000,
    quantity: 3,
    selectedSize: "L",
    sizes: ["M", "L", "XL"],
    img: "/images/hoodie.png",
    type: false,
  },
];

const CartPageComponent = () => {
  const [cartItems, setCartItems] = useState(initData);
  const [viewMode, setViewMode] = useState("shop"); // all | deal | shop

  // 그룹 분리 (type 별)
  const [shopCart, setShopCart] = useState([]);
  const [dealCart, setDealCart] = useState([]);

  useEffect(() => {
    setDealCart(cartItems.filter((item) => item.type === true));
    setShopCart(cartItems.filter((item) => item.type === false));
  }, [cartItems]);

  // 체크/합계
  const [allChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // 목록 길이 변화 시 체크 배열 리셋
  useEffect(() => {
    setCheckedItems(new Array(cartItems.length).fill(false));
    setAllChecked(false);
  }, [cartItems.length]);

  // 선택 항목 합계
  useEffect(() => {
    let total = 0;
    checkedItems.forEach((isChecked, idx) => {
      if (!isChecked) return;
      const item = cartItems[idx];
      total += Number(item?.price ?? 0) * Number(item?.quantity ?? 0);
    });
    setTotalPrice(total);
  }, [checkedItems, cartItems]);

  const handleAllCheck = () => {
    const next = !allChecked;
    setAllChecked(next);
    setCheckedItems(new Array(cartItems.length).fill(next));
  };

  const handleSingleCheckByGlobalIndex = (globalIndex) => {
    setCheckedItems((prev) => {
      const next = [...prev];
      next[globalIndex] = !next[globalIndex];
      setAllChecked(next.every(Boolean));
      return next;
    });
  };

  // ===== 옵션 변경 모달 =====
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [modalSize, setModalSize] = useState("");
  const [prevValue, setPrevValue] = useState({ size: "", quantity: 0 });

  const openModal = (item) => {
    setSelectedItem(item);
    const initQty = item.quantity ?? 1;
    const initSize = item.selectedSize ?? item.sizes?.[0] ?? "FREE";
    setModalQuantity(initQty);
    setModalSize(initSize);
    setPrevValue({ size: initSize, quantity: initQty });
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
    // 서버 반영은 API로 대체, 현재는 클라이언트 상태만
    setCartItems((prev) =>
      prev.map((it) =>
        it.id === selectedItem.id
          ? { ...it, quantity: modalQuantity, selectedSize: modalSize }
          : it
      )
    );
    closeModal();
  };

  const checkedCount = checkedItems.filter(Boolean).length;
  const expectedPoints = Math.floor(totalPrice * 0.01);

  // 전역 인덱스 계산 (deal 섹션 + shop 섹션 map에서 공통 체크배열을 쓰기 위해)
  const findGlobalIndex = (item) =>
    cartItems.findIndex(
      (it) => (it.id ?? it.productNo) === (item.id ?? item.productNo)
    );

  // ====== type에 따라 카드 UI를 다르게 렌더링하는 함수 ======
  const renderDealCard = (item) => {
    const globalIndex = findGlobalIndex(item);
    return (
      <ItemBox key={`deal-${item.id ?? globalIndex}`}>
        <Checkbox
          checked={!!checkedItems[globalIndex]}
          onChange={() => handleSingleCheckByGlobalIndex(globalIndex)}
        />
        <ItemImage src={item.img} alt={item.productName} />
        <ItemInfo>
          <ItemName>
            {item.productName}{" "}
            <span style={{ marginLeft: 8, fontSize: 12, color: "#f03e3e" }}>
              [DEAL]
            </span>
          </ItemName>
          <p>
            참여 {item.dealCurrent ?? 0}명 · 종료{" "}
            {item.endDate ? item.endDate : "-"}
          </p>
          <p>
            사이즈: {item.selectedSize ?? "-"} / 수량: {item.quantity ?? 0}개
          </p>
          <Price>
            {(
              Number(item.price ?? 0) * Number(item.quantity ?? 0)
            ).toLocaleString()}
            원
          </Price>
          <ItemOptions>
            <OptionButton type="button" onClick={() => openModal(item)}>
              옵션 변경
            </OptionButton>
          </ItemOptions>
        </ItemInfo>
      </ItemBox>
    );
  };

  const renderShopCard = (item) => {
    const globalIndex = findGlobalIndex(item);
    return (
      <ItemBox key={`shop-${item.id ?? globalIndex}`}>
        <Checkbox
          checked={!!checkedItems[globalIndex]}
          onChange={() => handleSingleCheckByGlobalIndex(globalIndex)}
        />
        <ItemImage src={item.img} alt={item.productName} />
        <ItemInfo>
          <ItemName>
            {item.productName}{" "}
            <span style={{ marginLeft: 8, fontSize: 12, color: "#228be6" }}>
              [SHOP]
            </span>
          </ItemName>
          <p>{item.deliveryMsg ?? "기본 배송"}</p>
          <p>
            사이즈: {item.selectedSize ?? "-"} / 수량: {item.quantity ?? 0}개
          </p>
          <Price>
            {(
              Number(item.price ?? 0) * Number(item.quantity ?? 0)
            ).toLocaleString()}
            원
          </Price>
          <ItemOptions>
            <OptionButton type="button" onClick={() => openModal(item)}>
              옵션 변경
            </OptionButton>
          </ItemOptions>
        </ItemInfo>
      </ItemBox>
    );
  };

  return (
    <CartContainer>
      {/* 왼쪽 : 장바구니 */}
      <LeftSection>
        <Title>장바구니</Title>

        <FilterBar>
          <FilterButton
            type="button"
            data-active={viewMode === "shop"}
            onClick={() => setViewMode("shop")}
          >
            Shop
          </FilterButton>
          <FilterButton
            type="button"
            data-active={viewMode === "deal"}
            onClick={() => setViewMode("deal")}
          >
            Deal
          </FilterButton>
        </FilterBar>

        {/* 전체 선택 */}
        <DeliveryGroup>
          <Checkbox checked={allChecked} onChange={handleAllCheck} /> 전체 선택
        </DeliveryGroup>

        {/* === DEAL 섹션 (type === true) === */}
        {viewMode !== "shop" && (
          <DeliveryGroup>
            <SectionHeader>딜 상품</SectionHeader>
            {dealCart.length > 0 ? (
              dealCart.map((item) => renderDealCard(item))
            ) : (
              <p>딜 상품이 없습니다.</p>
            )}
          </DeliveryGroup>
        )}

        {/* === SHOP 섹션 (type === false) === */}
        {viewMode !== "deal" && (
          <DeliveryGroup>
            <SectionHeader>일반 상품</SectionHeader>
            {shopCart.length > 0 ? (
              shopCart.map((item) => renderShopCard(item))
            ) : (
              <p>일반 상품이 없습니다.</p>
            )}
          </DeliveryGroup>
        )}
      </LeftSection>

      {/* 오른쪽 : 결제 요약 */}
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

      {/* 옵션 변경 모달 (Deal/Shop 공통) */}
      {isModalOpen && selectedItem && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>옵션 변경</ModalHeader>

            <Dropdown
              value={modalSize}
              onChange={(e) => setModalSize(e.target.value)}
            >
              {(selectedItem.sizes ?? ["FREE"]).map((size) => (
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
              가격:{" "}
              {(
                Number(selectedItem.price ?? 0) * Number(modalQuantity ?? 0)
              ).toLocaleString()}
              원
            </PriceDisplay>

            <ModalActions>
              <button onClick={closeModal}>취소</button>
              <button
                onClick={handleOptionChange}
                disabled={
                  (modalSize ?? "") === (prevValue.size ?? "") &&
                  Number(modalQuantity ?? 0) === Number(prevValue.quantity ?? 0)
                }
              >
                변경
              </button>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* 모바일 하단 요약 */}
      <MobileSection>
        <span>{totalPrice.toLocaleString()}원</span>
        <button>구매하기 ({checkedCount}개)</button>
      </MobileSection>
    </CartContainer>
  );
};

export default CartPageComponent;
