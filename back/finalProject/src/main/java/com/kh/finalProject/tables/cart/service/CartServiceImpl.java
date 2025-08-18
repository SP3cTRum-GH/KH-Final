package com.kh.finalProject.tables.cart.service;

import com.kh.finalProject.tables.cart.dto.CartItemAddDTO;
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
    public void addCart(CartItemAddDTO cartItemAddDto) {
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

        Product product = productRepository.findById(cartItemAddDto.getProductNo())
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
    //
    @Override
    public void changeQty(String memberId, Long cartItemId, int quantity) {
        Cart cart = cartRepository.findByMember_MemberId(memberId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("CartItem not found"));

        // 본인 카트 소유 검증
        if (!item.getCart().getCartNo().equals(cart.getCartNo())) {
            throw new RuntimeException("Forbidden cart item");
        }

        // 0 이하면 삭제
        if (quantity <= 0) {
            cartItemRepository.delete(item);
            return;
        }

        item.setQuantity(quantity);
        // 장바구니 총 금액을 CartItem.price에 저장한다면:
        int unitPrice = item.getProduct().getPrice();
        item.setPrice(unitPrice * quantity);

        cartItemRepository.save(item);
    }

    @Override
    public void removeItem(String memberId, Long cartItemId) {
        Cart cart = cartRepository.findByMember_MemberId(memberId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("CartItem not found"));

        if (!item.getCart().getCartNo().equals(cart.getCartNo())) {
            throw new RuntimeException("Forbidden cart item");
        }

        cartItemRepository.delete(item);
    }

    @Override
    @Transactional
    public void clear(String memberId) {
        Cart cart = cartRepository.findByMember_MemberId(memberId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        // 1. 카트 아이템 전부 조회
        List<CartItem> items = cartItemRepository.findByCart_CartNo(cart.getCartNo());
        if (items.isEmpty()) return;

        // 2. 한 번에 삭제
        cartItemRepository.deleteAll(items);
    }
}
