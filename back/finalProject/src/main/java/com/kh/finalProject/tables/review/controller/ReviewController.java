package com.kh.finalProject.tables.review.controller;

import com.kh.finalProject.common.util.pagedto.PageRequestDTO;
import com.kh.finalProject.common.util.pagedto.PageResponseDTO;
import com.kh.finalProject.tables.review.dto.ReviewRequestDTO;
import com.kh.finalProject.tables.review.dto.ReviewResponseDTO;
import com.kh.finalProject.tables.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/review")
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping("/list")
    public PageResponseDTO<ReviewResponseDTO> list(PageRequestDTO pageRequestDTO,
                                                   @RequestParam(required = false) Long productNo,
                                                   @RequestParam(required = false) Long memberNo) {
        pageRequestDTO.setSize(5);
        return reviewService.page(pageRequestDTO, productNo, memberNo);
    }

    // Create
    @PostMapping
    public ReviewResponseDTO create(@RequestBody ReviewRequestDTO reviewRequestDTO) {
        return reviewService.create(reviewRequestDTO);
    }

    // Read
    @GetMapping("/{reviewNo}")
    public ReviewResponseDTO get(@PathVariable Long reviewNo) {
        return reviewService.get(reviewNo);
    }

    // Update
    @PutMapping("/{reviewNo}")
    public ReviewResponseDTO update(@PathVariable Long reviewNo, @RequestBody ReviewRequestDTO reviewRequestDTO) {
        return reviewService.update(reviewNo, reviewRequestDTO);
    }

    // Delete
    @DeleteMapping("/{reviewNo}")
    public void delete(@PathVariable Long reviewNo) {
        reviewService.delete(reviewNo);
    }
}
