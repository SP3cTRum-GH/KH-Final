package com.kh.finalProject.security.domain;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import lombok.Getter;

@Getter
public class CustomUser extends User {
	private static final long serialVersionUID = 1L;
	private String memberId;
	private String memberPw;
	private String memberName;
	private String memberEmail;
	private String memberPhone;
	private Boolean memberGender;
	private String memberAddress;
	private Character grade;
	private int point;
	private String OAuth;
	private List<String> roleNames = new ArrayList<>();

	public CustomUser(String memberId, String memberPw, String memberName, String memberEmail, String memberPhone,
			Boolean memberGender, String memberAddress,Character grade, int point, String OAuth, List<String> roleNames) {
		// 이메일(사용자 아이디), 비밀번호, 권한목록(roles 또는 authorities)을 받아 UserDetails 객체로 만들어준다.
		super(memberId, memberPw,
				roleNames.stream().map(str -> new SimpleGrantedAuthority("ROLE_" + str)).collect(Collectors.toList()));
		this.memberId = memberId;
		this.memberPw = memberPw;
		this.memberName = memberName;
		this.memberEmail = memberEmail;
		this.memberPhone = memberPhone;
		this.memberGender = memberGender;
		this.memberAddress = memberAddress;
		this.grade = grade;
		this.point = point;
		
		this.OAuth = OAuth;
		this.roleNames = roleNames;
	}

	public Map<String, Object> getClaims() {
		Map<String, Object> dataMap = new HashMap<>();
		dataMap.put("memberId", memberId);
		dataMap.put("memberPw", memberPw);
		dataMap.put("memberName", memberName);
		dataMap.put("memberEmail", memberEmail);
		dataMap.put("memberPhone", memberPhone);
		dataMap.put("memberGender", memberGender);
		dataMap.put("memberAddress", memberAddress);
		dataMap.put("grade", grade);
		dataMap.put("point", point);
		dataMap.put("OAuth", OAuth);
		dataMap.put("roleNames", roleNames);
		return dataMap;

	}
}
