import axios from "axios";
import { API_SERVER_HOST } from "./HostUrl";

const prefix = `${API_SERVER_HOST}/api/product/shop`;

// 상품 1개 가져오기
export const getShopOne = async (pno) => {
  const res = await axios.get(`${prefix}/${pno}`);
  return res.data;
};

// 페이징 리스트
export const getShopProductList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${prefix}/list`, { params: { page, size } });

  return res.data;
};
