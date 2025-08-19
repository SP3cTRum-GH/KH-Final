import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

export const Title = styled.h2`
  margin-bottom: 20px;
`;

export const PriceLabel = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
  resize: none;
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const Button = styled.button`
  padding: 10px 16px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 6px;
  border: none;

  &.confirm {
    background-color: #007bff;
    color: white;
  }

  &.cancel {
    background-color: #ccc;
    color: #333;
  }
`;