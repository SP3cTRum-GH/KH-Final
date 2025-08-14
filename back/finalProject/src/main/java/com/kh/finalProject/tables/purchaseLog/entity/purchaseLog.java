package com.kh.finalProject.tables.purchaseLog.entity;

import com.kh.finalProject.tables.cart.entity.Cart;
import com.kh.finalProject.tables.cartItem.entity.CartItem;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "purchase_log")
@SequenceGenerator(name = "purchase_log_seq_gen"
    ,sequenceName = "purchase_log_seq"
    ,allocationSize = 1
    ,initialValue = 1
)
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class purchaseLog {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "purchase_log_seq_gen")
    private Long logNo;

    @CreationTimestamp
    private LocalDateTime regDate;

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "cartItem_no", nullable = false)
    // private CartItem cartItem;

    // ⬇️ 결제 당시 스냅샷 값으로 저장
    @Column(nullable = false)
    private Long productNo;   // i.getProduct().getProductNo()

    @Column (nullable = false)
    private int quantity; // 장바구니 수량

    @Column
    private int price; // 장바구니 총 금액
}
