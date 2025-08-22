package com.kh.finalProject.tables.product.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MainPageDTO {
	private List<ProductShopResponseDTO> shopMain;
	private List<ProductDealResponseDTO> dealMain;
}
