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
    public ProductDealResponseDTO createDeal(ProductDealRequestDTO dto) {
        Product saved = productConverter.toEntityFromDeal(dto);
        if(dto.getImages() != null && !dto.getImages().isEmpty()) {
            for(ProductImagesDTO i : dto.getImages()){
                ProductImages productImages = productImagesConverter.toEntityFromProductImages(i,saved);
                saved.getProductImagesList().add(productImages);
            }
        }
        if(dto.getSizes() != null && !dto.getSizes().isEmpty()) {
            for(ProductSizeDTO i : dto.getSizes()){
                Productsize productsize = productSizeConverter.toEntityFromProductSize(i,saved);
                saved.getProductsizeList().add(productsize);
            }
        }
        return productConverter.toDealResponse(productRepository.save(saved));
    }

    @Override
    public ProductShopResponseDTO createShop(ProductShopRequestDTO dto) {
        Product saved = productConverter.toEntityFromShop(dto);
        if(dto.getImages() != null && !dto.getImages().isEmpty()) {
            for(ProductImagesDTO i : dto.getImages()){
                ProductImages productImages = productImagesConverter.toEntityFromProductImages(i,saved);
                saved.getProductImagesList().add(productImages);
            }
        }
        if(dto.getSizes() != null && !dto.getSizes().isEmpty()) {
            for(ProductSizeDTO i : dto.getSizes()){
                Productsize productsize = productSizeConverter.toEntityFromProductSize(i,saved);
                saved.getProductsizeList().add(productsize);
            }
        }
        return productConverter.toShopResponse(productRepository.save(saved));
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
    public ProductDealResponseDTO updateDeal(Long productNo, ProductDealRequestDTO dto) {
        Product existing = productRepository.findById(productNo)
                .orElseThrow(() -> new EntityNotFoundException("상품 없음: " + productNo));
        if (!Boolean.TRUE.equals(existing.getType())) throw new EntityNotFoundException("경매 상품 아님");

        // 1) 기존/신규 파일명 집합
        var oldNames = existing.getProductImagesList().stream()
                .map(ProductImages::getImg).collect(java.util.stream.Collectors.toSet());
        var newNames = (dto.getImages() == null) ? java.util.Set.<String>of()
                : dto.getImages().stream().map(ProductImagesDTO::getImg)
                .filter(java.util.Objects::nonNull).collect(java.util.stream.Collectors.toSet());
        var toDelete = oldNames.stream().filter(n -> !newNames.contains(n)).toList();

        // 2) 스칼라 필드 갱신 (이미지/사이즈 제외)
        // rebuildForDealUpdate는 existing의 필드만 수정하도록 구현되어 있어야 함.
        existing = productConverter.rebuildForDealUpdate(existing, dto);

        // 3) 이미지 컬렉션 갈아끼우기
        existing.getProductImagesList().clear();
        if (dto.getImages() != null) {
            for (ProductImagesDTO i : dto.getImages()) {
                existing.getProductImagesList()
                        .add(productImagesConverter.toEntityFromProductImages(i, existing));
            }
        }

        // 4) 사이즈 컬렉션 갈아끼우기
        existing.getProductsizeList().clear();
        if (dto.getSizes() != null) {
            for (ProductSizeDTO i : dto.getSizes()) {
                existing.getProductsizeList()
                        .add(productSizeConverter.toEntityFromProductSize(i, existing));
            }
        }

        // 5) 저장
        Product saved = productRepository.save(existing);

        // 6) 디스크에서 더 이상 쓰지 않는 파일 삭제
        if (!toDelete.isEmpty()) fileUtil.deleteFiles(toDelete);

        return productConverter.toDealResponse(saved);
    }

    
    @Override
    @Transactional
    public ProductShopResponseDTO updateShop(Long productNo, ProductShopRequestDTO dto) {
        Product existing = productRepository.findById(productNo)
                .orElseThrow(() -> new EntityNotFoundException("상품 없음: " + productNo));
        if (Boolean.TRUE.equals(existing.getType())) throw new EntityNotFoundException("일반 상품 아님");

        var oldNames = existing.getProductImagesList().stream()
                .map(ProductImages::getImg).collect(java.util.stream.Collectors.toSet());
        var newNames = (dto.getImages() == null) ? java.util.Set.<String>of()
                : dto.getImages().stream().map(ProductImagesDTO::getImg)
                .filter(java.util.Objects::nonNull).collect(java.util.stream.Collectors.toSet());
        var toDelete = oldNames.stream().filter(n -> !newNames.contains(n)).toList();

        existing = productConverter.rebuildForShopUpdate(existing, dto);

        existing.getProductImagesList().clear();
        if (dto.getImages() != null) {
            for (ProductImagesDTO i : dto.getImages()) {
                existing.getProductImagesList()
                        .add(productImagesConverter.toEntityFromProductImages(i, existing));
            }
        }

        existing.getProductsizeList().clear();
        if (dto.getSizes() != null) {
            for (ProductSizeDTO i : dto.getSizes()) {
                existing.getProductsizeList()
                        .add(productSizeConverter.toEntityFromProductSize(i, existing));
            }
        }

        Product saved = productRepository.save(existing);

        if (!toDelete.isEmpty()) fileUtil.deleteFiles(toDelete);

        return productConverter.toShopResponse(saved);
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
