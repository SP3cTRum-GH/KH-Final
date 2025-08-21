package com.kh.finalProject.tables.purchaseLog.service;

import com.kh.finalProject.tables.purchaseLog.dto.purchaseLogResponseDTO;

import java.util.List;

public interface PurchaseLogService {

    /** 카트의 모든 아이템을 purchase_log로 스냅샷 저장하고, 카트를 비웁니다.
     *  @return 저장된 로그 개수 */
    int snapshotFromCart(String memberId);

    // (구매내역 조회가 필요하면 따로)
    List<purchaseLogResponseDTO> listAll();
}
