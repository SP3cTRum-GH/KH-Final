import axios from "axios";
import { API_SERVER_HOST } from "./HostUrl";

const prefix = `${API_SERVER_HOST}/api/product/deal`;

// 상품 1개 가져오기
export const getDealOne = async (productNo) => {
  const res = await axios.get(`${prefix}/${productNo}`);
  return res.data;
};

// 페이징 리스트
export const getDealProductList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${prefix}/list`, { params: { page, size } });

  return res.data;
};

// deal 상품 등록
export const postDealProductItem = async (product) => {
  const res = await axios.post(`${prefix}`, product);
  return res.data;
};
