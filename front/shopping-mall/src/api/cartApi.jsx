import axios from "axios";
import { API_SERVER_HOST } from "./HostUrl";

const prefix = `${API_SERVER_HOST}/api/cart`;

// 장바구니 가져오기
export const getCart = async (productNo) => {
  const res = await axios.get(`${prefix}/${productNo}`);
  return res.data;
};

// 장바구니 추가
export const addCart = async () => {
  const res = await axios.get(`${prefix}/list`, {});

  return res.data;
};
