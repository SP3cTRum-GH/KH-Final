import React, { useState } from "react";
import {
  OptionContainer,
  PriceBox,
  SalePrice,
  ProductTitle,
  ReviewBox,
  SelectWrapper,
  BuyButton,
  InterestBox,
  PriceContainer,
  OptionBox,
} from "./SelectOptionStyle";
import { useNavigate, useParams } from "react-router-dom";
import { getCookie } from "../../util/cookieUtil";
import { addCart } from "../../api/cartApi";
import { productBuy } from "../../api/purchaseApi";

const SelectOption = ({
  productData,
  scrollToReview,
  handleOpenModal,
  reviewListCount,
}) => {
  const name = productData?.productName ?? "";
  const price = productData?.price ?? 0;
  const culPrice = productData?.dealCurrent ?? 0;
  const sizes = Array.isArray(productData?.sizes) ? productData.sizes : [];
  const reviewCount = Array.isArray(reviewListCount)
    ? reviewListCount.length
    : Number(reviewListCount ?? 0);
  const endDateText = productData?.endDate
    ? String(productData.endDate).slice(0, 10)
    : null;
  const navigate = useNavigate();
  const param = useParams();

  const [selectedSize, setSelectedSize] = useState("");
  const [stock, setStock] = useState(0);
  const [qty, setQty] = useState(1);

  React.useEffect(() => {
    setSelectedSize("");
    setStock(0);
    setQty(1);
  }, [productData?.productNo]);

  const handleSizeChange = (e) => {
    const val = e.target.value;
    setSelectedSize(val);
    const found = sizes.find((s) => String(s.productSize) === String(val));
    const newStock = found?.stock ?? 0;
    setStock(newStock);
    setQty(newStock > 0 ? 1 : 0);
  };

  const handleQtyChange = (e) => {
    const v = Number(e.target.value);
    if (!stock) return setQty(0);
    if (Number.isNaN(v)) return;
    if (v < 1) return setQty(1);
    if (v > stock) return setQty(stock);
    setQty(v);
  };

  const isDeal = productData?.type === true;

  // 버튼(구매/입찰) 클릭 시 타입에 따라 분기
  const handlePrimaryClick = () => {
    if (isDeal) {
      // 딜(경매): 사이즈/수량 선택 없이 모달만 오픈
      if (typeof handleOpenModal === "function") {
        handleOpenModal({
          type: "deal",
          productNo: param.productNo,
          currentPrice: productData?.dealCurrent ?? productData?.price ?? 0,
          defaultSize: "deal",
          defaultQty: 1,
        });
      }
      return;
    }

    // 일반(shop)일 때 기존 구매 로직 실행
    handleBuyClick();
  };

  const handleBuyClick = () => {
    if (!selectedSize) {
      alert("사이즈를 선택해주세요.");
      return;
    }

    if (stock === 0) {
      alert("해당 사이즈는 품절입니다.");
      return;
    }

    if (qty < 1 || qty > stock) {
      alert(`수량은 1 ~ ${stock} 사이로 선택해주세요.`);
      return;
    }

    if (getCookie("member") === undefined) {
      alert("로그인 해주세요.");
      navigate("/login");
      return;
    }

    const fd = {
      productNo: param.productNo,
      quantity: qty,
      size: selectedSize,
    };

    productBuy(fd, getCookie("member").memberId);

    alert("구매 완료");

    location.reload(true);
  };

  const handleCartClick = () => {
    if (isDeal) {
      alert(
        "딜(경매) 상품은 장바구니를 사용할 수 없습니다. 입찰하기를 이용해주세요."
      );
      return;
    }

    if (!selectedSize) {
      alert("사이즈를 선택해주세요.");
      return;
    }

    if (stock === 0) {
      alert("해당 사이즈는 품절입니다.");
      return;
    }

    if (qty < 1 || qty > stock) {
      alert(`수량은 1 ~ ${stock} 사이로 선택해주세요.`);
      return;
    }

    const selectCart = confirm(
      `장바구니 페이지로 이동하시겠습니까? 
      사이즈 : ${selectedSize} 수량 : ${qty}개`
    );

    if (getCookie("member") === undefined) {
      alert("로그인 해주세요.");
      navigate("/login");
      return;
    }

    const fd = {
      productNo: param.productNo,
      quantity: qty,
      size: selectedSize,
    };

    if (!selectCart) {
      setQty(1);
      setSelectedSize("");
      return;
    }

    addCart(getCookie("member").memberId, fd).then((data) => {
      console.log("장바구니 추가 완료:", data);

      if (selectCart) {
        navigate("/cart", { replace: true }); // 완료 후 이동
      }
    });
  };

  return (
    <OptionContainer>
      <ProductTitle>{name}</ProductTitle>

      <PriceContainer>
        <PriceBox>
          <SalePrice>
            {isDeal
              ? Number(culPrice).toLocaleString()
              : Number(price).toLocaleString()}{" "}
            원
          </SalePrice>
        </PriceBox>

        <ReviewBox>
          <a
            href="#review"
            onClick={(e) => {
              e.preventDefault();
              scrollToReview();
            }}
          >
            리뷰 {reviewCount}
          </a>
        </ReviewBox>
      </PriceContainer>

      <OptionBox>
        <SelectWrapper>
          {isDeal ? <></> : <label htmlFor="sizeSelect">사이즈</label>}

          {endDateText && <p>기간 : {endDateText}</p>}
          {isDeal ? (
            <></>
          ) : (
            <>
              <select
                id="sizeSelect"
                value={selectedSize}
                onChange={handleSizeChange}
              >
                <option value="" disabled>
                  선택
                </option>
                {sizes.map((size, idx) => (
                  <option
                    key={size.productSize ?? idx}
                    value={size.productSize}
                  >
                    {size.productSize}
                  </option>
                ))}
              </select>
              <p>
                {selectedSize
                  ? stock > 0
                    ? `재고 ${stock}개`
                    : "품절"
                  : "사이즈를 선택하세요"}
              </p>
            </>
          )}
        </SelectWrapper>

        <SelectWrapper>
          {isDeal ? (
            <></>
          ) : (
            <>
              <label htmlFor="qtyInput">수량</label>
              <div>
                <button
                  type="button"
                  disabled={!selectedSize || stock === 0 || qty <= 1}
                  onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                >
                  -
                </button>
                <input
                  id="qtyInput"
                  type="number"
                  min={1}
                  max={stock || 1}
                  value={qty}
                  onChange={handleQtyChange}
                  disabled={!selectedSize || stock === 0}
                />
                <button
                  type="button"
                  disabled={!selectedSize || stock === 0 || qty >= stock}
                  onClick={() =>
                    setQty((prev) => Math.min(stock || 1, prev + 1))
                  }
                >
                  +
                </button>
              </div>
            </>
          )}
        </SelectWrapper>

        <BuyButton
          onClick={handlePrimaryClick}
          disabled={isDeal ? false : !selectedSize || stock === 0}
        >
          {isDeal ? "입찰하기" : "구매하기"}
        </BuyButton>

        {!isDeal && (
          <InterestBox onClick={handleCartClick}>장바구니</InterestBox>
        )}
      </OptionBox>
    </OptionContainer>
  );
};

export default SelectOption;
