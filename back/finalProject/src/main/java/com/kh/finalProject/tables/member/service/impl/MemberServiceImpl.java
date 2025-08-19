package com.kh.finalProject.tables.member.service.impl;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.kh.finalProject.security.domain.CustomUser;
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

	// 회원가입
	@Override
	public MemberResponseDTO memberSignUp(MemberRequestDTO memberRequestDTO) {
		Member member = Member.builder().memberId(memberRequestDTO.getMemberId())
				.memberPw(passwordEncoder.encode(memberRequestDTO.getMemberPw()))
				.memberName(memberRequestDTO.getMemberName()).memberEmail(memberRequestDTO.getMemberEmail())
				.memberGender(memberRequestDTO.getMemberGender()).memberPhone(memberRequestDTO.getMemberPhone())
				.memberPoint(0).enable(true).grade('B').memberAddress(memberRequestDTO.getMemberAddress()).build();
		member.addRole(MemberRole.USER);
		return memberConvertor.toEntity(memberRepository.save(member));

	}

	// 정보 수정
	@Override
	public MemberResponseDTO memberUpdate(Long memberNo, MemberRequestDTO memberRequestDTO) {

		Member member = memberRepository.findById(memberNo)
				.orElseThrow(() -> new NoSuchElementException("failed search user"));
		member.setMemberPw(passwordEncoder.encode(memberRequestDTO.getMemberPw()));
		member.setMemberName(memberRequestDTO.getMemberName());
		member.setMemberEmail(memberRequestDTO.getMemberEmail());
		member.setMemberPhone(memberRequestDTO.getMemberPhone());
		member.setMemberAddress(memberRequestDTO.getMemberAddress());

		return memberConvertor.toEntity(memberRepository.save(member));
	}

	@Override
	public CustomUser getSocialMember(String accessToken, int social) {
		String email = getEmailFromSocialAccessToken(accessToken, social);
		log.info("email: " + email);
		Optional<Member> result = memberRepository.findByEmail(email);

		// todo. 찾은 회원의 oauth값 체크
		// 기존의 회원
		if (result.isPresent()) {
			CustomUser user = entityToDTO(result.get());
			return user;
		}

		// 회원이 아니었다면 닉네임은 '소셜회원'으로
		// 패스워드는 임의로 생성
		Member socialMember = makeSocialMember(email);
		memberRepository.save(socialMember);
		CustomUser user = entityToDTO(socialMember);
		return user;

	}

	private String getEmailFromSocialAccessToken(String accessToken, int social) {
		String getUserURL ="";
		String getAccount = "";
		// 사용자정보를 가져오는 url
		switch(social) {
		case 1:
			getUserURL = "https://kapi.kakao.com/v2/user/me";
			getAccount = "kakao_account";
			break;
		case 2:
			getUserURL ="https://www.googleapis.com/oauth2/v3/userinfo";
			getAccount = "email";
			break;
		
		}
		
		if (accessToken == null) {
			throw new RuntimeException("Access Token is null");
		}

		// RestTemplate 클래스는 자바코드로 외부 REST API 호출할 때 사용한다.

		RestTemplate restTemplate = new RestTemplate();

		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", "Bearer " + accessToken);
		headers.add("Content-Type", "application/x-www-form-urlencoded");
		HttpEntity<String> entity = new HttpEntity<>(headers);

		// 카카오 API 요청에 사용할 URL을 생성한다. Request 요청 https://kapi.kakao.com/v2/user/me"
		UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(getUserURL).build();

		ResponseEntity<LinkedHashMap> response = restTemplate.exchange(uriBuilder.toString(), // 요청 URL
				HttpMethod.GET,
				// HTTP 메서드 (GET)
				entity,
				// 요청 헤더가 포함된 HttpEntity (예: Authorization)
				LinkedHashMap.class
		// 응답 본문을 매핑할 클래스
		);
		log.info(response);
		
		if(social == 2) {
			LinkedHashMap<String, String> socialAccount = response.getBody();
			return socialAccount.get("email");
		}

		LinkedHashMap<String, LinkedHashMap> bodyMap = response.getBody();
		log.info(bodyMap);
		LinkedHashMap<String, String> socialAccount = bodyMap.get(getAccount);
		log.info("socialAccount: " + socialAccount);
		

		return socialAccount.get("email");

	}

	private Member makeSocialMember(String email) {

		String tempPassword = makeTempPassword();
		log.info("tempPassword: " + tempPassword);

		String nickname = "소셜회원";
		Member member = Member.builder().memberId(makeTempPassword()).memberEmail(email)
				.memberPw(passwordEncoder.encode(tempPassword)).memberName(nickname).memberAddress(nickname)
				.memberGender(true).memberPhone(makeTempPassword()).OAuth("Kakao").build();
		member.addRole(MemberRole.USER);
		return member;

	}

	private String makeTempPassword() {
		StringBuffer buffer = new StringBuffer();

		for (int i = 0; i < 10; i++) {

			buffer.append((char) ((int) (Math.random() * 55) + 65));

		}
		return buffer.toString();

	}

	@Override
	public void memberDelete(Long memberNo) {
		memberRepository.deleteById(memberNo);
	}

	@Override
	public MemberResponseDTO getOneMember(Long memberNo) {
		Member member = memberRepository.findById(memberNo)
				.orElseThrow(() -> new NoSuchElementException("failed search user"));
		return memberConvertor.toEntity(member);
	}

	@Override
	public MemberResponseDTO socialMemberUpdate(MemberRequestDTO memberRequestDTO) {
		Member member = memberRepository.findByEmail(memberRequestDTO.getMemberEmail())
				.orElseThrow(() -> new NoSuchElementException("failed search user"));

		member.setMemberId(memberRequestDTO.getMemberId());
		member.setMemberPw(passwordEncoder.encode(memberRequestDTO.getMemberPw()));
		member.setMemberName(memberRequestDTO.getMemberName());
		member.setMemberGender(memberRequestDTO.getMemberGender());
		member.setMemberPhone(memberRequestDTO.getMemberPhone());
		member.setMemberAddress(memberRequestDTO.getMemberAddress());
		return memberConvertor.toEntity(memberRepository.save(member));
	}

	@Override
	public MemberResponseDTO getWithRoles(String memberId) {
		Member member = memberRepository.getWithRoles(memberId);

		return memberConvertor.toEntity(member);
	}

	@Override
	public List<MemberResponseDTO> getAllMember() {
		return memberRepository.findAll().stream().map(memberConvertor::toEntity).toList();
	}

}
