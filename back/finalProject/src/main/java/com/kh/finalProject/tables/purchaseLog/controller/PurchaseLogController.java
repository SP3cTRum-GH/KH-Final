package com.kh.finalProject.tables.purchaseLog.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.finalProject.tables.product.dto.MainPageDTO;
import com.kh.finalProject.tables.purchaseLog.dto.BuyNowDTO;
import com.kh.finalProject.tables.purchaseLog.dto.purchaseLogResponseDTO;
import com.kh.finalProject.tables.purchaseLog.service.PurchaseLogService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping("/api/purchase")
@RequiredArgsConstructor
public class PurchaseLogController {

    private final PurchaseLogService purchaseLogService;

    @GetMapping("/logs")
    public ResponseEntity<List<purchaseLogResponseDTO>> listAll(
            @RequestParam(required = false) String memberId) {
        return ResponseEntity.ok(purchaseLogService.listAll(memberId));
    }

    // 날짜별 집계
    //전체: GET /api/purchase/sales/date-category
    // 날짜 필터: GET /api/purchase/sales/date-category?from=2025-08-01&to=2025-08-31
    // 카테고리 필터 GET /api/purchase/sales/date-category?category=BAG
    // 둘 다 GET /api/purchase/sales/date-category?from=2025-08-01&to=2025-08-31&category=BAG
    @GetMapping("/sales/date-category")
    public List<Map<String, Object>> salesByDateCategory(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to,
            @RequestParam(required = false) String category) {
        return purchaseLogService.salesByDateCategory(from, to, category);
    }

    // POST http://localhost:8080/api/purchase/buy-now?memberId=admin
    // Body: { "productNo": 2, "size": "S", "quantity": 2}
    @PostMapping("/buy-now")
    public purchaseLogResponseDTO buyNow(@RequestParam String memberId, @RequestBody BuyNowDTO req) {
        return purchaseLogService.buyNow(memberId,req); // memberId는 현재 미사용(일관성 위해 쿼리로만 받음)
    }
    
    @GetMapping("/main")
    public ResponseEntity<MainPageDTO> best(){
    	MainPageDTO main = purchaseLogService.bestItem();
    	return ResponseEntity.ok(main);
    }
}
