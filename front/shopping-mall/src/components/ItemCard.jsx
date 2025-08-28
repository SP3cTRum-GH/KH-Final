import React, { useState, useEffect } from "react";
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
import { attachFirstDealImages } from "../api/productDealApi";
import { attachFirstShopImages } from "../api/productShopApi";

const ItemCard = ({ page, dtoList }) => {
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.loginSlice);
  const isAdmin =
    loginState.roleNames && loginState.roleNames.includes("ADMIN");

  const [items, setItems] = useState(dtoList || []);

  useEffect(() => {
    const fetchFirstImages = async () => {
      if (!dtoList) return;

      try {
        let updatedItems = [];
        if (page === "dealdetail") {
          updatedItems = await attachFirstDealImages(dtoList);
        } else {
          updatedItems = await attachFirstShopImages(dtoList);
        }
        setItems(updatedItems);
      } catch (err) {
        console.error("첫 번째 이미지 가져오기 실패:", err);
      }
    };

    fetchFirstImages();
  }, [dtoList, page]);

  const handleDelete = async (productNo) => {
    try {
      const result = confirm(`${productNo}번 상품을 삭제 하시겠습니까?`);
      if (result) {
        await deleteProductItem(productNo);
      } else {
        return;
      }

      setItems((prev) => prev.filter((p) => p.productNo !== productNo));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <Wrapper>
      <Container>
        {isAdmin && (
          <PlusContainer
            onClick={() => {
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
                src={product.img ? `http://localhost:8080${product.img}` : null}
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
                  {product.type ? (
                    <h4>{Number(product.dealCurrent).toLocaleString()}원</h4>
                  ) : (
                    <h4>{Number(product.price).toLocaleString()}원</h4>
                  )}

                  {page === "shopdetail" && isSoldOut && (
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -70%)",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        color: "white",
                        padding: "20px",
                        borderRadius: "50%",
                        fontSize: "25px",
                        fontWeight: "bold",
                        width: "60px",
                        height: "60px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                      }}
                    >
                      SOLD OUT
                    </div>
                  )}

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
