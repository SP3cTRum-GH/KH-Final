import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 9999px;
  background-color: #d1d5db;
  div {
    font-weight: bold;
  }
`;

export const Button = styled.button`
  font-size: 0.875rem;
  color: #6b7280;
  border: 1px solid #d1d5db;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
`;

export const InfoBox = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.875rem;
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