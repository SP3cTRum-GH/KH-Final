package com.kh.finalProject.tables.event.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@SequenceGenerator(name = "event_seq_gen"
    ,sequenceName = "event_Seq"
    ,allocationSize = 1
    ,initialValue = 1
)
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "event_seq_gen")
    private Long eventNo;

    @CreationTimestamp
    private LocalDateTime startDate; // 이벤트 시작일

    @Column
    private LocalDateTime endDate; // 이벤트 종료일

    @Column
    private Boolean enable = true; // 이벤트 활성화

    @Column(nullable = false)
    private String eventTitle; // 이벤트 제목
    @Column(nullable = false)
    private String eventImg; // 이벤트 이미지
    @Column(nullable = false)
    private String eventContent; // 이벤트 내용
}
