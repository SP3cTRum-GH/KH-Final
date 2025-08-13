package com.kh.finalProject.tables.event.repository;

import com.kh.finalProject.tables.event.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event,Long> {
}
