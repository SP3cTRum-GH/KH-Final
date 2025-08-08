import React, { useState } from "react";
import { Img, ImgContainer, MoreButton } from "./ProductImageListStyle";

const imgList = [
  {
    itemImg:
      "https://cdn.imweb.me/upload/S20200108f8bf70c997599/ac6ba4175217f.jpg",
  },
  {
    itemImg:
      "https://cdn.imweb.me/upload/S20200108f8bf70c997599/ac6ba4175217f.jpg",
  },
  {
    itemImg:
      "https://cdn.imweb.me/upload/S20200108f8bf70c997599/ac6ba4175217f.jpg",
  },
  {
    itemImg:
      "https://cdn.imweb.me/upload/S20200108f8bf70c997599/ac6ba4175217f.jpg",
  },
  {
    itemImg:
      "https://cdn.imweb.me/upload/S20200108f8bf70c997599/ac6ba4175217f.jpg",
  },
  {
    itemImg:
      "https://cdn.imweb.me/upload/S20200108f8bf70c997599/ac6ba4175217f.jpg",
  },
];

const ProductImageList = () => {
  const [view, setView] = useState(false);
  const displayList = view ? imgList : imgList.slice(0, 3);

  const viewClick = () => {
    setView(true);
  };

  return (
    <>
      <ImgContainer>
        {displayList.map((imgs, i) => {
          return <Img key={i} src={imgs.itemImg} alt="제품 이미지" />;
        })}
        {!view && imgList.length > 3 && (
          <MoreButton onClick={viewClick}>더 보기</MoreButton>
        )}
      </ImgContainer>
    </>
  );
};

export default ProductImageList;
