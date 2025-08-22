package com.kh.finalProject.tables.purchaseLog.service;

import com.kh.finalProject.tables.purchaseLog.dto.BuyNowDTO;
import com.kh.finalProject.tables.purchaseLog.dto.purchaseLogResponseDTO;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface PurchaseLogService {

    /** 카트의 모든 아이템을 purchase_log로 스냅샷 저장하고, 카트를 비웁니다.
     *  @return 저장된 로그 개수 */
    int checkoutAll(String memberId);
    int checkoutSelected(String memberId, List<Long> cartItemId);

    // 즉-시 구매
    purchaseLogResponseDTO buyNow(BuyNowDTO req);

    // (구매내역 조회가 필요하면 따로)
    List<purchaseLogResponseDTO> listAll();

    // 날짜별 총매출 집계
    List<Map<String, Object>> salesByDate(LocalDate from, LocalDate to);
    // 카테고리별 총매출 집계
    List<Map<String, Object>> salesByCategory();
}
