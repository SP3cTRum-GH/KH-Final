package com.kh.finalProject.tables.cartItem.service;

import com.kh.finalProject.tables.cartItem.dto.CartItemRequestDTO;
import com.kh.finalProject.tables.cartItem.dto.CartItemResponseDTO;
import com.kh.finalProject.tables.cartItem.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartItemServiceImpl implements CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Override
    public CartItemResponseDTO addCartItem(CartItemRequestDTO cartItemRequestDTO) {
        return null;
    }
}
