package com.kh.finalProject.tables.member.service;

import com.kh.finalProject.tables.member.dto.MemberRequestDTO;
import com.kh.finalProject.tables.member.dto.MemberResponseDTO;

public interface MemberService {
    MemberResponseDTO memberSignUp(MemberRequestDTO memberRequestDTO);
}
