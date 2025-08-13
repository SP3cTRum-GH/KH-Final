import styled from "styled-components"

export const Nav = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    background-color: black;
    padding:  10px;
    margin-bottom: 50px;
    position: sticky;
    top: 0;
    z-index: 2;
    
    > img {
      display: none;   
    }

    @media (max-width: 651px) {
    display: flex;
    flex-direction: row; /* 세로 정렬 */
    align-items: center;
    margin-bottom: 0;

      img {
        display: block;
        cursor: pointer;
      }
  }
`

export const MenuToggle = styled.div`
  padding-top: 5px;
  margin-left: auto; /* 오른쪽으로 이동 */
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  cursor: pointer;

  a {
    text-decoration: none;
    color: white;
    transition: color 0.3s ease;

    &:hover {
      color: tomato;
    }
  }

  // X의 정사각형 틀
  input {
    display: block;
    width: 40px;
    height: 32px;
    position: absolute;
    top: -7px;
    left: -5px;
    cursor: pointer;
    opacity: 0;
    z-index: 2;
    -webkit-touch-callout: none;
  }

  // 햄버거 버튼 3개 줄
  span {
    display: block;
    width: 33px;
    height: 4px;
    margin-bottom: 5px;
    position: relative;
    background: #cdcdcd;
    border-radius: 3px;
    z-index: 1;
    transform-origin: 4px 0px;
    transition: 
      transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
      background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
      opacity 0.55s ease;
  }
${({ open }) =>
    open &&
    `
      span:nth-child(1) {
        transform: rotate(45deg) translate(0px, -2px);
      }
      span:nth-child(2) {
        opacity: 0;
      }
      span:nth-child(3) {
        transform: rotate(-45deg) translate(0px, -2px);
      }
    `}
    
    @media (min-width: 652px) {
    display: none; /* 데스크탑에서 햄버거 숨김 */
  } 
input:checked ~ span:nth-child(2) {
  transform: rotate(45deg) translate(0px, -2px);
  width: 34px;
}

input:checked ~ span:nth-child(3) {
  opacity: 0;
}

input:checked ~ span:nth-child(4) {
  transform: rotate(-45deg) translate(0px, -2px);
  width: 34px;
} 
`;
export const MenuGroup = styled.div`
  display: flex;
`

export const Menu = styled.ul`
  list-style: none;
  display: flex;
  margin: 0 40px;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;

  img {
    width: 100px;
    height: auto;
    cursor: pointer;
  }

  .MenuItemLeft,
  .MenuItemRight {
    display: flex;
    gap: 30px;
  }

  .MenuItemRight {
    justify-content: flex-end;
  }

  /* PC 스타일 */
  li {
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;

    a {
      text-decoration: none;
      color: white;
      transition: color 0.3s ease;

      &:hover {
        color: tomato;
      }
    }
  }

  /* 모바일에서 숨기기 */
  @media (max-width: 651px) {
    display: none;
    flex-direction: column;
    align-items: flex-start;
    background-color: #ededed;
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 250px;
    padding: 100px 20px;
    transform: translateX(100%);
    transition: transform 0.3s ease;

    li {
      margin-bottom: 20px;
      a {
        color: black;
        font-size: 20px;
      }
    }
  }
`;

export const MobileMenu = styled.ul`
  list-style: none;
  display: none;
  margin: 0 auto;
  padding: 0;
  gap: 20px;
  display: flex;
  width: 100%;

  .MobileMenu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }
  /* PC 스타일 */
  label {
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;

    a {
      text-decoration: none;
      color: white;
      transition: color 0.3s ease;

      &:hover {
        color: tomato;
      }
    }
    
  }

  /* 모바일에서 숨기기 */
  @media (max-width: 651px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #ededed;
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 250px;
    padding: 100px 20px;
    transform: translateX(0);
    transition: transform 5s ease-in-out;
    z-index: 2;

    li {
      margin-bottom: 20px;
      a {
        color: black;
        font-size: 20px;
      }
    }
  }
`;

export const MenuItem = styled.li`
  padding: 10px 0;
  font-size: 22px;
  font-weight: bold;
  list-style-type: none;
`;