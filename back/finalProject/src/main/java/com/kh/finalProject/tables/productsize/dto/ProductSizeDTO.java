package com.kh.finalProject.tables.productsize.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ProductSizeDTO {
    private Long productSizeNo;
    private int stock;
    private String productSize;
}
