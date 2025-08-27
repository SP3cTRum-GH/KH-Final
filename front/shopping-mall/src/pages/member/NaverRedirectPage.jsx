import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getMember } from "../../api/social/NaverApi";
import { useDispatch } from "react-redux";
import { login } from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";

const NaverRedirectPage = () => {
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

      // 소셜 회원이 아니라면
      if (memberInfo && memberInfo.OAuth === null) {
        moveToPath("/");
      } else {
        moveToPath("/social/signup");
      }
    });
  }, [authCode, state]);
  return (
    <div>
      <div>Naver Login Redirect</div>

      <div>{authCode}</div>
    </div>
  );
};
export default NaverRedirectPage;
