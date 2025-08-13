import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;

  div {
    margin: 1rem 0
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableRow = styled.tr`
  background-color: ${({ header }) => (header ? "#333" : "#fff")};
  color: ${({ header }) => (header ? "#fff" : "#000")};
  cursor: ${({ header }) => (header ? "default" : "pointer")};

  &:hover {
    background-color: ${({ header }) => (header ? "#333" : "#f1f1f1")};
  }
`;

export const TableHeader = styled.th`
  padding: 10px;
  border: 1px solid #ccc;
`;

export const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  width: 400px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
`;

export const ModalHeader = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const ModalBody = styled.div`
  font-size: 0.9rem;
  p {
    margin: 5px 0;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
`;

export const CloseButton = styled.button`
  border: none;
  background: none;
  font-size: 1.2rem;
  cursor: pointer;
`;

export const ActionButton = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  ${({ edit }) => edit && `
    background-color: #4caf50;
    color: white;
  `}
  ${({ delete: del }) => del && `
    background-color: #f44336;
    color: white;
  `}
`;
