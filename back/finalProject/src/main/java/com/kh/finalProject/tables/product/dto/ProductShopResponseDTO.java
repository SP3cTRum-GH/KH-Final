package com.kh.finalProject.tables.product.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.kh.finalProject.tables.productImages.dto.ProductImagesDTO;
import com.kh.finalProject.tables.productsize.dto.ProductSizeDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
@AllArgsConstructor
@Builder
public class ProductShopResponseDTO {
    private Long productNo;
    private String productName;
    private String category;
    private Integer price;
    private Boolean type;
    private LocalDateTime updDate;

    private List<ProductImagesDTO> images;
    private List<ProductSizeDTO> sizes;
}
