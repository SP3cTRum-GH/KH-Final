package com.kh.finalProject.tables.eventImages.entity;

import com.kh.finalProject.tables.event.entity.Event;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@SequenceGenerator(name = "event_image_seq_gen",
        sequenceName = "event_image_seq",
        allocationSize = 1,
        initialValue = 1)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventImages {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "event_image_seq_gen")
    private Long eventImageNo;
    @ManyToOne
    @JoinColumn(name = "event_no" ,nullable = false)
    private Event event;

    @Column
    private String img; // 상품 이미지
}
