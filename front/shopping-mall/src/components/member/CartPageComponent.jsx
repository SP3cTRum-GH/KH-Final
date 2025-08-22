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
  CartDeleteButton,
  DealTime,
} from "./CartPageStyle";
import { cartPay, deleteCart, getCart, updateCart } from "../../api/cartApi";
import { getCookie } from "../../util/cookieUtil";
import { getDealOne } from "../../api/productDealApi";
import { getShopOne } from "../../api/productShopApi";

const initData = [
  // type === true : Deal 아이템 (예: 경매/딜)
  {
    cartItemNo: 0,
    productNo: 0,
    productName: "",
    quantity: 0,
    price: 0,
    type: false,
    size: null,
    imgUrl: null,
  },
];

const itemData = [{}];

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

  useEffect(() => {
    getCart(getCookie("member").memberId).then((data) => {
      setCartItems(data);
    });
  }, []);

  // 체크/합계 - cartItemNo 기반으로 관리
  const [allChecked, setAllChecked] = useState(false);
  const [checkedMap, setCheckedMap] = useState({}); // { [cartItemNo]: boolean }
  const [totalPrice, setTotalPrice] = useState(0);

  // cartItems 변경 시 체크맵 초기화/동기화
  useEffect(() => {
    const next = {};
    for (const it of cartItems) {
      next[it.cartItemNo] = checkedMap[it.cartItemNo] ?? false;
    }
    setCheckedMap(next);
    setAllChecked(
      cartItems.length > 0 && cartItems.every((it) => next[it.cartItemNo])
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  // 선택 항목 합계
  useEffect(() => {
    let total = 0;
    for (const it of cartItems) {
      if (checkedMap[it.cartItemNo]) {
        total += Number(it?.price ?? 0);
      }
    }
    setTotalPrice(total);
  }, [checkedMap, cartItems]);

  // --- sizes normalizer: unify to [{value,label,stock?,id?}] ---
  const normalizeSizes = (raw) => {
    const arr = Array.isArray(raw) ? raw : [];
    const norm = arr
      .filter((s) => s != null) // skip null/undefined
      .map((s) => {
        if (typeof s === "string" || typeof s === "number") {
          return { value: String(s), label: String(s) };
        }
        return {
          value: String(s.productSize ?? s.size ?? s.code ?? s.value ?? "FREE"),
          label: String(
            s.productSize ?? s.size ?? s.label ?? s.value ?? "FREE"
          ),
          stock: s.stock,
          id: s.productSizeNo ?? s.id ?? undefined,
        };
      });
    const seen = new Set();
    return norm.filter((s) =>
      seen.has(s.value) ? false : (seen.add(s.value), true)
    );
  };

  const handleOpenOptions = async (item) => {
    try {
      const apiFn = item?.type ? getDealOne : getShopOne; // true => deal, false => shop
      const res = await apiFn(item.productNo);

      setCurrentPrice(res.dealCurrent);

      if (item?.type) {
        const base = Number(res?.dealCurrent ?? item.price ?? 0);
        setBidPrice(base + MIN_BID_STEP);
      } else {
        setBidPrice(0);
      }

      const rawSizes = res?.sizes ||
        res?.sizeList ||
        res?.data?.sizes ||
        res?.product?.sizes || ["FREE"];

      const sizes = normalizeSizes(rawSizes);

      const currentSize =
        item?.size && typeof item.size === "object"
          ? String(
              item.size?.productSize ?? item.size?.size ?? item.size?.value
            )
          : String(item?.size ?? "");

      const initSize = currentSize || sizes?.[0]?.value || "FREE";
      const initQty = Number(item?.quantity ?? 1);

      setSelectedItem({ ...item, sizes });
      setModalQuantity(initQty);
      setModalSize(initSize);
      setPrevValue({ size: initSize, quantity: initQty });
      setIsModalOpen(true);
    } catch (e) {
      if (item?.type) {
        const base = Number(item?.price ?? 0);
        setBidPrice(base > 0 ? base + MIN_BID_STEP : 0);
      } else {
        setBidPrice(0);
      }
      const sizes = normalizeSizes(item?.sizes ?? ["FREE"]);
      const initQty = Number(item?.quantity ?? 1);
      const initSize = sizes?.[0]?.value || "FREE";

      setSelectedItem({ ...item, sizes });
      setModalQuantity(initQty);
      setModalSize(initSize);
      setPrevValue({ size: initSize, quantity: initQty });
      setIsModalOpen(true);
    }
  };

  const handleSingleCheck = (cartItemNo) => {
    setCheckedMap((prev) => {
      const next = { ...prev, [cartItemNo]: !prev[cartItemNo] };
      setAllChecked(
        cartItems.length > 0 && cartItems.every((it) => next[it.cartItemNo])
      );
      return next;
    });
  };

  // ===== 옵션 변경 모달 =====
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [modalSize, setModalSize] = useState("");
  const [prevValue, setPrevValue] = useState({ size: "", quantity: 0 });
  const [currentPrice, setCurrentPrice] = useState(0);
  const [bidPrice, setBidPrice] = useState(0);
  const MIN_BID_STEP = 1000; // 딜(경매) 최소 호가 단위

  const openModal = (item) => {
    // 이전에는 즉시 모달을 열었지만, 이제는 상세 호출로 사이즈를 채운 뒤 오픈
    handleOpenOptions(item);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleModalQuantityChange = (amount) => {
    setModalQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleOptionChange = async () => {
    try {
      const memberId = getCookie("member").memberId;

      // 딜(경매) 상품은 최소 호가 이상인지 검사
      if (selectedItem?.type) {
        const minAllow = Number(currentPrice ?? 0);
        if (Number(bidPrice) < minAllow) {
          alert(
            `입찰가는 최소 ${minAllow.toLocaleString()}원 이상이어야 합니다.`
          );
          return;
        }
      }

      // PATCH payload
      const payload = selectedItem?.type
        ? { quantity: modalQuantity, price: Number(bidPrice) } // 딜은 입찰가 포함
        : { quantity: modalQuantity }; // 샵은 수량만

      // 1) 서버에 반영
      await updateCart(memberId, selectedItem.cartItemNo, payload);

      // 2) 서버 최신 장바구니 재조회 → 상태 갱신(리렌더링 보장)
      const fresh = await getCart(memberId);
      setCartItems(fresh);

      // 클라이언트 상태 반영 (딜이면 price도 갱신)
      setCartItems((prev) =>
        prev.map((it) =>
          it.cartItemNo === selectedItem.cartItemNo
            ? {
                ...it,
                quantity: modalQuantity,
                size: modalSize,
                ...(selectedItem?.type ? { price: Number(bidPrice) } : {}),
              }
            : it
        )
      );
    } catch (err) {
      console.error("옵션 변경 실패:", err);
    } finally {
      closeModal();
    }
  };

  const handleDeleteCart = async (cartItemNo) => {
    const msg = confirm("삭제 하시겠습니까?");

    try {
      if (msg) {
        const memberId = getCookie("member")?.memberId;

        await deleteCart(memberId, cartItemNo);

        // 클라이언트 상태에서 해당 아이템 제거
        setCartItems((prev) =>
          prev.filter((it) => it.cartItemNo !== cartItemNo)
        );

        // 체크맵 동기화
        setCheckedMap((prev) => {
          const { [cartItemNo]: _removed, ...rest } = prev;
          return rest;
        });

        // 모달이 해당 아이템을 가리키고 있었다면 닫기
        if (isModalOpen && selectedItem?.cartItemNo === cartItemNo) {
          closeModal();
        }
      }
    } catch (err) {
      console.log("삭제 실패 : ", err);
    }
  };

  const checkedCount = Object.values(checkedMap).filter(Boolean).length;
  const expectedPoints = Math.floor(totalPrice * 0.01);

  // 구매 버튼 핸들러
  const handlePurchase = async () => {
    // shopCart에서 체크된 항목만 필터
    const checkedItems = shopCart.filter((item) => checkedMap[item.cartItemNo]);
    const checkedCartItemNos = {
      cartItemNo: checkedItems.map((item) => item.cartItemNo),
    };
    if (checkedCartItemNos.cartItemNo.length === 0) {
      alert("구매 상품을 확인해주세요.");
      return;
    }

    const memberId = await getCookie("member").memberId;

    await cartPay(memberId, checkedCartItemNos);

    alert("구매 완료!");

    const fresh = await getCart(memberId);
    setCartItems(fresh);
  };

  // ====== type에 따라 카드 UI를 다르게 렌더링하는 함수 ======
  const renderDealCard = (item) => {
    return (
      <ItemBox key={`deal-${item.cartItemNo}`}>
        <ItemImage src={item.img || item.imgUrl || ""} alt={item.productName} />
        <ItemInfo>
          <ItemName>
            {item.productName}{" "}
            <span style={{ marginLeft: 8, fontSize: 12, color: "#f03e3e" }}>
              [DEAL]
            </span>
          </ItemName>

          <DealTime>
            경매 기간 : {item.startDate.slice(2, 10)} ~{" "}
            {item.endDate.slice(2, 10)}
          </DealTime>

          {(() => {
            const displaySize =
              item?.size && typeof item.size === "object"
                ? item.size.productSize ??
                  item.size.size ??
                  item.size.value ??
                  "-"
                : item?.size ?? "-";
            return (
              <p>
                사이즈: {displaySize} / 수량: {item.quantity ?? 0}개
              </p>
            );
          })()}
          <Price>
            나의 입찰 가격 :{" "}
            {(Number(item.price ?? 0) / item.quantity).toLocaleString()} 원 /
            최고 가격 : {Number(item.dealCurrent).toLocaleString()}원{" "}
          </Price>
          <ItemOptions>
            <OptionButton type="button" onClick={() => openModal(item)}>
              옵션 변경
            </OptionButton>
          </ItemOptions>
        </ItemInfo>
        <CartDeleteButton onClick={() => handleDeleteCart(item.cartItemNo)}>
          삭제
        </CartDeleteButton>
      </ItemBox>
    );
  };

  const renderShopCard = (item) => {
    return (
      <ItemBox key={`shop-${item.cartItemNo}`}>
        <Checkbox
          type="checkbox"
          checked={!!checkedMap[item.cartItemNo]}
          onChange={() => handleSingleCheck(item.cartItemNo)}
        />
        <ItemImage src={item.img || item.imgUrl || ""} alt={item.productName} />
        <ItemInfo>
          <ItemName>
            {item.productName}{" "}
            <span style={{ marginLeft: 8, fontSize: 12, color: "#228be6" }}>
              [SHOP]
            </span>
          </ItemName>
          <p>{item.deliveryMsg ?? "기본 배송"}</p>
          {(() => {
            const displaySize =
              item?.size && typeof item.size === "object"
                ? item.size.productSize ??
                  item.size.size ??
                  item.size.value ??
                  "-"
                : item?.size ?? "-";
            return (
              <p>
                사이즈: {displaySize} / 수량: {item.quantity ?? 0}개
              </p>
            );
          })()}
          <Price>{Number(item.price ?? 0).toLocaleString()}원</Price>
          <ItemOptions>
            <OptionButton type="button" onClick={() => openModal(item)}>
              옵션 변경
            </OptionButton>
          </ItemOptions>
        </ItemInfo>
        <CartDeleteButton onClick={() => handleDeleteCart(item.cartItemNo)}>
          삭제
        </CartDeleteButton>
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

        {/* === DEAL 섹션 (type === true) === */}
        {viewMode !== "shop" && (
          <DeliveryGroup>
            <SectionHeader>Deal</SectionHeader>
            {dealCart.length > 0 ? (
              dealCart.map((item) => renderDealCard(item))
            ) : (
              <p>상품이 없습니다.</p>
            )}
          </DeliveryGroup>
        )}

        {/* === SHOP 섹션 (type === false) === */}
        {viewMode !== "deal" && (
          <DeliveryGroup>
            <SectionHeader>Shop</SectionHeader>
            {shopCart.length > 0 ? (
              shopCart.map((item) => renderShopCard(item))
            ) : (
              <p>상품이 없습니다.</p>
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
        <PurchaseButton onClick={handlePurchase}>
          구매하기 ({checkedCount}개)
        </PurchaseButton>
      </RightSection>

      {/* 옵션 변경 모달 (Deal/Shop 공통) */}
      {isModalOpen && selectedItem && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>옵션 변경</ModalHeader>
            <Dropdown
              value={modalSize}
              onChange={(e) => setModalSize(e.target.value)}
              disabled
            >
              {(selectedItem.sizes ?? [{ value: "FREE", label: "FREE" }]).map(
                (s) => (
                  <option key={String(s.id ?? s.value)} value={s.value}>
                    {s.label}
                    {s.stock != null ? ` (재고 ${s.stock})` : ""}
                  </option>
                )
              )}
            </Dropdown>
            {selectedItem?.type && (
              <div>
                <ModalHeader>입찰 변경</ModalHeader>
                <input
                  type="number"
                  value={bidPrice}
                  min={Number(currentPrice ?? 0) + MIN_BID_STEP || 0}
                  step={MIN_BID_STEP}
                  onChange={(e) => {
                    const v = Number(e.target.value || 0);
                    setBidPrice(v);
                  }}
                  style={{
                    width: "87%",
                    padding: "10px",
                    marginBottom: "20px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    fontSize: "15px",
                  }}
                />
                <span> 원</span>
              </div>
            )}
            <QuantityControl>
              <button onClick={() => handleModalQuantityChange(-1)}>-</button>
              <span>{modalQuantity}</span>
              <button onClick={() => handleModalQuantityChange(1)}>+</button>
            </QuantityControl>
            <PriceDisplay>
              {selectedItem?.type ? (
                <>입찰 가격: {Number(bidPrice ?? 0).toLocaleString()}원</>
              ) : (
                <>
                  판매가: {Number(selectedItem.price ?? 0).toLocaleString()}원
                </>
              )}
            </PriceDisplay>
            {selectedItem?.type && (
              <PriceDisplay>
                현재 가격: {Number(currentPrice ?? 0).toLocaleString()}원
              </PriceDisplay>
            )}
            <ModalActions>
              <button onClick={closeModal}>취소</button>
              <button
                onClick={handleOptionChange}
                disabled={
                  (modalSize ?? "") === (prevValue.size ?? "") &&
                  Number(modalQuantity ?? 0) ===
                    Number(prevValue.quantity ?? 0) &&
                  (!selectedItem?.type ||
                    Number(bidPrice ?? 0) === Number(selectedItem?.price ?? 0))
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
        <button onClick={handlePurchase}>구매하기 ({checkedCount}개)</button>
      </MobileSection>
    </CartContainer>
  );
};

export default CartPageComponent;
