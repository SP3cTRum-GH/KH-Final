import React, { useState, useEffect } from "react";
import { PageWrapper, ButtonGroup, Button } from "./ModifyPageStyle";
import ProductBasicInfo from "./ProductBasicInfo";
import CategorySizeManager from "./CategorySizeManager";
import ImageUploader from "./ImageUploader";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function UploadPageComponent() {
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState({
    name: "",
    salesType: location.state?.salesType ? "true" : "false",
    category: "",
    price: "",
    stock: "",
    dealCount: "",
    dealCurrent: "",
    endDate: "",
  });

  useEffect(() => {
    if (location.state?.salesType !== undefined) {
      setProduct((prev) => ({
        ...prev,
        salesType: location.state.salesType ? "true" : "false",
      }));
    }
  }, [location.state?.salesType]);

  // 사이즈, 재고, 이미지 상태
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [stockBySize, setStockBySize] = useState({});
  const [previewImages, setPreviewImages] = useState([]);

  // handleSubmit (FormData 방식)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 기본 유효성 검사
    const errors = [];
    if (!product.name?.trim()) errors.push("상품명을 입력해 주세요.");
    if (!product.category) errors.push("카테고리를 선택해 주세요.");
    if (!product.price || Number(product.price) < 0)
      errors.push("판매가는 0 이상 숫자여야 합니다.");
    if (product.salesType === "true" && !product.endDate)
      errors.push("경매 종료일을 입력해 주세요.");

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    // FormData 변환
    const formData = new FormData();
    formData.append("productName", product.name);
    formData.append("salesType", product.salesType);
    formData.append("category", product.category);
    formData.append("price", product.price);

    if (product.salesType === "true") {
      formData.append("dealCount", product.dealCount || 0);
      formData.append("dealCurrent", product.dealCurrent || 0);
      formData.append("endDate", product.endDate);
    }

    // 사이즈/재고
    const sizes = selectedSizes.map((size) => ({
      productSize: size,
      stock: stockBySize?.[size] ?? 0,
    }));
    formData.append("sizes", JSON.stringify(sizes));

    // 이미지 파일
    previewImages.forEach((file) => {
      if (file instanceof File) {
        formData.append("files", file);
      }
    });

    // 업로드 요청
    try {
      const result = await axios.post(
        "http://localhost:8080/api/product",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("[Upload success]", result);
      alert("등록이 완료되었습니다.");
      navigate("/");
    } catch (err) {
      console.error("[Upload failed]", err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "서버 오류가 발생했습니다.";
      alert(`업로드 실패: ${msg}`);
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
            수정 완료
          </Button>
        </ButtonGroup>
      </form>
    </PageWrapper>
  );
}
