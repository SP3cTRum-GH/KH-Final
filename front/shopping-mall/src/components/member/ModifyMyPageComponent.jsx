import React, { useState } from 'react';
import {
    PageContainer,
    ProfileSection,
    Username,
    UserId,
    MenuList,
    MenuItem,
    MenuDescription,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalInput,
    ModalButton,
    ModalActions,
    ErrorText
} from './ModifyMyPageStyle';
import { useNavigate } from 'react-router-dom';

const ModifyMyPageComponent = ({ user }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null); // 'info' | 'password'
    const [form, setForm] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const openModal = (type) => {
        setModalType(type);
        setForm({});
        setError('');
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalType(null);
        setError('');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // 회원정보 유효성 검사
    const validateInfo = () => {
        const { name, phone, address, email } = form;
        if (!name || !phone || !address || !email) {
            return '모든 항목을 입력해주세요.';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return '올바른 이메일 형식을 입력해주세요.';
        }
        return '';
    };

    // 비밀번호 유효성 검사
    const validatePassword = () => {
        const { currentPassword, newPassword, confirmPassword } = form;
        if (!currentPassword || !newPassword || !confirmPassword) {
            return '모든 항목을 입력해주세요.';
        }
        if (newPassword.length < 6) {
            return '새 비밀번호는 최소 6자 이상이어야 합니다.';
        }
        if (newPassword !== confirmPassword) {
            return '새 비밀번호가 일치하지 않습니다.';
        }
        return '';
    };

    // 저장 처리
    const handleSave = () => {
        const validationMessage =
            modalType === 'info' ? validateInfo() : validatePassword();

        if (validationMessage) {
            setError(validationMessage);
            return;
        }

        // 실제 저장 처리 (mock)
        console.log('저장된 데이터:', form);

        // 저장 후 모달 닫기
        closeModal();
    };

    return (
        <PageContainer>
            {/* 프로필 영역 */}
            <ProfileSection>
                <div>
                    <Username>{user.name}</Username>
                    <UserId>ID: {user.id}</UserId>
                </div>
            </ProfileSection>

            {/* 메뉴 리스트 */}
            <MenuList>
                <MenuItem onClick={() => openModal('info')}>
                    회원정보 변경
                    <MenuDescription>이름, 연락처, 주소, 이메일</MenuDescription>
                </MenuItem>
                <MenuItem onClick={() => openModal('password')}>
                    비밀번호 변경
                </MenuItem>

                {/* 관리자 전용 메뉴 */}
                {user.memberRole === 'admin' && (
                    <>
                        <MenuItem onClick={() => navigate('/admin/memberlist')}>
                            회원 관리
                            <MenuDescription>회원 목록 및 권한 관리</MenuDescription>
                        </MenuItem>
                        <MenuItem onClick={() => navigate('/admin/saleschart')}>
                            매출 관리
                            <MenuDescription>매출 통계 및 보고서</MenuDescription>
                        </MenuItem>
                    </>
                )}
            </MenuList>

            {/* 모달 */}
            {isModalOpen && (
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>
                            {modalType === 'info' ? '회원정보 변경' : '비밀번호 변경'}
                        </ModalHeader>

                        {/* 회원정보 변경 */}
                        {modalType === 'info' && (
                            <>
                                <ModalInput
                                    type="text"
                                    name="name"
                                    placeholder="이름"
                                    onChange={handleInputChange}
                                />
                                <ModalInput
                                    type="text"
                                    name="phone"
                                    placeholder="연락처"
                                    onChange={handleInputChange}
                                />
                                <ModalInput
                                    type="text"
                                    name="address"
                                    placeholder="주소"
                                    onChange={handleInputChange}
                                />
                                <ModalInput
                                    type="email"
                                    name="email"
                                    placeholder="이메일"
                                    onChange={handleInputChange}
                                />
                            </>
                        )}

                        {modalType === 'password' && (
                            <>
                                <ModalInput
                                    type="password"
                                    name="currentPassword"
                                    placeholder="현재 비밀번호"
                                    onChange={handleInputChange}
                                />
                                <ModalInput
                                    type="password"
                                    name="newPassword"
                                    placeholder="새 비밀번호"
                                    onChange={handleInputChange}
                                />
                                <ModalInput
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="새 비밀번호 확인"
                                    onChange={handleInputChange}
                                />
                            </>
                        )}

                        {error && <ErrorText>{error}</ErrorText>}

                        <ModalActions>
                            <ModalButton onClick={closeModal}>취소</ModalButton>
                            <ModalButton primary onClick={handleSave}>저장</ModalButton>
                        </ModalActions>
                    </ModalContent>
                </ModalOverlay>
            )}
        </PageContainer>
    );
};

export default ModifyMyPageComponent;
