package com.kh.finalProject.tables.member.service.impl;

import java.util.NoSuchElementException;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kh.finalProject.tables.member.MemberRole;
import com.kh.finalProject.tables.member.component.MemberConvertor;
import com.kh.finalProject.tables.member.dto.MemberRequestDTO;
import com.kh.finalProject.tables.member.dto.MemberResponseDTO;
import com.kh.finalProject.tables.member.entity.Member;
import com.kh.finalProject.tables.member.repository.MemberRepository;
import com.kh.finalProject.tables.member.service.MemberService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@Transactional
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final MemberConvertor memberConvertor;
    private final PasswordEncoder passwordEncoder;
   
    
    //회원가입 
    @Override
    public MemberResponseDTO memberSignUp(MemberRequestDTO memberRequestDTO) {
    	Member member = Member.builder()
				.memberId(memberRequestDTO.getMemberId())
				.memberPw(passwordEncoder.encode(memberRequestDTO.getMemberPw()))
				.memberName(memberRequestDTO.getMemberName())
				.memberEmail(memberRequestDTO.getMemberEmail())
				.memberGender(memberRequestDTO.getMemberGender())
				.memberPhone(memberRequestDTO.getMemberPhone())
				.memberPoint(0)
				.enable(true)
				.grade('B')
				.memberAddress(memberRequestDTO.getMemberAddress())
				.build(); 
		member.addRole(MemberRole.USER);
		return memberConvertor.toEntity(memberRepository.save(member));
		
    }

    //정보 수정
	@Override
	public MemberResponseDTO memberUpdate(Long memberNo, MemberRequestDTO memberRequestDTO) {
		
		Member member = memberRepository.findById(memberNo).orElseThrow(()->new NoSuchElementException("failed search user"));
		member.setMemberPw(memberRequestDTO.getMemberPw());
		member.setMemberName(memberRequestDTO.getMemberName());
		member.setMemberEmail(memberRequestDTO.getMemberEmail());
		member.setMemberPhone(memberRequestDTO.getMemberPhone());
		member.setMemberAddress(memberRequestDTO.getMemberAddress());
		
		return memberConvertor.toEntity(memberRepository.save(member));
	} 
    
}
