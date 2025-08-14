import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getAccessToken,
  getMemberWithAccessToken,
} from "../../api/social/KakaoApi";
import { useDispatch } from "react-redux";
import { login } from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";

const KakaoRedirectPage = () => {
  const [searchParams] = useSearchParams();
  const authCode = searchParams.get("code");
  const dispatch = useDispatch();
  const { moveToPath } = useCustomLogin();

  useEffect(() => {
    getAccessToken(authCode).then((accessToken) => {
      console.log(accessToken);
      getMemberWithAccessToken(accessToken).then((memberInfo) => {
        console.log(" -------------------------- ");
        console.log(memberInfo);
        console.log(memberInfo.memberNo);
        dispatch(login(memberInfo));

        //소셜 회원이 아니라면
        if (memberInfo && memberInfo.OAuth === null) {
          moveToPath("/");
        } else {
          moveToPath("/social/signup");
        }
      });
    });
  }, [authCode]);
  return (
    <div>
      <div>Kakao Login Redirect</div>

      <div>{authCode}</div>
    </div>
  );
};
export default KakaoRedirectPage;
