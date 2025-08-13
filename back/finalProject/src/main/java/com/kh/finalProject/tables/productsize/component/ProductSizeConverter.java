package com.kh.finalProject.tables.productsize.component;

import com.kh.finalProject.tables.product.entity.Product;
import com.kh.finalProject.tables.productImages.dto.ProductImagesDTO;
import com.kh.finalProject.tables.productImages.entity.ProductImages;
import com.kh.finalProject.tables.productsize.dto.ProductSizeDTO;
import com.kh.finalProject.tables.productsize.entity.Productsize;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ProductSizeConverter {
    public Productsize toEntityFromProductSize (ProductSizeDTO dto, Product product){
        return Productsize.builder()
                .product(product)
                .productSize(dto.getProductSize())
                .stock(dto.getStock())
                .build();
    }

    public List<ProductSizeDTO> toProductSizesDTOFromProductSizes(List<Productsize> sizes){
        List<ProductSizeDTO> dtos = new ArrayList<>();
        for(Productsize i :  sizes){
            ProductSizeDTO dto = new ProductSizeDTO(i.getProductSizeNo(),i.getStock(),i.getProductSize());
            dtos.add(dto);
        }
        return dtos;
    }
}
