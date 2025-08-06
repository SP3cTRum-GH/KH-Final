import React, { useState } from "react";

const SelectOption = () => {
  const [count, setCount] = useState(0);
  const type = 1;

  const upCount = () => {
    setCount(count + 1);
  };

  const downCount = () => {
    if (count === 0) {
      setCount(0);
    } else {
      setCount(count - 1);
    }
  };

  return (
    <div>
      <div>
        <h3>상품 옵션</h3>
        <label>
          사이즈:
          <select>
            <option>S</option>
            <option>M</option>
            <option>L</option>
          </select>
        </label>
        <label>
          색상:
          <select>
            <option>White</option>
            <option>Black</option>
            <option>Blue</option>
          </select>
        </label>
        <div>
          <button onClick={downCount}>-</button>
          {count}
          <button onClick={upCount}>+</button>
        </div>
        <button>장바구니에 추가</button>
      </div>
    </div>
  );
};

export default SelectOption;
