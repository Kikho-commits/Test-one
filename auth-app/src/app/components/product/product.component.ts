import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/ProductService/product.service';
import { Product } from '../../models/auth.models';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SnackbarService } from '../../services/SnackbarServices/snackbar.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogService } from '../../services/DialogServices/dialog.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
  ],
})
export class ProductComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  products: Product[] = [];
  productFormVisible: boolean = false;
  productForm: FormGroup;
  currentProduct: Product | null = null;

  currentPage: number = 0;
  pageSize: number = 5;
  totalRecords: number = 0;
  searchTerm: string = '';
  sortBy: string = 'id';
  sortDirection: string = 'asc';

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private snackBar: SnackbarService,
    private dialogService: DialogService
  ) {
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
    this.productService
      .getAllProducts(this.currentPage, this.pageSize, this.searchTerm, this.sortBy, this.sortDirection)
      .subscribe({
        next: (data) => {
          this.products = data?.content || [];
          this.totalRecords = data?.totalElements || 0;
          this.paginator.length = this.totalRecords;
        },
        error: (error) => {
          console.error('Error fetching products:', error);
          this.products = [];
          this.totalRecords = 0;
          this.paginator.length = 0;
          this.snackBar.showSnackBar('Error loading products');
        },
      });
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getProducts();
  }

  onSearch(): void {
    this.currentPage = 0;
    this.paginator.pageIndex = 0;
    this.getProducts();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.sortBy = 'id';
    this.sortDirection = 'asc';
    this.currentPage = 0;
    this.paginator.pageIndex = 0;
    this.getProducts();
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
    const productNameControl = this.productForm.get('productName');
    const supplierNameControl = this.productForm.get('supplierName');

    if (productNameControl?.value) {
      productNameControl.setValue(productNameControl.value.trim());
    }
    if (supplierNameControl?.value) {
      supplierNameControl.setValue(supplierNameControl.value.trim());
    }

    if (!productNameControl?.value || !supplierNameControl?.value) {
      this.snackBar.showSnackBar('Product name and supplier name cannot be empty!');
      return;
    }

    if (this.productForm.invalid) {
      this.snackBar.showSnackBar('Please fill in all required fields correctly!');
      return;
    }

    if (this.currentProduct) {
      const productId = this.currentProduct.id || 0;
      this.dialogService.confirmAction('Are you sure you want to update this product?', () => {
        this.productService.updateProduct(productId, this.productForm.value).subscribe({
          next: () => {
            this.getProducts();
            this.toggleProductForm();
            this.snackBar.showSnackBar('Product Updated!');
          },
          error: (error) => {
            console.error('Error updating product:', error);
            this.snackBar.showSnackBar('Error updating product');
          },
        });
      });
    } else {
      this.productService.addProduct(this.productForm.value).subscribe({
        next: () => {
          this.getProducts();
          this.toggleProductForm();
          this.snackBar.showSnackBar('Product Added!');
        },
        error: (error) => {
          console.error('Error adding product:', error);
          this.snackBar.showSnackBar('Error adding product');
        },
      });
    }
  }

  deleteProduct(id?: number): void {
    if (id !== undefined) {
      this.dialogService.confirmAction('Are you sure you want to delete this product?', () => {
        this.productService.deleteProduct(id).subscribe({
          next: () => {
            this.getProducts();
            this.snackBar.showSnackBar('Product Deleted!');
          },
          error: (error) => {
            console.error('Error deleting product:', error);
            this.snackBar.showSnackBar('Error deleting product');
          },
        });
      });
    }
  }
}