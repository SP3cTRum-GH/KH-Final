package com.kh.finalProject.tables.purchase.repository;

import com.kh.finalProject.tables.purchase.entity.purchaseLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PuchaseRepository extends JpaRepository<purchaseLog,Long> {
}
