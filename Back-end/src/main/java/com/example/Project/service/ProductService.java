package com.example.Project.service;

import com.example.Project.dto.ProductRequest;
import com.example.Project.dto.ProductResponse;
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


    public ProductResponse getAllProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productPage = productRepository.findByDeletedFalse(pageable);

        return new ProductResponse(
                productPage.getContent(),
                productPage.getTotalPages(),
                productPage.getTotalElements()
        );
    }

    public Product addProduct(Product product) {
        product.setDeleted(false);
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
        Optional<Product> productOptional = productRepository.findById(productId);
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            product.setDeleted(true);
            productRepository.save(product);
        } else {
            throw new RuntimeException("Product not found");
        }
    }
}