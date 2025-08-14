import React, { useState, useCallback } from "react";
import { PageWrapper, ButtonGroup, Button } from "./ModifyPageStyle";
import ProductBasicInfo from "./ProductBasicInfo";
import CategorySizeManager from "./CategorySizeManager";
import ImageUploader from "./ImageUploader";
import { postShopProductItem } from "../../api/productShopApi";
import { postDealProductItem } from "../../api/productDealApi";
import { useNavigate } from "react-router-dom";

export default function UploadPageComponent() {
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
  const navigate = useNavigate();

  // Normalize to Spring LocalDateTime format (YYYY-MM-DDTHH:mm:ss)
  const toSpringLocalDateTime = (input) => {
    if (!input) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(input)) return `${input}T00:00:00`;
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(input)) return `${input}:00`;
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(input)) return input;
    const d = new Date(input);
    if (!isNaN(d.getTime())) {
      const pad = (n) => String(n).padStart(2, "0");
      const y = d.getFullYear();
      const m = pad(d.getMonth() + 1);
      const day = pad(d.getDate());
      const hh = pad(d.getHours());
      const mm = pad(d.getMinutes());
      const ss = pad(d.getSeconds());
      return `${y}-${m}-${day}T${hh}:${mm}:${ss}`;
    }
    return input;
  };

  // Extract filename from various preview item shapes (URL string, File object, or object with url-like fields)
  const extractFileName = (item) => {
    if (!item) return null;

    // If File or Blob-like with a name
    if (typeof item === "object" && item.name) return item.name;
    if (typeof item === "object" && item.file && item.file.name)
      return item.file.name;

    // If string URL or dataURL
    const pickFromUrlString = (str) => {
      if (typeof str !== "string") return null;
      // remove query/hash, then take last path segment
      const base = str.split(/[?#]/)[0];
      const last = base.split("/").pop();
      return last && last.length ? last : null;
    };

    if (typeof item === "string") return pickFromUrlString(item);

    // If object with known url-ish fields
    if (typeof item === "object") {
      const cand = item.url || item.previewUrl || item.dataUrl || item.src;
      const byUrl = pickFromUrlString(cand);
      if (byUrl) return byUrl;
    }

    return null; // could not determine
  };

  // 사이즈, 재고 상태
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [stockBySize, setStockBySize] = useState({});
  const [previewImages, setPreviewImages] = useState([]);

  const buildAndValidate = useCallback(() => {
    const errors = [];

    const priceNum = Number(product.price);

    if (!product.name?.trim()) errors.push("상품명을 입력해 주세요.");
    if (!product.category) errors.push("카테고리를 선택해 주세요.");
    if (Number.isNaN(priceNum) || priceNum < 0)
      errors.push("판매가는 0 이상 숫자여야 합니다.");

    const isAuction = product.salesType === "false"; // 일반:true, 경매:false 라는 현재 구조 유지

    if (isAuction) {
      if (!product.endDate) errors.push("경매 마감일을 입력해 주세요.");
      if (Number.isNaN(Number(product.dealCurrent)))
        errors.push("현재 입찰가를 숫자로 입력해 주세요.");
      if (Number.isNaN(Number(product.dealCount)))
        errors.push("입찰 수를 숫자로 입력해 주세요.");
    }

    // 사이즈/재고 매핑: stockBySize의 값을 사용
    const sizes = selectedSizes.map((size) => ({
      productSize: size,
      stock: Number(stockBySize?.[size] ?? 0),
    }));

    // images: build from previewImages by extracting filename only
    const images = (previewImages || [])
      .map((it) => ({ img: extractFileName(it) }))
      .filter((o) => !!o.img);

    if (images.length === 0) {
      errors.push(
        "이미지 파일명을 확인할 수 없습니다. 원본 파일을 다시 선택해 주세요."
      );
    }

    const submitData = {
      productName: product.name,
      category: product.category,
      price: priceNum,
      type: product.salesType === "true",
      images,
      sizes,
      ...(isAuction && {
        dealCount: Number(product.dealCount) || 0,
        dealCurrent: Number(product.dealCurrent) || 0,
        endDate: toSpringLocalDateTime(product.endDate),
      }),
    };

    if (isAuction) {
      const end = submitData.endDate;
      if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(end || "")) {
        errors.push(
          "경매 마감일 형식은 YYYY-MM-DDTHH:mm 또는 YYYY-MM-DD 입니다."
        );
      }
    }

    return { errors, submitData };
  }, [product, selectedSizes, stockBySize, previewImages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { errors, submitData } = buildAndValidate();

    if (errors.length > 0) {
      alert(errors.join("\n"));
      console.warn("[Upload validation]", errors);
      console.log("[Invalid payload preview]", submitData);
      return;
    }

    // console.log("[Final payload]", submitData);

    try {
      const result = submitData.type
        ? await postShopProductItem(submitData)
        : await postDealProductItem(submitData);
      console.log("[Upload success]", result);
      alert("등록이 완료되었습니다.");
      navigate("/");
    } catch (err) {
      // 서버 500 디버깅을 돕기 위해 상세 출력
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
        {/* 기본 정보 */}
        <ProductBasicInfo product={product} setProduct={setProduct} />

        {/* 카테고리 선택 */}
        <CategorySizeManager
          product={product}
          setProduct={setProduct}
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
