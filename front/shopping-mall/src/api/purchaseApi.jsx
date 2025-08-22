import axios from "axios";
import { API_SERVER_HOST } from "./HostUrl";

const prefix = `${API_SERVER_HOST}/api/purchase`;

// 구매 내역 불러오기
export const getPuchaseList = async (memberId) => {
  const res = await axios.get(`${prefix}/logs?memberId=${memberId}`);
  return res.data;
};

// 즉시 구매
export const productBuy = async (product, memberId) => {
  const res = await axios.post(
    `${prefix}/buy-now?memberId=${memberId}`,
    product
  );
  return res.data;
};
