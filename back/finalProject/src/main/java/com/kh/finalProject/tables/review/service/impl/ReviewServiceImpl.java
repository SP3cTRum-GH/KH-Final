package com.kh.finalProject.tables.review.service.impl;

import com.kh.finalProject.common.util.pagedto.PageRequestDTO;
import com.kh.finalProject.common.util.pagedto.PageResponseDTO;
import com.kh.finalProject.tables.member.entity.Member;
import com.kh.finalProject.tables.member.repository.MemberRepository;
import com.kh.finalProject.tables.product.entity.Product;
import com.kh.finalProject.tables.product.repository.ProductRepository;
import com.kh.finalProject.tables.review.component.ReviewConverter;
import com.kh.finalProject.tables.review.dto.ReviewRequestDTO;
import com.kh.finalProject.tables.review.dto.ReviewResponseDTO;
import com.kh.finalProject.tables.review.entity.Review;
import com.kh.finalProject.tables.review.repository.ReviewRepository;
import com.kh.finalProject.tables.review.service.ReviewService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Log4j2
public class ReviewServiceImpl implements ReviewService {

    public final ReviewRepository reviewRepository;
    public final ProductRepository productRepository;
    public final MemberRepository  memberRepository;
    private final ReviewConverter reviewConverter;

    // review list (paging)
    @Override
    public PageResponseDTO<ReviewResponseDTO> page(PageRequestDTO req, Long productNo, Long memberNo) {

        Pageable pageable = PageRequest.of(
                Math.max(req.getPage(), 1) - 1,
                Math.max(req.getSize(), 1),
                Sort.by(Sort.Direction.DESC, "reviewNo")
        );

        Page<Review> page = reviewRepository.search(productNo, memberNo, pageable);

        List<ReviewResponseDTO> list = page.getContent().stream()
                .map(r -> ReviewResponseDTO.builder()
                        .reviewNo(r.getReviewNo())
                        .reviewImg(r.getReviewImg())
                        .rating(r.getRating())
                        .content(r.getContent())
                        .productNo(r.getProduct().getProductNo())
                        .memberNo(r.getMember().getMemberNo())
                        .build())
                .toList();

        return PageResponseDTO.<ReviewResponseDTO>withAll()
                .dtoList(list)
                .pageRequestDTO(req)
                .totalCount(page.getTotalElements())
                .build();
    }

    @Override
    public ReviewResponseDTO create(ReviewRequestDTO dto) {
        Product product = productRepository.findById(dto.getProductNo())
                .orElseThrow(() -> new IllegalArgumentException("product not found"));
        Member member = memberRepository.findById(dto.getMemberNo())
                .orElseThrow(() -> new IllegalArgumentException("member not found"));

        Review review = reviewConverter.toEntity(dto, product, member); // 새 엔티티 생성
        Review saved = reviewRepository.save(review);                   // 저장
        return reviewConverter.toDto(saved);                            // DTO로 반환
    }

    @Override
    public ReviewResponseDTO get(Long reviewNo) {
        Review review = reviewRepository.findById(reviewNo)
                .orElseThrow(() -> new IllegalArgumentException("review not found"));
        return reviewConverter.toDto(review);
    }

    // review 수정
    @Override
    public ReviewResponseDTO update(Long reviewNo, ReviewRequestDTO dto) {
        Review review = reviewRepository.findById(reviewNo)
                .orElseThrow(()->new IllegalArgumentException("Review Not Found"));
        review.setReviewImg(dto.getReviewImg());
        review.setRating(dto.getRating());
        review.setContent(dto.getContent());

        return reviewConverter.toDto(review);
    }

    @Override
    public void delete(Long reviewNo) {
        reviewRepository.deleteById(reviewNo);
    }
}
