package com.kh.finalProject.tables.event.service.impl;

import com.kh.finalProject.tables.event.repository.EventRepository;
import com.kh.finalProject.tables.event.service.EventService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Log4j2
@Transactional
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {
    @Autowired
    private EventRepository eventRepository;
}
