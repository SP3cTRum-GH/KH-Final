package com.kh.finalProject.tables.review.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ReviewRequestDTO {
    private String reviewImg;
    private double rating;
    private String content;
    private Long productNo;
    private String memberId;
}
