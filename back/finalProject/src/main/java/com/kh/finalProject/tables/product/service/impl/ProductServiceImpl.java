package com.kh.finalProject.tables.product.service.impl;

import com.kh.finalProject.common.file.CustomFileUtil;
import com.kh.finalProject.common.util.pagedto.PageRequestDTO;
import com.kh.finalProject.common.util.pagedto.PageResponseDTO;
import com.kh.finalProject.tables.product.component.ProductConverter;
import com.kh.finalProject.tables.product.dto.MainPageDTO;
import com.kh.finalProject.tables.product.dto.ProductDealRequestDTO;
import com.kh.finalProject.tables.product.dto.ProductDealResponseDTO;
import com.kh.finalProject.tables.product.dto.ProductShopRequestDTO;
import com.kh.finalProject.tables.product.dto.ProductShopResponseDTO;
import com.kh.finalProject.tables.product.entity.Product;
import com.kh.finalProject.tables.product.repository.ProductRepository;
import com.kh.finalProject.tables.product.service.ProductService;
import com.kh.finalProject.tables.productImages.component.ProductImagesConverter;
import com.kh.finalProject.tables.productImages.dto.ProductImagesDTO;
import com.kh.finalProject.tables.productImages.entity.ProductImages;
import com.kh.finalProject.tables.productImages.repository.ProductImagesRepository;
import com.kh.finalProject.tables.productsize.component.ProductSizeConverter;
import com.kh.finalProject.tables.productsize.dto.ProductSizeDTO;
import com.kh.finalProject.tables.productsize.entity.Productsize;
import com.kh.finalProject.tables.productsize.repository.ProductSizeRepository;
import com.kh.finalProject.tables.purchaseLog.repository.PurchaseLogRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Log4j2
@Transactional
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    private final ProductConverter productConverter;
    private final PurchaseLogRepository purchaseLogRepository;

    private final ProductImagesConverter productImagesConverter;
    private final ProductSizeConverter  productSizeConverter;

    private final CustomFileUtil fileUtil;

    // Paging
    @Override
    public PageResponseDTO<ProductDealResponseDTO> pageDeal(String category, PageRequestDTO req) {
        Pageable pageable = PageRequest.of(req.getPage() - 1, req.getSize() ,
        		 Sort.by(Sort.Direction.DESC, "productNo"));
        Page<Product> page = productRepository.findByType(true,category, pageable);

        List<ProductDealResponseDTO> list = page.getContent().stream()
                .map(productConverter::toDealResponse)
                .toList();

        return PageResponseDTO.<ProductDealResponseDTO>withAll()
                .dtoList(list)
                .pageRequestDTO(req)
                .totalCount(page.getTotalElements())
                .build();
    }

    @Override
    public PageResponseDTO<ProductShopResponseDTO> pageShop(String category, PageRequestDTO req) {
        Pageable pageable = PageRequest.of(req.getPage() - 1, req.getSize(),
                Sort.by(Sort.Direction.DESC, "productNo"));
        Page<Product> page = productRepository.findByType(false,category, pageable);

        List<ProductShopResponseDTO> list = page.getContent().stream()
                .map(productConverter::toShopResponse)
                .toList();

        return PageResponseDTO.<ProductShopResponseDTO>withAll()
                .dtoList(list)
                .pageRequestDTO(req)
                .totalCount(page.getTotalElements())
                .build();
    }


    // CREATE
    @Override
    public Long createDeal(ProductDealRequestDTO dto) {
        Product product = productConverter.toEntityFromDeal(dto);
        Product saved = productRepository.save(product);
        return saved.getProductNo();
    }

    @Override
    public Long createShop(ProductShopRequestDTO dto) {
        Product product = productConverter.toEntityFromShop(dto);
        Product saved = productRepository.save(product);
        return saved.getProductNo();
    }

    // READ
    @Override
    public ProductDealResponseDTO getDeal(Long productNo) {
        Product p = productRepository.findById(productNo)
                .orElseThrow(() -> new EntityNotFoundException("상품 없음: " + productNo));
        if (!Boolean.TRUE.equals(p.getType())) throw new EntityNotFoundException("경매 상품 아님");
        return productConverter.toDealResponse(p);
    }

    @Override
    public ProductShopResponseDTO getShop(Long productNo) {
        Product p = productRepository.findById(productNo)
                .orElseThrow(() -> new EntityNotFoundException("상품 없음: " + productNo));
        if (Boolean.TRUE.equals(p.getType())) throw new EntityNotFoundException("일반 상품 아님");
        return productConverter.toShopResponse(p);
    }

    @Override
    public List<ProductDealResponseDTO> listDeals() {
        return productRepository.findAll().stream()
                .filter(p -> Boolean.TRUE.equals(p.getType()))
                .map(productConverter::toDealResponse)
                .toList();
    }

    @Override
    public List<ProductShopResponseDTO> listShops() {
        return productRepository.findAll().stream()
                .filter(p -> !Boolean.TRUE.equals(p.getType()))
                .map(productConverter::toShopResponse)
                .toList();
    }

    // UPDATE
    @Override
    @Transactional
    public void updateDeal(ProductDealRequestDTO dto) {
        Product product = productRepository.findById(dto.getProductNo())
                .orElseThrow(() -> new EntityNotFoundException("상품 없음: " + dto.getProductNo()));

        if (!Boolean.TRUE.equals(product.getType())) {
            throw new IllegalStateException("경매 상품 아님");
        }

        if (dto.getProductName() != null) product.setProductName(dto.getProductName());
        if (dto.getCategory()    != null) product.setCategory(dto.getCategory());
        if (dto.getPrice()       != null) product.setPrice(dto.getPrice());
        if (dto.getEndDate()     != null) product.setEndDate(dto.getEndDate());

        product.getProductImagesList().clear();
        if (dto.getImageFileNames() != null) {
            dto.getImageFileNames().forEach(fileName -> {
                product.addImages(ProductImages.builder().img(fileName).build());
            });
        }

        product.getProductsizeList().clear();
        if (dto.getSizes() != null) {
            dto.getSizes().forEach(sizeDto -> {
                product.addSize(productSizeConverter.toEntityFromProductSize(sizeDto, product));
            });
        }

        productRepository.save(product);
    }
    
    @Override
    @Transactional
    public void updateShop(ProductShopRequestDTO dto) {
        Product product = productRepository.findById(dto.getProductNo())
                .orElseThrow(() -> new EntityNotFoundException("상품 없음: " + dto.getProductNo()));

        if (Boolean.TRUE.equals(product.getType())) {
            throw new IllegalStateException("일반 상품 아님");
        }

        if (dto.getProductName() != null) product.setProductName(dto.getProductName());
        if (dto.getCategory()    != null) product.setCategory(dto.getCategory());
        if (dto.getPrice()       != null) product.setPrice(dto.getPrice());

        product.getProductImagesList().clear();
        if (dto.getImageFileNames() != null) {
            dto.getImageFileNames().forEach(fileName -> {
                product.addImages(ProductImages.builder().img(fileName).build());
            });
        }

        product.getProductsizeList().clear();
        if (dto.getSizes() != null) {
            dto.getSizes().forEach(sizeDto -> {
                product.addSize(productSizeConverter.toEntityFromProductSize(sizeDto, product));
            });
        }

        productRepository.save(product);
    }

    // DELETE
    @Override
    public void delete(Long productNo) {

        Product p = productRepository.findById(productNo)
                .orElseThrow(() -> new EntityNotFoundException("상품 없음: " + productNo));

        var names = p.getProductImagesList().stream()
                .map(ProductImages::getImg).toList();

        productRepository.deleteById(productNo);           // orphanRemoval로 이미지 row 삭제
        if (!names.isEmpty()) fileUtil.deleteFiles(names); // 디스크 파일 삭제(썸네일 포함)
    }
    

}
