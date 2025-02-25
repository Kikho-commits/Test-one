import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/ProductService/product.service';
import { Product } from '../../models/auth.models';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SnackbarService } from '../../services/SnackbarServices/snackbar.service';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  productFormVisible: boolean = false;
  productForm: FormGroup;
  currentProduct: Product | null = null;

  currentPage: number = 0; 
  pageSize: number = 5;
  totalPages: number = 0;

  constructor(private productService: ProductService, private fb: FormBuilder, private snackBar: SnackbarService) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(1)]],
      supplierName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getAllProducts(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.products = data.content; 
        this.totalPages = data.totalPages;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.products = [];
        this.totalPages = 0;
      }
    });
  }

  changePage(direction: number): void {
    const newPage = this.currentPage + direction;
    if (newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.getProducts();
    }
  }

  isPreviousDisabled(): boolean {
    return this.currentPage <= 0;
  }

  isNextDisabled(): boolean {
    return this.currentPage >= this.totalPages - 1;
  }

  toggleProductForm(): void {
    this.productFormVisible = !this.productFormVisible;
    this.productForm.reset();
    this.currentProduct = null;
  }

  editProduct(product: Product): void {
    this.productFormVisible = true;
    this.currentProduct = product;
    this.productForm.patchValue(product);
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;

    if (this.currentProduct?.id) {
      this.productService.updateProduct(this.currentProduct.id, this.productForm.value).subscribe(() => {
        this.getProducts();
        this.toggleProductForm();
        this.snackBar.showSnackBar("Product Updated!");
      });
    } else {
      this.productService.addProduct(this.productForm.value).subscribe(() => {
        this.getProducts();
        this.toggleProductForm();
        this.snackBar.showSnackBar("Product Added!");
      });
    }
  }

  deleteProduct(id: number | undefined): void {
    if (id !== undefined) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.getProducts();
      });
      this.snackBar.showSnackBar("Product Deleted!");
    }
  }
}
