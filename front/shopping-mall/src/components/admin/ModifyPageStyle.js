import styled from "styled-components";

export const PageWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Section = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
`;

export const SectionTitle = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  flex: 1 1 200px;
  display: flex;
  flex-direction: column;
  font-weight: 500;
  font-size: 0.9rem;
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.9rem;
  margin-top: 0.3rem;
`;

export const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.9rem;
  margin-top: 0.3rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

export const Button = styled.button`
  padding: 0.7rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  color: #fff;
  background-color: ${(props) => (props.variant === "primary" ? "#007bff" : "#6c757d")};

  &:hover {
    opacity: 0.9;
  }
`;

export const ThumbnailWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
`;

export const Thumbnail = styled.div`
  position: relative;
  width: 100px;
  height: 100px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
    border: 1px solid #ddd;
  }
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: -5px;
  right: -5px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  width: 20px;
  height: 20px;
  font-size: 14px;
  line-height: 20px;
  padding: 0;
`;

export const SizeContainer = styled.div`
    display: flex;
    flex-wrap: wrap; /* 여러 줄로 줄바꿈 가능 */
    gap: 10px 20px; /* 행, 열 간격 */
    margin-top: 10px;
`;

export const SizeTag = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f5f5f5;
  padding: 6px 10px;
  border-radius: 5px;
`;

export const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: red;
  cursor: pointer;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 0.85rem;
  margin-top: 5px;
`;

export const SizeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  min-width: 250px; /* 한 줄에 너무 붙지 않게 최소 너비 */
  height: 20px;

  input[type="checkbox"] {
    margin-right: 6px;
    transform: scale(1.2);
  }
`;

export const StockInput = styled.input`
  width: 60px;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

// 사이즈 관리 버튼
export const SelectButtons = styled.div`
  display: flex;
  gap: 8px;
  margin: 10px 0;
`;

export const SelectButton = styled.button`
  background: black;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  &:hover {
    background: #1864ab;
  }
`;