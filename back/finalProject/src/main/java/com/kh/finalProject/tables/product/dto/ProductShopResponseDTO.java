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
public class ProductShopResponseDTO {
    private Long productNo;
    private String productName;
    private String category;
    private BigDecimal price;
    private Boolean type;
    private LocalDateTime updDate;
}
