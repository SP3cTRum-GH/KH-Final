package com.kh.finalProject.tables.productImages.entity;

import com.kh.finalProject.tables.product.entity.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@SequenceGenerator(name = "product_image_seq_gen",
        sequenceName = "product_image_seq",
        allocationSize = 1,
        initialValue = 1)
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductImages {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_image_seq_gen")
    private Long productImageNo;
    @ManyToOne
    @JoinColumn(name = "product_no" ,nullable = false)
    private Product product;

    @Column
    private String img; // 상품 이미지
}
