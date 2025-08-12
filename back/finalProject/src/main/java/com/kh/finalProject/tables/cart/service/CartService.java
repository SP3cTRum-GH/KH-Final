package com.kh.finalProject.tables.cart.service;

import com.kh.finalProject.tables.cart.dto.CartItemAddDto;
import com.kh.finalProject.tables.cartItem.dto.CartItemDTO;
import java.util.List;

public interface CartService {
    List<CartItemDTO> getCartList(String memberId);
    void addCart(CartItemAddDto cartItemAddDto);
}
