import React, { useState } from "react";
import { Container } from "../../components/Container";
import Header from "../../include/Header";
import Footer from "../../include/Footer";
import useCustomLogin from "../../hooks/useCustomLogin";

const initState = { memberId: "", pw: "" };

const LoginPage = () => {
  const [loginParam, setLoginParam] = useState({ ...initState });
  const { doLogin, moveToPath } = useCustomLogin();

  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value;
    setLoginParam({ ...loginParam });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🆔 ID:", loginParam.memberId);
    console.log("🔑 Password:", loginParam.pw);
    alert("로그인");
  };
  const handleClickLogin = (e) => {
    doLogin(loginParam)
      // loginSlice 의 비동기 호출
      .then((data) => {
        console.log(data);
        if (data.error) {
          alert("이메일과 패스워드를 다시 확인하세요");
        } else {
          alert("로그인 성공");
          moveToPath("/");
        }
      });
  };

  return (
    <div>
      <Header />
      <Container>
        <h2>로그인</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="아이디"
            name="memberId"
            value={loginParam.memberId}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="password"
            name="pw"
            placeholder="비밀번호"
            value={loginParam.pw}
            onChange={handleChange}
            required
          />
          <button type="submit" onClick={handleClickLogin}>
            로그인
          </button>
        </form>
      </Container>
      <Footer />
    </div>
  );
};

export default LoginPage;
