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
  const [memberPurchaseCount, setMemberPurchaseCount] = useState(0);

  // 검색어 상태
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/member/all", { withCredentials: true })
      .then((res) => {
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

  const handleRowClick = async (member) => {
    setSelectedMember(member);

    // 구매 내역 API 호출
    try {
      const res = await axios.get("http://localhost:8080/api/purchase/logs", {
        params: { memberId: member.memberId },
      });

      const filtered = res.data.filter(
        (item) => item.memberId === member.memberId
      );

      setMemberPurchaseCount(filtered.length);
    } catch (err) {
      console.error("구매 내역 불러오기 실패:", err);
      setMemberPurchaseCount(0);
    }
  };

  const closeModal = () => {
    setSelectedMember(null);
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

  // 등급 계산용 레벨 정보
  const levelInfo = [
    { level: 1, name: "브론즈", min: 0, max: 9 },
    { level: 2, name: "실버", min: 10, max: 19 },
    { level: 3, name: "골드", min: 20, max: 29 },
    { level: 4, name: "플래티넘", min: 30, max: 39 },
    { level: 5, name: "다이아몬드", min: 40, max: Infinity },
  ];

  // 선택된 회원의 구매 횟수(memberPurchaseCount)를 기준으로 등급 계산
  const getMemberLevel = (purchaseCount) => {
    return levelInfo.find(
      (lvl) => purchaseCount >= lvl.min && purchaseCount <= lvl.max
    );
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
                <strong>포인트:</strong> {selectedMember.memberPoint}
              </p>
              <p>
                <strong>가입일:</strong> {formatDate(selectedMember.regDate)}
              </p>
              <p>
                <strong>상태:</strong>{" "}
                {selectedMember.enable ? "활성" : "비활성"}
              </p>
              <p>
                <strong>등급:</strong>{" "}
                {getMemberLevel(memberPurchaseCount)?.name || "미지정"} (
                {memberPurchaseCount}회 구매)
              </p>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}
