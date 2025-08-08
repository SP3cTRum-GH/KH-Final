package com.kh.finalProject.tables.member.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kh.finalProject.tables.member.enity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
	@EntityGraph(attributePaths = { "memberRoleList" })
	@Query("select m from Member m where m.memberId = :memberId")
	Member getWithRoles(@Param("memberId") String memberId);
}
