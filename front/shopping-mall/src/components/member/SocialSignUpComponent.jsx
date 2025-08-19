import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { modifySocialMember } from "../../api/memberApi";
import { Navigate } from "react-router-dom";

const SignUpForm = styled.form`
  max-width: 450px;
  margin: auto;
  margin-bottom: 50px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  width: 80px;
  display: block;
  line-height: 15px;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  margin: 10px;
  padding: 8px 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

const RadioGroup = styled.div`
  /* width: 180px; */
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

const ErrorText = styled.p`
  margin: 6px 10px 0 10px;
  color: #d32f2f;
  font-size: 12px;
`;

const SignUpComponent = () => {
  const loginInfo = useSelector((state) => state.loginSlice);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = Navigate;

  const validate = useCallback((fd) => {
    const errs = {};
    const id = fd.get("memberId")?.trim();
    const pw = fd.get("memberPw")?.trim();
    const name = fd.get("memberName")?.trim();
    const gender = fd.get("memberGender");
    const email = loginInfo.memberEmail;
    const phone = fd.get("memberPhone")?.trim();
    const address = fd.get("memberAddress")?.trim();

    if (!id) errs.member_id = "아이디를 입력해주세요.";
    else if (id.length < 4) errs.member_id = "아이디는 4자 이상이어야 합니다.";

    if (!pw) errs.member_pw = "비밀번호를 입력해주세요.";
    else if (pw.length < 8)
      errs.member_pw = "비밀번호는 8자 이상이어야 합니다.";

    if (!name) errs.member_name = "이름을 입력해주세요.";

    if (!gender) errs.member_gender = "성별을 선택해주세요.";

    if (!email) errs.member_email = "이메일을 입력해주세요.";
    else {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(email))
        errs.member_email = "유효한 이메일 형식이 아닙니다.";
    }

    if (!phone) errs.member_phone = "연락처를 입력해주세요.";
    else {
      // 숫자와 하이픈 허용, 최소 9자리
      const phoneDigits = phone.replace(/[^0-9]/g, "");
      if (phoneDigits.length < 9)
        errs.member_phone = "유효한 연락처를 입력해주세요.";
    }

    if (!address) errs.member_address = "주소를 입력해주세요.";

    return errs;
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      const v = validate(fd);
      if (Object.keys(v).length > 0) {
        setErrors(v);
        return;
      }

      setErrors({});
      setSubmitting(true);

      // TODO: 실제 제출 로직 연결 (API 호출)
      // 예시로만 폼 데이터 로깅
      const data = Object.fromEntries(fd.entries());
      console.log("signup submit", data);

      // 완료 후 버튼 재활성화 (실제 API에서는 응답 후 처리)
      setSubmitting(false);
      alert("회원가입 데이터가 유효합니다. (API 연동 시 제출) ");

      const sendData = {
        memberId: data.memberId,
        memberPw: data.memberPw,
        memberName: data.memberName,
        memberEmail: loginInfo.memberEmail,
        memberGender: data.memberGender === "male" ? true : false,
        memberPhone: data.memberPhone,
        memberAddress: data.memberAddress,
      };
      console.log(sendData);
      modifySocialMember(sendData);
      navigate("/");
    },
    [validate]
  );

  return (
    <div>
      <SignUpForm onSubmit={handleSubmit} noValidate>
        <FormGroup>
          <Label htmlFor="memberId">아이디</Label>
          <Input
            type="text"
            id="memberId"
            name="memberId"
            aria-invalid={!!errors.member_id}
          />
        </FormGroup>
        {errors.member_id && <ErrorText>{errors.member_id}</ErrorText>}
        <FormGroup>
          <Label htmlFor="memberPw">비밀번호</Label>
          <Input
            type="password"
            id="memberPw"
            name="memberPw"
            aria-invalid={!!errors.member_pw}
          />
        </FormGroup>
        {errors.member_pw && <ErrorText>{errors.member_pw}</ErrorText>}
        <FormGroup>
          <Label htmlFor="memberName">이름</Label>
          <Input
            type="text"
            id="memberName"
            name="memberName"
            aria-invalid={!!errors.member_name}
          />
        </FormGroup>
        {errors.member_name && <ErrorText>{errors.member_name}</ErrorText>}
        <FormGroup>
          <Label>성별</Label>
          <RadioGroup>
            <input type="radio" id="male" name="memberGender" value="male" />
            <label
              htmlFor="male"
              style={{ marginBottom: 0, fontWeight: "normal" }}
            >
              남성
            </label>
            <input
              type="radio"
              id="female"
              name="memberGender"
              value="female"
            />
            <label
              htmlFor="female"
              style={{ marginBottom: 0, fontWeight: "normal" }}
            >
              여성
            </label>
          </RadioGroup>
        </FormGroup>
        {errors.member_gender && <ErrorText>{errors.member_gender}</ErrorText>}
        <FormGroup>
          <Label htmlFor="memberEmail">이메일</Label>
          <Input
            type="email"
            value={loginInfo.memberEmail}
            id="memberEmail"
            name="memberEmail"
            aria-invalid={!!errors.member_email}
            disabled="true"
          />
        </FormGroup>
        {errors.member_email && <ErrorText>{errors.member_email}</ErrorText>}
        <FormGroup>
          <Label htmlFor="memberPhone">연락처</Label>
          <Input
            type="tel"
            id="memberPhone"
            name="memberPhone"
            aria-invalid={!!errors.member_phone}
          />
        </FormGroup>
        {errors.member_phone && <ErrorText>{errors.member_phone}</ErrorText>}
        <FormGroup>
          <Label htmlFor="memberAddress">주소</Label>
          <Input
            type="text"
            id="memberAddress"
            name="memberAddress"
            aria-invalid={!!errors.member_address}
          />
        </FormGroup>
        {errors.member_address && (
          <ErrorText>{errors.member_address}</ErrorText>
        )}
        <FormGroup>
          <Button type="submit" disabled={submitting}>
            회원가입
          </Button>
        </FormGroup>
      </SignUpForm>
    </div>
  );
};

export default SignUpComponent;
