package com.kh.finalProject.tables.cartItem.repository;

import com.kh.finalProject.tables.cart.entity.Cart;
import com.kh.finalProject.tables.cartItem.entity.CartItem;
import com.kh.finalProject.tables.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem,Long> {
    List<CartItem> findByCart_CartNo(Long cartNo);
    Optional<CartItem> findByCartAndProduct(Cart cart, Product product);

    void deleteAll(Iterable<? extends CartItem> items);
}
