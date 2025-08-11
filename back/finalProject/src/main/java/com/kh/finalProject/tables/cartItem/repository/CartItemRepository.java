package com.kh.finalProject.tables.cartItem.repository;

import com.kh.finalProject.tables.cartItem.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem,Long> {
    List<CartItem> findByCart_CartNo(Long cartNo);
}
