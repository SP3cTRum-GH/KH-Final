package com.kh.finalProject.common.file;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;

@Component
@Log4j2
@RequiredArgsConstructor
public class CustomFileUtil {
    @Value("${com.kh.upload.path}")
    private String uploadPath;

    @PostConstruct
    // 기존 mkdirs은 유기했습니다. 됐다 / 안됐다만 Boolean으로 돌려줘서
    // createDirectories를 이용하면 Exception으로 원인까지 파악할 수 잇어서 바꿨습니다.
    public void init() {
        try {
            Path dir = Paths.get(uploadPath);
            Files.createDirectories(dir);  // 이미 있으면 통과, 실패 시 이유 포함 예외
            uploadPath = dir.toFile().getAbsolutePath();
        } catch (IOException e) {
            throw new IllegalStateException("폴더 생성 실패: " + uploadPath, e);
        }
    }

    public List<String> saveFiles(List<MultipartFile> files) throws RuntimeException {
        if (files == null || files.isEmpty()) {
            return null;
        }
        List<String> uploadNames = new ArrayList<>();
        for (MultipartFile multipartFile : files) {
            String savedName = UUID.randomUUID().toString() + "_" +
                    multipartFile.getOriginalFilename();
            Path savePath = Paths.get(uploadPath, savedName);
            try {
                Files.copy(multipartFile.getInputStream(), savePath);
                String contentType = multipartFile.getContentType();
                // 이미지여부 확인
                if (contentType != null && contentType.startsWith("image")) {
                    Path thumbnailPath = Paths.get(uploadPath, "s_" + savedName);
                    Thumbnails.of(savePath.toFile()).size(400, 400).toFile(thumbnailPath.toFile());
                }
                uploadNames.add(savedName);
            } catch (IOException e) {
                throw new RuntimeException(e.getMessage());
            }
        }  //  end for
        return uploadNames;
    }

    public ResponseEntity<Resource> getFile(String fileName) {
        Resource resource = new FileSystemResource(uploadPath + File.separator + fileName);
        if (!resource.exists()) {
            resource = new FileSystemResource(uploadPath + File.separator + "default.jpg");
        }
        HttpHeaders headers = new HttpHeaders();
        try {
            // Files.probeContentType()은 파일 경로를 분석하여 MIME 타입을 자동 감지  jpg → image/jpeg,  png →
            //image/pngpdf → application/pdf  이 정보를 HTTP 응답 헤더에 Content-Type으로 추가한다
            headers.add("Content-Type", Files.probeContentType(resource.getFile().toPath()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }

        return ResponseEntity.ok().headers(headers).body(resource);
    }

    public void deleteFiles(List<String> fileNames) {
        if (fileNames == null || fileNames.isEmpty()) {
            return;
        }
        fileNames.forEach(fileName -> {
            // 썸네일이 있는지 확인하고 삭제
            String thumbnailFileName = "s_" + fileName;
            Path thumbnailPath = Paths.get(uploadPath, thumbnailFileName);
            Path filePath = Paths.get(uploadPath, fileName);
            try {
                Files.deleteIfExists(filePath);
                Files.deleteIfExists(thumbnailPath);
            } catch (IOException e) {
                throw new RuntimeException(e.getMessage());
            }
        });
    }

    public String saveSingleFile(MultipartFile multipartFile) {
        if (multipartFile == null || multipartFile.isEmpty()) {
            return null;
        }
        String savedName = UUID.randomUUID().toString() + "_" + multipartFile.getOriginalFilename();
        Path savePath = Paths.get(uploadPath, savedName);
        try {
            Files.copy(multipartFile.getInputStream(), savePath);
            String contentType = multipartFile.getContentType();
            if (contentType != null && contentType.startsWith("image")) {
                Path thumbnailPath = Paths.get(uploadPath, "s_" + savedName);
                Thumbnails.of(savePath.toFile()).size(400, 400).toFile(thumbnailPath.toFile());
            }
        } catch (IOException e) {
            throw new RuntimeException(e.getMessage());
        }
        return savedName;
    }
}