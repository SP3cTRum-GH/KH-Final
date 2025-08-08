package com.kh.finalProject.tables.cartItem.repository;

import com.kh.finalProject.tables.cartItem.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem,Long> {
}
