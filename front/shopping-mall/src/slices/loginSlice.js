import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";
import { getCookie, setCookie, removeCookie } from "../util/cookieUtil";

const initState = {
  memberId: "",
};

const loadMemberCookie = () => {
  const memberInfo = getCookie("member");
  //닉네임 처리
  if (memberInfo && memberInfo.memberName) {
    // %ED%99%8D%EA%B8%B8%EB%8F%99 => 홍길동
    memberInfo.memberName = decodeURIComponent(memberInfo.memberName);
  }
  console.log("load cookie");

  return memberInfo;
};

export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) => {
  return loginPost(param);
});

const loginSlice = createSlice({
  name: "LoginSlice",
  initialState: { ...initState, ...loadMemberCookie() }, // 쿠키 정보와 기본 상태를 병합
  reducers: {
    login: (state, action) => {
      console.log("로그인 ..................");
      //{소셜로그인 회원이 사용}
      const payload = action.payload;
      setCookie("member", JSON.stringify(payload), 1);
      return payload;
    },

    logout: (state, action) => {
      console.log("로그아웃 ............... ");
      removeCookie("member");
      return { ...initState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        console.log("fulfilled : 완료");
        const payload = action.payload;
        if (!payload.error) {
          console.log("쿠키 저장");
          setCookie("member", JSON.stringify(payload), 1);
          return payload; // 새로운 상태 반환
        }
        // 에러가 있는 경우
        return { ...initState, error: payload.error };
      })
      .addCase(loginPostAsync.pending, (state, action) => {
        console.log("pending : 처리중");
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log("rejected : 오류");
      });
  },
});
export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
