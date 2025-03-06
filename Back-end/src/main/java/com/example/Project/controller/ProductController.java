package com.example.Project.controller;

import com.example.Project.dto.ProductResponse;
import com.example.Project.dto.SummaryResponse;
import com.example.Project.entity.Product;
import com.example.Project.service.ProductService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.example.Project.dto.ProductRequest;

@RestController
@RequestMapping("/api/inventory")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ProductResponse getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "40") int size,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDirection,
            Authentication authentication) {

        Sort.Direction direction = sortDirection.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        String email = authentication.getName();
        return productService.getAllProducts(page, size, search, sortBy, direction, email);
    }

    @PostMapping
    public Product addProduct(@RequestBody ProductRequest productRequest, Authentication authentication) {
        Product product = new Product();
        BeanUtils.copyProperties(productRequest, product);
        product.setEmail(authentication.getName());
        return productService.addProduct(product);
    }

    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody ProductRequest productRequest, Authentication authentication) {
        return productService.updateProduct(id, productRequest, authentication.getName());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id, Authentication authentication) {
        productService.deleteProduct(id, authentication.getName());
        return ResponseEntity.ok().build();
    }
    @GetMapping("/summary")
    public ResponseEntity<SummaryResponse> getInventorySummary(Authentication authentication) {
        SummaryResponse summary = productService.getSummary(authentication.getName());
        return ResponseEntity.ok(summary);
    }
}
