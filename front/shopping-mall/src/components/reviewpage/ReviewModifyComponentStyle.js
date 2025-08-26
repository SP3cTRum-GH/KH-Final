import styled from "styled-components";

export const ReviewContainer = styled.div`
  max-width: 50%;
  margin: 40px auto;
  padding: 24px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 12px;

  @media (max-width: 500px) {
    max-width: 80%;
  }
`;

export const ReviewProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;

  .product-image img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
  }

  .product-details {
    h2 {
      margin: 0;
      font-size: 18px;
    }
    p {
      margin: 4px 0;
      color: #666;
    }
  }
`;

export const ReviewInputSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  width: 100%;

  textarea {
    width: 95%;
    height: 100px;
    resize: none;
    padding: 12px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 12px;
  }
`;

export const PreviewWrap = styled.div`
  margin-top: 8px;
  position: relative;
  display: inline-block;
`;

export const PreviewImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #eee;
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
`;

export const ReviewSubmitSection = styled.div`
  text-align: center;
  margin-top: 24px;

  button {
    width: 100%;
    background-color: black;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
  }
`;
