package com.kh.finalProject.tables.purchaseLog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BuyNowDTO {
    private Long productNo;
    private String size;
    private int quantity;
}
