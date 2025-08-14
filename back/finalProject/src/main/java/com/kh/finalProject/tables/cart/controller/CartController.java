package com.kh.finalProject.tables.cart.controller;

import com.kh.finalProject.tables.cart.dto.CartItemAddDTO;
import com.kh.finalProject.tables.cart.dto.CartRequestDTO;
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

    @GetMapping("/test")
    public ResponseEntity<List<CartItemResponseDTO>> getCartItemsTest(@RequestParam String memberId) {
        return ResponseEntity.ok(cartService.getCartList(memberId));
    }

    @PostMapping
    public ResponseEntity<Void> addToCart(@RequestBody CartRequestDTO cartRequestDTO, @AuthenticationPrincipal UserDetails userDetails) {
        CartItemAddDTO cartItemAddDto = CartItemAddDTO.builder()
                .memberId(userDetails.getUsername())
                .productId(cartRequestDTO.getProductId())
                .quantity(cartRequestDTO.getQuantity())
                .build();
        cartService.addCart(cartItemAddDto);
        return ResponseEntity.ok().build();
    }
}
