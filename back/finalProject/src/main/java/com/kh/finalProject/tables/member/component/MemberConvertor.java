package com.kh.finalProject.tables.member.component;

import org.springframework.stereotype.Component;

import com.kh.finalProject.tables.member.dto.MemberResponseDTO;
import com.kh.finalProject.tables.member.entity.Member;

@Component
public class MemberConvertor {
    public MemberResponseDTO toEntity(Member member){
        return MemberResponseDTO.builder()
        		.memberNo(member.getMemberNo())
                .memberId(member.getMemberId())
                .memberPw(member.getMemberPw()) 
                .memberName(member.getMemberName())
                .memberEmail(member.getMemberEmail())
                .memberPhone(member.getMemberPhone())
                .regDate(member.getRegDate())
                .memberAddress(member.getMemberAddress())
                .memberGender(member.getMemberGender())
                .OAuth(member.getOAuth())
                .build();
    }
}
