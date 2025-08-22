import axios from "axios";
import { API_SERVER_HOST } from "./HostUrl";
const host = `${API_SERVER_HOST}/api/events`;

export const postAdd = async (formData) => {
  try {
    const res = await axios.post(`${host}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data; // {result: no}
  } catch (err) {
    console.error("이벤트 등록 실패:", err);
    throw err;
  }
};

export const getAllEvents = async () => {
  const res = await axios.get(`${host}/all`);
  return res.data;
};

export const getOne = async (no) => {
  const res = await axios.get(`${host}/${no}`, { withCredentials: true });
  return res.data;
};

export const putOne = async (no, formData) => {
  const res = await axios.put(`${host}/${no}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteOne = async (no) => {
  const res = await axios.delete(`${host}/${no}`);
  return res.data;
};
