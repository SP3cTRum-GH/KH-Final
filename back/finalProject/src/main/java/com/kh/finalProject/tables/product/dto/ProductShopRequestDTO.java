package com.kh.finalProject.tables.product.dto;

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
public class ProductShopRequestDTO {
    private Long productNo;

    private String productName;
    private String category;
    private Integer price;
    private Boolean type;
    private List<ProductSizeDTO> sizes;

    @Builder.Default
    private List<MultipartFile> uploadFiles = new ArrayList<>();

    @Builder.Default
    private List<String> imageFileNames = new ArrayList<>();
}
