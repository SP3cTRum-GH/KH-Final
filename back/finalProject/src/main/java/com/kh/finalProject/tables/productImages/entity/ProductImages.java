package com.kh.finalProject.tables.productImages.entity;

import com.kh.finalProject.tables.product.entity.Product;
import jakarta.persistence.*;
import lombok.*;

@Entity
@SequenceGenerator(name = "product_image_seq_gen",
        sequenceName = "product_image_seq",
        allocationSize = 1,
        initialValue = 1)
@Getter
@Setter
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
