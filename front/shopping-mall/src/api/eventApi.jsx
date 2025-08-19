import axios from "axios";
export const API_SERVER_HOST = "http://localhost:8080"; //서버 주소
const host = `${API_SERVER_HOST}/api/events`;

export const postAdd = async (event) => {
  //파일업로드 할때에는 기본값인  ‘Content-Type’: ‘application/json’을 ‘multipart/form-data’ 변경해야됨
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await axios.post(`${host}/`, event, header);
  return res.data;
};

export const getList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${host}/list`, {
    params: { page: page, size: size },
  });
  return res.data;
};

export const getOne = async (no) => {
  const res = await axios.get(`${host}/${no}`);
  return res.data;
};

export const putOne = async (no, event) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await axios.put(`${host}/${no}`, event, header);
  return res.data;
};

export const deleteOne = async (no) => {
  const res = await axios.delete(`${host}/${no}`);
  return res.data;
};
