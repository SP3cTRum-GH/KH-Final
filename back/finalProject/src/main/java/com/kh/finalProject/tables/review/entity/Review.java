package com.kh.finalProject.tables.review.entity;

import com.kh.finalProject.tables.member.entity.Member;
import com.kh.finalProject.tables.product.entity.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@SequenceGenerator(name = "review_seq_gen",
        sequenceName = "review_seq",
        allocationSize = 1,
        initialValue = 1
)
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "review_seq_gen")
    private Long reviewNo;

    @Column(nullable = false)
    private String reviewImg; // 리뷰 이미지

    @Column(nullable = false)
    private double rating; // 리뷰 평점

    @Column(nullable = false)
    private String content; // 리뷰 내용

    @CreationTimestamp
    private LocalDateTime regDate; // 리뷰 생성일

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_no",nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_no",nullable = false)
    private Member member;
}
