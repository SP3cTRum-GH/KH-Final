package com.kh.finalProject.tables.purchaseLog.service.impl;

import com.kh.finalProject.tables.cart.entity.Cart;
import com.kh.finalProject.tables.cart.repository.CartRepository;
import com.kh.finalProject.tables.cartItem.entity.CartItem;
import com.kh.finalProject.tables.cartItem.repository.CartItemRepository;
import com.kh.finalProject.tables.product.entity.Product;
import com.kh.finalProject.tables.product.repository.ProductRepository;
import com.kh.finalProject.tables.productImages.entity.ProductImages;
import com.kh.finalProject.tables.productImages.repository.ProductImagesRepository;
import com.kh.finalProject.tables.purchaseLog.dto.purchaseLogResponseDTO;
import com.kh.finalProject.tables.purchaseLog.entity.purchaseLog;
import com.kh.finalProject.tables.purchaseLog.repository.PurchaseLogRepository;
import com.kh.finalProject.tables.purchaseLog.service.PurchaseLogService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public int snapshotFromCart(String memberId) {
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

    private String normalizeImageUrl(String img) {
        if (img == null || img.isBlank()) return null;
        return img.startsWith("/api/image/") ? img : "/api/image/" + img;
    }
}
