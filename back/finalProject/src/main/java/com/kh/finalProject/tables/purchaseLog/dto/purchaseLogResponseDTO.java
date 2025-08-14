package com.kh.finalProject.tables.purchaseLog.dto;

import com.kh.finalProject.tables.cartItem.dto.CartItemResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class purchaseLogResponseDTO {
    private Long logNo;
    private Boolean isReviewed = false; // 중복 리뷰 방지
    private LocalDateTime regDate;
    private CartItemResponseDTO cartItem;
}
