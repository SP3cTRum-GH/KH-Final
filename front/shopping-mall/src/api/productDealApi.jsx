import axios from "axios";
import { API_SERVER_HOST } from "./HostUrl";
import jwtAxios from "../util/jwtUtil";

const prefix = `${API_SERVER_HOST}/api/product/deal`;
const dealfix = `${API_SERVER_HOST}/api/product`;

// 상품 1개 가져오기
export const getDealOne = async (productNo) => {
  const res = await axios.get(`${prefix}/public/${productNo}`);
  return res.data;
};

// 경매 입찰 기능
export const productBid = async (data) => {
  const res = await jwtAxios.post(`${dealfix}/user/bid`, data);
  return res.data;
};

// 페이징 리스트
export const getDealProductList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${prefix}/public/list`, {
    params: { page, size },
  });

  return res.data;
};

// 상품 필터링(상의, 하의, 신발)
export const getDealFilterProductList = async (pageParam, filter) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${prefix}/public/list?category=${filter}`, {
    params: { page, size },
  });

  return res.data;
};

// // 상품 필터링(판매순)
export const getDealPopularProductList = async (pageParam, filter) => {
  const { page, size } = pageParam;
  if (filter.length === 0) {
    const res = await axios.get(`${prefix}/public/popular`, {
      params: { page, size },
    });
    return res.data;
  } else {
    const res = await axios.get(`${prefix}/public/popular?category=${filter}`, {
      params: { page, size },
    });
    return res.data;
  }
};

// deal 상품 등록
export const uploadDealProduct = async (formData) => {
  const res = await jwtAxios.post(`${prefix}/admin`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

// deal 상품 수정
export const updateDealProduct = async (formData, productNo) => {
  const res = await jwtAxios.put(`${prefix}/admin/${productNo}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// deal 상품 이미지 조회
export const getDealProductImages = async (productNo) => {
  const res = await axios.get(`${prefix}/public/${productNo}`);
  return res.data.images || [];
};

/**
 * 특정 Deal 상품(productNo)의 첫 번째 이미지 조회
 * @param {number} productNo
 * @returns {Promise<string|null>} 이미지 URL 또는 null
 */
export const getFirstDealProductImage = async (productNo) => {
  try {
    const images = await getDealProductImages(productNo);
    return images.length > 0 ? images[0].img : null;
  } catch (err) {
    console.error("Deal 상품 첫 번째 이미지 로드 실패:", err);
    return null;
  }
};

/**
 * dtoList를 받아 각 Deal 상품의 첫 번째 이미지 추가
 * @param {Array} dtoList
 * @returns {Promise<Array>} 이미지 포함된 dtoList
 */
export const attachFirstDealImages = async (dtoList) => {
  if (!dtoList) return [];
  return await Promise.all(
    dtoList.map(async (product) => {
      const firstImg = await getFirstDealProductImage(product.productNo);
      return { ...product, img: firstImg };
    })
  );
};
