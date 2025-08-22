package com.kh.finalProject.tables.purchaseLog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CheckoutSelectedRequestDTO {
    private List<Long> cartItemNo;
}
