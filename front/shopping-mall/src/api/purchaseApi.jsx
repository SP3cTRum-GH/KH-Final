import axios from "axios";
import { API_SERVER_HOST } from "./HostUrl";

const prefix = `${API_SERVER_HOST}/api/purchase`;

// 구매 내역 불러오기
export const getPuchaseList = async (memberId) => {
  const res = await axios.get(`${prefix}/logs`);
  return res.data;
};
