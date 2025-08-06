import React from "react";
import { BtnContainer, SortBtn } from "./SortButtonStyle";

const SortButton = ({ menu }) => {
  return (
    <BtnContainer>
      <div>
        <p>상의</p>
        <p>하의</p>
        <p>신발</p>
      </div>
      <SortBtn>
        <p>최신순</p>
        <p>{menu}</p>
      </SortBtn>
    </BtnContainer>
  );
};

export default SortButton;
