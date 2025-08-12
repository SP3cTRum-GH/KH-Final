import React, { useState } from "react";
import { Container, Wrap, ProductContainer, Wrapper } from "./ItemCardStyle";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ItemCard = ({ page, dtoList }) => {
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.loginSlice);
  const isAdmin =
    loginState.roleNames && loginState.roleNames.includes("ADMIN");

  return (
    <Wrapper>
      <Container>
        {dtoList.map((product, i) => {
          return (
            <ProductContainer
              key={i}
              onClick={() => {
                navigate(`/${page}/${product.productNo}`);
                window.scrollTo(0, 0);
              }}
            >
              <img src={product.img} alt="" />
              <Wrap>
                <div>
                  <p>
                    {product.productName?.length < 8
                      ? product.productName
                      : product.productName?.slice(0, 7) + "..."}
                  </p>
                  <h4>{Number(product.price).toLocaleString()}원</h4>
                </div>
                {isAdmin && (
                  <div>
                    <button>수정</button>
                    <button>삭제</button>
                  </div>
                )}
              </Wrap>
            </ProductContainer>
          );
        })}
      </Container>
    </Wrapper>
  );
};

export default ItemCard;
