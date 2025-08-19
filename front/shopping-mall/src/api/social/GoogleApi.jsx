import axios from "axios";
import { API_SERVER_HOST } from "../HostUrl";

const client_id = `850033102207-isabeijtllcrq2938p80o64vjl5rlgrk.apps.googleusercontent.com`; //REST키값
const redirect_uri = `http://localhost:5173/member/google`;
const auth_code_path = "https://accounts.google.com/o/oauth2/v2/auth";

//엑세스 토큰 얻기
const access_token_url = `https://oauth2.googleapis.com/token`; //보안코드 활성화시 사용
const client_secret = ``;

export const getGoogleLoginLink = () => {
  const qs = new URLSearchParams({
    client_id,
    redirect_uri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline", // refresh_token 원할 때
    prompt: "consent", // 매번 동의받고 싶으면 유지
    state: crypto.randomUUID(),
  });
  return `${auth_code_path}?${qs.toString()}`;
};

export const getAccessToken = async (authCode) => {
  const headers = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };
  const params = {
    grant_type: "authorization_code",
    client_id: client_id,
    redirect_uri: redirect_uri,
    code: authCode,
    client_secret: client_secret,
  };

  const res = await axios.post(access_token_url, params, headers);
  // 구글은 id_token도 함께 내려줍니다.
  const access_token = res.data.access_token;
  return access_token;
};

export const getMemberWithAccessToken = async (accessToken) => {
  const res = await axios.get(
    `${API_SERVER_HOST}/api/member/google?accessToken=${accessToken}`
  );
  return res.data;
};
