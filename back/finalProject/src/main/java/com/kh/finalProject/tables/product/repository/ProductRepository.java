package com.kh.finalProject.tables.product.repository;

import com.kh.finalProject.tables.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {
}
