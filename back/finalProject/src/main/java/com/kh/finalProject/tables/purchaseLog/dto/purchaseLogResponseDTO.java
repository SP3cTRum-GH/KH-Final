package com.kh.finalProject.tables.purchaseLog.dto;

import com.kh.finalProject.tables.productImages.dto.ProductImagesDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
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

    private String img;
}
