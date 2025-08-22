package com.kh.finalProject.tables.product.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kh.finalProject.tables.product.entity.Product;

public interface ProductRepository extends JpaRepository<Product,Long> {

    // Paging
    Page<Product> findByType(Boolean type, Pageable pageable); // true=deal, false=shop
    
    @Query("SELECT p FROM Product p WHERE p.productNo IN :productNos AND p.type = :type")
    List<Product> findByProductNoInAndType(@Param("productNos") List<Long> productNos,
                                           @Param("type") boolean type);
}
