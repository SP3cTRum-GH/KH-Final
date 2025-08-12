package com.kh.finalProject.tables.productImages.repository;

import com.kh.finalProject.tables.productImages.entity.ProductImages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductImagesRepository extends JpaRepository<ProductImages,Long> {
}
