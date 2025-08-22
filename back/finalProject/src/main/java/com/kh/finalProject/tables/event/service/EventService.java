package com.kh.finalProject.tables.event.service;

import java.util.List;

import com.kh.finalProject.common.util.pagedto.PageRequestDTO;
import com.kh.finalProject.common.util.pagedto.PageResponseDTO;
import com.kh.finalProject.tables.event.dto.EventDTO;
import com.kh.finalProject.tables.event.entity.Event;

public interface EventService {
	//해당되는 페이지 10개이벤트를보여주는것
		PageResponseDTO<EventDTO> getList(PageRequestDTO pageRequestDTO);
		//이벤트를 저장
		Long register(EventDTO eventDTO);
		//select를가져오는것
	    EventDTO get(Long no);
	    //이벤트를수정
		void modify(EventDTO eventDTO);
		//프라이머리키를 가지고 삭제
		void remove(Long no);
		
		List<EventDTO> getAllEvent();
}
