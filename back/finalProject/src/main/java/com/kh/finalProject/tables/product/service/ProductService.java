package com.kh.finalProject.tables.product.service;

import com.kh.finalProject.common.util.pagedto.PageRequestDTO;
import com.kh.finalProject.common.util.pagedto.PageResponseDTO;
import com.kh.finalProject.tables.product.dto.ProductDealRequestDTO;
import com.kh.finalProject.tables.product.dto.ProductDealResponseDTO;
import com.kh.finalProject.tables.product.dto.ProductShopRequestDTO;
import com.kh.finalProject.tables.product.dto.ProductShopResponseDTO;

import java.util.List;

public interface ProductService {

    // Paging
    PageResponseDTO<ProductDealResponseDTO> pageDeal(PageRequestDTO req);
    PageResponseDTO<ProductShopResponseDTO> pageShop(PageRequestDTO req);

    // CREATE
    ProductDealResponseDTO createDeal(ProductDealRequestDTO dto);
    ProductShopResponseDTO createShop(ProductShopRequestDTO dto);

    // READ
    ProductDealResponseDTO getDeal(Long productNo);
    ProductShopResponseDTO getShop(Long productNo);
    List<ProductDealResponseDTO> listDeals();
    List<ProductShopResponseDTO> listShops();

    // UPDATE
    ProductDealResponseDTO updateDeal(Long productNo, ProductDealRequestDTO dto);
    ProductShopResponseDTO updateShop(Long productNo, ProductShopRequestDTO dto);

    // DELETE
    void delete(Long productNo);

}
