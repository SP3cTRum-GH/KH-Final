package com.kh.finalProject.enity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@SequenceGenerator(name = "member_seq_gen", sequenceName = "member_seq", allocationSize = 1, initialValue = 1)
public class Member {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "member_seq_gen")
	private Long memberNo;

	@Column(nullable = false, unique = true)
	private String memberId;

	@Column(nullable = false)
	private String memberPw;

	@Column(nullable = false)
	private String memberName;

	@Column(nullable = false, unique = true)
	private String memberEmail;

	@Column(nullable = false, unique = true)
	private String memberPhone;

	@Column
	private int memberPoint;

	@CreationTimestamp
	private LocalDateTime regDate;

	@Column(nullable = false)
	private Boolean memberGender;

	@Column(nullable = false)
	private Boolean enable;

	@Column(nullable = false)
	private Character grade;

	private String OAuth;

	@ElementCollection(fetch = FetchType.LAZY)
	@Enumerated(EnumType.STRING)
	@Builder.Default
	private List<MemberRole> memberRoleList = new ArrayList<>();

	public void addRole(MemberRole memberRole) {
		memberRoleList.add(memberRole);
	}
}
