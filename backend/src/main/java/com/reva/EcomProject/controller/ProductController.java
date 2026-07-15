package com.reva.EcomProject.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.reva.EcomProject.model.Product;
import com.reva.EcomProject.service.ProductService;

import jakarta.validation.Valid;

@RestController
@Validated
@RequestMapping("/api")
public class ProductController {

	@Autowired
	private ProductService service;
	
	@RequestMapping("/products")
	public ResponseEntity<List<Product>> getAllProducts() {
		return new ResponseEntity<>(service.getAllProducts(), HttpStatus.OK) ;
	}
	
	@GetMapping("/product/{id}")
	public ResponseEntity<Product> getProducts(@PathVariable int id) 
	{
		Product product = service.getProduct(id);
		if(product != null) {
			return new ResponseEntity<>(product, HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);	
		}
	}
	
	@PostMapping("/product")
	public ResponseEntity<Product> addProduct(
	        @Valid @ModelAttribute Product product,
	        @RequestPart("imageFile") MultipartFile imageFile
	) throws IOException
	{
		try {	
			Product prod = service.addProduct(product, imageFile);
			return new ResponseEntity<>(prod, HttpStatus.CREATED);
		}
		catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/product/{id}/image")
	public ResponseEntity<byte[]> getImageByProductId(@PathVariable int id){
		Product product = service.getImageByProductId(id);
		byte[] imageFile = product.getImageData();
		
		return ResponseEntity.ok()
				.contentType(MediaType.valueOf(product.getImageType()))
				.body(imageFile);
	}
	
	@PutMapping("/product/{id}")
	public ResponseEntity<String> updateProduct(@PathVariable int id, @RequestPart Product product, @RequestPart MultipartFile imageFile) throws IOException
	{
		Product prod = service.updateProduct(id,product,imageFile);
		if(prod != null) {
			return new ResponseEntity<>("Updated", HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>("Failed to update", HttpStatus.BAD_REQUEST);
		}
	}
	
	@DeleteMapping("/product/{id}")
	public ResponseEntity<String> deleteProduct(@PathVariable int id){
		Product prod = service.getImageByProductId(id);
		if( prod != null) {
			service.deleteProduct(id);
			return new ResponseEntity<>("Deleted", HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/products/search")
	public ResponseEntity<List<Product>> searchProducts(String keyword){
		List<Product> product = service.searchProducts(keyword);
		return new ResponseEntity<>(product, HttpStatus.OK);
	}
}
