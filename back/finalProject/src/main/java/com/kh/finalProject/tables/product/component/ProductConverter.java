package com.kh.finalProject.tables.product.component;

import com.kh.finalProject.tables.product.dto.ProductDealRequestDTO;
import com.kh.finalProject.tables.product.dto.ProductDealResponseDTO;
import com.kh.finalProject.tables.product.dto.ProductShopRequestDTO;
import com.kh.finalProject.tables.product.dto.ProductShopResponseDTO;
import com.kh.finalProject.tables.product.entity.Product;
import com.kh.finalProject.tables.productImages.component.ProductImagesConverter;
import com.kh.finalProject.tables.productsize.component.ProductSizeConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class ProductConverter {
    ProductImagesConverter pic = new  ProductImagesConverter();
    ProductSizeConverter psc = new  ProductSizeConverter();

    // ---------- CREATE ----------
    public Product toEntityFromDeal(ProductDealRequestDTO dto) {
        return Product.builder()
                .productName(dto.getProductName())
                .category(dto.getCategory())
                .price(dto.getPrice())
                .type(true) // 경매
                .endDate(dto.getEndDate())
                .dealCount(dto.getDealCount() == null ? 0L : dto.getDealCount())
                .dealCurrent(dto.getDealCurrent() == null ? dto.getPrice() : dto.getDealCurrent())
                .productImagesList(new ArrayList<>())
                .productsizeList(new ArrayList<>())
                .build();
    }

    public Product toEntityFromShop(ProductShopRequestDTO dto) {
        return Product.builder()
                .productName(dto.getProductName())
                .category(dto.getCategory())
                .price(dto.getPrice())
                .type(false) // 일반
                .endDate(null)
                .dealCount(0L)               // NOT NULL 기본값
                .dealCurrent(dto.getPrice()) // NOT NULL 기본값
                .productImagesList(new ArrayList<>())
                .productsizeList(new ArrayList<>())
                .build();
    }

    // ---------- UPDATE (재조립) ----------
    public Product rebuildForDealUpdate(Product existing, ProductDealRequestDTO dto) {
        return Product.builder()
                .productNo(existing.getProductNo())
                .productName(nvl(dto.getProductName(), existing.getProductName()))
                .category(nvl(dto.getCategory(), existing.getCategory()))
                .price(nvl(dto.getPrice(), existing.getPrice()))
                .type(true)
                .endDate(nvl(dto.getEndDate(), existing.getEndDate()))
                .dealCount(nvl(dto.getDealCount(), existing.getDealCount()))
                .dealCurrent(nvl(dto.getDealCurrent(), existing.getDealCurrent()))
                .productImagesList(existing.getProductImagesList())
                .productsizeList(existing.getProductsizeList())
                .build();
    }

    public Product rebuildForShopUpdate(Product existing, ProductShopRequestDTO dto) {
        return Product.builder()
                .productNo(existing.getProductNo())
                .productName(nvl(dto.getProductName(), existing.getProductName()))
                .category(nvl(dto.getCategory(), existing.getCategory()))
                .price(nvl(dto.getPrice(), existing.getPrice()))
                .type(false)
                .endDate(null)
                .dealCount(0L)
                .dealCurrent(nvl(dto.getPrice(), existing.getPrice()))
                .productImagesList(existing.getProductImagesList())
                .productsizeList(existing.getProductsizeList())
                .build();
    }

    // ---------- RESPONSE ----------
    public ProductDealResponseDTO toDealResponse(Product p) {
        return ProductDealResponseDTO.builder()
                .productNo(p.getProductNo())
                .productName(p.getProductName())
                .category(p.getCategory())
                .price(p.getPrice())
                .type(p.getType())
                .updDate(p.getUpdDate())
                .endDate(p.getEndDate())
                .dealCount(p.getDealCount())
                .dealCurrent(p.getDealCurrent())
                .images(pic.toProductImagesDTOFromProductImages(p.getProductImagesList()))
                .sizes(psc.toProductSizesDTOFromProductSizes(p.getProductsizeList()))
                .build();
    }

    public ProductShopResponseDTO toShopResponse(Product p) {
        return ProductShopResponseDTO.builder()
                .productNo(p.getProductNo())
                .productName(p.getProductName())
                .category(p.getCategory())
                .price(p.getPrice())
                .type(p.getType())
                .updDate(p.getUpdDate())
                .images(pic.toProductImagesDTOFromProductImages(p.getProductImagesList()))
                .sizes(psc.toProductSizesDTOFromProductSizes(p.getProductsizeList()))
                .build();
    }

    // ---------- util ----------
    private static <T> T nvl(T v, T defVal) { return v != null ? v : defVal; }
}
