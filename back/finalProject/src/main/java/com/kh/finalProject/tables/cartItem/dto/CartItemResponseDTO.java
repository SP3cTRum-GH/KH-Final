package com.kh.finalProject.tables.cartItem.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemResponseDTO {
    private Long cartItemNo;
    private Long productNo;
    private String productName;
    private int quantity;
    private int price;
    private String size;
    private String imgUrl;
}