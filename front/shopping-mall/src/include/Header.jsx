import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Nav,
  MenuToggle,
  MenuItem,
  Menu,
  MobileMenu,
  MenuGroup,
} from "./HeaderStyle";
import useCustomLogin from "../hooks/useCustomLogin";

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.loginSlice);
  const { doLogout } = useCustomLogin();

  return (
    <Nav>
      <img src="" alt="메인 로고" onClick={() => navigate("/")} />
      <MenuToggle onClick={() => setOpen(!open)} open={open}>
        <span></span>
        <span></span>
        <span></span>
      </MenuToggle>

      {open ? (
        <MobileMenu>
          <div className="MenuItemLeft">
            <MenuItem>
              <label htmlFor="menuCheckbox">
                <a href="/shop">Shop</a>
              </label>
            </MenuItem>
            <MenuItem>
              <label htmlFor="menuCheckbox">
                <a href="/deal">Deal</a>
              </label>
            </MenuItem>
            <MenuItem>
              <label htmlFor="menuCheckbox">
                <a href="/event">Event</a>
              </label>
            </MenuItem>
          </div>

          {loginState.memberId ? (
            <div className="MenuItemRight">
              <MenuItem>
                <label htmlFor="menuCheckbox">
                  <a href="/cart">장바구니</a>
                </label>
              </MenuItem>
              <MenuItem>
                <label htmlFor="menuCheckbox">
                  <a href="/mypage">마이페이지</a>
                </label>
              </MenuItem>
              <MenuItem>
                <label htmlFor="menuCheckbox">
                  <a href="#" onClick={() => doLogout()}>로그아웃</a>
                </label>
              </MenuItem>
            </div>
          ) : (
            <>
              <MenuItem>
                <label htmlFor="menuCheckbox">
                  <a href="/login">로그인</a>
                </label>
              </MenuItem>
            </>
          )}
        </MobileMenu>
      ) : (
        <Menu>
          <MenuGroup>
            <div className="MenuItemLeft">
              <MenuItem>
                <label htmlFor="menuCheckbox">
                  <a href="/shop">Shop</a>
                </label>
              </MenuItem>
              <MenuItem>
                <label htmlFor="menuCheckbox">
                  <a href="/deal">Deal</a>
                </label>
              </MenuItem>
              <MenuItem>
                <label htmlFor="menuCheckbox">
                  <a href="/event">Event</a>
                </label>
              </MenuItem>
            </div>
          </MenuGroup>
          <img src="" alt="메인 로고" onClick={() => navigate("/")} />
          {loginState.memberId ? (
            <div className="MenuItemRight">
              <MenuItem>
                <label htmlFor="menuCheckbox">
                  <a href="/cart">장바구니</a>
                </label>
              </MenuItem>
              <MenuItem>
                <label htmlFor="menuCheckbox">
                  <a href="/mypage">마이페이지</a>
                </label>
              </MenuItem>
              <MenuItem>
                <label htmlFor="menuCheckbox">
                  <a href="#" onClick={() => doLogout()}>로그아웃</a>
                </label>
              </MenuItem>
            </div>
          ) : (
            <>
              <MenuItem>
                <label htmlFor="menuCheckbox">
                  <a href="/login">로그인</a>
                </label>
              </MenuItem>
            </>
          )}
        </Menu>
      )}
    </Nav>
  );
};

export default Header;
