package com.kh.finalProject.tables.event.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.kh.finalProject.common.util.pagedto.PageRequestDTO;
import com.kh.finalProject.common.util.pagedto.PageResponseDTO;
import com.kh.finalProject.tables.event.dto.EventDTO;
import com.kh.finalProject.tables.event.entity.Event;
import com.kh.finalProject.tables.event.repository.EventRepository;
import com.kh.finalProject.tables.event.service.EventService;
import com.kh.finalProject.tables.eventImages.entity.EventImages;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@Transactional
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {
	private final EventRepository eventRepository;

	@Override
	public PageResponseDTO<EventDTO> getList(PageRequestDTO pageRequestDTO) {
		log.info("getList ........................................ ");

		Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(),
				Sort.by("eventNo").descending());
		Page<Event> result = eventRepository.selectList(pageable);
		
		List<EventDTO> dtoList = result.getContent().stream()
				.map(this::entityToDTO)
				.collect(Collectors.toList());

		long totalCount = result.getTotalElements();
		return PageResponseDTO.<EventDTO>withAll().dtoList(dtoList).totalCount(totalCount)
				.pageRequestDTO(pageRequestDTO).build();
	}

	@Override
	public Long register(EventDTO eventDTO) {
		Event event = dtoToEntity(eventDTO);
		Event result = eventRepository.save(event);
		return result.getEventNo();
	}

	@Override
	public EventDTO get(Long no) {
		java.util.Optional<Event> result = eventRepository.findById(no);
		Event event = result.orElseThrow();
		return entityToDTO(event);
	}

	@Override
	public void modify(EventDTO eventDTO) {
		Optional<Event> result = eventRepository.findById(eventDTO.getNo());
		Event event = result.orElseThrow();

		// 기본 정보 업데이트
		event.setEventTitle(eventDTO.getTitle());
		event.setEventContent(eventDTO.getContent());
		event.setStartDate(eventDTO.getStartDate());
		event.setEndDate(eventDTO.getEndDate());
		event.setEnable(eventDTO.isEnable());

		// 이미지 목록 업데이트 (기존 목록을 지우고 새로 추가)
		event.getEventImagesList().clear();
		if (eventDTO.getImageFileNames() != null) {
			eventDTO.getImageFileNames().forEach(fileName -> {
				event.addImages(EventImages.builder().img(fileName).build());
			});
		}
		
		eventRepository.save(event);
	}

	@Override
	public void remove(Long no) {
		eventRepository.deleteById(no); // CascadeType.ALL에 의해 EventImages도 함께 삭제됨
	}

	private Event dtoToEntity(EventDTO dto) {
		Event event = Event.builder()
				.eventNo(dto.getNo())
				.eventTitle(dto.getTitle())
				.eventContent(dto.getContent())
				.startDate(dto.getStartDate())
				.endDate(dto.getEndDate())
				.enable(dto.isEnable())
				.build();

		if (dto.getImageFileNames() != null) {
			dto.getImageFileNames().forEach(fileName -> {
				event.addImages(EventImages.builder().img(fileName).build());
			});
		}
		return event;
	}

	private EventDTO entityToDTO(Event event) {
		EventDTO dto = EventDTO.builder()
				.no(event.getEventNo())
				.title(event.getEventTitle())
				.content(event.getEventContent())
				.startDate(event.getStartDate())
				.endDate(event.getEndDate())
				.enable(event.getEnable())
				.build();

		if (event.getEventImagesList() != null) {
			List<String> fileNames = event.getEventImagesList().stream()
					.map(EventImages::getImg)
					.collect(Collectors.toList());
			dto.setImageFileNames(fileNames);
		}
		return dto;
	}
}
