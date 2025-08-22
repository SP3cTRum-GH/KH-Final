package com.kh.finalProject.tables.purchaseLog.repository;

import com.kh.finalProject.tables.purchaseLog.dto.purchaseLogResponseDTO;
import com.kh.finalProject.tables.purchaseLog.entity.purchaseLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PurchaseLogRepository extends JpaRepository<purchaseLog,Long> {
}
