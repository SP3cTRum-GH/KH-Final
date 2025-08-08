package com.kh.finalProject.tables.event.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventDTO {
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Boolean enable;
    private String eventTitle;
    private String eventImg;
    private String eventContent;
}
