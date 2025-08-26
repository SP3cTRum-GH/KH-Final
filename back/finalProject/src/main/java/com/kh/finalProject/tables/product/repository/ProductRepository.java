package com.kh.finalProject.tables.product.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kh.finalProject.tables.product.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

	@Query("""
			SELECT p FROM Product p
			WHERE p.type = :type
			AND (:category IS NULL OR p.category = :category)
			""")
	Page<Product> findByType(@Param("type") Boolean type, @Param("category") String category, Pageable pageable); // true=deal,
																													// false=shop

	@Query("SELECT p FROM Product p WHERE p.productNo IN :productNos AND p.type = :type")
	List<Product> findByProductNoInAndType(@Param("productNos") List<Long> productNos, @Param("type") boolean type);

	@Query(value = """
			SELECT p.*
			FROM product p
			LEFT JOIN purchase_log pl ON p.product_no = pl.product_no
			WHERE p.type = :type
			AND (:category IS NULL OR p.category = :category)
			GROUP BY p.product_no, p.category, p.deal_count, p.deal_current, p.end_date, p.price, p.product_name, p.reg_date, p.type, p.upd_date
			ORDER BY COUNT(pl.product_no) DESC, p.reg_date DESC
			""", countQuery = """
			SELECT COUNT(*)
			FROM product p
			WHERE p.type = :type
			AND (:category IS NULL OR p.category = :category)
			""", nativeQuery = true)
	Page<Product> findPopular(@Param("type") Boolean type, @Param("category") String category, Pageable pageable);

}
