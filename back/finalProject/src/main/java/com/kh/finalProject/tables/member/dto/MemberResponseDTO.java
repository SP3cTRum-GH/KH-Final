package com.kh.finalProject.tables.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class MemberResponseDTO {
    private Long memberNo;
    private String memberId;
    private String memberName;
    private String memberEmail;
    private String memberPhone;
    private String memberAddress;
    private int memberPoint;
    private Boolean memberGender;
    private Boolean enable;
    private Character grade;
    private String OAuth;
}
