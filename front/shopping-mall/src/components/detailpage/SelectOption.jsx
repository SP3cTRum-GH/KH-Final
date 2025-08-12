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

const SelectOption = ({ productData, scrollToReview, handleOpenModal }) => {
  const name = productData?.productName ?? "";
  const price = productData?.price ?? 0;

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
          <select>
            <option>선택</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
          </select>
        </SelectWrapper>

        <BuyButton onClick={handleOpenModal}>구매하기</BuyButton>

        <InterestBox>장바구니</InterestBox>
      </OptionBox>
    </OptionContainer>
  );
};

export default SelectOption;
