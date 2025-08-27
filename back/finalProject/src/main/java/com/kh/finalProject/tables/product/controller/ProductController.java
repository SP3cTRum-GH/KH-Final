package com.kh.finalProject.tables.product.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kh.finalProject.common.file.CustomFileUtil;
import com.kh.finalProject.common.util.pagedto.PageRequestDTO;
import com.kh.finalProject.common.util.pagedto.PageResponseDTO;
import com.kh.finalProject.tables.product.dto.BidDTO;
import com.kh.finalProject.tables.product.dto.ProductDealRequestDTO;
import com.kh.finalProject.tables.product.dto.ProductDealResponseDTO;
import com.kh.finalProject.tables.product.dto.ProductShopRequestDTO;
import com.kh.finalProject.tables.product.dto.ProductShopResponseDTO;
import com.kh.finalProject.tables.product.service.ProductService;
import com.kh.finalProject.tables.productImages.dto.ProductImagesDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    ProductService productService;
    @Autowired
    CustomFileUtil fileUtil;

    // ====== DEAL(경매) ======
    @PostMapping("/deal")
    public Map<String, Long> createDeal(ProductDealRequestDTO productDTO) {
        // 1. 업로드 파일 받기
        List<MultipartFile> files = productDTO.getUploadFiles();

        // 2. 서버 디렉토리에 저장 + 파일명 추출
        List<String> uploadFileNames = fileUtil.saveFiles(files);

        // 3. DTO에 파일명 세팅
        productDTO.setImageFileNames(uploadFileNames);

        // 4. 서비스 호출 → DB 저장
        Long productNo = productService.createDeal(productDTO);
        return Map.of("result", productNo);
    }

    @GetMapping("/deal/{id}")
    public ProductDealResponseDTO readDeal(@PathVariable Long id) {
        return productService.getDeal(id);
    }

    @GetMapping("/deal")
    public List<ProductDealResponseDTO> listDeals() {
        return productService.listDeals();
    }

    @PutMapping("/deal/{id}")
    public Map<String, String> modifyDeal(@PathVariable Long id, ProductDealRequestDTO dto,
    		@RequestParam(value = "existingFiles", required = false) List<String> existingFiles) {
        dto.setProductNo(id);

        // 기존 상품 DTO 불러오기
        ProductDealResponseDTO oldDTO = productService.getDeal(id);

        // 기존 파일명들
        List<String> oldFileNames = oldDTO.getImages()
                .stream()
                .map(ProductImagesDTO::getImg)
                .toList();

        // 새 업로드 파일 저장
        List<MultipartFile> files = dto.getUploadFiles();
        List<String> currentUploadFileNames = fileUtil.saveFiles(files);
        
        // 최종 파일 목록 = 기존 유지 + 새 업로드
 		List<String> finalFileNames = new ArrayList<>();
 		if (existingFiles != null) {
 			finalFileNames.addAll(existingFiles); // 사용자가 유지 선택한 기존 파일들
 		}
 		if (currentUploadFileNames != null) {
 			finalFileNames.addAll(currentUploadFileNames); // 새 업로드된 파일들
 		}

 		dto.setImageFileNames(finalFileNames);

 		// oldFileNames 중에서 existingFiles에 없는 파일은 실제 삭제
 		if (oldFileNames != null && !oldFileNames.isEmpty()) {
 			List<String> toDelete = oldFileNames.stream()
 					.filter(name -> existingFiles == null || !existingFiles.contains(name))
 					.toList();
 			fileUtil.deleteFiles(toDelete);
 		}

        // DB 수정
        productService.updateDeal(dto);

        return Map.of("RESULT", "SUCCESS");
    }

    @GetMapping("/deal/list")
    public PageResponseDTO<ProductDealResponseDTO> pageDeal(@RequestParam(required = false) String category,
            PageRequestDTO pageRequestDTO) {
        return productService.pageDeal(category, pageRequestDTO);
    }
    
    @GetMapping("/deal/popular")
    public PageResponseDTO<ProductDealResponseDTO> popularDeal(@RequestParam(required = false) String category,PageRequestDTO pageRequestDTO) {
        return productService.popularDeal(category,pageRequestDTO);
    }

    // ====== SHOP(일반) ======
    @PostMapping("/shop")
    public Map<String, Long> createShop(ProductShopRequestDTO productDTO) {
        // 1. 업로드 파일 받기
        List<MultipartFile> files = productDTO.getUploadFiles();

        // 2. 서버 디렉토리에 저장 + 파일명 추출
        List<String> uploadFileNames = fileUtil.saveFiles(files);

        // 3. DTO에 파일명 세팅
        productDTO.setImageFileNames(uploadFileNames);

        // 4. 서비스 호출 → DB 저장
        Long productNo = productService.createShop(productDTO);
        return Map.of("result", productNo);
    }

    @GetMapping("/shop/{id}")
    public ProductShopResponseDTO readShop(@PathVariable Long id) {
        return productService.getShop(id);
    }

    @GetMapping("/shop")
    public List<ProductShopResponseDTO> listShops() {
        return productService.listShops();
    }

    @PutMapping("/shop/{id}")
    public Map<String, String> modifyShop(@PathVariable Long id, ProductShopRequestDTO dto,
    		@RequestParam(value = "existingFiles", required = false) List<String> existingFiles) {
        dto.setProductNo(id);

        // 기존 상품 DTO 불러오기
        ProductShopResponseDTO oldDTO = productService.getShop(id);

        // 기존 파일명들 
        List<String> oldFileNames = oldDTO.getImages()
                .stream()
                .map(ProductImagesDTO::getImg)
                .toList();

        // 새 업로드 파일 저장
        List<MultipartFile> files = dto.getUploadFiles();
        List<String> currentUploadFileNames = fileUtil.saveFiles(files);
        
        // 최종 파일 목록 = 기존 유지 + 새 업로드
 		List<String> finalFileNames = new ArrayList<>();
 		if (existingFiles != null) {
 			finalFileNames.addAll(existingFiles); // 사용자가 유지 선택한 기존 파일들
 		}
 		if (currentUploadFileNames != null) {
 			finalFileNames.addAll(currentUploadFileNames); // 새 업로드된 파일들
 		}

 		dto.setImageFileNames(finalFileNames);

 		// oldFileNames 중에서 existingFiles에 없는 파일은 실제 삭제
 		if (oldFileNames != null && !oldFileNames.isEmpty()) {
 			List<String> toDelete = oldFileNames.stream()
 					.filter(name -> existingFiles == null || !existingFiles.contains(name))
 					.toList();
 			fileUtil.deleteFiles(toDelete);
 		}
        // DB 수정
        productService.updateShop(dto);

        return Map.of("RESULT", "SUCCESS");
    }

    @GetMapping("/shop/list")
    public PageResponseDTO<ProductShopResponseDTO> pageShop(@RequestParam(required = false) String category,
            PageRequestDTO pageRequestDTO) {
        return productService.pageShop(category, pageRequestDTO);
    }
    @GetMapping("/shop/popular")
    public PageResponseDTO<ProductShopResponseDTO> popularShop(@RequestParam(required = false) String category,PageRequestDTO pageRequestDTO) {
        return productService.popularShop(category, pageRequestDTO);
    }

    // 공통 삭제
    @DeleteMapping("/{id}")
    public Map<String, String> remove(@PathVariable Long id) {
        productService.delete(id);
        return Map.of("RESULT", "SUCCESS");
    }

    @PostMapping("/bid")
    public ResponseEntity<Integer> bidding(@RequestBody BidDTO bid){
    	return ResponseEntity.ok(productService.bid(bid));
    }

}
