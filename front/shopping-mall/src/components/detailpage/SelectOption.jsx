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
import { useNavigate } from "react-router-dom";

const SelectOption = ({ productData, scrollToReview, handleOpenModal }) => {
  const name = productData?.productName ?? "";
  const price = productData?.price ?? 0;
  const sizes = productData?.sizes ?? [];
  const navigate = useNavigate();

  const [selectedSize, setSelectedSize] = useState("");
  const [stock, setStock] = useState(0);
  const [qty, setQty] = useState(1);

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

    alert(`사이즈 : ${selectedSize} 수량 : ${qty}개`);
  };

  const handleCartClick = () => {
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

    if (selectCart) {
      navigate("/cart");
    } else {
      alert("감사합니다.");
    }
  };

  return (
    <OptionContainer>
      <ProductTitle>{name}</ProductTitle>

      <PriceContainer>
        <PriceBox>
          <SalePrice>{Number(price).toLocaleString()} 원</SalePrice>
        </PriceBox>

        <ReviewBox>
          <a
            href="#review"
            onClick={(e) => {
              e.preventDefault();
              scrollToReview();
            }}
          >
            리뷰 347
          </a>
        </ReviewBox>
      </PriceContainer>

      <OptionBox>
        <SelectWrapper>
          <label htmlFor="sizeSelect">사이즈</label>
          <select
            id="sizeSelect"
            value={selectedSize}
            onChange={handleSizeChange}
          >
            <option value="" disabled>
              선택
            </option>
            {sizes.map((size, idx) => (
              <option key={size.productSize ?? idx} value={size.productSize}>
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
        </SelectWrapper>

        <SelectWrapper>
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
              onClick={() => setQty((prev) => Math.min(stock || 1, prev + 1))}
            >
              +
            </button>
          </div>
        </SelectWrapper>

        <BuyButton
          onClick={handleBuyClick}
          disabled={!selectedSize || stock === 0}
        >
          구매하기
        </BuyButton>

        <InterestBox onClick={handleCartClick}>장바구니</InterestBox>
      </OptionBox>
    </OptionContainer>
  );
};

export default SelectOption;
