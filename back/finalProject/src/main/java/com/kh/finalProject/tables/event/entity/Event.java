package com.kh.finalProject.tables.event.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.kh.finalProject.tables.eventImages.entity.EventImages;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
@Setter
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
    @Builder.Default
    @OneToMany(cascade = CascadeType.ALL)
    private List<EventImages> eventImagesList = new ArrayList<>(); // 이벤트 이미지
    @Column(nullable = false)
    private String eventContent; // 이벤트 내용
    
    public void addImages (EventImages eventImages) {
        eventImagesList.add(eventImages);
        eventImages.setEvent(this);
    }
}
