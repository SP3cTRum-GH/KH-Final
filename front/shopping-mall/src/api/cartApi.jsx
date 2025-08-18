import { API_SERVER_HOST } from "./HostUrl";
import jwtAxios from "../util/jwtUtil";
import axios from "axios";

const prefix = `${API_SERVER_HOST}/api/cart`;

// 장바구니 목록
export const getCart = async (memberId) => {
  const res = await axios.get(`${prefix}/test?memberId=${memberId}`);
  return res.data;
};

// 장바구니 추가
export const addCart = async (memberId, product) => {
  const res = await axios.post(`${prefix}/test?memberId=${memberId}`, product);
  return res.data;
};
