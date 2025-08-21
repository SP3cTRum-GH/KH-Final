package com.kh.finalProject.tables.eventImages.conponent;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.kh.finalProject.tables.event.entity.Event;
import com.kh.finalProject.tables.eventImages.dto.EventImagesDTO;
import com.kh.finalProject.tables.eventImages.entity.EventImages;

@Component
public class EventImagesConverter {
    public EventImages toEntityFromEventImages(EventImagesDTO dto, Event event) {
        return EventImages.builder()
                .event(event)
                .img(dto.getImg())
                .build();
    }

    public List<EventImagesDTO> toEventImagesDTOFromProductImages(List<EventImages> images){
        List<EventImagesDTO> dtos = new ArrayList<>();
        for(EventImages i :  images){
            EventImagesDTO dto = new EventImagesDTO(i.getEventImageNo(),"/api/image/" + i.getImg());
            dtos.add(dto);
        }
        return dtos;
    }
}
