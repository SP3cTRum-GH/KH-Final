package com.kh.finalProject.tables.review.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kh.finalProject.tables.review.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query(
            value =
                    "select r from Review r " +
                            "where (:productNo is null or r.product.productNo = :productNo) " +
                            "and   (:memberNo is null or r.member.memberNo = :memberNo)",
            countQuery =
                    "select count(r) from Review r " +
                            "where (:productNo is null or r.product.productNo = :productNo) " +
                            "and   (:memberNo is null or r.member.memberNo = :memberNo)"
    )
    Page<Review> search(@Param("productNo") Long productNo,
                        @Param("memberNo") Long memberNo,
                        Pageable pageable);
    
    
    List<Review> getReviewByMember_MemberId(String memberId);

}
