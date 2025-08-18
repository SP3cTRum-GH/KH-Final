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
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    // 목록 불러오기 (http://localhost:8080/api/cart/test?memberId=admin)
    @GetMapping
    public ResponseEntity<List<CartItemResponseDTO>> getCartItems(@AuthenticationPrincipal UserDetails userDetails) {
        List<CartItemResponseDTO> cartItems = cartService.getCartList(userDetails.getUsername());
        return ResponseEntity.ok(cartItems);
    }
    // 상품 담기 productNo와 quantity 입력
    @PostMapping
    public ResponseEntity<Void> addToCart(@RequestBody CartRequestDTO cartRequestDTO, @AuthenticationPrincipal UserDetails userDetails) {
        CartItemAddDTO cartItemAddDto = CartItemAddDTO.builder()
                .memberId(userDetails.getUsername())
                .productNo(cartRequestDTO.getProductNo())
                .quantity(cartRequestDTO.getQuantity())
                .build();
        cartService.addCart(cartItemAddDto);
        return ResponseEntity.ok().build();
    }
    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

    @GetMapping("/test")
    public ResponseEntity<List<CartItemResponseDTO>> getCartItemsTest(@RequestParam String memberId) {
        return ResponseEntity.ok(cartService.getCartList(memberId));
    }

    @PostMapping("/test")
    public ResponseEntity<Void> addToCartTest(@RequestParam String memberId,
                                              @RequestBody CartRequestDTO cartRequestDTO) {
        cartService.addCart(CartItemAddDTO.builder()
                .memberId(memberId)                // ← 인증 없이 직접 전달
                .productNo(cartRequestDTO.getProductNo())
                .quantity(cartRequestDTO.getQuantity())
                .build());
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/items/{cartItemId}")
    public void change(@RequestParam String memberId,
                       @PathVariable Long cartItemId,
                       @RequestBody Map<String,Integer> body) {
        cartService.changeQty(memberId, cartItemId, body.getOrDefault("quantity", 0));
    }

    // 개별삭제
    @DeleteMapping("/items/{cartItemId}")
    public void remove(@RequestParam String memberId, @PathVariable Long cartItemId) {
        cartService.removeItem(memberId, cartItemId);
    }

    // 전체삭제 (http://localhost:8080/api/cart/killyou?memberId=admin)
    @DeleteMapping("/killyou")
    public void clear(@RequestParam String memberId) {
        cartService.clear(memberId);
    }
}