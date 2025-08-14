package com.kh.finalProject.tables.cart.service;

import com.kh.finalProject.tables.cart.dto.CartItemAddDto;
import com.kh.finalProject.tables.cart.entity.Cart;
import com.kh.finalProject.tables.cart.repository.CartRepository;
import com.kh.finalProject.tables.cartItem.dto.CartItemResponseDTO;
import com.kh.finalProject.tables.cartItem.entity.CartItem;
import com.kh.finalProject.tables.cartItem.repository.CartItemRepository;
import com.kh.finalProject.tables.member.entity.Member;
import com.kh.finalProject.tables.member.repository.MemberRepository;
import com.kh.finalProject.tables.product.entity.Product;
import com.kh.finalProject.tables.product.repository.ProductRepository;
import com.kh.finalProject.tables.productImages.entity.ProductImages;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final MemberRepository memberRepository;


    @Override
    public List<CartItemResponseDTO> getCartList(String memberId) {
        Cart cart = cartRepository.findByMember_MemberId(memberId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        List<CartItem> cartItems = cartItemRepository.findByCart_CartNo(cart.getCartNo());

        return cartItems.stream()
                .map(cartItem -> {
                    String imageUrl = cartItem.getProduct().getProductImagesList().stream()
                            .map(ProductImages::getImg)
                            .findFirst()
                            .orElse("");

                    return CartItemResponseDTO.builder()
                            .cartItemNo(cartItem.getCartItemNo())
                            .productNo(cartItem.getProduct().getProductNo())
                            .productName(cartItem.getProduct().getProductName())
                            .quantity(cartItem.getQuantity())
                            .price(cartItem.getProduct().getPrice())
                            .imgUrl(imageUrl)
                            .build();
                })
                .collect(Collectors.toList());
    }

    @Override
    public void addCart(CartItemAddDto cartItemAddDto) {
        Member member = memberRepository.getWithRoles(cartItemAddDto.getMemberId());
        if (member == null) {
            throw new RuntimeException("Member not found");
        }

        Cart cart = cartRepository.findByMember_MemberId(cartItemAddDto.getMemberId())
                .orElseGet(() -> {
                    Cart newCart = Cart.builder()
                            .member(member)
                            .build();
                    return cartRepository.save(newCart);
                });

        Product product = productRepository.findById(cartItemAddDto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Optional<CartItem> cartItemOptional = cartItemRepository.findByCartAndProduct(cart, product);

        if (cartItemOptional.isPresent()) {
            CartItem cartItem = cartItemOptional.get();
            cartItem.setQuantity(cartItem.getQuantity() + cartItemAddDto.getQuantity());
            cartItemRepository.save(cartItem);
        } else {
            CartItem newCartItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(cartItemAddDto.getQuantity())
                    .price(product.getPrice())
                    .build();
            cartItemRepository.save(newCartItem);
        }
    }
}
