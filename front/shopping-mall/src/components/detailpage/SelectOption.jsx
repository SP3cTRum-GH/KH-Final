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

const SelectOption = ({ scrollToReview, handleOpenModal }) => {
  return (
    <OptionContainer>
      <ProductTitle>Suade Baggy Denim Black</ProductTitle>

      <PriceContainer>
        <PriceBox>
          <SalePrice>47,200원</SalePrice>
        </PriceBox>

        <ReviewBox>
          <a onClick={scrollToReview}>리뷰 347</a>
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
