import axios from "axios";
import { API_SERVER_HOST } from "./HostUrl";

const prefix = `${API_SERVER_HOST}/api/purchase`;

// 구매 내역 불러오기
export const getPurchaseList = async (memberId) => {
  const res = await axios.get(`${prefix}user/logs?memberId=${memberId}`);
  return res.data;
};

// 즉시 구매
export const productBuy = async (product, memberId) => {
  const res = await axios.post(
    `${prefix}/user/buy-now?memberId=${memberId}`,
    product
  );
  return res.data;
};

// main best5 불러오기
export const bestItems = async () => {
  const res = await axios.get(`${prefix}/public/main`);
  return res.data;
};

// 날짜별 카테고리 매출 불러오기 (sales chart 용)
export const getSalesByDateCategory = async (fromDate, toDate) => {
  const res = await axios.get(`${prefix}/sales/date-category`, {
    params: { from: fromDate, to: toDate },
  });
  return res.data;
};
