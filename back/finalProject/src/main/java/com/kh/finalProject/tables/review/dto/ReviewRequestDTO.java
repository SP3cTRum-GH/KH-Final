package com.kh.finalProject.tables.review.dto;

import lombok.*;

import org.springframework.lang.Nullable;
import org.springframework.web.multipart.MultipartFile;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReviewRequestDTO {
	private Long logNo;
    private double rating;
    private String content;
    private Long productNo;
    private String memberId;

    private String reviewImg;
    @Nullable
    private MultipartFile uploadFile;
}
