package com.kh.finalProject.tables.review.service;

import com.kh.finalProject.common.util.pagedto.PageRequestDTO;
import com.kh.finalProject.common.util.pagedto.PageResponseDTO;
import com.kh.finalProject.tables.review.dto.ReviewRequestDTO;
import com.kh.finalProject.tables.review.dto.ReviewResponseDTO;
import org.springframework.stereotype.Service;

public interface ReviewService {
    // Paging (필터: productNo/memberNo 선택)
    PageResponseDTO<ReviewResponseDTO> page(PageRequestDTO req, Long productNo, Long memberNo);

    // CRUD
    ReviewResponseDTO create(ReviewRequestDTO dto);
    ReviewResponseDTO get(Long reviewNo);
    ReviewResponseDTO update(Long reviewNo, ReviewRequestDTO dto);
    void delete(Long reviewNo);
}
