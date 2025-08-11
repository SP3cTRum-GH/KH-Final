import axios from "axios";
import { API_SERVER_HOST } from "./HostUrl";

const prefix = `${API_SERVER_HOST}/api/product/shop`;

// 상품 1개 가져오기
export const getOne = async (pno) => {
  const res = await axios.get(`${prefix}/${pno}`);
};

// 페이징 리스트
export const getProductList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${prefix}/list`);
};
