package com.kh.finalProject.tables.purchaseLog.service.impl;

import com.kh.finalProject.tables.cart.entity.Cart;
import com.kh.finalProject.tables.cart.repository.CartRepository;
import com.kh.finalProject.tables.cartItem.entity.CartItem;
import com.kh.finalProject.tables.cartItem.repository.CartItemRepository;
import com.kh.finalProject.tables.product.entity.Product;
import com.kh.finalProject.tables.product.repository.ProductRepository;
import com.kh.finalProject.tables.productImages.entity.ProductImages;
import com.kh.finalProject.tables.productImages.repository.ProductImagesRepository;
import com.kh.finalProject.tables.purchaseLog.dto.BuyNowDTO;
import com.kh.finalProject.tables.purchaseLog.dto.purchaseLogResponseDTO;
import com.kh.finalProject.tables.purchaseLog.entity.purchaseLog;
import com.kh.finalProject.tables.purchaseLog.repository.PurchaseLogRepository;
import com.kh.finalProject.tables.purchaseLog.service.PurchaseLogService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class PurchaseLogServiceImpl implements PurchaseLogService {

    private final CartRepository cartRepository;               // Cart 조회용
    private final ProductRepository productRepository;
    private final CartItemRepository cartItemRepository;       // CartItem 조회/삭제용
    private final PurchaseLogRepository purchaseLogRepository; // purchase_log 저장용
    private final ProductImagesRepository productImagesRepository;

    // 체크아웃 확정: 카트 → purchase_log 복사 + 카트 비우기
    @Override
    public int checkoutAll(String memberId) {
        Cart cart = cartRepository.findByMember_MemberId(memberId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        List<CartItem> items = cartItemRepository.findByCart_CartNo(cart.getCartNo());
        if (items.isEmpty()) return 0;

        List<purchaseLog> logs = items.stream()
                .map(ci -> purchaseLog.builder()
                        .productNo(ci.getProduct().getProductNo())
                        .quantity(ci.getQuantity())
                        .productName(ci.getProduct().getProductName())
                        .isReviewed(false)
                        .size(ci.getSize())
                        .price(ci.getPrice())     // 라인합계 구조면 그대로 사용
                        .build())
                .toList();

        purchaseLogRepository.saveAll(logs);
        cartItemRepository.deleteAll(items);
        return logs.size();
    }

    @Override
    public int checkoutSelected(String memberId, List<Long> cartItemNo) {
        Cart cart = cartRepository.findByMember_MemberId(memberId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        if (cartItemNo == null || cartItemNo.isEmpty()) return 0;

        List<CartItem> items = cartItemRepository
                .findByCart_CartNoAndCartItemNoIn(cart.getCartNo(), cartItemNo);
        if (items.isEmpty()) return 0;

        for(CartItem i : items){
            log.info(i);
        }

        List<purchaseLog> logs = items.stream()
                .map(ci -> purchaseLog.builder()
                        .productNo(ci.getProduct().getProductNo())
                        .productName(ci.getProduct().getProductName())
                        .size(ci.getSize())
                        .quantity(ci.getQuantity())
                        .price(ci.getPrice()) // 카트에 저장된 라인총액
                        .isReviewed(false)
                        .build())
                .toList();

        purchaseLogRepository.saveAll(logs);
        cartItemRepository.deleteAll(items); // ✅ 선택건만 비우기
        return logs.size();
    }

    /** 구매내역 조회용(컨트롤러: GET /api/purchase/logs) */
    @Override
    public List<purchaseLogResponseDTO> listAll() {
        List<purchaseLog> rows = purchaseLogRepository.findAll();

        return rows.stream()
                .map(pl -> {
                    Product p = productRepository.findById(pl.getProductNo()).orElse(null);

                    String imgUrl = productImagesRepository
                            .findTop1ByProduct_ProductNoOrderByProductImageNoAsc(pl.getProductNo())
                            .map(ProductImages::getImg)
                            .map(this::normalizeImageUrl) // 선택
                            .orElse(null);

                    return purchaseLogResponseDTO.builder()
                            .logNo(pl.getLogNo())
                            .regDate(pl.getRegDate())
                            .isReviewed(pl.getIsReviewed())
                            .productNo(pl.getProductNo())
                            .productName(p != null ? p.getProductName() : pl.getProductName())
                            .type(p != null ? p.getType() : null) // NPE 방지
                            .size(pl.getSize())
                            .price(pl.getPrice())
                            .img(imgUrl)
                            .build();
                })
                .toList();
    }

    @Override
    public List<Map<String, Object>> salesByDate(LocalDate from, LocalDate to) {
        List<purchaseLog> rows = purchaseLogRepository.findAll();

        // 날짜별 누적: [0]=수량, [1]=매출
        Map<LocalDate, long[]> acc = new TreeMap<>(); // 날짜 오름차순

        for (purchaseLog pl : rows) {
            LocalDate d = pl.getRegDate().toLocalDate();
            if (from != null && d.isBefore(from)) continue; // from 이상
            if (to   != null && d.isAfter(to))   continue; // to 이하

            long[] v = acc.computeIfAbsent(d, k -> new long[2]);
            v[0] += pl.getQuantity();
            v[1] += pl.getPrice(); // price가 라인총액이면 그대로 합산
        }

        // 결과 변환
        List<Map<String, Object>> out = new ArrayList<>();
        for (Map.Entry<LocalDate, long[]> e : acc.entrySet()) {
            Map<String, Object> m = new HashMap<>();
            m.put("salesDate", e.getKey().toString()); // "YYYY-MM-DD"
            m.put("totalQuantity", e.getValue()[0]);
            m.put("totalRevenue", e.getValue()[1]);
            out.add(m);
        }
        return out;
    }



    @Override
    public purchaseLogResponseDTO buyNow(BuyNowDTO req) {
        Product p = productRepository.findById(req.getProductNo())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // 단가 × 수량
        int unitPrice = p.getPrice(); // 필드명이 다르면 맞게 변경
        int lineTotal = Math.toIntExact((long) unitPrice * req.getQuantity());

        purchaseLog saved = purchaseLogRepository.save(
                purchaseLog.builder()
                        .productNo(p.getProductNo())
                        .productName(p.getProductName())
                        .size(req.getSize())
                        .quantity(req.getQuantity())
                        .price(lineTotal)      // ✔ 서버 계산값 저장
                        .isReviewed(false)
                        .build()
        );

        return purchaseLogResponseDTO.builder()
                .logNo(saved.getLogNo())
                .regDate(saved.getRegDate())
                .isReviewed(saved.getIsReviewed())
                .productNo(saved.getProductNo())
                .productName(saved.getProductName())
                .type(p.getType())
                .size(saved.getSize())
                .price(saved.getPrice())
                .img(null)
                .build();
    }

    @Override
    public List<Map<String, Object>> salesByCategory() {
        List<purchaseLog> rows = purchaseLogRepository.findAll();

        // productNo -> category 매핑
        Set<Long> pnos = new HashSet<>();
        for (purchaseLog pl : rows) pnos.add(pl.getProductNo());

        Map<Long, String> pnoToCategory = new HashMap<>();
        for (Product p : productRepository.findAllById(pnos)) {
            pnoToCategory.put(p.getProductNo(), p.getCategory()); // 필드명 맞게
        }

        // 카테고리 누적 [0]=qty, [1]=revenue
        Map<String, long[]> acc = new LinkedHashMap<>();
        for (purchaseLog pl : rows) {
            String cat = pnoToCategory.getOrDefault(pl.getProductNo(), "UNKNOWN");
            long[] pair = acc.computeIfAbsent(cat, k -> new long[]{0L, 0L});
            pair[0] += pl.getQuantity();
            pair[1] += pl.getPrice();
        }

        // → List<Map<String,Object>>로 변환 (Map.of 안 씀)
        return acc.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .map(e -> {
                    Map<String, Object> m = new HashMap<>();
                    m.put("category", e.getKey());
                    m.put("totalQuantity", e.getValue()[0]);
                    m.put("totalRevenue", e.getValue()[1]);
                    return m;
                })
                .collect(Collectors.toList());
    }


    private String normalizeImageUrl(String img) {
        if (img == null || img.isBlank()) return null;
        return img.startsWith("/api/image/") ? img : "/api/image/" + img;
    }
}
