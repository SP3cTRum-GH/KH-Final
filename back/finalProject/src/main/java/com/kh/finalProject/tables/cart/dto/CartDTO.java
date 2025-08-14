package com.kh.finalProject.tables.cart.dto;

import com.kh.finalProject.tables.cartItem.dto.CartItemResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartDTO {
    private Long cartNo;
    private Long memberNo;
    private List<CartItemResponseDTO> cartItems;
}