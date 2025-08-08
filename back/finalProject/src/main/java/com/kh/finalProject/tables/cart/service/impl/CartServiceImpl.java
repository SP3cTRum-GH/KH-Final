package com.kh.finalProject.tables.cart.service.impl;

import com.kh.finalProject.tables.cart.repository.CartRepository;
import com.kh.finalProject.tables.cart.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    private CartRepository cartRepository;

}
