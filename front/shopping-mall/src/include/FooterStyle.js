import styled from "styled-components";

export const Copyrighter = styled.p`
    font-size: 0.8rem;
    color: #888;
    margin-top: 20px;
`

export const FooterInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 20px 30px 20px;

  @media (max-width: 500px) {
    div {
      margin: 0 auto;
    }
  }
  div {
    align-items: center;
  }

`

export const FooterContainer = styled.footer`
  width: 100%;
  background-color: #f8f8f8;
  padding: 40px 0;
  color: #333;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  > div {
    max-width: 1200px;
    margin: 0 auto ;

  }

  hr {
    margin-top: 30px;
    border: none;
    border-top: 1px solid #ccc;
  }
`;

export const SectionTitle = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 10px;
  margin-top: 30px;
  color: #111;
`;

export const Paragraph = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 6px 0;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ListItem = styled.li`
  margin: 6px 0;
  font-size: 0.9rem;
  display: flex;
  align-items: center;

  a {
    display: inline-flex;
    align-items: center;
    margin-right: 8px;
    color: #0073e6;
    text-decoration: none;
    color: black;
    line-height: 25px;

    img {
      margin-right: 8px;
      width: 20px;
      height: 20px;
    }

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const FooterBottom = styled.div`
    text-align: center;

    a {
      text-decoration: none;
      color: black;
    }
`