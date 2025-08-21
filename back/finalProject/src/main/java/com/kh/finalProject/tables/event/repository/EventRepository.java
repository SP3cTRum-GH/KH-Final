package com.kh.finalProject.tables.event.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kh.finalProject.tables.event.entity.Event;

public interface EventRepository extends JpaRepository<Event,Long> {
	//이벤트를 삭제기능을 enable을 직접삭제하지않고enable로대신삭제할기능
		@Modifying
		@Query("update Event e set e.enable = :flag where e.eventNo = :eventNo")
		void updateToDelete(@Param("eventNo") Long eventNo, @Param("flag") boolean flag);

		@Query("select e from Event e where e.enable = false")
		Page<Event> selectList(Pageable pageable);
}
