package com.kh.finalProject;

import com.kh.finalProject.common.util.pagedto.PageRequestDTO;
import com.kh.finalProject.common.util.pagedto.PageResponseDTO;
import com.kh.finalProject.tables.member.entity.Member;
import com.kh.finalProject.tables.member.repository.MemberRepository;
import com.kh.finalProject.tables.product.entity.Product;
import com.kh.finalProject.tables.product.repository.ProductRepository;
import com.kh.finalProject.tables.review.component.ReviewConverter;
import com.kh.finalProject.tables.review.dto.ReviewRequestDTO;
import com.kh.finalProject.tables.review.dto.ReviewResponseDTO;
import com.kh.finalProject.tables.review.repository.ReviewRepository;
import com.kh.finalProject.tables.review.service.ReviewService;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class FinalProjectApplicationReviewTests {

    @Autowired
    ProductRepository productRepository;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    ReviewService reviewService;

    private Long productNo;
    private Long memberNo;
    private Long reviewNo;

    @BeforeAll
    void pickExistingKeys() {
        Pageable one = PageRequest.of(0, 1, Sort.by(Sort.Direction.DESC, "productNo"));
        Product p = productRepository.findAll(one).getContent()
                .stream().findFirst().orElseThrow(() -> new IllegalStateException("상품 없음"));
        productNo = p.getProductNo();

        Pageable oneM = PageRequest.of(0, 1, Sort.by(Sort.Direction.DESC, "memberNo"));
        Member m = memberRepository.findAll(oneM).getContent()
                .stream().findFirst().orElseThrow(() -> new IllegalStateException("멤버 없음"));
        memberNo = m.getMemberNo();
    }

    @Test @Order(1)
    void create() {
        ReviewRequestDTO req = ReviewRequestDTO.builder()
                .reviewImg("https://img.example/r1.png")
                .rating(4.5)
                .content("첫 리뷰")
                .productNo(productNo)
                .memberNo(memberNo)
                .build();

        ReviewResponseDTO res = reviewService.create(req); // 내부에서 converter.toDto 사용됨
        assertNotNull(res);
        assertNotNull(res.getReviewNo());
        assertEquals(4.5, res.getRating());
        assertEquals(productNo, res.getProductNo());
        assertEquals(memberNo, res.getMemberNo());
        reviewNo = res.getReviewNo();
    }

    @Test @Order(2)
    void read() {
        ReviewResponseDTO res = reviewService.get(reviewNo);
        assertEquals(reviewNo, res.getReviewNo());
        assertEquals(productNo, res.getProductNo());
        assertEquals(memberNo, res.getMemberNo());
    }

    @Test @Order(3)
    void update() {
        ReviewRequestDTO req = ReviewRequestDTO.builder()
                .reviewImg("https://img.example/r1-upd.png")
                .rating(3.0)
                .content("수정됨")
                .productNo(productNo)
                .memberNo(memberNo)
                .build();

        ReviewResponseDTO res = reviewService.update(reviewNo, req);
        assertEquals(reviewNo, res.getReviewNo());
        assertEquals(3.0, res.getRating());
        assertEquals("수정됨", res.getContent());
    }

    @Test @Order(4)
    void page_by_product() {
        // 페이지 사이즈 5로 확인
        PageRequestDTO req = PageRequestDTO.builder().page(1).size(5).build();
        PageResponseDTO<ReviewResponseDTO> page = reviewService.page(req, productNo, null);

        assertNotNull(page);
        assertNotNull(page.getDtoList());
        assertTrue(page.getDtoList().size() <= 5);
        // 전부 해당 productNo인지 샘플 하나 체크
        assertTrue(page.getDtoList().stream().anyMatch(d -> d.getProductNo().equals(productNo)));
    }

    @Test @Order(5)
    void delete_() {
        reviewService.delete(reviewNo);
        assertThrows(IllegalArgumentException.class, () -> reviewService.get(reviewNo));
    }
}