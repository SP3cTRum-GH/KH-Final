// src/components/common/PageComponent.jsx
import React from "react";
import styled from "styled-components";

const PageButton = styled.button`
  padding: 6px 14px;
  margin: 0 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  color: #333;
  cursor: pointer;
  font-size: 1rem;
  outline: none;

  &:hover {
    background: #d5d4d4;
  }

  &.active {
    background-color: #333;
    color: #fff;
    border: 1px solid #333;
  }
`;

const PageComponent = ({ type, listData, moveToProductList }) => {
  const { prev, next, pageNumList, current, prevPage, nextPage } = listData;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "1rem 0",
      }}
    >
      {/* 이전 버튼 */}
      {prev && (
        <PageButton onClick={() => moveToProductList({ page: prevPage }, type)}>
          이전
        </PageButton>
      )}

      {/* 페이지 번호 */}
      {pageNumList.map((pageNum) => (
        <PageButton
          key={pageNum}
          className={pageNum === current ? "active" : ""}
          onClick={() => moveToProductList({ page: pageNum }, type)}
        >
          {pageNum}
        </PageButton>
      ))}

      {/* 다음 버튼 */}
      {next && (
        <PageButton onClick={() => moveToProductList({ page: nextPage }, type)}>
          다음
        </PageButton>
      )}
    </div>
  );
};

export default PageComponent;
