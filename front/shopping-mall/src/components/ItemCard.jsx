import React, { useEffect, useState } from "react";
import {
  Container,
  Wrap,
  ProductContainer,
  Wrapper,
  PlusContainer,
  EditButton,
} from "./ItemCardStyle";
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
        {/* ADMIN이면 맨 앞에 + 카드 추가 */}
        {isAdmin && (
          <PlusContainer
            onClick={() => {
              console.log("page:", page);
              navigate("/admin/upload", {
                state: { salesType: page === "dealdetail" },
              });
              window.scrollTo(0, 0);
            }}
          >
            ➕
          </PlusContainer>
        )}
        {items.map((product) => {
          const isExpired =
            product.endDate && new Date(product.endDate) < new Date();

          const isSoldOut =
            page === "shopdetail" &&
            product.sizes &&
            product.sizes.length > 0 &&
            product.sizes.every((size) => size.stock === 0);

          return (
            <ProductContainer
              key={product.productNo}
              style={{ position: "relative" }}
            >
              <img
                src={
                  product.img ||
                  "https://static.lookpin.co.kr/20230522103305-7865/b5d83dcf8c9a2ace9fbb76650fe33c8b.JPG"
                }
                alt=""
                onClick={() => {
                  if (!isExpired && !isSoldOut) {
                    navigate(`/${page}/${product.productNo}`);
                    window.scrollTo(0, 0);
                  }
                }}
                style={{
                  cursor: isExpired || isSoldOut ? "not-allowed" : "pointer",
                  opacity: isExpired || isSoldOut ? 0.6 : 1,
                }}
              />
              <Wrap>
                <div
                  onClick={() => {
                    if (!isExpired && !isSoldOut) {
                      navigate(`/${page}/${product.productNo}`);
                      window.scrollTo(0, 0);
                    }
                  }}
                  style={{
                    cursor: isExpired || isSoldOut ? "not-allowed" : "pointer",
                  }}
                >
                  <p>
                    {product.productName?.length < 8
                      ? product.productName
                      : product.productName?.slice(0, 7) + "..."}
                  </p>
                  <h4>{Number(product.price).toLocaleString()}원</h4>

                  {/* shop 상품이면 품절 여부 표시 */}
                  {page === "shopdetail" && isSoldOut && (
                    <div
                      style={{
                        position: "absolute",
                        top: "42%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                      }}
                    >
                      품절
                    </div>
                  )}

                  {/* deal일 경우 endDate 표시 */}
                  {page === "dealdetail" && product.endDate && (
                    <p style={{ fontSize: "0.9rem", color: "#ef4444" }}>
                      {isExpired
                        ? "경매 마감"
                        : `~ ${new Date(product.endDate)
                            .toISOString()
                            .slice(2, 10)}`}
                    </p>
                  )}
                </div>
                {isAdmin && (
                  <div>
                    <EditButton
                      to={`/admin/modify/${product.productNo}`}
                      state={{ type: product.type }}
                    >
                      수정
                    </EditButton>
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
