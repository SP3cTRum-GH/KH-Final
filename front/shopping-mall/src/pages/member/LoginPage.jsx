import React, { useState } from "react";
import { Container } from "../../components/Container";
import Header from "../../include/Header";
import Footer from "../../include/Footer";
import useCustomLogin from "../../hooks/useCustomLogin";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getKakaoLoginLink } from "../../api/social/KakaoApi";
import { getGoogleLoginLink } from "../../api/social/GoogleApi";
import { getNaverLoginLink } from "../../api/social/NaverApi";

const initState = { memberId: "", pw: "" };

// Styled Components
const LoginWrapper = styled.div`
  margin: 100px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginBox = styled.div`
  background: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 16px;
`;

const SocialButton = styled(Button)`
  background: ${(props) => props.bgcolor || "#eee"};
  color: ${(props) => props.color || "#fff"};
  margin-top: 10px;
  font-weight: 600;
`;

const SignUpLink = styled(Link)`
  margin-top: 15px;
  display: block;
  text-align: center;
  color: blue;
  cursor: pointer;
  text-decoration: underline;
  font-size: 15px;
`;

const LoginPage = () => {
  const [loginParam, setLoginParam] = useState({ ...initState });
  const { doLogin, moveToPath } = useCustomLogin();
  const kakaoLink = getKakaoLoginLink();
  const googleLink = getGoogleLoginLink();
  const naverLink = getNaverLoginLink();

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
        <LoginWrapper>
          <LoginBox>
            <Title>로그인</Title>
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="아이디"
                name="memberId"
                value={loginParam.memberId}
                onChange={handleChange}
                required
              />
              <Input
                type="password"
                name="pw"
                placeholder="비밀번호"
                value={loginParam.pw}
                onChange={handleChange}
                required
              />
              <Button type="submit" onClick={handleClickLogin}>
                로그인
              </Button>
            </form>
            <SocialButton
              style={{
                backgroundColor: "#fff",
                color: "#000",
                border: "1px solid #dadce0",
              }}
            >
              <Link
                to={googleLink}
                style={{ textDecoration: "none", color: "black" }}
              >
                구글 로그인
              </Link>
            </SocialButton>
            <SocialButton style={{ backgroundColor: "#03C75A" }}>
              <Link
                to={naverLink}
                style={{ textDecoration: "none", color: "black" }}
              >
                네이버 로그인
              </Link>
            </SocialButton>
            <SocialButton style={{ backgroundColor: "#FEE500", color: "#000" }}>
              <Link
                to={kakaoLink}
                style={{ textDecoration: "none", color: "black" }}
              >
                카카오 로그인
              </Link>
            </SocialButton>
            <SignUpLink as={Link} to="/signup">
              회원가입
            </SignUpLink>
          </LoginBox>
        </LoginWrapper>
      </Container>
      <Footer />
    </div>
  );
};

export default LoginPage;
