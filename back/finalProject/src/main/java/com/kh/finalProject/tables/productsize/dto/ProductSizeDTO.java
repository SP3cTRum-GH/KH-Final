package com.kh.finalProject.tables.productsize.dto;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductSizeDTO {
    private Long productSizeNo;
    private int stock;
    private String productSize;
}
