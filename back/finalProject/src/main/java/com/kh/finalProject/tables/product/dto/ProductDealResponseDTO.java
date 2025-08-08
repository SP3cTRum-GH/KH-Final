package com.kh.finalProject.tables.product.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDealResponseDTO {
    private Long productNo;
    private String productName;
    private String category;
    private BigDecimal price;
    private Boolean type;
    private LocalDateTime updDate;
    private LocalDateTime endDate; // 경매 마감일
    private Long dealCount; // 경매 입찰수
    private BigDecimal dealCurrent; // 경매 입찰가
}
