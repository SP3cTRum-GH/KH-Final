package com.kh.finalProject.tables.member.repository;

import com.kh.finalProject.tables.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member,Long> {
}
