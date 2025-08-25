package com.kh.finalProject.tables.purchaseLog.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class purchaseLogResponseDTO {
    private Long logNo;
    private LocalDateTime regDate;
    private Boolean isReviewed = false; // 중복 리뷰 방지
    private Long productNo;
    private String productName;
    private Boolean type;
    private String size;
    private int price;
    private String memberId;
    private String img;
    private int quantity;
}
