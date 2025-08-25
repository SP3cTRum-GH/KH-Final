import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 50px;
`;

export const Container = styled.div`
  /* display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin-left: 100px; */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
gap: 20px;
width: 100%;
max-width: 1200px;
margin: 0 auto;  // 가운데 정렬

  @media (max-width: 430px) {
    /* margin-left: 40px;
    gap: 50px; */
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

    @media (max-width: 414px) {
    /* margin-left: 25px;
    gap: 50px; */
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  @media (max-width: 390px) {
    margin-left: 10px;
    gap: 50px;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

    @media (max-width: 375px) {
    margin-left: 5px;
    gap: 40px;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }


`;

export const ProductContainer = styled.div`
    /* width: 200px; */
    width: 100%;
    cursor: pointer;
    

    img {
        /* width: 200px;
        height: 200px; */
        width: 100%;
        height: auto;
        aspect-ratio: 1/1;
        object-fit: cover;
        /* background-size: cover;
        background-position: center;
        background-image: none; */
    }

    div {

        h4 {
            padding: 5px 0;
            font-weight: 600;
        }
    }

    @media (max-width: 500px) {
        width: 130px;
        cursor: pointer;

    img {
        width: 200px;
        height: 200px;
        background-size: cover;
        background-position: center;
        background-image: none;
    }

    div {

        h4 {
            padding: 5px 0;
            font-weight: 600;
        }
    }
  }
`

export const PlusContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 2px dashed #ccc;
  font-size: 2rem;
  font-weight: bold;
  color: #666;
  min-height: 250px;
  width: 200px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #999;
    color: #333;
    background-color: #f9f9f9;
  }
`
export const Wrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    > div > button {
        font-size: medium;
        margin-top: 0.5px;
        padding: 6px 12px;
        background-color: #ef4444; // 빨강 계열
        color: white;
        font-weight: 500;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    // 오른쪽 버튼 그룹
  > div > div {
    display: flex;
    gap: 8px; // 버튼 사이 간격
  }

    h4 {
    @media (max-width: 500px) {
     font-size : 14px;
    }
    }
`
export const EditButton = styled(RouterLink)`
  display: inline-block;
  padding: 7.5px 12px;
  background-color: #4f46e5; // 보라 계열
  color: white;
  font-weight: 500;
  border-radius: 6px;
  text-decoration: none;
  transition: background-color 0.2s;
  gap: 15px;
  margin-right: 5px;
`;