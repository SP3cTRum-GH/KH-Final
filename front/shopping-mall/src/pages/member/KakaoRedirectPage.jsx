import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getMember } from "../../api/social/KakaoApi";
import { useDispatch } from "react-redux";
import { login } from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";

const KakaoRedirectPage = () => {
  const [searchParams] = useSearchParams();
  const authCode = searchParams.get("code");
  const state = searchParams.get("state");
  const dispatch = useDispatch();
  const { moveToPath } = useCustomLogin();

  useEffect(() => {
    getMember(authCode, state).then((memberInfo) => {
      console.log(" -------------------------- ");
      console.log(memberInfo);
      console.log(memberInfo.memberNo);

      dispatch(login(memberInfo));

      if (memberInfo.OAuth === "KakaoDefault") {
        moveToPath("/social/signup");
      } else {
        moveToPath("/");
      }
    });
  }, [authCode, state]);
  return (
    <div>
      <div>Kakao Login Redirect</div>
    </div>
  );
};
export default KakaoRedirectPage;
