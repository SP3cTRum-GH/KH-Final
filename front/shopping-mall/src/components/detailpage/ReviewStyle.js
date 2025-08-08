
import styled from "styled-components";

export const ReviewTitle = styled.h1`
  font-size: 18px;
  font-weight: 700;

  @media (max-width: 500px) {
    padding: 0 20px;
  }
`

export const ReviewWrap = styled.div`
    margin-bottom: 80px;
`

export const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  margin: 20px 0;
  position: relative;
`;

export const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #555;
`;

export const ReviewRating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: bold;
  color: #f59e0b;
`;

export const ReviewInfo = styled.div`
  font-size: 13px;
  color: #666;
`;

export const ReviewImage = styled.img`
  width: 200px;
  height: auto;
  border-radius: 6px;
  object-fit: cover;
`;

export const ReviewText = styled.p`
  font-size: 14px;
  color: #333;
  line-height: 1.5;
`;

export const ActionBtnBox = styled.div`
    position: absolute;
    right: 0;
    display: flex;
    gap: 3px;
    padding: 5px;

    p {
        font-size: 13px;
        cursor: pointer;
        color:rgb(200, 200, 200);
    }
`