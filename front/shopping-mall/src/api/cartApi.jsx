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

// 장바구니 수량 수정
export const updateCart = async (memberId, cartItemId, payload) => {
  const res = await axios.patch(
    `${prefix}/items/${cartItemId}?memberId=${memberId}`,
    payload
  );
  return res.data;
};

// 장바구니 수량 삭제
export const deleteCart = async (memberId, cartItemId) => {
  console.log(memberId);
  console.log(cartItemId);
  const res = await axios.delete(
    `${prefix}/items/${cartItemId}?memberId=${memberId}`
  );
  return res.data;
};
