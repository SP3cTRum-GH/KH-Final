package com.kh.finalProject.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kh.finalProject.enity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
	@EntityGraph(attributePaths = { "memberRoleList" })
	@Query("select m from Member m where m.memberId = :memberId")
	Member getWithRoles(@Param("memberId") String memberId);
}
