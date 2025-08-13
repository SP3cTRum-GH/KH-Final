package com.kh.finalProject.tables.member.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.finalProject.tables.member.dto.MemberRequestDTO;
import com.kh.finalProject.tables.member.dto.MemberResponseDTO;
import com.kh.finalProject.tables.member.service.MemberService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {
	private final MemberService memberService;
	
	@PostMapping("/signup")
	  public ResponseEntity<MemberResponseDTO> signup(@RequestBody MemberRequestDTO dto) {
        return ResponseEntity.ok(memberService.memberSignUp(dto));
    }
	
	@PutMapping("/{memberNo}")
	public ResponseEntity<MemberResponseDTO> updateMember(@PathVariable Long memberNo, @RequestBody MemberRequestDTO dto) {
        return ResponseEntity.ok(memberService.memberUpdate(memberNo, dto));
	}
}
