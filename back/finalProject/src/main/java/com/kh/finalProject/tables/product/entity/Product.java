package com.kh.finalProject.tables.product.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.kh.finalProject.tables.review.entity.Review;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.kh.finalProject.tables.cartItem.entity.CartItem;
import com.kh.finalProject.tables.productImages.entity.ProductImages;
import com.kh.finalProject.tables.productsize.entity.Productsize;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    
    @OneToMany(mappedBy = "product", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<CartItem> cartItems = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductImages> productImagesList = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Productsize> productsizeList = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviewList = new ArrayList<>();

    public void addImages (ProductImages productImages) {
        productImagesList.add(productImages);
        productImages.setProduct(this);
    }
    public void addSize(Productsize productsize) {
        productsizeList.add(productsize);
        productsize.setProduct(this);
    }
}
