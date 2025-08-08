package com.kh.finalProject;

import com.kh.finalProject.tables.member.entity.Member;
import com.kh.finalProject.tables.member.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
class FinalProjectApplicationTests {

	@Autowired
	private MemberRepository memberRepository;

	//@Test
	void contextLoads() {
	}

	//@Test
	void testMember() {
		List<Member> memberList = List.of(
				Member.builder()
						.memberId("nawa")
						.memberPw("31")
						.memberName("naorago")
						.memberEmail("nawarayo@naver.com")
						.memberPhone("010-2876-3814")
						.memberGender(true)
						.build()
		);
		memberRepository.saveAll(memberList);

		List<Member> savedList = memberRepository.saveAll(memberList);
		Long id = savedList.get(0).getMemberNo();
		Member getback = memberRepository.findById(id).orElseThrow();
		System.out.println("조회된 멤버 이름: " + getback.getMemberName());
	}
	//@Test
	void pwpwproblem() {
		Member m = Member.builder()
				.memberId("no_pw")
				.memberName("비번없음")
				.memberEmail("nawarayo@naver.com")
				.memberPhone("010-2876-3814")
				.memberGender(true)
				.build(); // 비번 없음

			memberRepository.save(m);
	}

	@Test
	void jungborktest() {
		Member m1 = Member.builder()
				.memberId("su_hyun")
				.memberPw("1234")
				.memberEmail("su@naver.com")
				.memberName("수현1")
				.memberPhone("010-1111-2222")
				.memberGender(true)
				.build();

		Member m2 = Member.builder()
				.memberId("su_hyun") // 같은 ID!
				.memberPw("5678")
				.memberEmail("hyun@naver.com")
				.memberName("수현2")
				.memberPhone("010-3333-4444")
				.memberGender(false)
				.build();

		memberRepository.save(m1);

		assertThrows(DataIntegrityViolationException.class, () -> {
			memberRepository.save(m2); // 여기서 예외 터져야 성공!
		});
	}

}
