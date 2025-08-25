import React from "react";
import { BtnContainer, SortBtn } from "./SortButtonStyle";

const SortButton = ({ menu, filterBtn, getList }) => {
  return (
    <BtnContainer>
      <div>
        <p
          onClick={() => {
            filterBtn("top");
          }}
        >
          상의
        </p>
        <p
          onClick={() => {
            filterBtn("bottom");
          }}
        >
          하의
        </p>
        <p
          onClick={() => {
            filterBtn("shoes");
          }}
        >
          신발
        </p>
      </div>
      <SortBtn>
        <p onClick={() => getList()}>최신순</p>
        <p>{menu}</p>
      </SortBtn>
    </BtnContainer>
  );
};

export default SortButton;
