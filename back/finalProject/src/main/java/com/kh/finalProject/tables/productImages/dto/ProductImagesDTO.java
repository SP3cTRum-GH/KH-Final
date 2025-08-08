package com.kh.finalProject.tables.productImages.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ProductImagesDTO {
    private Long productImageNo;
    private String img;
}
