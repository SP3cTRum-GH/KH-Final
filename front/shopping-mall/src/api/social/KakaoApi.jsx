import axios from "axios";
import { API_SERVER_HOST } from "../HostUrl";

const rest_api_key = `f3269999cedec05d0f2615c3d49c2d71`; //REST키값
const redirect_uri = `http://localhost:5173/member/kakao`;
const auth_code_path = `https://kauth.kakao.com/oauth/authorize`;

//엑세스 토큰 얻기
const access_token_url = `https://kauth.kakao.com/oauth/token`; //보안코드 활성화시 사용
const client_secret = `YKfNTbZ0rJBVBoAusbhKAPUjC57Dq5C9`;

export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};

export const getAccessToken = async (authCode) => {
  const header = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };
  const params = {
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
    client_secret: client_secret,
  };

  const res = await axios.post(access_token_url, params, header);
  const accessToken = res.data.access_token;
  return accessToken;
};

export const getMemberWithAccessToken = async (accessToken) => {
  const res = await axios.get(
    `${API_SERVER_HOST}/api/member/kakao?accessToken=${accessToken}`
  );
  return res.data;
};
