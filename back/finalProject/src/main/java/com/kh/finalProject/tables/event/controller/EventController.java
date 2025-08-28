package com.kh.finalProject.tables.event.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kh.finalProject.common.file.CustomFileUtil;
import com.kh.finalProject.common.util.pagedto.PageRequestDTO;
import com.kh.finalProject.common.util.pagedto.PageResponseDTO;
import com.kh.finalProject.tables.event.dto.EventDTO;
import com.kh.finalProject.tables.event.service.EventService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/events")
public class EventController {
	private final EventService eventService; // ProductServcie 주입
	private final CustomFileUtil fileUtil;

	// 이벤트 작
	@PostMapping("/admin")
	public Map<String, Long> register(EventDTO eventDTO) {
		log.info("rgister: " + eventDTO);
		List<MultipartFile> files = eventDTO.getUploadFiles();
		List<String> uploadFileNames = fileUtil.saveFiles(files);
		eventDTO.setImageFileNames(uploadFileNames);
		log.info(uploadFileNames);
		// 서비스 호출
		Long no = eventService.register(eventDTO);
		return Map.of("result", no);
	}

	// 이벤트 이미지 가져오
	@GetMapping("/public/view/{fileName}")
	public ResponseEntity<Resource> viewFileGET(@PathVariable String fileName) {
		return fileUtil.getFile(fileName);
	}

	// 하페이지당10개를불러오는것
	@GetMapping("/public/list")
	public PageResponseDTO<EventDTO> list(PageRequestDTO pageRequestDTO) {
		log.info("list. ............ " + pageRequestDTO);
		return eventService.getList(pageRequestDTO);
	}

	// 이벤트 전체 가져오기
	@GetMapping("/public/all")
	public ResponseEntity<List<EventDTO>> getAllEvents() {
		return ResponseEntity.ok(eventService.getAllEvent());
	}

	// 이벤트 read
	@GetMapping("/public/{no}")
	public EventDTO read(@PathVariable(name = "no") Long no) {
		return eventService.get(no);
	}

	// 이벤트 수정
	@PutMapping("/admin/{no}")
	public Map<String, String> modify(@PathVariable(name = "no") Long no, EventDTO eventDTO,
			@RequestParam(value = "existingFiles", required = false) List<String> existingFiles) {
		eventDTO.setNo(no);

		// DB에 저장되어 있던 파일들
		EventDTO oldEventDTO = eventService.get(no);
		List<String> oldFileNames = oldEventDTO.getImageFileNames();

		// 새 업로드된 파일 저장
		List<MultipartFile> files = eventDTO.getUploadFiles();
		List<String> currentUploadFileNames = fileUtil.saveFiles(files);

		// 최종 파일 목록 = 기존 유지 + 새 업로드
		List<String> finalFileNames = new ArrayList<>();
		if (existingFiles != null) {
			finalFileNames.addAll(existingFiles); // 사용자가 유지 선택한 기존 파일들
		}
		if (currentUploadFileNames != null) {
			finalFileNames.addAll(currentUploadFileNames); // 새 업로드된 파일들
		}

		eventDTO.setImageFileNames(finalFileNames);

		// oldFileNames 중에서 existingFiles에 없는 파일은 실제 삭제
		if (oldFileNames != null && !oldFileNames.isEmpty()) {
			List<String> toDelete = oldFileNames.stream()
					.filter(name -> existingFiles == null || !existingFiles.contains(name))
					.toList();
			fileUtil.deleteFiles(toDelete);
		}

		eventService.modify(eventDTO);

		return Map.of("RESULT", "SUCCESS");
	}

	// 이벤트 삭제
	@DeleteMapping("/admin/{no}")
	public Map<String, String> remove(@PathVariable("no") Long no) {
		// 삭제해야 할 파일들 알아내기
		List<String> oldFileNames = eventService.get(no).getImageFileNames();
		eventService.remove(no);
		if (oldFileNames != null && !oldFileNames.isEmpty()) {
			fileUtil.deleteFiles(oldFileNames);
		}
		return Map.of("RESULT", "SUCCESS");
	}

	@PutMapping("/admin/soft-delete/{no}")
	public Map<String, String> softDelete(@PathVariable Long no) {
		EventDTO event = eventService.get(no);
		if (event == null)
			return Map.of("RESULT", "FAIL", "MESSAGE", "이벤트 없음");

		event.setEnable(true);
		eventService.modify(event); // 기존 modify 로 업데이트
		return Map.of("RESULT", "SUCCESS");
	}

}
