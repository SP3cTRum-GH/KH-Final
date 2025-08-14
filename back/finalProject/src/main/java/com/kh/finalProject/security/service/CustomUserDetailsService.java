package com.kh.finalProject.security.service;

import java.util.stream.Collectors;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.kh.finalProject.security.domain.CustomUser;
import com.kh.finalProject.tables.member.entity.Member;
import com.kh.finalProject.tables.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
	private final MemberRepository memberRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Member member = memberRepository.getWithRoles(username);
		if (member == null) {
			throw new UsernameNotFoundException("Not Found");
		}
		CustomUser customUser = new

		CustomUser(member.getMemberId(), member.getMemberPw(), member.getMemberName(), member.getMemberEmail(),member.getMemberPhone(),
				member.getMemberGender(),member.getMemberAddress(),member.getGrade(),member.getMemberPoint(), member.getOAuth(),
				member.getMemberRoleList().stream().map(memberRole -> memberRole.name()).collect(Collectors.toList()));

		log.info(customUser);

		return customUser;

	}
}
