import React, { useState } from "react";
import { BtnContainer, SortBtn } from "./SortButtonStyle";

const SortButton = ({ menu, filterBtn, getList, handlePopular }) => {
  // 정렬 모드 여부(인기순 모드인지)
  const [isPopularMode, setIsPopularMode] = useState(false);
  // 현재 선택 카테고리(top | bottom | shoes | "")
  const [activeCategory, setActiveCategory] = useState("");

  // 카테고리 클릭 시: 현재 모드에 맞게 호출
  const handleCategoryClick = (value) => {
    setActiveCategory(value);
    if (isPopularMode) {
      handlePopular(value);
    } else {
      filterBtn(value);
    }
  };

  // 최신순 클릭: 리스트 리셋 + 상태 초기화
  const handleLatestClick = () => {
    getList();
    setActiveCategory("");
    setIsPopularMode(false);
  };

  // 우측 메뉴(예: 인기순) 클릭: 모드 토글 후 현재 카테고리에 맞춰 재호출
  const handleMenuToggle = () => {
    const nextMode = !isPopularMode;
    setIsPopularMode(nextMode);

    if (nextMode) {
      handlePopular(activeCategory);
    } else {
      filterBtn(activeCategory);
    }
  };

  return (
    <BtnContainer>
      <div>
        <p
          className={activeCategory === "top" ? "active" : ""}
          aria-pressed={activeCategory === "top"}
          onClick={() => handleCategoryClick("top")}
        >
          상의
        </p>
        <p
          className={activeCategory === "bottom" ? "active" : ""}
          aria-pressed={activeCategory === "bottom"}
          onClick={() => handleCategoryClick("bottom")}
        >
          하의
        </p>
        <p
          className={activeCategory === "shoes" ? "active" : ""}
          aria-pressed={activeCategory === "shoes"}
          onClick={() => handleCategoryClick("shoes")}
        >
          신발
        </p>
      </div>

      <SortBtn>
        <p onClick={handleLatestClick}>최신순</p>
        <p
          className={isPopularMode ? "active" : ""}
          aria-pressed={isPopularMode}
          onClick={handleMenuToggle}
        >
          {menu /* 예: '인기순' 같은 라벨 */}
        </p>
      </SortBtn>
    </BtnContainer>
  );
};

export default SortButton;
