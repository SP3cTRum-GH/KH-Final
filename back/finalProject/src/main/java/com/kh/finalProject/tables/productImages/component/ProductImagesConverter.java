package com.kh.finalProject.tables.productImages.component;

import com.kh.finalProject.tables.product.entity.Product;
import com.kh.finalProject.tables.productImages.dto.ProductImagesDTO;
import com.kh.finalProject.tables.productImages.entity.ProductImages;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ProductImagesConverter {
    public ProductImages toEntityFromProductImages(ProductImagesDTO dto, Product product) {
        return ProductImages.builder()
                .product(product)
                .img(dto.getImg())
                .build();
    }

    public List<ProductImagesDTO> toProductImagesDTOFromProductImages(List<ProductImages> images){
        List<ProductImagesDTO> dtos = new ArrayList<>();
        for(ProductImages i :  images){
            ProductImagesDTO dto = new ProductImagesDTO(i.getProductImageNo(),"/api/image/" + i.getImg());
            dtos.add(dto);
        }
        return dtos;
    }
}
