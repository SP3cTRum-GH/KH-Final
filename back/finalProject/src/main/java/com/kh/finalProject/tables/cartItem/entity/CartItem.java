package com.kh.finalProject.tables.cartItem.entity;

import com.kh.finalProject.tables.cart.entity.Cart;
import com.kh.finalProject.tables.product.entity.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@SequenceGenerator(name = "cartItem_seq_gen"
        ,sequenceName = "cartItem_Seq"
        ,allocationSize = 1
        ,initialValue = 1
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "cartItem_seq_gen")
    private Long cartItemNo;

    @Column (nullable = false)
    private int quantity; // 장바구니 수량

    @Column
    private int price; // 장바구니 총 금액

    @Column(name = "product_size")
    private String size; // 상품 사이즈
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_no", nullable = false)
    private Cart cart;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_no", nullable = false)
    private Product product;
}
