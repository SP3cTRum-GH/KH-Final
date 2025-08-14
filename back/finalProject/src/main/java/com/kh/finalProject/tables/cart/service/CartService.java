package com.kh.finalProject.tables.cart.service;

import com.kh.finalProject.tables.cart.dto.CartItemAddDTO;
import com.kh.finalProject.tables.cartItem.dto.CartItemResponseDTO;
import java.util.List;

public interface CartService {
    List<CartItemResponseDTO> getCartList(String memberId);
    void addCart(CartItemAddDTO cartItemAddDto);
}
