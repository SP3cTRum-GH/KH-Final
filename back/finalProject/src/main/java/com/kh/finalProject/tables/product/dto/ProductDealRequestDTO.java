package com.kh.finalProject.tables.product.dto;

import com.kh.finalProject.tables.productImages.dto.ProductImagesDTO;
import com.kh.finalProject.tables.productsize.dto.ProductSizeDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDealRequestDTO {
    private String productName;
    private String category;
    private Integer price;
    private Boolean type;
    private LocalDateTime regDate;
    private LocalDateTime endDate; // 경매 마감일
    private Long dealCount; // 경매 입찰수
    private Integer dealCurrent; // 경매 입찰가
    private List<ProductImagesDTO> images;
    private List<ProductSizeDTO> sizes;
}
