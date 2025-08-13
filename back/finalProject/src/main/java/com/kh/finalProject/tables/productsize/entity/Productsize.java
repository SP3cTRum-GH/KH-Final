package com.kh.finalProject.tables.productsize.entity;

import com.kh.finalProject.tables.product.entity.Product;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@SequenceGenerator(name = "product_info_seq_gen",
    sequenceName = "product_info_seq",
    allocationSize = 1,
    initialValue = 1
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Productsize {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_info_seq_gen")
    private Long productSizeNo;

    @ManyToOne
    @JoinColumn(name = "product_no" ,nullable = false)
    private Product product;

    @Column
    private int stock; // 상품 재고 수량

    @Column
    private String productSize; // 상품 사이즈

}
