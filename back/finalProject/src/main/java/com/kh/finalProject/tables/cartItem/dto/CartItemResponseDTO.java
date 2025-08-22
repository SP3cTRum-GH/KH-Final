package com.kh.finalProject.tables.cartItem.dto;

import java.time.LocalDateTime;

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
    private Boolean type;
    private String size;
    private String imgUrl;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private int dealCurrent; 
}