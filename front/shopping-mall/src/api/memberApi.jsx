import axios from "axios";
import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./HostUrl";

const host = `${API_SERVER_HOST}/api/member`;

export const loginPost = async (loginParam) => {
  // Content-Type을 x-www-form-urlencoded로 지정하여, 폼 데이터를 보내겠다는 의미이다.
  //axios는 json 데이터를 보내는데 기본방식인데 , form 데이터를 보낼때는 content-type 을 지정해야 한다.
  const header = { headers: { "Content-Type": "x-www-form-urlencoded" } };
  const form = new FormData();
  form.append("username", loginParam.memberId);
  form.append("password", loginParam.pw);

  const res = await axios.post(`${host}/login`, form, header);

  return res.data;
};

export const signup = async (member) => {
  const res = await axios.post(`${host}/signup`, member);
  return res;
};

export const modifySocialMember = async (member) => {
  const res = await jwtAxios.put(`${host}/social`, member);
  return res.data;
};
