package com.kh.finalProject.tables.product.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.kh.finalProject.tables.productsize.dto.ProductSizeDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDealRequestDTO {
    private Long productNo;

    private String productName;
    private String category;
    private Integer price;
    private Boolean type;
    private LocalDateTime endDate; // 경매 마감일
    private Long dealCount; // 경매 입찰수
    private Integer dealCurrent; // 경매 입찰가
    private List<ProductSizeDTO> sizes;

    @Builder.Default
    private List<MultipartFile> uploadFiles = new ArrayList<>();

    @Builder.Default
    private List<String> imageFileNames = new ArrayList<>();
}
