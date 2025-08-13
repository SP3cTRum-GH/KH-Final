import React, { useState } from "react";
import {
    Container,
    Table,
    TableHeader,
    TableRow,
    TableCell,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    CloseButton,
    ActionButton
} from "./MemberListPageStyle";

const mockMembers = [
    {
        memberNo: 1,
        memberId: "user01",
        memberName: "홍길동",
        memberEmail: "hong@example.com",
        memberGender: "남성",
        memberPhone: "010-1234-5678",
        memberAddress: "서울시 강남구 테헤란로",
        memberRole: "USER",
        memberPoint: 1500,
        regDate: "2025-08-01",
        enable: true,
        grade: "VIP"
    },
    {
        memberNo: 2,
        memberId: "user02",
        memberName: "김철수",
        memberEmail: "kim@example.com",
        memberGender: "남성",
        memberPhone: "010-5678-1234",
        memberAddress: "부산시 해운대구",
        memberRole: "ADMIN",
        memberPoint: 3000,
        regDate: "2025-07-15",
        enable: false,
        grade: "일반"
    }
];

export default function MemberListPageComponent() {
    const [selectedMember, setSelectedMember] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState(null);

    // 검색어 상태
    const [searchId, setSearchId] = useState("");
    const [searchName, setSearchName] = useState("");

    // 필터링된 회원 리스트
    const filteredMembers = mockMembers.filter((member) => {
        const matchId = member.memberId.toLowerCase().includes(searchId.toLowerCase());
        const matchName = member.memberName.toLowerCase().includes(searchName.toLowerCase());
        return matchId && matchName;
    });
    const handleRowClick = (member) => {
        setSelectedMember(member);
        setEditMode(false);
        setEditData(null);
    };

    const closeModal = () => {
        setSelectedMember(null);
        setEditMode(false);
        setEditData(null);
    };

    const handleEditClick = () => {
        setEditMode(true);
        setEditData({
            memberNo: selectedMember.memberNo,
            memberId: selectedMember.memberId,
            memberName: selectedMember.memberName,
            memberEmail: selectedMember.memberEmail,
            memberGender: selectedMember.memberGender,
            memberPhone: selectedMember.memberPhone,
            memberAddress: selectedMember.memberAddress,
            memberRole: selectedMember.memberRole,
            memberPoint: selectedMember.memberPoint,
            regDate: selectedMember.regDate,
            enable: selectedMember.enable,
            grade: selectedMember.grade,
        });
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSave = () => {
        alert(`${editData.memberName} 회원 정보가 저장되었습니다.`);
        // 여기서 실제 API 호출로 저장하거나 상태 업데이트 필요
        setSelectedMember(editData);
        setEditMode(false);
    };

    const handleDelete = () => {
        if (window.confirm(`${selectedMember.memberName} 회원을 삭제하시겠습니까?`)) {
            alert("회원이 삭제되었습니다.");
            closeModal();
        }
    };

    return (
        <Container>
            <h2>회원 목록</h2>

            {/* 검색창 */}
            <div>
                <input
                    type="text"
                    placeholder="아이디 검색"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    style={{ marginRight: "0.5rem", padding: "0.3rem" }}
                />
                <input
                    type="text"
                    placeholder="이름 검색"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    style={{ padding: "0.3rem" }}
                />
            </div>
            <Table>
                <thead>
                    <TableRow header>
                        <TableHeader>회원번호</TableHeader>
                        <TableHeader>아이디</TableHeader>
                        <TableHeader>이름</TableHeader>
                        <TableHeader>이메일</TableHeader>
                    </TableRow>
                </thead>
                <tbody>
                    {filteredMembers.length > 0 ? (
                        filteredMembers.map((member) => (
                            <TableRow key={member.memberNo} onClick={() => handleRowClick(member)}>
                                <TableCell>{member.memberNo}</TableCell>
                                <TableCell>{member.memberId}</TableCell>
                                <TableCell>{member.memberName}</TableCell>
                                <TableCell>{member.memberEmail}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} style={{ textAlign: "center" }}>
                                검색 결과가 없습니다.
                            </TableCell>
                        </TableRow>
                    )}
                </tbody>
            </Table>

            {selectedMember && (
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>
                            회원 상세 정보
                            <CloseButton onClick={closeModal}>×</CloseButton>
                        </ModalHeader>
                        <ModalBody>
                            {editMode ? (
                                <>
                                    <p>
                                        <strong>회원번호:</strong> {editData.memberNo}
                                    </p>
                                    <p>
                                        <strong>아이디:</strong>{" "}
                                        <input
                                            type="text"
                                            name="memberId"
                                            value={editData.memberId}
                                            onChange={handleInputChange}
                                        />
                                    </p>
                                    <p>
                                        <strong>이름:</strong>{" "}
                                        <input
                                            type="text"
                                            name="memberName"
                                            value={editData.memberName}
                                            onChange={handleInputChange}
                                        />
                                    </p>
                                    <p>
                                        <strong>이메일:</strong>{" "}
                                        <input
                                            type="email"
                                            name="memberEmail"
                                            value={editData.memberEmail}
                                            onChange={handleInputChange}
                                        />
                                    </p>
                                    <p>
                                        <strong>성별:</strong>{" "}
                                        <select
                                            name="memberGender"
                                            value={editData.memberGender}
                                            onChange={handleInputChange}
                                        >
                                            <option value="남성">남성</option>
                                            <option value="여성">여성</option>
                                        </select>
                                    </p>
                                    <p>
                                        <strong>연락처:</strong>{" "}
                                        <input
                                            type="text"
                                            name="memberPhone"
                                            value={editData.memberPhone}
                                            onChange={handleInputChange}
                                        />
                                    </p>
                                    <p>
                                        <strong>주소:</strong>{" "}
                                        <input
                                            type="text"
                                            name="memberAddress"
                                            value={editData.memberAddress}
                                            onChange={handleInputChange}
                                        />
                                    </p>
                                    <p>
                                        <strong>권한:</strong>{" "}
                                        <select
                                            name="memberRole"
                                            value={editData.memberRole}
                                            onChange={handleInputChange}
                                        >
                                            <option value="USER">user</option>
                                            <option value="MEMBER">member</option>
                                            <option value="ADMIN">admin</option>
                                        </select>
                                    </p>
                                    <p>
                                        <strong>포인트:</strong>{" "}
                                        <input
                                            type="number"
                                            name="memberPoint"
                                            value={editData.memberPoint}
                                            onChange={handleInputChange}
                                        />
                                    </p>
                                    <p>
                                        <strong>가입일:</strong> {editData.regDate}
                                    </p>
                                    <p>
                                        <strong>상태:</strong>{" "}
                                        <select
                                            name="enable"
                                            value={editData.enable ? "true" : "false"}
                                            onChange={(e) =>
                                                setEditData((prev) => ({
                                                    ...prev,
                                                    enable: e.target.value === "true",
                                                }))
                                            }
                                        >
                                            <option value="true">활성</option>
                                            <option value="false">비활성</option>
                                        </select>
                                    </p>
                                    <p>
                                        <strong>등급:</strong>{" "}
                                        <input
                                            type="text"
                                            name="grade"
                                            value={editData.grade}
                                            onChange={handleInputChange}
                                        />
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p>
                                        <strong>회원번호:</strong> {selectedMember.memberNo}
                                    </p>
                                    <p>
                                        <strong>아이디:</strong> {selectedMember.memberId}
                                    </p>
                                    <p>
                                        <strong>이름:</strong> {selectedMember.memberName}
                                    </p>
                                    <p>
                                        <strong>이메일:</strong> {selectedMember.memberEmail}
                                    </p>
                                    <p>
                                        <strong>성별:</strong> {selectedMember.memberGender}
                                    </p>
                                    <p>
                                        <strong>연락처:</strong> {selectedMember.memberPhone}
                                    </p>
                                    <p>
                                        <strong>주소:</strong> {selectedMember.memberAddress}
                                    </p>
                                    <p>
                                        <strong>권한:</strong> {selectedMember.memberRole}
                                    </p>
                                    <p>
                                        <strong>포인트:</strong> {selectedMember.memberPoint}
                                    </p>
                                    <p>
                                        <strong>가입일:</strong> {selectedMember.regDate}
                                    </p>
                                    <p>
                                        <strong>상태:</strong> {selectedMember.enable ? "활성" : "비활성"}
                                    </p>
                                    <p>
                                        <strong>등급:</strong> {selectedMember.grade}
                                    </p>
                                </>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            {editMode ? (
                                <>
                                    <ActionButton edit onClick={handleSave}>
                                        저장
                                    </ActionButton>
                                    <ActionButton delete onClick={() => setEditMode(false)}>
                                        취소
                                    </ActionButton>
                                </>
                            ) : (
                                <>
                                    <ActionButton edit onClick={handleEditClick}>
                                        수정
                                    </ActionButton>
                                    <ActionButton delete onClick={handleDelete}>
                                        삭제
                                    </ActionButton>
                                </>
                            )}
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
}
