import React, { useEffect, useState } from "react";
import { Container, Wrap, ProductContainer, Wrapper } from "./ItemCardStyle";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteProductItem } from "../api/productShopApi";

const ItemCard = ({ page, dtoList }) => {
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.loginSlice);
  const isAdmin =
    loginState.roleNames && loginState.roleNames.includes("ADMIN");

  const [items, setItems] = useState(dtoList || []);

  useEffect(() => {
    setItems(dtoList || []);
  }, [dtoList]);

  const handleDelete = async (productNo) => {
    try {
      const result = confirm(`${productNo}번 상품을 삭제 하시겠습니까?`);
      if (result) {
        await deleteProductItem(productNo);
      } else {
        return;
      }
      // Optimistic UI update: remove the item locally
      setItems((prev) => prev.filter((p) => p.productNo !== productNo));
    } catch (err) {
      console.error("Delete failed", err);
      // Optional: show toast/alert
    }
  };

  return (
    <Wrapper>
      <Container>
        {items.map((product, i) => {
          return (
            <ProductContainer key={product.productNo}>
              <img
                src={product.img}
                alt=""
                onClick={() => {
                  navigate(`/${page}/${product.productNo}`);
                  window.scrollTo(0, 0);
                }}
              />
              <Wrap>
                <div
                  onClick={() => {
                    navigate(`/${page}/${product.productNo}`);
                    window.scrollTo(0, 0);
                  }}
                >
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
                    <button onClick={() => handleDelete(product.productNo)}>
                      삭제
                    </button>
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
