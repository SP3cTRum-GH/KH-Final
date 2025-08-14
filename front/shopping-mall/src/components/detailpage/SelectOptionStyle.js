import styled from "styled-components";

export const OptionContainer = styled.div`
  width: 40%;
  padding: 20px;
  font-family: sans-serif;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  

  @media (max-width: 500px) {
    padding: 0 20px;  
  }
`

export const PriceBox = styled.div`
  margin-bottom: 10px;
  
`;

export const SalePrice = styled.div`
  font-size: 20px;
  font-weight: bold;

  span {
    color: red;
    margin-right: 6px;
  }
`;

export const ProductTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  

  @media (max-width: 500px) {
    padding: 0 20px;
  }
`;


export const ReviewBox = styled.div`
  font-size: 14px;
  color: #444;

  a {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const SelectWrapper = styled.div`
  margin-bottom: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  select {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  p {
    margin-top: 8px;
    font-size: 12px;
    color: #666;
  }

  input {
    width: 400px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  div {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  div > button {
    width: 32px;
    height: 32px;
    border: 1px solid #ccc;
    border-radius: 6px;
    background: #fff;
    cursor: pointer;
  }

  div > button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  input {
    font-size: 18px;
    font-weight: 500;
    text-align: center;
  }

  @media (max-width: 500px) {
    width: 90%;
    margin-bottom: 10px;
  }
`;

export const BuyButton = styled.button`
  width: 100%;
  background-color: #f44;
  color: white;
  padding: 12px 0;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 10px;

    @media (max-width: 500px) {
    width: 90%;
    margin-bottom: 10px;
  }
`;

export const InterestBox = styled.button`
  width: 100%;
  padding: 12px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  color: #333;
  cursor: pointer;

    @media (max-width: 500px) {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 10px;
  }
`;

export const OptionBox = styled.div`
  display: flex;
  flex-direction: column;
  
  align-items: center;

  @media (max-width: 500px) {
    width: 95%;
  }
`
