package com.kh.finalProject.common.file;

import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/api/image")
@RestController
public class ImageController {

    private final CustomFileUtil fileUtil;

    public ImageController(CustomFileUtil fileUtil) {
        this.fileUtil = fileUtil;
    }

    @GetMapping("/{fileName:.+}")
    public ResponseEntity<Resource> viewFileGET(@PathVariable String fileName){
        return fileUtil.getFile(fileName);
    }

    // 개선버전 ※ 멀티파트가 아니면 415 Error로 거절
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadImage2(@RequestParam("file") MultipartFile file) {
        // 0. 빈 파일 업로드시 입구 컷...
        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest().body("empty file");
        }
        // 1. 저장할 파일 경로 만들기
        String savedFileName = fileUtil.saveSingleFile(file);

        // 2. 클라이언트에게 이미지 URL 반환
        String imageUrl = "/api/image/" + savedFileName;
        return ResponseEntity.ok(java.util.Map.of("location", imageUrl));
    }
}