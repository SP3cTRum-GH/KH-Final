package com.kh.finalProject.tables.eventImages.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class EventImagesDTO {
    private Long eventImageNo;
    private String img;
}
