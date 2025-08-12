package com.kh.finalProject.tables.productsize.service.impl;

import com.kh.finalProject.tables.productsize.entity.Productsize;
import com.kh.finalProject.tables.productsize.service.ProductSizeService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Service
@Log4j2
@Transactional
@RequiredArgsConstructor
public class ProductSizeServiceImpl implements ProductSizeService {

    @Override
    public Productsize findByProductNo(Long productNo) {
        return null;
    }
}
