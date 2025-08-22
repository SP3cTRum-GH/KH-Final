import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const loginState = useSelector((state) => state.loginSlice);
  const { doLogout } = useCustomLogin();

  const currentPath = location.pathname;

  const getLinkStyle = (path) => ({
    textDecoration: "none",
    borderBottom: currentPath === path ? "5px solid tomato" : "none",
    paddingBottom: "14px",
  });

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
                <a href="/shop" style={getLinkStyle("/shop")}>
                  Shop
                </a>
              </label>
            </MenuItem>
            <MenuItem>
              <label htmlFor="menuCheckbox">
                <a href="/deal" style={getLinkStyle("/deal")}>
                  Deal
                </a>
              </label>
            </MenuItem>
            <MenuItem>
              <label htmlFor="menuCheckbox">
                <a href="/event" style={getLinkStyle("/event")}>
                  Event
                </a>
              </label>
            </MenuItem>
          </div>

          {loginState.memberId ? (
            <div className="MenuItemRight">
              <MenuItem>
                <label htmlFor="menuCheckbox">
                  <a href="/cart" style={getLinkStyle("/cart")}>
                    장바구니
                  </a>
                </label>
              </MenuItem>
              <MenuItem>
                <label htmlFor="menuCheckbox">
                  <a href="/mypage" style={getLinkStyle("/mypage")}>
                    마이페이지
                  </a>
                </label>
              </MenuItem>
              <MenuItem>
                <label htmlFor="menuCheckbox">
                  <a href="#" onClick={() => doLogout()}>
                    로그아웃
                  </a>
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
                  <a href="/shop" style={getLinkStyle("/shop")}>
                    Shop
                  </a>
                </label>
              </MenuItem>
              <MenuItem>
                <label htmlFor="menuCheckbox">
                  <a href="/deal" style={getLinkStyle("/deal")}>
                    Deal
                  </a>
                </label>
              </MenuItem>
              <MenuItem>
                <label htmlFor="menuCheckbox">
                  <a href="/event" style={getLinkStyle("/event")}>
                    Event
                  </a>
                </label>
              </MenuItem>
            </div>
          </MenuGroup>
          <img src="" alt="메인 로고" onClick={() => navigate("/")} />
          {loginState.memberId ? (
            <div className="MenuItemRight">
              <MenuItem>
                <label htmlFor="menuCheckbox">
                  <a href="/cart" style={getLinkStyle("/cart")}>
                    장바구니
                  </a>
                </label>
              </MenuItem>
              <MenuItem>
                <label htmlFor="menuCheckbox">
                  <a href="/mypage" style={getLinkStyle("/mypage")}>
                    마이페이지
                  </a>
                </label>
              </MenuItem>
              <MenuItem>
                <label htmlFor="menuCheckbox">
                  <a href="#" onClick={() => doLogout()}>
                    로그아웃
                  </a>
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
