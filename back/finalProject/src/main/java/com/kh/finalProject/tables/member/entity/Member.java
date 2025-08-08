package com.kh.finalProject.tables.member.entity;

import com.kh.finalProject.tables.member.MemberRole;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SequenceGenerator(name = "member_seq_gen",
        sequenceName = "member_seq",
        allocationSize = 1,
        initialValue = 1
)
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "member_seq_gen")
    private Long memberNo;

    @Column(nullable = false, unique = true)
    private String memberId; // 사용자 아이디

    @Column(nullable = false)
    private String memberPw; // 사용자 비밀번호

    @Column(nullable = false)
    private String memberName; // 사용자 이름

    @Column(nullable = false, unique = true)
    private String memberEmail; // 사용자 이메일

    @Column(nullable = false, unique = true)
    private String memberPhone; // 사용자 연락처

    @Column
    private int memberPoint = 0; // 사용자 포인트

    @CreationTimestamp
    private LocalDateTime regDate;  // 생성일

    @Column(nullable = false)
    private Boolean memberGender; // 사용자성별

    @Column
    private Boolean enable = true; // true : 활성화 false : 비활성화

    @Column
    private Character grade = 'F'; // 사용자 등급

    @Column
    private String memberAddress;

    @Column
    private String OAuth; // 사용자 권한

    @ElementCollection(fetch = FetchType.LAZY)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private List<MemberRole> memberRoleList = new ArrayList<>();


    public void addRole(MemberRole memberRole) {
        memberRoleList.add(memberRole);
    }

}
