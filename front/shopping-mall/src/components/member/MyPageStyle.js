import styled from "styled-components";

export const ProfileBox = styled.div`
  margin: 0 auto;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  p {
    padding: 2px;
  }

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Button = styled.button`
  font-size: 0.875rem;
  color: #6b7280;
  border: 1px solid #d1d5db;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
`;

export const InfoBox = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
`;

export const Highlight = styled.span`
  color: #2563eb;
  font-weight: 600;
`;

export const ReviewInfo = styled.div`
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #374151;
`;

export const Emphasize = styled.span`
  font-weight: 600;
`;

export const Section = styled.div`
  padding: 2rem 1rem;
  max-width: 960px;
  margin: 0 auto;
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

export const StatusBox = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #fafafa;
  padding: 1rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
`;

export const StatusItem = styled.div`
  text-align: center;
`;

export const StatusLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

export const StatusValue = styled.div`
  font-size: 1.125rem;
  font-weight: bold;
  color: ${props => props.color === "red" ? "#ef4444" : "#111827"};
  margin-top: 5px;
`;

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-top: 1px solid #e5e7eb;
`;

export const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 0.5rem;
  object-fit: cover;
`;

export const ProductInfo = styled.div`
  flex: 1;
`;

export const ProductName = styled.div`
  font-weight: 500;
`;

export const ProductSize = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

export const ProductMeta = styled.div`
  text-align: right;
  min-width: 100px;
`;

export const ProductDate = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
`;

export const ProductStatus = styled.div`
  font-size: 0.875rem;
  color: #111827;
`;

export const ReviewStatus = styled.a`
  display: block;
  font-size: 0.75rem;
  color: #3b82f6;
  margin-top: 0.25rem;
  text-decoration: none;
`;

export const ViewAllBtn = styled.button`
  display: block;
  width: 90%;
  margin: 1rem auto;
  font-size: 0.875rem;
  color: #6b7280;
  border: 1px solid #d1d5db;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

  h3 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }

  ul {
    align-items: center;
    li {
      font-size: medium;
      margin: 0.75rem;
      color: gray;
      label {
        /* width: 80px; */
      }
      input {
        width: 90%;
        flex: 1;
        padding: 0.5rem;
        margin-top: 15px;
        border: 1px solid #d1d5db;
        border-radius: 4px;
      }
    }
  }
`;
export const CloseBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  padding: 3px;
`;

export const CloseBtn = styled.button`
  margin-top: 1rem;
  background-color: tomato;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
`;

export const LevelStatus = styled.div`
  margin-top: 1rem;
  font-size: 0.95rem;
`;

export const ProgressBar = styled.div`
  margin-top: 0.5rem;
  width: 100%;
  height: 12px;
  background-color: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.percent}%;
  background-color: #3b82f6;
  transition: width 0.4s ease-in-out;
`;

export const LevelRange = styled.div`
  margin-top: 0.25rem;
  font-size: 0.875rem;
  display: flex;
  justify-content: space-between;
  color: #6b7280;
  padding-bottom: 20px;

  span {
    font-weight: 500;
  }
`;

export const ProfileBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`
