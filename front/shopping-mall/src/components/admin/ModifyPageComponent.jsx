// ModifyPageComponent.jsx
import React, { useState, useEffect } from "react";
import { PageWrapper, ButtonGroup, Button } from "./ModifyPageStyle";
import ModifyBasicInfo from "./ProductBasicInfo";
import CategorySizeManager from "./CategorySizeManager";
import ImageUploader from "./ImageUploader";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { API_SERVER_HOST } from "../../api/HostUrl";
import { getShopOne, updateShopProduct } from "../../api/productShopApi";
import { getDealOne, updateDealProduct } from "../../api/productDealApi";

export default function ModifyPageComponent() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { productNo } = useParams();
  const isDeal = state?.type === true || state?.type === "true";

  const [product, setProduct] = useState({
    name: "",
    salesType: "false",
    category: "",
    price: "",
    dealCurrent: "",
    endDate: "",
  });

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [stockBySize, setStockBySize] = useState({});
  const [previewImages, setPreviewImages] = useState([]);
  const [deletedImageIds, setDeletedImageIds] = useState([]);

  // --- 초기 데이터 불러오기 ---
  useEffect(() => {
    const fetchData = isDeal ? getDealOne : getShopOne;
    fetchData(productNo).then((data) => {
      setProduct({
        name: data.productName ?? "",
        salesType:
          typeof data.type === "boolean"
            ? String(data.type)
            : data.salesType ?? "",
        category: data.category ?? "",
        price: data.price ?? "",
        dealCurrent: data.dealCurrent ?? "",
        endDate: data.endDate ? String(data.endDate).slice(0, 10) : "",
      });

      // 기존 사이즈/재고
      const sizes = Array.isArray(data.sizes) ? data.sizes : [];
      setSelectedSizes(sizes.map((s) => s.productSize));
      setStockBySize(
        sizes.reduce((acc, cur) => {
          acc[cur.productSize] = cur.stock ?? 0;
          return acc;
        }, {})
      );

      // 기존 이미지 유지
      const imgs = Array.isArray(data.images)
        ? data.images.map((i) => ({
            type: "server",
            url: `${API_SERVER_HOST}${i.img}`,
            productImageNo: i.productImageNo,
          }))
        : [];
      setPreviewImages(imgs);
    });
  }, [productNo, isDeal]);

  // 이미지 삭제 시 처리
  const handleRemoveImage = (url) => {
    setPreviewImages((prev) => {
      const updated = prev.filter((img) => {
        if (img.url === url) {
          if (img.type === "server" && img.productImageNo) {
            setDeletedImageIds((prevDeleted) => [
              ...prevDeleted,
              img.productImageNo,
            ]);
          }
          return false;
        }
        return true;
      });
      console.log("이미지 삭제 후: ", updated);
      return updated;
    });
  };

  // --- FormData 전송 ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("productName", product.name);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("type", product.salesType === "true");

    // 사이즈 + 재고
    selectedSizes.forEach((size, idx) => {
      formData.append(`sizes[${idx}].productSize`, size);
      formData.append(`sizes[${idx}].stock`, stockBySize[size] ?? 0);
    });

    // 삭제될 서버 이미지 ID
    deletedImageIds.forEach((id) => formData.append("deleteImageIds", id));

    // 기존 이미지 번호 유지
    previewImages.forEach((img) => {
      if (img.type === "server" && img.productImageNo) {
        formData.append("productImages", img.productImageNo);
      }
    });

    // 새로 업로드할 파일
    previewImages.forEach((img) => {
      if (img.type === "file" && img.file) {
        formData.append("uploadFiles", img.file);
      }
    });

    // 경매 관련
    if (isDeal) {
      formData.append("dealCurrent", product.dealCurrent || 0);
      formData.append("dealCount", 0);
      if (product.endDate)
        formData.append("endDate", `${product.endDate}T00:00:00`);
    }

    console.log("=== FormData contents ===");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const url = isDeal
      ? `${API_SERVER_HOST}/api/product/deal/${productNo}`
      : `${API_SERVER_HOST}/api/product/shop/${productNo}`;

    try {
      await axios.put(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("수정 완료!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("수정 실패");
    }
  };

  return (
    <PageWrapper>
      <form onSubmit={handleSubmit}>
        <ModifyBasicInfo product={product} setProduct={setProduct} />
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
          onRemoveImage={handleRemoveImage}
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
