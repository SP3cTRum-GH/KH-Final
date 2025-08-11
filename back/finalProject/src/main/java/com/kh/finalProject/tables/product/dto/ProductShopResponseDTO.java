package com.kh.finalProject.tables.product.dto;

import com.kh.finalProject.tables.productImages.dto.ProductImagesDTO;
import com.kh.finalProject.tables.productsize.dto.ProductSizeDTO;
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
