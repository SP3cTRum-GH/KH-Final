package com.kh.finalProject.tables.cart.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartItemAddDTO {
    private String memberId;
    private Long productNo;
    private int quantity;
}
