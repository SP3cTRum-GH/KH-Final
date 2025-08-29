import React, { useState, useEffect } from "react";
import { PageWrapper, ButtonGroup, Button } from "./ModifyPageStyle";
import ProductBasicInfo from "./ProductBasicInfo";
import CategorySizeManager from "./CategorySizeManager";
import ImageUploader from "./ImageUploader";
import { useNavigate, useLocation } from "react-router-dom";
import { uploadDealProduct } from "../../api/productDealApi";
import { uploadShopProduct } from "../../api/productShopApi";

export default function UploadPageComponent() {
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState({
    name: "",
    salesType: location.state?.salesType ? "true" : "false",
    category: "",
    price: "",
    // stock: "",
    dealCurrent: "",
    endDate: "",
  });

  // 사이즈, 재고, 이미지 상태
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [stockBySize, setStockBySize] = useState({});
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    if (location.state?.salesType !== undefined) {
      setProduct((prev) => ({
        ...prev,
        salesType: location.state.salesType ? "true" : "false",
      }));
    }
  }, [location.state?.salesType]);

  // handleSubmit (FormData 방식)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 기본 유효성 검사
    const errors = [];
    if (!product.name?.trim()) errors.push("상품명을 입력해 주세요.");
    if (!product.category) errors.push("카테고리를 선택해 주세요.");
    if (product.salesType === "true" && !product.endDate)
      errors.push("경매 종료일을 입력해 주세요.");

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    // FormData 변환
    const formData = new FormData();
    formData.append("productName", product.name);
    formData.append("category", product.category);
    // salesType이 true면 price = dealCurrent
    if (product.salesType === "true") {
      const dealCurrentValue = product.dealCurrent || 0;
      formData.append("price", dealCurrentValue);
      formData.append("dealCount", 0);
      formData.append("dealCurrent", dealCurrentValue);

      if (product.endDate) {
        formData.append("endDate", `${product.endDate}T00:00:00`);
      }
    } else {
      formData.append("price", product.price);
    }

    // 사이즈/재고
    if (product.salesType === "true") {
      // 경매 상품: 사이즈는 항상 'deal', 수량은 1개만
      formData.append("sizes[0].productSize", "deal");
      formData.append("sizes[0].stock", 1);
    } else {
      // 일반 상품: 선택된 사이즈별 재고
      selectedSizes.forEach((size, idx) => {
        const stockValue = Number(stockBySize?.[size]);
        formData.append(`sizes[${idx}].productSize`, size);
        formData.append(
          `sizes[${idx}].stock`,
          isNaN(stockValue) ? 0 : stockValue
        );
      });
    }

    // 이미지 파일 추가 (previewImages가 File 또는 {file: File} 혼재해도 처리)
    previewImages.forEach((img) => {
      const file =
        img && img.file instanceof File
          ? img.file
          : img instanceof File
          ? img
          : null;
      if (file) {
        formData.append("uploadFiles", file);
      }
    });

    try {
      if (product.salesType === "true") {
        await uploadDealProduct(formData);
        alert("등록이 완료되었습니다.");
        window.scrollTo(0, 0);
        navigate("/deal");
      } else {
        await uploadShopProduct(formData);
        alert("등록이 완료되었습니다.");
        window.scrollTo(0, 0);
        navigate("/shop");
      }
    } catch (err) {
      console.error(err);
      alert("업로드 실패");
    }
  };

  return (
    <PageWrapper>
      <form onSubmit={handleSubmit}>
        <ProductBasicInfo product={product} setProduct={setProduct} />
        <CategorySizeManager
          product={product}
          setProduct={setProduct}
          selectedSizes={selectedSizes}
          setSelectedSizes={setSelectedSizes}
          stockBySize={stockBySize}
          setStockBySize={setStockBySize}
        />
        <ImageUploader
          previewImages={previewImages}
          setPreviewImages={setPreviewImages}
        />
        <ButtonGroup>
          <Button type="submit" variant="primary">
            등록
          </Button>
        </ButtonGroup>
      </form>
    </PageWrapper>
  );
}
