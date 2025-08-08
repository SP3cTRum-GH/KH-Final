package com.kh.finalProject.tables.cart.repository;

import com.kh.finalProject.tables.cart.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart,Long> {
}
