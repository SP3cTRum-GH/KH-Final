import axios from "axios";
import { API_SERVER_HOST } from "../HostUrl";

const rest_api_key = `f3269999cedec05d0f2615c3d49c2d71`; //REST키값
const redirect_uri = `http://localhost:5173/member/kakao`;
const auth_code_path = `https://kauth.kakao.com/oauth/authorize`;

export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code&state=seleur`;
  return kakaoURL;
};

export const getMember = async (code, state) => {
  const res = await axios.get(
    `${API_SERVER_HOST}/api/member/public/kakao?code=${code}&state=${state}`
  );
  return res.data;
};
