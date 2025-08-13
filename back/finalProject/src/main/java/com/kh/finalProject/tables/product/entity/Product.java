package com.kh.finalProject.tables.product.entity;

import com.kh.finalProject.tables.productImages.entity.ProductImages;
import com.kh.finalProject.tables.productsize.entity.Productsize;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@SequenceGenerator(name = "product_seq_gen",
        sequenceName = "product_seq",
        allocationSize = 1,
        initialValue = 1
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "product_seq_gen")
    private Long productNo;

    @Column(nullable = false)
    private String productName; // 상품 이름

    @Column(nullable = false)
    private String category; // 상품 카테고리

    @Column(nullable = false)
    private Boolean type; // 상품 타입 일반 | 경매

    @CreationTimestamp
    private LocalDateTime regDate; // 상품 등록일

    @UpdateTimestamp
    private LocalDateTime updDate; // 상품 수정일

    @Column
    private LocalDateTime endDate; // 경매 마감일

    @Column(nullable = false)
    private int price; // 상품 가격

    @Column(nullable = false)
    private Long dealCount; // 경매 입찰수

    @Column(nullable = false)
    private int dealCurrent; // 경매 입찰가

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductImages> productImagesList = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Productsize> productsizeList = new ArrayList<>();

    public void addImages (ProductImages productImages) {
        productImagesList.add(productImages);
        productImages.setProduct(this);
    }
    public void addSize(Productsize productsize) {
        productsizeList.add(productsize);
        productsize.setProduct(this);
    }
}
