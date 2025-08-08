package com.kh.finalProject;

import com.kh.finalProject.tables.product.entity.Product;
import com.kh.finalProject.tables.productImages.entity.ProductImages;
import com.kh.finalProject.tables.productsize.entity.Productsize;
import com.kh.finalProject.tables.productImages.repository.ProductImagesRepository;
import com.kh.finalProject.tables.product.repository.ProductRepository;
import com.kh.finalProject.tables.productsize.repository.ProductSizeRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;


@SpringBootTest
class FinalProjectApplicationProductTests {

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	ProductImagesRepository productImagesRepository;
	@Autowired
	ProductSizeRepository productSizeRepository;

	//@Test
	void ProductCreateAndGetTest() {
		Product product = Product.builder()
				.productName("내 똥")
				.category("변기")
				.price(new BigDecimal("0"))
				.type(true)
				.endDate(LocalDateTime.now().plusDays(5))
				.dealCount(5L)
				.dealCurrent(new BigDecimal("500"))
				.build();

		productRepository.save(product);

		Product found = productRepository.findById(product.getProductNo()).orElseThrow();
		System.out.println("상품 이름: " + found.getProductName());
		System.out.println("경매 마감일: " + found.getEndDate());
	}
	@Test
	void imageWaSizeTest(){
		Product product = Product.builder()
				.productName("jerikerjer")
				.category("bingsina")
				.price(new BigDecimal("0"))
				.type(true)
				.dealCurrent(new BigDecimal("500"))
				.dealCount(5L)
				.productsizeList(new ArrayList<>())
				.productImagesList(new ArrayList<>())
				.build();
		ProductImages productImages = ProductImages.builder()
				.img("Muenga")
				.product(product)
				.build();
		Productsize productsize = Productsize.builder()
				.stock(5)
				.productSize("jotnakune")
				.product(product)
				.build();
		productRepository.save(product);
		productImagesRepository.save(productImages);
		productSizeRepository.save(productsize);
	}
}
