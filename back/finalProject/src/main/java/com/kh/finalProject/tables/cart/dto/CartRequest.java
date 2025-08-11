package com.kh.finalProject.tables.cart.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartRequest {
    private Long productId;
    private int quantity;
}
