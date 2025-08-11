package com.kh.finalProject.tables.cart.service;

import com.kh.finalProject.tables.cart.entity.Cart;
import com.kh.finalProject.tables.cart.repository.CartRepository;
import com.kh.finalProject.tables.cartItem.dto.CartItemDTO;
import com.kh.finalProject.tables.cartItem.entity.CartItem;
import com.kh.finalProject.tables.cartItem.repository.CartItemRepository;
import com.kh.finalProject.tables.productImages.entity.ProductImages;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    @Override
    public List<CartItemDTO> getCartList(String memberId) {
        Cart cart = cartRepository.findByMember_MemberId(memberId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        List<CartItem> cartItems = cartItemRepository.findByCart_CartNo(cart.getCartNo());

        return cartItems.stream()
                .map(cartItem -> {
                    String imageUrl = cartItem.getProduct().getProductImagesList().stream()
                            .map(ProductImages::getImg)
                            .findFirst()
                            .orElse("");

                    return CartItemDTO.builder()
                            .cartItemNo(cartItem.getCartItemNo())
                            .productNo(cartItem.getProduct().getProductNo())
                            .productName(cartItem.getProduct().getProductName())
                            .quantity(cartItem.getQuantity())
                            .price(cartItem.getProduct().getPrice().intValue())
                            .imgUrl(imageUrl)
                            .build();
                })
                .collect(Collectors.toList());
    }
}
