package com.kh.finalProject.tables.cart.entity;

import com.kh.finalProject.tables.cartItem.entity.CartItem;
import com.kh.finalProject.tables.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@SequenceGenerator(name = "cart_seq_gen"
    ,sequenceName = "cart_seq"
    ,initialValue =  1
    ,allocationSize = 1
)
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "cart_seq_gen")
    private Long cartNo;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_no", nullable = false, unique = true)
    private Member member;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> items = new ArrayList<>();
}
