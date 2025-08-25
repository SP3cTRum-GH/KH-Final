import React, { useEffect, useState } from "react";
import { PageWrapper, ButtonGroup, Button } from "./ModifyPageStyle";
import ModifyBasicInfo from "./ProductBasicInfo";
import CategorySizeManager from "./CategorySizeManager";
import ImageUploader from "./ImageUploader";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getShopOne, updateShopProduct } from "../../api/productShopApi";
import { getDealOne, updateDealProduct } from "../../api/productDealApi";
import { useLocation } from "react-router-dom";

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
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    const resFunc = state?.type ? getDealOne : getShopOne;

    resFunc(param.productNo).then((data) => {
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
        endDate: data.endDate ? String(data.endDate).slice(0, 10) : "",
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
  }, [param.productNo, state?.type]);

  // 사이즈, 재고 상태
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [stockBySize, setStockBySize] = useState({});
  const [previewImages, setPreviewImages] = useState([]);

  // state.type may be boolean or string. Avoid Boolean("false") === true pitfall.
  const isDeal = state?.type === true || state?.type === "true";

  const toBackendDateTime = (v) => {
    if (!v) return null;
    // If only date is provided, append midnight time for LocalDateTime
    if (v.length === 10) return `${v}T00:00:00`;
    // If minute precision, append seconds
    if (v.length === 16) return `${v}:00`;
    // If it already includes seconds or any other valid ISO string, send as-is
    return v;
  };

  const toNumberOr = (val, fallback = 0) => {
    const n = Number(val);
    return Number.isFinite(n) ? n : fallback;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = {
      productName: product.name,
      category: product.category,
      price: toNumberOr(product.price),
      type: product.salesType === "true",
      images: (previewImages || [])
        .map((img) => ({ img }))
        .filter((o) => !!o.img),
      sizes: selectedSizes.map((size) => ({
        productSize: size,
        stock: toNumberOr(stockBySize[size]),
      })),
      ...(isDeal && {
        dealCount: toNumberOr(product.dealCount),
        dealCurrent: toNumberOr(product.dealCurrent),
        endDate: toBackendDateTime(product.endDate),
      }),
    };

    const updateFn = isDeal ? updateDealProduct : updateShopProduct;
    console.log(
      "updateFn:",
      isDeal ? "updateDealProduct" : "updateShopProduct"
    );
    updateFn(submitData, param.productNo)
      .then((data) => {
        alert(isDeal ? "deal 수정완료" : "shop 수정완료");
        navigate("/");
      })
      .catch((err) => {
        // Axios error diagnostics
        const status = err?.response?.status;
        const data = err?.response?.data;
        const msg = err?.message;
        console.error(
          "[update error] status:",
          status,
          "data:",
          data,
          "msg:",
          msg
        );
        alert(`수정 실패 (코드: ${status ?? "?"})`);
      });
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
          <Button type="submit" variant="primary">
            수정 완료
          </Button>
        </ButtonGroup>
      </form>
    </PageWrapper>
  );
}
