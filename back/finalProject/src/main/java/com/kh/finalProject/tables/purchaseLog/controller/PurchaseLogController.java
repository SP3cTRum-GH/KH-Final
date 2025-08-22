package com.kh.finalProject.tables.purchaseLog.controller;

import com.kh.finalProject.tables.purchaseLog.dto.BuyNowDTO;
import com.kh.finalProject.tables.purchaseLog.dto.purchaseLogResponseDTO;
import com.kh.finalProject.tables.purchaseLog.service.PurchaseLogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Log4j2
@RestController
@RequestMapping("/api/purchase")
@RequiredArgsConstructor
public class PurchaseLogController {

    private final PurchaseLogService purchaseLogService;

    @GetMapping("/logs")
    public ResponseEntity<List<purchaseLogResponseDTO>> listAll() { // ✅ DTO 반환
        return ResponseEntity.ok(purchaseLogService.listAll());
    }

    // 날짜별 집계
    // 예) /api/purchase/sales/daily?from=2025-08-01&to=2025-08-21
    @GetMapping("/sales/daily")
    public List<Map<String, Object>> salesByDate(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        return purchaseLogService.salesByDate(from, to);
    }

    // 카테고리별 집계
    // 예) /api/purchase/sales/category
    @GetMapping("/sales/category")
    public List<Map<String, Object>> salesByCategory() {
        return purchaseLogService.salesByCategory();
    }

    // POST http://localhost:8080/api/purchase/buy-now?memberId=admin
    // Body: { "productNo": 2, "size": "S", "quantity": 2}
    @PostMapping("/buy-now")
    public purchaseLogResponseDTO buyNow(@RequestParam String memberId, @RequestBody BuyNowDTO req) {
        return purchaseLogService.buyNow(req); // memberId는 현재 미사용(일관성 위해 쿼리로만 받음)
    }
}
