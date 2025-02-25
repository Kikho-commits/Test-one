package com.example.Project.service;

import com.example.Project.dto.ProductRequest;
import com.example.Project.entity.Product;
import com.example.Project.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;


    public Page<Product> getAllProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAll(pageable);
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long productId, ProductRequest request) {
        Optional<Product> existingProduct = productRepository.findById(productId);
        if (existingProduct.isPresent()) {
            Product product = existingProduct.get();
            product.setProductName(request.getProductName());
            product.setQuantity(request.getQuantity());
            product.setPrice(request.getPrice());
            product.setSupplierName(request.getSupplierName());
            return productRepository.save(product);
        }
        throw new RuntimeException("Product not found");
    }

    public void deleteProduct(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        product.ifPresent(productRepository::delete);
    }
}