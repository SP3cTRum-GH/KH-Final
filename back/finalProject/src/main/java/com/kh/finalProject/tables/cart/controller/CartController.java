package com.kh.finalProject.tables.cart.controller;

import com.kh.finalProject.tables.cart.dto.CartItemAddDto;
import com.kh.finalProject.tables.cart.dto.CartRequest;
import com.kh.finalProject.tables.cart.service.CartService;
import com.kh.finalProject.tables.cartItem.dto.CartItemResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<List<CartItemResponseDTO>> getCartItems(@AuthenticationPrincipal UserDetails userDetails) {
        List<CartItemResponseDTO> cartItems = cartService.getCartList(userDetails.getUsername());
        return ResponseEntity.ok(cartItems);
    }

    @PostMapping
    public ResponseEntity<Void> addToCart(@RequestBody CartRequest cartRequest, @AuthenticationPrincipal UserDetails userDetails) {
        CartItemAddDto cartItemAddDto = CartItemAddDto.builder()
                .memberId(userDetails.getUsername())
                .productId(cartRequest.getProductId())
                .quantity(cartRequest.getQuantity())
                .build();
        cartService.addCart(cartItemAddDto);
        return ResponseEntity.ok().build();
    }
}
