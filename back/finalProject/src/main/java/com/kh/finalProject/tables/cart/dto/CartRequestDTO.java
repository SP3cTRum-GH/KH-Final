package com.kh.finalProject.tables.cart.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartRequestDTO {
    private Long productNo;
    private int quantity;
}
