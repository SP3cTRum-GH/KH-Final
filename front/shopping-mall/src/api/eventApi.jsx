import axios from "axios";
import { API_SERVER_HOST } from "./HostUrl";
const host = `${API_SERVER_HOST}/api/events`;

export const postAdd = async (formData) => {
  try {
    const res = await axios.post(`${host}/admin/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    console.error("이벤트 등록 실패:", err);
    throw err;
  }
};

export const getAllEvents = async () => {
  const res = await axios.get(`${host}/public/all`);
  return res.data;
};

export const getOne = async (no) => {
  const res = await axios.get(`${host}/public/${no}`, {
    withCredentials: true,
  });
  return res.data;
};

export const putOne = async (no, formData) => {
  try {
    const res = await axios.put(`${host}/admin/${no}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    console.error(`이벤트 수정 실패 (no: ${no}):`, err);
    throw err;
  }
};

export const deleteOne = async (no) => {
  const res = await axios.delete(`${host}/admin/${no}`);
  return res.data;
};

export const softDeleteOne = async (no) => {
  try {
    const res = await axios.put(`${host}/admin/soft-delete/${no}`); // ✅ 전용 API 호출
    return res.data;
  } catch (err) {
    console.error("이벤트 삭제 실패(soft delete):", err);
    throw err;
  }
};
