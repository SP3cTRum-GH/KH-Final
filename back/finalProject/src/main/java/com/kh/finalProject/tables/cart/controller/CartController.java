package com.kh.finalProject.tables.cart.controller;

import com.kh.finalProject.tables.cartItem.dto.CartItemDTO;
import com.kh.finalProject.tables.cart.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    @GetMapping("/items")
    public ResponseEntity<List<CartItemDTO>> getCartItems(Principal principal) {
        String memberId = principal.getName();
        List<CartItemDTO> cartItems = cartService.getCartList(memberId);
        return ResponseEntity.ok(cartItems);
    }
}
