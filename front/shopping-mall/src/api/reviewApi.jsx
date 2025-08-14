import axios from "axios";
import { API_SERVER_HOST } from "./HostUrl";

const prefix = `${API_SERVER_HOST}/api/review`;

// 리뷰 등록
export const postReview = async (product) => {
  console.log(product);
  const res = await axios.post(`${prefix}`, product);
  console.log(res);
  return res.data;
};

// 상품 1개 가져오기
export const getReviewOne = async (productNo) => {
  const res = await axios.get(`${prefix}/${productNo}`);
  return res.data;
};

// 페이징 리스트
export const getReviewList = async (pageParam, productNo) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${prefix}/list?productNo=${productNo}`, {
    params: { page, size },
  });

  return res.data;
};

// 리뷰 수정
export const updateReview = async (reviewNo, data) => {
  const res = await axios.put(`${prefix}/${reviewNo}`, data);
  return res.data;
};
