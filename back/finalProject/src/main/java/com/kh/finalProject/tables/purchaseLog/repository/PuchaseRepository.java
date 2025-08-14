package com.kh.finalProject.tables.purchaseLog.repository;

import com.kh.finalProject.tables.purchaseLog.entity.purchaseLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PuchaseRepository extends JpaRepository<purchaseLog,Long> {
}
