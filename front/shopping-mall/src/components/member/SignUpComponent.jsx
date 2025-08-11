import React from "react";
import styled from "styled-components";

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
  /* justify-content: center; */
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

const SignUpComponent = () => {
  return (
    <div>
      <SignUpForm>
        <FormGroup>
          <Label htmlFor="member_id">아이디</Label>
          <Input type="text" id="member_id" name="member_id" />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="member_pw">비밀번호</Label>
          <Input type="password" id="member_pw" name="member_pw" />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="member_name">이름</Label>
          <Input type="text" id="member_name" name="member_name" />
        </FormGroup>
        <FormGroup>
          <Label>성별</Label>
          <RadioGroup>
            <input type="radio" id="male" name="member_gender" value="male" />
            <lavel
              htmlFor="male"
              style={{ marginBottom: 0, fontWeight: "normal" }}
            >
              남성
            </lavel>
            <input
              type="radio"
              id="female"
              name="member_gender"
              value="female"
            />
            <lavel
              htmlFor="female"
              style={{ marginBottom: 0, fontWeight: "normal" }}
            >
              여성
            </lavel>
          </RadioGroup>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="member_email">이메일</Label>
          <Input type="email" id="member_email" name="member_email" />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="member_phone">연락처</Label>
          <Input type="tel" id="member_phone" name="member_phone" />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="member_address">주소</Label>
          <Input type="text" id="member_address" name="member_address" />
        </FormGroup>
        <FormGroup>
          <Button type="submit">회원가입</Button>
        </FormGroup>
      </SignUpForm>
    </div>
  );
};

export default SignUpComponent;
