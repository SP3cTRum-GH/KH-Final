package com.kh.finalProject.tables.member.component;

import com.kh.finalProject.tables.member.dto.MemberResponseDTO;
import com.kh.finalProject.tables.member.entity.Member;
import org.springframework.stereotype.Component;

@Component
public class MemberConvertor {
    public MemberResponseDTO toEntity(Member member){
        return MemberResponseDTO.builder()
                .memberId(member.getMemberId())
                //.memberPw(member.getMemberPw()) // 민감정보 제외
                .memberName(member.getMemberName())
                .memberEmail(member.getMemberEmail())
                .memberPhone(member.getMemberPhone())
                .memberGender(member.getMemberGender())
                .OAuth(member.getOAuth())
                .build();
    }
}
