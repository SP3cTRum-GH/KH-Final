import styled from "styled-components";

export const ImgContainer = styled.div`
    display: flex;
    height: auto;
    
    align-items: center;
    flex-direction: column;
    margin-bottom: 80px;

    overflow-y: hidden;
`

export const Img = styled.img`
    width: 80%;
`

export const MoreButton = styled.button`
  width: 95%;
  margin-top: 20px;
  padding: 20px 20px;
  font-size: 18px;
  font-weight: 700;
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 6px;
`;