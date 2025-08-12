import styled from 'styled-components';

export const PageContainer = styled.div`
    padding: 2rem;
    font-family: 'Arial', sans-serif;
    background-color: #fff;
`;

export const ProfileSection = styled.div`
    margin-bottom: 2rem;
`;

export const Username = styled.h2`
    font-size: 1.2rem;
`;

export const UserId = styled.p`
    color: #777;
    font-size: 0.9rem;
`;

export const MenuList = styled.ul`
    list-style: none;
    padding: 0;
`;

export const MenuItem = styled.li`
    padding: 1.2rem 0;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    font-weight: 500;

    &:hover {
        background-color: #f9f9f9;
    }
`;

export const MenuDescription = styled.p`
    font-size: 0.85rem;
    color: #999;
    margin-top: 0.3rem;
`;

// 모달 스타일
export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalContent = styled.div`
    background: #fff;
    padding: 2rem;
    width: 90%;
    max-width: 400px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

export const ModalHeader = styled.h3`
    margin-bottom: 1rem;
    font-size: 1.2rem;
    text-align: center;
`;

export const ModalInput = styled.input`
    display: flex;
    align-items: center;
    margin: 0 auto;
    width: 90%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 0.95rem;
`;

export const ModalActions = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    gap: 0.5rem;
`;

export const ModalButton = styled.button`
    padding: 0.6rem 1.2rem;
    background-color: ${(props) => (props.primary ? '#000' : '#ddd')};
    color: ${(props) => (props.primary ? '#fff' : '#333')};
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        opacity: 0.9;
    }
`;

export const ErrorText = styled.p`
    color: red;
    font-size: 0.85rem;
    margin-bottom: 1rem;
    text-align: center;
`;

