import axios from "axios";
import { API_SERVER_HOST } from "../HostUrl";

const client_id = `850033102207-isabeijtllcrq2938p80o64vjl5rlgrk.apps.googleusercontent.com`; //REST키값
const redirect_uri = `http://localhost:5173/member/google`;
const auth_code_path = "https://accounts.google.com/o/oauth2/v2/auth";

export const getGoogleLoginLink = () => {
  const qs = new URLSearchParams({
    client_id,
    redirect_uri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline", // refresh_token 원할 때
    prompt: "consent", // 매번 동의받고 싶으면 유지
    state: "seleur",
  });
  return `${auth_code_path}?${qs.toString()}`;
};

export const getMember = async (code, state) => {
  const res = await axios.get(
    `${API_SERVER_HOST}/api/member/public/google?code=${code}&state=${state}`
  );
  return res.data;
};
