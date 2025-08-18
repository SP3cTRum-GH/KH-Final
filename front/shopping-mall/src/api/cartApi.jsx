import axios from "axios";
import { API_SERVER_HOST } from "./HostUrl";
import jwtAxios from "../util/jwtUtil";

const prefix = `${API_SERVER_HOST}/api/cart`;

// 장바구니 목록
export const getCart = async () => {
  const res = await jwtAxios.get(prefix);
  console.log(res);
  return res.data;
};

// 장바구니 추가
export const addCart = async () => {};
