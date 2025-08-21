package com.kh.finalProject.tables.member.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.finalProject.security.domain.CustomUser;
import com.kh.finalProject.tables.member.dto.MemberRequestDTO;
import com.kh.finalProject.tables.member.dto.MemberResponseDTO;
import com.kh.finalProject.tables.member.service.MemberService;
import com.kh.finalProject.util.JWTUtil;

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
	public ResponseEntity<MemberResponseDTO> updateMember(@PathVariable Long memberNo,
			@RequestBody MemberRequestDTO dto) {
		return ResponseEntity.ok(memberService.memberUpdate(memberNo, dto));
	}

	@PutMapping("/social")
	public ResponseEntity<MemberResponseDTO> updateSocialMember(@RequestBody MemberRequestDTO dto) {
		return ResponseEntity.ok(memberService.socialMemberUpdate(dto));
	}

	@DeleteMapping("/{memberNo}")
	public void deleteMember(@PathVariable Long memberNo) {
		memberService.memberDelete(memberNo);
	}

	@GetMapping("/{memberNo}")
	public ResponseEntity<MemberResponseDTO> getOneMember(@PathVariable Long memberNo) {
		return ResponseEntity.ok(memberService.getOneMember(memberNo));
	}

	@GetMapping
	public ResponseEntity<MemberResponseDTO> getLoginedMember(@AuthenticationPrincipal UserDetails user) {
		return ResponseEntity.ok(memberService.getWithRoles(user.getUsername()));

	}

	@GetMapping("/kakao")
	public Map<String, Object> getMemberFromKakao(String accessToken) {
		CustomUser user = memberService.getSocialMember(accessToken, 1);
		Map<String, Object> claims = user.getClaims();
		String jwtAccessToken = JWTUtil.generateToken(claims, 10);
		String jwtRefreshToken = JWTUtil.generateToken(claims, 60 * 24);
		claims.put("accessToken", jwtAccessToken);
		claims.put("refreshToken", jwtRefreshToken);
		return claims;
	}
	
	@GetMapping("/google")
	public Map<String, Object> getMemberFromGoogle(String accessToken) {
		CustomUser user = memberService.getSocialMember(accessToken, 2);
		Map<String, Object> claims = user.getClaims();
		String jwtAccessToken = JWTUtil.generateToken(claims, 10);
		String jwtRefreshToken = JWTUtil.generateToken(claims, 60 * 24);
		claims.put("accessToken", jwtAccessToken);
		claims.put("refreshToken", jwtRefreshToken);
		return claims;
	}
	 
	@GetMapping("/all")
	public ResponseEntity<List<MemberResponseDTO>> getAllMember(){
		return ResponseEntity.ok(memberService.getAllMember());
	}
}
