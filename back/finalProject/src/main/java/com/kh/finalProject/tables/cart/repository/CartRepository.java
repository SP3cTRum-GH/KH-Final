package com.kh.finalProject.tables.cart.repository;

import com.kh.finalProject.tables.cart.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart,Long> {
    Optional<Cart> findByMember_MemberId(String memberId);
}
