import axios from "axios";
import { API_SERVER_HOST } from "../HostUrl";

const rest_api_key = `9hz3nxGqt8IQqeYhCY5k`; //REST키값
const redirect_uri = `http://localhost:5173/member/naver`;
const auth_code_path = `https://nid.naver.com/oauth2.0/authorize`;

export const getNaverLoginLink = () => {
  const naverURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code&state=seleur`;
  return naverURL;
};

export const getMember = async (code, state) => {
  const res = await axios.get(
    `${API_SERVER_HOST}/api/member/public/naver?code=${code}&state=${state}`
  );
  return res.data;
};
