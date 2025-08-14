package com.kh.finalProject.tables.cartItem.service;

import com.kh.finalProject.tables.cartItem.dto.CartItemRequestDTO;
import com.kh.finalProject.tables.cartItem.dto.CartItemResponseDTO;

public interface CartItemService {
    public CartItemResponseDTO addCartItem(CartItemRequestDTO cartItemRequestDTO);
}
