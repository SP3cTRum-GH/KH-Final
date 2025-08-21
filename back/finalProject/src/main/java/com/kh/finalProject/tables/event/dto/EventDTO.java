package com.kh.finalProject.tables.event.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EventDTO {
    private Long no;
    private String title;
    private String content;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private boolean enable;

    @Builder.Default
    private List<MultipartFile> uploadFiles = new ArrayList<>(); // 업로드용 파일

    @Builder.Default
    private List<String> imageFileNames = new ArrayList<>(); // DB에 저장된 이미지 파일 이름
}
