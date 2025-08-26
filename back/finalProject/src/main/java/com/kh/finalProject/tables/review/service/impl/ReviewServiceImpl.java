package com.kh.finalProject.tables.review.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.kh.finalProject.common.file.CustomFileUtil;
import com.kh.finalProject.common.util.pagedto.PageRequestDTO;
import com.kh.finalProject.common.util.pagedto.PageResponseDTO;
import com.kh.finalProject.tables.member.entity.Member;
import com.kh.finalProject.tables.member.repository.MemberRepository;
import com.kh.finalProject.tables.product.entity.Product;
import com.kh.finalProject.tables.product.repository.ProductRepository;
import com.kh.finalProject.tables.purchaseLog.entity.PurchaseLog;
import com.kh.finalProject.tables.purchaseLog.repository.PurchaseLogRepository;
import com.kh.finalProject.tables.review.component.ReviewConverter;
import com.kh.finalProject.tables.review.dto.ReviewRequestDTO;
import com.kh.finalProject.tables.review.dto.ReviewResponseDTO;
import com.kh.finalProject.tables.review.entity.Review;
import com.kh.finalProject.tables.review.repository.ReviewRepository;
import com.kh.finalProject.tables.review.service.ReviewService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Transactional
@RequiredArgsConstructor
@Log4j2
public class ReviewServiceImpl implements ReviewService {

    public final ReviewRepository reviewRepository;
    public final ProductRepository productRepository;
    public final MemberRepository memberRepository;
    public final PurchaseLogRepository purchaseLogRepository;
    private final ReviewConverter reviewConverter;
    private final CustomFileUtil fileUtil;

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
                        .reviewImg(toUrl(r.getReviewImg()))
                        .rating(r.getRating())
                        .content(r.getContent())
                        .productNo(r.getProduct().getProductNo())
                        .type(r.getProduct().getType())
                        .memberNo(r.getMember().getMemberNo())
                        .memberId(r.getMember().getMemberId())
                        .regDate(r.getRegDate())
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
        // 1) 로그 먼저
        PurchaseLog log = purchaseLogRepository.findById(dto.getLogNo())
                .orElseThrow(() -> new IllegalArgumentException("log not found"));

        // 2) 로그에서 productNo 가져와 상품 로드
        Long productNo = log.getProductNo();
        Product product = productRepository.findById(productNo)
                .orElseThrow(() -> new IllegalArgumentException("product not found"));

        // (옵션) 클라가 productNo 보냈다면 검증
        if (dto.getProductNo() != null && !dto.getProductNo().equals(productNo)) {
            throw new IllegalArgumentException("mismatched productNo for logNo");
        }

        // 3) 멤버
        Member member = memberRepository.getWithRoles(dto.getMemberId());

        // 4) 로그 플래그
        log.setIsReviewed(true);
        purchaseLogRepository.save(log);

        // 5) 리뷰 저장
        Review review = Review.builder()
                .reviewImg(dto.getReviewImg()) // 컨트롤러에서 업로드 후 파일명 세팅됨
                .rating(dto.getRating())
                .content(dto.getContent())
                .product(product)
                .member(member)
                .build();

        Review saved = reviewRepository.saveAndFlush(review);
        return reviewConverter.toDto(saved);
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
                .orElseThrow(() -> new IllegalArgumentException("Review Not Found"));

        String oldFile = review.getReviewImg();      // 기존 파일명
        String newFile = dto.getReviewImg();         // 새 파일명(없으면 null 가능)

        // 이미지 교체: 새 파일명 있을 때만 교체
        if(newFile != null && !newFile.isBlank()){                  // new 파일이 null이 아니고 비어있지 않다면
            review.setReviewImg(newFile);                           // review 객체에 newFile의 정보를 담는다.
            if(oldFile != null && !oldFile.equals(newFile)){        // oldFile이 null이 아니고 newFile과 동일하다면
                fileUtil.deleteFiles(java.util.List.of(oldFile));   // deleteFiles가 List<String>만 받으므로
                                                                    // 단일 원소 리스트(List.of(oldFile))로 감싸서 전달해 삭제
            }
        }
        // 새 업로드가 없으면 기존 이미지 유지

        review.setRating(dto.getRating());
        review.setContent(dto.getContent());

//        // 파일이 변경되었으면 디스크에서 삭제
//        if (oldFile != null && !oldFile.equals(newFile)) {
//            fileUtil.deleteFiles(java.util.List.of(oldFile)); // 썸네일까지 같이 지움
//        }
        return reviewConverter.toDto(review);
    }

    @Override
    public void delete(Long reviewNo) {
        Review r = reviewRepository.findById(reviewNo)
                .orElseThrow(() -> new IllegalArgumentException("review not found"));

        String name = r.getReviewImg();
        if (name != null && !name.isBlank()) {

            int idx = name.lastIndexOf('/');
            if (idx != -1) name = name.substring(idx + 1);

            fileUtil.deleteFiles(java.util.List.of(name));
        }
        reviewRepository.delete(r);
    }

    private String toUrl(String fileName) {
        return (fileName == null || fileName.isBlank()) ? null : "/api/image/" + fileName;
    }

	@Override
	public List<ReviewResponseDTO> getReviewForMember(String memberId) {
		List<Review> review = reviewRepository.getReviewByMember_MemberId(memberId);
		
		return review.stream().map(reviewConverter::toDto).toList();
	}
}
