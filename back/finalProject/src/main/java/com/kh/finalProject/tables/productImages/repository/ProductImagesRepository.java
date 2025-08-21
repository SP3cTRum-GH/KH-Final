package com.kh.finalProject.tables.productImages.repository;

import com.kh.finalProject.tables.productImages.entity.ProductImages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface ProductImagesRepository extends JpaRepository<ProductImages,Long> {
    Optional<ProductImages> findTop1ByProduct_ProductNoOrderByProductImageNoAsc(Long productNo);
}
