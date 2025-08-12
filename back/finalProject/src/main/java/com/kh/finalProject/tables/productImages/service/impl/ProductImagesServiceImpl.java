package com.kh.finalProject.tables.productImages.service.impl;

import com.kh.finalProject.tables.productImages.entity.ProductImages;
import com.kh.finalProject.tables.productImages.repository.ProductImagesRepository;
import com.kh.finalProject.tables.productImages.service.ProductImagesService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Log4j2
@Transactional
@RequiredArgsConstructor
public class ProductImagesServiceImpl implements ProductImagesService {
}
