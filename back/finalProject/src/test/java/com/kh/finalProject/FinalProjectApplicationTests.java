package com.kh.finalProject;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.kh.finalProject.tables.member.MemberRole;
import com.kh.finalProject.tables.member.enity.Member;
import com.kh.finalProject.tables.member.repository.MemberRepository;

@SpringBootTest
class FinalProjectApplicationTests {

	@Autowired
	private MemberRepository db;
	@Autowired
	private PasswordEncoder pe;
	
	@Test 
	public void testInsertMember() {

		Member member = Member.builder()
				.memberId("admin")
				.memberPw(pe.encode("1234"))
				.memberName("admin")
				.memberEmail("fuckyou@gmail.com")
				.memberGender(true)
				.memberPhone("010-1111-1111")
				.memberPoint(0)
				.enable(true)
				.grade('F')
				.build(); 
		member.addRole(MemberRole.USER);
		member.addRole(MemberRole.ADMIN);
		db.save(member);
		}

}




