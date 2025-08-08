package com.kh.finalProject.tables.member.service.impl;

import com.kh.finalProject.tables.member.component.MemberConvertor;
import com.kh.finalProject.tables.member.dto.MemberRequestDTO;
import com.kh.finalProject.tables.member.dto.MemberResponseDTO;
import com.kh.finalProject.tables.member.repository.MemberRepository;
import com.kh.finalProject.tables.member.service.MemberService;
import com.kh.finalProject.tables.product.service.ProductService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Log4j2
@Transactional
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private MemberConvertor memberConvertor;

    @Override
    public MemberResponseDTO memberSignUp(MemberRequestDTO memberRequestDTO) {
        return null;
    }
}
