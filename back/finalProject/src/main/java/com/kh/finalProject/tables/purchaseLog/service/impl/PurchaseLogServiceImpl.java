package com.kh.finalProject.tables.purchaseLog.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.kh.finalProject.tables.cart.entity.Cart;
import com.kh.finalProject.tables.cart.repository.CartRepository;
import com.kh.finalProject.tables.cartItem.entity.CartItem;
import com.kh.finalProject.tables.cartItem.repository.CartItemRepository;
import com.kh.finalProject.tables.product.component.ProductConverter;
import com.kh.finalProject.tables.product.dto.MainPageDTO;
import com.kh.finalProject.tables.product.dto.ProductDealResponseDTO;
import com.kh.finalProject.tables.product.dto.ProductShopResponseDTO;
import com.kh.finalProject.tables.product.entity.Product;
import com.kh.finalProject.tables.product.repository.ProductRepository;
import com.kh.finalProject.tables.productImages.entity.ProductImages;
import com.kh.finalProject.tables.productImages.repository.ProductImagesRepository;
import com.kh.finalProject.tables.productsize.entity.Productsize;
import com.kh.finalProject.tables.productsize.repository.ProductSizeRepository;
import com.kh.finalProject.tables.purchaseLog.dto.BuyNowDTO;
import com.kh.finalProject.tables.purchaseLog.dto.purchaseLogResponseDTO;
import com.kh.finalProject.tables.purchaseLog.entity.PurchaseLog;
import com.kh.finalProject.tables.purchaseLog.repository.PurchaseLogRepository;
import com.kh.finalProject.tables.purchaseLog.service.PurchaseLogService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class PurchaseLogServiceImpl implements PurchaseLogService {
	private final CartRepository cartRepository; // Cart 조회용
	private final ProductRepository productRepository;
	private final CartItemRepository cartItemRepository; // CartItem 조회/삭제용
	private final PurchaseLogRepository purchaseLogRepository; // purchase_log 저장용
	private final ProductImagesRepository productImagesRepository;
	private final ProductSizeRepository productSizeRepository;
	private final ProductConverter productConverter;

	// 체크아웃 확정: 카트 → purchase_log 복사 + 카트 비우기
	@Override
	public int checkoutAll(String memberId) {
		Cart cart = cartRepository.findByMember_MemberId(memberId)
				.orElseThrow(() -> new RuntimeException("Cart not found"));

		List<CartItem> items = cartItemRepository.findByCart_CartNo(cart.getCartNo());
		if (items.isEmpty())
			return 0;

		List<PurchaseLog> logs = items.stream()
				.map(ci -> PurchaseLog.builder().memberId(memberId).productNo(ci.getProduct().getProductNo())
						.quantity(ci.getQuantity()).productName(ci.getProduct().getProductName()).isReviewed(false)
						.size(ci.getSize()).price(ci.getPrice()) // 라인합계 구조면 그대로 사용
						.build())
				.toList();

		purchaseLogRepository.saveAll(logs);
		cartItemRepository.deleteAll(items);
		return logs.size();
	}

	@Transactional
	@Override
	public int checkoutSelected(String memberId, List<Long> cartItemNo) {
		Cart cart = cartRepository.findByMember_MemberId(memberId)
				.orElseThrow(() -> new RuntimeException("Cart not found"));

		if (cartItemNo == null || cartItemNo.isEmpty())
			return 0;
		List<CartItem> items = cartItemRepository.findByCart_CartNoAndCartItemNoIn(cart.getCartNo(), cartItemNo);
		if (items.isEmpty())
			return 0;
		for (CartItem i : items) {
			log.info(i);
		}
		for (CartItem item : items) {
		    Product product = item.getProduct();
		    String targetSize = item.getSize();

		    if (product != null && product.getProductsizeList() != null) {
		        for (Productsize ps : product.getProductsizeList()) {
		            if (ps.getProductSize().equals(targetSize)) {
		                ps.setStock(ps.getStock() - item.getQuantity()); 
		                break; 
		            }
		        }
		    }
		}
		
		List<PurchaseLog> logs = items.stream()
				.map(ci -> PurchaseLog.builder().memberId(memberId).productNo(ci.getProduct().getProductNo())
						.productName(ci.getProduct().getProductName()).size(ci.getSize()).quantity(ci.getQuantity())
						.price(ci.getPrice()) // 카트에 저장된 라인총액
						.isReviewed(false).build())
				.toList();
		purchaseLogRepository.saveAll(logs);
		
		cartItemRepository.deleteAll(items);

		return logs.size();
	}

	/** 구매내역 조회용(컨트롤러: GET /api/purchase/logs) */
	@Override
	public List<purchaseLogResponseDTO> listAll(String memberId) {
		List<PurchaseLog> rows = (memberId == null || memberId.isBlank()) ? purchaseLogRepository.findAll()
				: purchaseLogRepository.findByMemberIdOrderByRegDateDesc(memberId);

		return rows.stream().map(pl -> {
			Product p = productRepository.findById(pl.getProductNo()).orElse(null);
			String imgUrl = productImagesRepository
					.findTop1ByProduct_ProductNoOrderByProductImageNoAsc(pl.getProductNo()).map(ProductImages::getImg)
					.map(this::normalizeImageUrl).orElse(null);

			return purchaseLogResponseDTO.builder().logNo(pl.getLogNo()).regDate(pl.getRegDate())
					.quantity(pl.getQuantity()).isReviewed(pl.getIsReviewed()).productNo(pl.getProductNo())
					.productName(p != null ? p.getProductName() : pl.getProductName())
					.type(p != null ? p.getType() : null).size(pl.getSize()).price(pl.getPrice()).img(imgUrl)
					.memberId(pl.getMemberId()).build();
		}).collect(java.util.stream.Collectors.toList());
	}

	@Transactional
	@Override
	public purchaseLogResponseDTO buyNow(String memberId, BuyNowDTO req) {
		Product p = productRepository.findById(req.getProductNo())
				.orElseThrow(() -> new RuntimeException("Product not found"));

		// 단가 × 수량
		int unitPrice = p.getPrice(); // 필드명이 다르면 맞게 변경
		int lineTotal = Math.toIntExact((long) unitPrice * req.getQuantity());
		
		if (p != null && p.getProductsizeList() != null) {
	        for (Productsize ps : p.getProductsizeList()) {
	            if (ps.getProductSize().equals(req.getSize())) {
	                ps.setStock(ps.getStock() - req.getQuantity()); 
	                break; 
	            }
	        }
	    }

		PurchaseLog saved = purchaseLogRepository.save(
				PurchaseLog.builder().productNo(p.getProductNo()).memberId(memberId).productName(p.getProductName())
						.size(req.getSize()).quantity(req.getQuantity()).price(lineTotal) // 서버계산값저장
						.isReviewed(false).build());

		return purchaseLogResponseDTO.builder().logNo(saved.getLogNo()).memberId(saved.getMemberId())
				.regDate(saved.getRegDate()).isReviewed(saved.getIsReviewed()).productNo(saved.getProductNo())
				.productName(saved.getProductName()).type(p.getType()).size(saved.getSize()).price(saved.getPrice())
				.img(null).memberId(saved.getMemberId()).build();
	}

	@Override
	public List<Map<String, Object>> salesByDateCategory(LocalDate from, LocalDate to, String category) {
		List<PurchaseLog> rows = purchaseLogRepository.findAll();

		// productNo -> category 매핑 (N+1 방지)
		java.util.Set<Long> pnos = new java.util.HashSet<>();
		for (PurchaseLog pl : rows)
			pnos.add(pl.getProductNo());

		java.util.Map<Long, String> pnoToCategory = new java.util.HashMap<>();
		for (Product p : productRepository.findAllById(pnos)) {
			pnoToCategory.put(p.getProductNo(), p.getCategory()); // 필드명 맞게
		}

		boolean hasFilter = (category != null && !category.trim().isEmpty());
		String filter = hasFilter ? category.trim() : null;

		// 누적: key = "YYYY-MM-DD\0CATEGORY", value = [qty, revenue]
		java.util.Map<String, long[]> acc = new java.util.LinkedHashMap<>();

		for (PurchaseLog pl : rows) {
			LocalDate d = pl.getRegDate().toLocalDate();
			if (from != null && d.isBefore(from))
				continue;
			if (to != null && d.isAfter(to))
				continue;

			String cat = pnoToCategory.getOrDefault(pl.getProductNo(), "UNKNOWN");
			if (hasFilter && !cat.equalsIgnoreCase(filter))
				continue;

			String key = d.toString() + "\u0000" + cat; // 안전한 구분자
			long[] v = acc.computeIfAbsent(key, k -> new long[2]);
			v[0] += pl.getQuantity(); // 필요 시 쓰려고 남김
			v[1] += pl.getPrice(); // amount = 총매출(라인총액 합)
		}

		// 응답 형태로 변환 & 날짜→카테고리 순 정렬
		java.util.List<Map<String, Object>> out = new java.util.ArrayList<>();
		for (java.util.Map.Entry<String, long[]> e : acc.entrySet()) {
			String key = e.getKey();
			int sep = key.indexOf('\u0000');
			String date = key.substring(0, sep);
			String cat = key.substring(sep + 1);

			java.util.Map<String, Object> m = new java.util.HashMap<>();
			m.put("date", date);
			m.put("category", cat);
			m.put("amount", e.getValue()[1]); // <- 프론트가 원하는 필드명
			out.add(m);
		}

		out.sort(java.util.Comparator.comparing((Map<String, Object> m) -> (String) m.get("date"))
				.thenComparing(m -> (String) m.get("category")));

		return out;
	}

	private String normalizeImageUrl(String img) {
		if (img == null || img.isBlank())
			return null;
		return img.startsWith("/api/image/") ? img : "/api/image/" + img;
	}

	@Override
	public MainPageDTO bestItem() {		
		List<ProductShopResponseDTO> shopProducts = purchaseLogRepository.findBestProduct(false)
				.stream().limit(5).map(productConverter::toShopResponse).collect(Collectors.toList());
		List<ProductDealResponseDTO> dealProducts = purchaseLogRepository.findBestProduct(true)
				.stream().limit(5).map(productConverter::toDealResponse).collect(Collectors.toList());

		MainPageDTO main = new MainPageDTO(shopProducts, dealProducts);
		return main;
	}
}
