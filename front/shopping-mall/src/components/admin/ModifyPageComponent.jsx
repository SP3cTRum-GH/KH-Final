import React, { useEffect, useState } from "react";
import { PageWrapper, ButtonGroup, Button } from "./ModifyPageStyle";
import ModifyBasicInfo from "./ProductBasicInfo";
import CategorySizeManager from "./CategorySizeManager";
import ImageUploader from "./ImageUploader";
import { useParams } from "react-router-dom";
import { getShopOne, updateShopProduct } from "../../api/productShopApi";
import { updateDealProduct } from "../../api/productDealApi";

export default function ModifyPageComponent() {
  const [product, setProduct] = useState({
    name: "",
    salesType: "",
    category: "",
    price: "",
    stock: "",
    dealCount: "",
    dealCurrent: "",
    endDate: "",
  });
  const param = useParams();

  useEffect(() => {
    getShopOne(param.productNo).then((data) => {
      // normalize API -> form state
      setProduct({
        name: data.productName ?? "",
        // API has boolean `type`; form uses string 'true' | 'false'
        salesType:
          typeof data.type === "boolean"
            ? String(data.type)
            : data.salesType ?? "",
        category: data.category ?? "",
        price: data.price ?? "",
        stock: "", // per-size stock managed separately
        dealCount: data.dealCount ?? "",
        dealCurrent: data.dealCurrent ?? "",
        // If server sends 'YYYY-MM-DDTHH:mm:ss', trim seconds for datetime-local input
        endDate: data.endDate ? String(data.endDate).slice(0, 16) : "",
      });

      // initialize sizes and stock map if present
      const sizes = Array.isArray(data.sizes) ? data.sizes : [];
      setSelectedSizes(sizes.map((s) => s.productSize));
      setStockBySize(
        sizes.reduce((acc, cur) => {
          acc[cur.productSize] = cur.stock ?? 0;
          return acc;
        }, {})
      );

      // initialize images preview if present (keep as string urls/filenames)
      const imgs = Array.isArray(data.images)
        ? data.images.map((i) => i.img).filter(Boolean)
        : [];
      setPreviewImages(imgs);
    });
  }, [param.productNo]);

  // 사이즈, 재고 상태
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [stockBySize, setStockBySize] = useState({});
  const [previewImages, setPreviewImages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = {
      productName: product.name,
      category: product.category,
      price: Number(product.price),
      type: product.salesType === "true",
      images: (previewImages || [])
        .map((img) => ({ img }))
        .filter((o) => !!o.img),
      sizes: selectedSizes.map((size) => ({
        productSize: size,
        stock: Number(stockBySize[size]) || 0,
      })),
      ...(product.salesType === "false" && {
        dealCount: Number(product.dealCount),
        dealCurrent: Number(product.dealCurrent),
        endDate: product.endDate,
      }),
    };

    console.log(submitData);

    updateShopProduct(submitData, param.productNo).then((data) => {
      console.log(data);
      alert("shop 수정완료");
    });

    // updateDealProduct(submitData, param.productNo).then((data) => {
    //   console.log(data);
    //   alert("deal 수정완료");
    // });
  };

  return (
    <PageWrapper>
      <form onSubmit={handleSubmit}>
        {/* 기본 정보 */}
        <ModifyBasicInfo product={product} setProduct={setProduct} />

        {/* 카테고리 선택 */}
        <CategorySizeManager
          product={product}
          selectedSizes={selectedSizes}
          setSelectedSizes={setSelectedSizes}
          stockBySize={stockBySize}
          setStockBySize={setStockBySize}
        />

        {/* 이미지 업로드 */}
        <ImageUploader
          previewImages={previewImages}
          setPreviewImages={setPreviewImages}
        />

        {/* 버튼 */}
        <ButtonGroup>
          <Button type="button">임시 저장</Button>
          <Button type="submit" variant="primary">
            수정 완료
          </Button>
        </ButtonGroup>
      </form>
    </PageWrapper>
  );
}
