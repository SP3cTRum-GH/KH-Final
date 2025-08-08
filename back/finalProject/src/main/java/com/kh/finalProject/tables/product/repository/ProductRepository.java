package com.kh.finalProject.tables.product.repository;

import com.kh.finalProject.tables.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {

    // Paging
    Page<Product> findByType(Boolean type, Pageable pageable); // true=deal, false=shop
}
