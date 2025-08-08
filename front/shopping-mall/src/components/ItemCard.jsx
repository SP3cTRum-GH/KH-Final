import React from "react";
import { Container, Wrap, ProductContainer, Wrapper } from "./ItemCardStyle";
import { useNavigate } from "react-router-dom";

const initData = [
  {
    img: "https://s3.marpple.co/f1/2022/6/1330618_1655959465368_49189.png",
    productName: "white t-shirt",
    price: "140000",
  },
  {
    img: "https://s3.marpple.co/f1/2022/6/1330618_1655959465368_49189.png",
    productName: "white t-shirt",
    price: "140000",
  },
  {
    img: "https://s3.marpple.co/f1/2022/6/1330618_1655959465368_49189.png",
    productName: "white t-shirt",
    price: "140000",
  },
  {
    img: "https://s3.marpple.co/f1/2022/6/1330618_1655959465368_49189.png",
    productName: "white t-shirt",
    price: "140000",
  },
  {
    img: "https://s3.marpple.co/f1/2022/6/1330618_1655959465368_49189.png",
    productName: "white t-shirt",
    price: "140000",
  },
  {
    img: "https://s3.marpple.co/f1/2022/6/1330618_1655959465368_49189.png",
    productName: "white t-shirt",
    price: "140000",
  },
  {
    img: "https://s3.marpple.co/f1/2022/6/1330618_1655959465368_49189.png",
    productName: "white t-shirt",
    price: "140000",
  },
  {
    img: "https://s3.marpple.co/f1/2022/6/1330618_1655959465368_49189.png",
    productName: "white t-shirt",
    price: "140000",
  },
  {
    img: "https://s3.marpple.co/f1/2022/6/1330618_1655959465368_49189.png",
    productName: "white t-shirt",
    price: "140000",
  },
  {
    img: "https://s3.marpple.co/f1/2022/6/1330618_1655959465368_49189.png",
    productName: "white t-shirt",
    price: "140000",
  },
  {
    img: "https://s3.marpple.co/f1/2022/6/1330618_1655959465368_49189.png",
    productName: "white t-shirt",
    price: "140000",
  },
  {
    img: "https://s3.marpple.co/f1/2022/6/1330618_1655959465368_49189.png",
    productName: "white t-shirt",
    price: "140000",
  },
  {
    img: "https://s3.marpple.co/f1/2022/6/1330618_1655959465368_49189.png",
    productName: "white t-shirt",
    price: "140000",
  },
  {
    img: "https://s3.marpple.co/f1/2022/6/1330618_1655959465368_49189.png",
    productName: "white t-shirt",
    price: "140000",
  },
  {
    img: "https://s3.marpple.co/f1/2022/6/1330618_1655959465368_49189.png",
    productName: "white t-shirt",
    price: "140000",
  },
  {
    img: "https://s3.marpple.co/f1/2022/6/1330618_1655959465368_49189.png",
    productName: "white t-shirt",
    price: "140000",
  },
  {
    img: "https://s3.marpple.co/f1/2022/6/1330618_1655959465368_49189.png",
    productName: "white t-shirt",
    price: "140000",
  },
  {
    img: "https://s3.marpple.co/f1/2022/6/1330618_1655959465368_49189.png",
    productName: "white t-shirt",
    price: "140000",
  },
  {
    img: "https://s3.marpple.co/f1/2022/6/1330618_1655959465368_49189.png",
    productName: "white t-shirt",
    price: "140000",
  },
  {
    img: "https://s3.marpple.co/f1/2022/6/1330618_1655959465368_49189.png",
    productName: "white t-shirt",
    price: "140000",
  },
];

const ItemCard = ({ page }) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Container>
        {initData.map((product, i) => {
          return (
            <ProductContainer
              key={i}
              onClick={() => {
                navigate(`/${page}`);
              }}
            >
              <img src={product.img} alt="흰색 반팔 티셔츠" />
              <Wrap>
                <div>
                  <p>{product.productName + i}</p>
                  <h4>{Number(product.price).toLocaleString()}원</h4>
                </div>
                <div>
                  <button>수정</button>
                  <button>삭제</button>
                </div>
              </Wrap>
            </ProductContainer>
          );
        })}
      </Container>
    </Wrapper>
  );
};

export default ItemCard;
