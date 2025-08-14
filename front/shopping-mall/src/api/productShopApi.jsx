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
  const res = await axios.get(`${prefix}/list`, { params: { page, size } });

  return res.data;
};

// shop 상품 등록
export const postShopProductItem = async (product) => {
  const res = await axios.post(`${prefix}`, product);
  return res.data;
};

// 상품(shop, deal) 삭제
export const deleteProductItem = async (productNo) => {
  const res = await axios.delete(`${delfix}/${productNo}`);
  return res.data;
};
