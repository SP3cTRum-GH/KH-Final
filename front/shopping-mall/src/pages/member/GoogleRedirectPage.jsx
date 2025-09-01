import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useEffect } from "react";
import { getMember } from "../../api/social/GoogleApi";
import { login } from "../../slices/loginSlice";

const GoogleRedirectPage = () => {
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

      if (memberInfo.OAuth === "GoogleDefault") {
        moveToPath("/social/signup");
      } else {
        moveToPath("/");
      }
    });
  }, [authCode, state]);
  return (
    <div>
      <div>Google Login Redirect</div>
    </div>
  );
};

export default GoogleRedirectPage;
