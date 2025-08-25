package com.kh.finalProject.tables.purchaseLog.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kh.finalProject.tables.product.entity.Product;
import com.kh.finalProject.tables.purchaseLog.entity.PurchaseLog;

public interface PurchaseLogRepository extends JpaRepository<PurchaseLog,Long> {
    List<PurchaseLog> findByMemberIdOrderByRegDateDesc(String memberId);
    
    @Query("""
    	    SELECT pr 
    	    FROM PurchaseLog pl 
    	    JOIN Product pr ON pl.productNo = pr.productNo 
    	    WHERE :type IS NULL OR pr.type = :type
    	    GROUP BY pr
    	    ORDER BY COUNT(pl) DESC
    	""")
    	List<Product> findBestProduct(boolean type);
    
}
