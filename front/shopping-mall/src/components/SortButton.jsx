import React, { useState } from "react";
import { BtnContainer, SortBtn } from "./SortButtonStyle";

const SortButton = ({ menu, filterBtn, getList, handlePopular }) => {
  const [category, setCategory] = useState("");

  return (
    <BtnContainer>
      <div>
        <p
          onClick={() => {
            filterBtn("top");
            setCategory("top");
          }}
        >
          상의
        </p>
        <p
          onClick={() => {
            filterBtn("bottom");
            setCategory("bottom");
          }}
        >
          하의
        </p>
        <p
          onClick={() => {
            filterBtn("shoes");
            setCategory("shoes");
          }}
        >
          신발
        </p>
      </div>
      <SortBtn>
        <p
          onClick={() => {
            getList();
            setCategory("");
          }}
        >
          최신순
        </p>
        <p
          onClick={() => {
            handlePopular(category);
          }}
        >
          {menu}
        </p>
      </SortBtn>
    </BtnContainer>
  );
};

export default SortButton;
