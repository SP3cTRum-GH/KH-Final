package com.kh.finalProject.tables.purchaseLog.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.kh.finalProject.tables.purchaseLog.entity.PurchaseLog;

public interface PurchaseLogRepository extends JpaRepository<PurchaseLog,Long> {
    List<PurchaseLog> findByMemberIdOrderByRegDateDesc(String memberId);
    
    @Query("SELECT p.productNo FROM PurchaseLog p GROUP BY p.productNo ORDER BY COUNT(p) DESC")
    	List<Long> findBestProduct();
}
