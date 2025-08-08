package com.kh.finalProject.tables.purchase.entity;

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

    @Column
    private Boolean isReviewed = false; // 중복 리뷰 방지

    @CreationTimestamp
    private LocalDateTime regDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cartItem_no", nullable = false)
    private CartItem cartItem;

}
