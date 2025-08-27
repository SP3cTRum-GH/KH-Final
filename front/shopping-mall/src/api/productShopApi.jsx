import axios from "axios";
import { API_SERVER_HOST } from "./HostUrl";

const prefix = `${API_SERVER_HOST}/api/product/shop`;
const delfix = `${API_SERVER_HOST}/api/product`;

// 상품 1개 가져오기
export const getShopOne = async (productNo) => {
  const res = await axios.get(`${prefix}/${productNo}`);
  return res.data;
};

// 페이징 리스트
export const getShopProductList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${prefix}/list`, {
    params: { page, size },
  });

  return res.data;
};

// 상품 필터링(상의, 하의, 신발)
export const getShopFilterProductList = async (pageParam, filter) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${prefix}/list?category=${filter}`, {
    params: { page, size },
  });

  return res.data;
};

// // 상품 필터링(판매순)
export const getShopPopularProductList = async (pageParam, filter) => {
  const { page, size } = pageParam;
  if (filter.length === 0) {
    const res = await axios.get(`${prefix}/popular`, {
      params: { page, size },
    });
    return res.data;
  } else {
    const res = await axios.get(`${prefix}/popular?category=${filter}`, {
      params: { page, size },
    });
    return res.data;
  }
};

// shop 상품 등록
export const uploadShopProduct = async (formData) => {
  const res = await axios.post(`${prefix}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// 상품(shop, deal) 삭제
export const deleteProductItem = async (productNo) => {
  const res = await axios.delete(`${delfix}/${productNo}`);
  return res.data;
};

// shop 상품 수정
export const updateShopProduct = async (formData, productNo) => {
  const res = await axios.put(`${prefix}/${productNo}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// shop 상품 이미지 조회
export const getShopProductImages = async (productNo) => {
  const res = await axios.get(`${prefix}/${productNo}`);
  return res.data.images || [];
};

/**
 * 특정 상품(productNo)의 첫 번째 이미지 조회
 * @param {number} productNo
 * @returns {Promise<string|null>} 이미지 URL 또는 null
 */
export const getFirstShopProductImage = async (productNo) => {
  try {
    const images = await getShopProductImages(productNo);
    return images.length > 0 ? images[0].img : null;
  } catch (err) {
    console.error("첫 번째 이미지 로드 실패:", err);
    return null;
  }
};

/**
 * dtoList를 받아 각 상품의 첫 번째 이미지 추가
 * @param {Array} dtoList
 * @returns {Promise<Array>} 이미지 포함된 dtoList
 */
export const attachFirstShopImages = async (dtoList) => {
  if (!dtoList) return [];
  return await Promise.all(
    dtoList.map(async (product) => {
      const firstImg = await getFirstShopProductImage(product.productNo);
      return { ...product, img: firstImg };
    })
  );
};
