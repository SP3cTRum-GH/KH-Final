package com.kh.finalProject.tables.purchaseLog.controller;

import com.kh.finalProject.tables.purchaseLog.dto.purchaseLogResponseDTO;
import com.kh.finalProject.tables.purchaseLog.entity.purchaseLog;
import com.kh.finalProject.tables.purchaseLog.repository.PurchaseLogRepository;
import com.kh.finalProject.tables.purchaseLog.service.impl.PurchaseLogServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("/api/purchase")
@RequiredArgsConstructor
public class PurchaseLogController {

    private final PurchaseLogServiceImpl purchaseLogServiceImpl;

    @GetMapping("/logs")
    public ResponseEntity<List<purchaseLogResponseDTO>> listAll() { // ✅ DTO 반환
        return ResponseEntity.ok(purchaseLogServiceImpl.listAll());
    }
}
