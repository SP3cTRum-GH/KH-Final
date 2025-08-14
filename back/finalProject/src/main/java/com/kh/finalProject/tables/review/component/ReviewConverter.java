package com.kh.finalProject.tables.review.component;

import com.kh.finalProject.tables.member.entity.Member;
import com.kh.finalProject.tables.product.entity.Product;
import com.kh.finalProject.tables.review.dto.ReviewRequestDTO;
import com.kh.finalProject.tables.review.dto.ReviewResponseDTO;
import com.kh.finalProject.tables.review.entity.Review;
import org.springframework.stereotype.Component;

@Component
public class ReviewConverter {
    public Review toEntity(ReviewRequestDTO dto, Product product, Member member) {
        return Review.builder()
                .reviewImg(dto.getReviewImg())
                .rating(dto.getRating())
                .content(dto.getContent())
                .product(product)
                .member(member)
                .build();
    }

    public ReviewResponseDTO toDto(Review review) {
        return ReviewResponseDTO.builder()
                .reviewNo(review.getReviewNo())
                .reviewImg(toUrl(review.getReviewImg()))
                .rating(review.getRating())
                .content(review.getContent())
                .productNo(review.getProduct().getProductNo())
                .memberNo(review.getMember().getMemberNo())
                .build();
    }

    private String toUrl(String fileName) {
        return (fileName == null || fileName.isBlank()) ? null : "/api/image/" + fileName;
    }
}
