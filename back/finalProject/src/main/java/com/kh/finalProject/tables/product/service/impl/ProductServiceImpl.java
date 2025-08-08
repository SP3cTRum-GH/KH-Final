package com.kh.finalProject.tables.product.service.impl;

import com.kh.finalProject.common.util.pagedto.PageRequestDTO;
import com.kh.finalProject.common.util.pagedto.PageResponseDTO;
import com.kh.finalProject.tables.product.component.ProductConvertor;
import com.kh.finalProject.tables.product.dto.ProductDealRequestDTO;
import com.kh.finalProject.tables.product.dto.ProductDealResponseDTO;
import com.kh.finalProject.tables.product.dto.ProductShopRequestDTO;
import com.kh.finalProject.tables.product.dto.ProductShopResponseDTO;
import com.kh.finalProject.tables.product.entity.Product;
import com.kh.finalProject.tables.product.repository.ProductRepository;
import com.kh.finalProject.tables.product.service.ProductService;
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

    private final ProductConvertor productConvertor;

    // Paging
    @Override
    public PageResponseDTO<ProductDealResponseDTO> pageDeal(PageRequestDTO req) {
        Pageable pageable = PageRequest.of(req.getPage() - 1, req.getSize(),
                Sort.by(Sort.Direction.DESC, "productNo")); // 필요하면 regDate로
        Page<Product> page = productRepository.findByType(true, pageable);

        List<ProductDealResponseDTO> list = page.getContent().stream()
                .map(productConvertor::toDealResponse)
                .toList();

        return PageResponseDTO.<ProductDealResponseDTO>withAll()
                .dtoList(list)
                .pageRequestDTO(req)
                .totalCount(page.getTotalElements())
                .build();
    }

    @Override
    public PageResponseDTO<ProductShopResponseDTO> pageShop(PageRequestDTO req) {
        Pageable pageable = PageRequest.of(req.getPage() - 1, req.getSize(),
                Sort.by(Sort.Direction.DESC, "productNo"));
        Page<Product> page = productRepository.findByType(false, pageable);

        List<ProductShopResponseDTO> list = page.getContent().stream()
                .map(productConvertor::toShopResponse)
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
        Product saved = productRepository.save(productConvertor.toEntityFromDeal(dto));
        return productConvertor.toDealResponse(saved);
    }

    @Override
    public ProductShopResponseDTO createShop(ProductShopRequestDTO dto) {
        Product saved = productRepository.save(productConvertor.toEntityFromShop(dto));
        return productConvertor.toShopResponse(saved);
    }

    // READ
    @Override
    public ProductDealResponseDTO getDeal(Long productNo) {
        Product p = productRepository.findById(productNo)
                .orElseThrow(() -> new EntityNotFoundException("상품 없음: " + productNo));
        if (!Boolean.TRUE.equals(p.getType())) throw new EntityNotFoundException("경매 상품 아님");
        return productConvertor.toDealResponse(p);
    }

    @Override
    public ProductShopResponseDTO getShop(Long productNo) {
        Product p = productRepository.findById(productNo)
                .orElseThrow(() -> new EntityNotFoundException("상품 없음: " + productNo));
        if (Boolean.TRUE.equals(p.getType())) throw new EntityNotFoundException("일반 상품 아님");
        return productConvertor.toShopResponse(p);
    }

    @Override
    public List<ProductDealResponseDTO> listDeals() {
        return productRepository.findAll().stream()
                .filter(p -> Boolean.TRUE.equals(p.getType()))
                .map(productConvertor::toDealResponse)
                .toList();
    }

    @Override
    public List<ProductShopResponseDTO> listShops() {
        return productRepository.findAll().stream()
                .filter(p -> !Boolean.TRUE.equals(p.getType()))
                .map(productConvertor::toShopResponse)
                .toList();
    }

    // UPDATE
    @Override
    public ProductDealResponseDTO updateDeal(Long productNo, ProductDealRequestDTO dto) {
        Product existing = productRepository.findById(productNo)
                .orElseThrow(() -> new EntityNotFoundException("상품 없음: " + productNo));
        if (!Boolean.TRUE.equals(existing.getType())) throw new EntityNotFoundException("경매 상품 아님");
        Product saved = productRepository.save(productConvertor.rebuildForDealUpdate(existing, dto));
        return productConvertor.toDealResponse(saved);
    }

    @Override
    public ProductShopResponseDTO updateShop(Long productNo, ProductShopRequestDTO dto) {
        Product existing = productRepository.findById(productNo)
                .orElseThrow(() -> new EntityNotFoundException("상품 없음: " + productNo));
        if (Boolean.TRUE.equals(existing.getType())) throw new EntityNotFoundException("일반 상품 아님");
        Product saved = productRepository.save(productConvertor.rebuildForShopUpdate(existing, dto));
        return productConvertor.toShopResponse(saved);
    }

    // DELETE
    @Override
    public void delete(Long productNo) {
        productRepository.deleteById(productNo);
    }

}
