package com.kh.finalProject.tables.review.controller;

import java.util.List;
import java.util.Map;

import com.kh.finalProject.common.file.CustomFileUtil;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import com.kh.finalProject.common.util.pagedto.PageRequestDTO;
import com.kh.finalProject.common.util.pagedto.PageResponseDTO;
import com.kh.finalProject.tables.review.dto.ReviewRequestDTO;
import com.kh.finalProject.tables.review.dto.ReviewResponseDTO;
import com.kh.finalProject.tables.review.service.ReviewService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.multipart.MultipartFile;

@Log4j2
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/review")
public class ReviewController {
    private final ReviewService reviewService;
    private final CustomFileUtil fileUtil;

    @GetMapping("/public/list")//전체 리뷰개수 count를 주거나 전체리스트를 다주거
    public PageResponseDTO<ReviewResponseDTO> list(PageRequestDTO pageRequestDTO,
                                                   @RequestParam(required = false) Long productNo,
                                                   @RequestParam(required = false) Long memberNo) {
        pageRequestDTO.setSize(5);
        return reviewService.page(pageRequestDTO, productNo, memberNo);
    }

    // Create
    @PostMapping(value = "/user", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ReviewResponseDTO create(@ModelAttribute ReviewRequestDTO dto) {
      
    	MultipartFile file = dto.getUploadFile();

        if (file != null && !file.isEmpty()) {
            List<String> names = fileUtil.saveFiles(java.util.List.of(file));
            if (!names.isEmpty()) dto.setReviewImg(names.get(0));
        }
      
        return reviewService.create(dto);
    }
    // Read
    @GetMapping("/public/{reviewNo}")
    public ReviewResponseDTO get(@PathVariable Long reviewNo) {
        return reviewService.get(reviewNo);
    }

    // Update
    @PutMapping(value = "/user/{reviewNo}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ReviewResponseDTO update(@PathVariable Long reviewNo, @ModelAttribute ReviewRequestDTO dto) {
        MultipartFile file = dto.getUploadFile();

        if (file != null && !file.isEmpty()) {
            List<String> names = fileUtil.saveFiles(java.util.List.of(file));
            if (!names.isEmpty()) dto.setReviewImg(names.get(0));
        } else {
            // 새 업로드 없으면 null 그대로 두고 Service에서 기존 img 유지
            dto.setReviewImg(null);
        }
        return reviewService.update(reviewNo, dto);
    }

    // Delete
    @PostMapping("/admin/{reviewNo}")
    public void delete(@PathVariable Long reviewNo) {
        reviewService.delete(reviewNo);
    }
    
    @GetMapping("/user")
    public List<ReviewResponseDTO> getReviewForMember(@RequestParam String memberId) {
    	return reviewService.getReviewForMember(memberId);
    }

    @GetMapping("/public/count")
    public Map<String, Long> count(@RequestParam Long productNo){
        return Map.of("count",reviewService.countByProduct(productNo));
    }
}
