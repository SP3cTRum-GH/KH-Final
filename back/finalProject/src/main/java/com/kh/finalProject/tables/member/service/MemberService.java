package com.kh.finalProject.tables.member.service;

import java.util.List;
import java.util.stream.Collectors;

import com.kh.finalProject.security.domain.CustomUser;
import com.kh.finalProject.tables.member.dto.MemberRequestDTO;
import com.kh.finalProject.tables.member.dto.MemberResponseDTO;
import com.kh.finalProject.tables.member.entity.Member;

public interface MemberService {
	MemberResponseDTO memberSignUp(MemberRequestDTO memberRequestDTO);

	MemberResponseDTO memberUpdate(String memberId, MemberRequestDTO memberRequestDTO);
	
	boolean checkPassword(String memberId, String pw);
	
	MemberResponseDTO memberUpdatePw (String memeberId, String newPw);
	
	MemberResponseDTO socialMemberUpdate(MemberRequestDTO memberRequestDTO);

	CustomUser getSocialMember(String accessToken, int social);//1.kakao 2.google

	default CustomUser entityToDTO(Member member) {
		CustomUser dto = new CustomUser(member.getMemberId(), member.getMemberPw(),member.getMemberName(), member.getMemberEmail(),
				member.getMemberPhone(), member.getMemberGender(),member.getMemberAddress(),member.getGrade(),member.getMemberPoint(), member.getOAuth(),
				member.getMemberRoleList().stream().map(memberRole -> memberRole.name()).collect(Collectors.toList()));
		return dto;
	}
	
	void memberDelete(Long memberNo);
	
	MemberResponseDTO getOneMember(Long memberNo);
	
	MemberResponseDTO getWithRoles(String memberId);
	
	List<MemberResponseDTO> getAllMember();
	
}
