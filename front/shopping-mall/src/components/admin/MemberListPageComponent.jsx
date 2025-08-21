import React, { useState, useEffect } from "react";
import axios from "axios";
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
  ActionButton,
} from "./MemberListPageStyle";

export default function MemberListPageComponent() {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);

  // 검색어 상태
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/member/all", { withCredentials: true })
      .then((res) => {
        console.log("📌 회원 데이터:", res.data);
        setMembers(res.data);
      })
      .catch((err) => {
        console.error("회원 불러오기 실패:", err);
      });
  }, []);

  // 검색 필터
  const filteredMembers = members.filter((member) => {
    const matchId = member.memberId
      ?.toLowerCase()
      .includes(searchId.toLowerCase());
    const matchName = member.memberName
      ?.toLowerCase()
      .includes(searchName.toLowerCase());
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
    setEditData({ ...selectedMember });
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
    if (
      window.confirm(`${selectedMember.memberName} 회원을 삭제하시겠습니까?`)
    ) {
      alert("회원이 삭제되었습니다.");
      closeModal();
    }
  };

  // 성별 변환
  const getGenderText = (gender) => {
    if (gender === true) return "남성";
    if (gender === false) return "여성";
    return "미지정";
  };

  // 가입일 변환 (YYYY-MM-DD)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // 등급 변환
  const getGradeText = (grade) => {
    switch (grade) {
      case "V":
        return "VIP";
      case "G":
        return "Gold";
      case "S":
        return "Silver";
      case "N":
        return "일반";
      default:
        return "미지정";
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
              <TableRow
                key={member.memberNo}
                onClick={() => handleRowClick(member)}
              >
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
                      value={editData.memberGender ? "true" : "false"}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          memberGender: e.target.value === "true",
                        }))
                      }
                    >
                      <option value="true">남성</option>
                      <option value="false">여성</option>
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
                    <strong>가입일:</strong> {formatDate(editData.regDate)}
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
                    <select
                      name="grade"
                      value={editData.grade || ""}
                      onChange={handleInputChange}
                    >
                      <option value="V">VIP</option>
                      <option value="G">Gold</option>
                      <option value="S">Silver</option>
                      <option value="N">일반</option>
                    </select>
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
                    <strong>성별:</strong>{" "}
                    {getGenderText(selectedMember.memberGender)}
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
                    <strong>가입일:</strong>{" "}
                    {formatDate(selectedMember.regDate)}
                  </p>
                  <p>
                    <strong>상태:</strong>{" "}
                    {selectedMember.enable ? "활성" : "비활성"}
                  </p>
                  <p>
                    <strong>등급:</strong> {getGradeText(selectedMember.grade)}
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
