package com.kh.finalProject.tables.cartItem.service.impl;

import com.kh.finalProject.tables.cartItem.repository.CartItemRepository;
import com.kh.finalProject.tables.cartItem.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartItemServiceImpl implements CartItemService {
    @Autowired
    private CartItemRepository cartItemRepository;
}
