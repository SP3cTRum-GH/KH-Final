import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  padding: 10px 14px;
  background: black;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  display: ${({ show }) => (show ? "block" : "none")};
  z-index: 1000;
`;

const ScrollUpButton = () => {
  const [show, setShow] = useState(false);

  const handleScroll = () => {
    setShow(window.scrollY > 300);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button onClick={scrollToTop} show={show}>
      ↑
    </Button>
  );
};

export default ScrollUpButton;
