package com.kh.finalProject.tables.cart.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartItemAddDto {
    private String memberId;
    private Long productId;
    private int quantity;
}
