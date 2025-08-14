package com.kh.finalProject.tables.product.controller;

import com.kh.finalProject.common.util.pagedto.PageRequestDTO;
import com.kh.finalProject.common.util.pagedto.PageResponseDTO;
import com.kh.finalProject.tables.product.dto.ProductDealRequestDTO;
import com.kh.finalProject.tables.product.dto.ProductDealResponseDTO;
import com.kh.finalProject.tables.product.dto.ProductShopRequestDTO;
import com.kh.finalProject.tables.product.dto.ProductShopResponseDTO;
import com.kh.finalProject.tables.product.repository.ProductRepository;
import com.kh.finalProject.tables.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    ProductService productService;

    // ====== DEAL(경매) ======
    @PostMapping("/deal")
    public Map<String, Long> createDeal(@RequestBody ProductDealRequestDTO dto) {
        ProductDealResponseDTO res = productService.createDeal(dto);
        return Map.of("result", res.getProductNo());
    }

    @GetMapping("/deal/{id}")
    public ProductDealResponseDTO readDeal(@PathVariable Long id) {
        return productService.getDeal(id);
    }

    @GetMapping("/deal")
    public List<ProductDealResponseDTO> listDeals() {
        return productService.listDeals();
    }

    @PutMapping("/deal/{id}")
    public Map<String, String> modifyDeal(@PathVariable Long id, @RequestBody ProductDealRequestDTO dto) {
        productService.updateDeal(id, dto);
        return Map.of("RESULT", "SUCCESS");
    }

    @GetMapping("/deal/list")
    public PageResponseDTO<ProductDealResponseDTO> pageDeal(PageRequestDTO pageRequestDTO) {
        return productService.pageDeal(pageRequestDTO);
    }

    // ====== SHOP(일반) ======
    @PostMapping("/shop")
    public Map<String, Long> createShop(@RequestBody ProductShopRequestDTO dto) {
        ProductShopResponseDTO res = productService.createShop(dto);
        return Map.of("result", res.getProductNo());
    }

    @GetMapping("/shop/{id}")
    public ProductShopResponseDTO readShop(@PathVariable Long id) {
        return productService.getShop(id);
    }

    @GetMapping("/shop")
    public List<ProductShopResponseDTO> listShops() {
        return productService.listShops();
    }

    @PutMapping("/shop/{id}")
    public Map<String, String> modifyShop(@PathVariable Long id, @RequestBody ProductShopRequestDTO dto) {
        productService.updateShop(id, dto);
        return Map.of("RESULT", "SUCCESS");
    }

    @GetMapping("/shop/list")
    public PageResponseDTO<ProductShopResponseDTO> pageShop(PageRequestDTO pageRequestDTO) {
        return productService.pageShop(pageRequestDTO);
    }

    // 공통 삭제
    @DeleteMapping("/{id}")
    public Map<String, String> remove(@PathVariable Long id) {
        productService.delete(id);
        return Map.of("RESULT", "SUCCESS");
    }
}
