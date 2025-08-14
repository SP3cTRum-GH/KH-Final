package com.kh.finalProject.tables.cartItem.component;

import com.kh.finalProject.tables.cart.entity.Cart;
import com.kh.finalProject.tables.cartItem.dto.CartItemRequestDTO;
import com.kh.finalProject.tables.cartItem.dto.CartItemResponseDTO;
import com.kh.finalProject.tables.cartItem.entity.CartItem;
import com.kh.finalProject.tables.product.entity.Product;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CartItemConverter {
    public CartItem toEntityCartItem(CartItemRequestDTO dto, Cart cart, Product product){
        return CartItem.builder()
                .cart(cart)
                .product(product)
                .quantity(dto.getQuantity())
                .price(product.getPrice())
                .build();
    }

    // Entity -> DTO (단건)
    public CartItemResponseDTO toDTOCartItem(CartItem entity, Product product) {
        return CartItemResponseDTO.builder()
                .cartItemNo(entity.getCartItemNo())
                .productNo(product.getProductNo()) // ?
                .productName(product.getProductName()) // ?
                .quantity(entity.getQuantity())
                .price(entity.getPrice())
                .build();
    }

    // Entity 리스트 -> DTO 리스트
    public List<CartItemResponseDTO> toDTOList(List<CartItem> items, Product product) {
        List<CartItemResponseDTO> dtos = new ArrayList<>();
        for (CartItem i : items) {
            dtos.add(toDTOCartItem(i,product));
        }
        return dtos;
    }


}
