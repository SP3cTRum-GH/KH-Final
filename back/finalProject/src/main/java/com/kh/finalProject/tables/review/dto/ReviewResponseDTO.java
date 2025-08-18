package com.kh.finalProject.tables.review.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ReviewResponseDTO {
    private Long reviewNo;
    private String reviewImg;
    private double rating;
    private String content;
    private Long productNo;
    private Boolean type;
    private Long memberNo;
    private String memberId;
    private LocalDateTime regDate;
}
