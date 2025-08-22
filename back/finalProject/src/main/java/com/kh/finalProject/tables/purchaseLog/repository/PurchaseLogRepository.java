package com.kh.finalProject.tables.purchaseLog.repository;

import com.kh.finalProject.tables.purchaseLog.entity.PurchaseLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PurchaseLogRepository extends JpaRepository<PurchaseLog,Long> {
    List<PurchaseLog> findByMemberIdOrderByRegDateDesc(String memberId);
}
