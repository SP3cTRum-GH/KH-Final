import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
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

const ModifyMyPageComponent = () => {
    const loginState = useSelector((state) => state.loginSlice);
    const [user, setUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null); // 'info' | 'password'
    const [form, setForm] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();


    // 로그인된 회원 정보 가져오기
    useEffect(() => {
        axios.get('http://localhost:8080/api/member', { withCredentials: true })
            .then(res => {
                console.log('✅ 전체 응답:', res);       // Axios Response 전체
            console.log('✅ 회원 데이터:', res.data); // 실제 회원 데이터
                setUser(res.data);
                setForm({
                    memberName: res.data.memberName || '',
                    memberEmail: res.data.memberEmail || '',
                    memberPhone: res.data.memberPhone || '',
                    memberAddress: res.data.memberAddress || ''
                });
            })
            .catch(err => {
                console.error('로그인된 회원 정보 불러오기 실패:', err);
            });
    }, []);

    const openModal = (type) => {
        setModalType(type);
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
        const { memberName, memberPhone, memberAddress, memberEmail } = form;
        if (!memberName || !memberPhone || !memberAddress || !memberEmail) {
            return '모든 항목을 입력해주세요.';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(memberEmail)) {
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
    const handleSave = async () => {
        const validationMessage = modalType === 'info' ? validateInfo() : validatePassword();
        if (validationMessage) {
            setError(validationMessage);
            return;
        }

        try {
            if (modalType === 'info') {
                const res = await axios.put('http://localhost:8080/api/member', form, { withCredentials: true });
                setUser(res.data);
            } else if (modalType === 'password') {
                await axios.put('http://localhost:8080/api/member', form, { withCredentials: true });
            }
            closeModal();
        } catch (err) {
            console.error('저장 실패:', err);
            setError(err.response?.data?.error || '저장 중 오류 발생');
        }
    };

    if (!user) {
        return <div>로딩 중...</div>;
    }

    const isAdmin = loginState.roleNames?.includes('ADMIN');

    return (
        <PageContainer>
            {/* 프로필 영역 */}
            <ProfileSection>
                <div>
                    <Username>{user.memberName}</Username>
                    <UserId>ID: {user.memberId}</UserId>
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
                {isAdmin && (
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
                                    name="memberName"
                                    placeholder="이름"
                                    value={form.memberName}
                                    onChange={handleInputChange}
                                />
                                <ModalInput
                                    type="text"
                                    name="memberPhone"
                                    placeholder="연락처"
                                    value={form.memberPhone}
                                    onChange={handleInputChange}
                                />
                                <ModalInput
                                    type="text"
                                    name="memberAddress"
                                    placeholder="주소"
                                    value={form.memberAddress}
                                    onChange={handleInputChange}
                                />
                                <ModalInput
                                    type="email"
                                    name="memberEmail"
                                    placeholder="이메일"
                                    value={form.memberEmail}
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
