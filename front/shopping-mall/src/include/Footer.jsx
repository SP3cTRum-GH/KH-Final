import React from "react";
import logo from "../assets/free-icon-github-logo.png";
import {
  Copyrighter,
  FooterContainer,
  SectionTitle,
  Paragraph,
  List,
  ListItem,
  FooterInfo,
  FooterBottom,
} from "./FooterStyle";

const Footer = () => {
  return (
    <FooterContainer>
      <div>
        <FooterInfo>
          <div>
            <SectionTitle>About Project</SectionTitle>
            <Paragraph>
              이 프로젝트는 쇼핑몰 웹사이트를 구현한 팀 프로젝트입니다.
            </Paragraph>
            <Paragraph>
              React, Spring Boot, Oracle 기반으로 구현되었습니다.
            </Paragraph>
          </div>

          <div>
            <List>
              <SectionTitle>Team Members</SectionTitle>
              <ListItem>
                <a href="https://github.com/SP3cTRum-GH/" target="_blank">
                  <img src={logo} alt="github-icon" />
                  김민우 (BE)
                </a>
              </ListItem>
              <ListItem>
                <a href="https://github.com/KANGJIHYEON1121" target="_blank">
                  <img src={logo} alt="github-icon" />
                  강지현 (FE)
                </a>
              </ListItem>
              <ListItem>
                <a href="#">
                  <img src={logo} alt="github-icon" />
                  박지수 (FE)
                </a>
              </ListItem>
              <ListItem>
                <a href="https://github.com/SuhyunYun950812" target="_blank">
                  <img src={logo} alt="github-icon" />
                  윤수현 (BE)
                </a>
              </ListItem>
              <ListItem>
                <a href="https://github.com/Winmin3658" target="_blank">
                  <img src={logo} alt="github-icon" />
                  이승민 (FE)
                </a>
              </ListItem>
            </List>
          </div>
        </FooterInfo>

        <FooterBottom>
          <Paragraph>개발 기간: 2025.08.04 ~ 2025.08.27</Paragraph>
          <Paragraph>
            배포 주소:{" "}
            <a href="https://github.com/SP3cTRum-GH/KH-Final">
              https://github.com/SP3cTRum-GH/KH-Final
            </a>
          </Paragraph>
          <hr />
          <Copyrighter>
            ⓒ 2025 Team ShoppingMall. All rights reserved.
          </Copyrighter>
        </FooterBottom>
      </div>
    </FooterContainer>
  );
};

export default Footer;
