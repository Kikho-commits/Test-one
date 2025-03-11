import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService, ProductSummary } from '../../services/ProductService/product.service';
import { Product } from '../../models/auth.models';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SnackbarService } from '../../services/SnackbarServices/snackbar.service';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogService } from '../../services/DialogServices/dialog.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/AuthService/auth.service';
import { Router } from '@angular/router';
import { ProductDialogComponent } from '../dialog/product-dialog/product-dialog.component';

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
    MatIconModule
  ],
})
export class ProductComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  products: Product[] = [];
  currentPage: number = 0;
  pageSize: number = 5;
  totalRecords: number = 0;
  searchTerm: string = '';
  sortBy: string = 'id';
  sortDirection: string = 'asc';
  isFiltered: boolean = false;
  username: string = '';
  showDropdown: boolean = false;

  totalProducts: number = 0;
  totalValue: number = 0;

  private searchTimeout : any;

  constructor(
    private productService: ProductService,
    private snackBar: SnackbarService,
    private dialogService: DialogService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog 
  ) {
    this.username = authService.getUsername();
  }

  ngOnInit(): void {
    this.getProducts();
    this.getSummary();
  }

  getProducts(): void {
    this.productService
      .getAllProducts(this.currentPage, this.pageSize, this.searchTerm, this.sortBy, this.sortDirection)
      .subscribe((data) => {
        this.products = data?.content || [];
        this.totalRecords = data?.totalElements || 0;
        this.paginator.length = this.totalRecords;
        this.isFiltered = this.searchTerm !== '' || this.sortBy !== 'id' || this.sortDirection !== 'asc';
      });
  }

  getSummary(): void {
    this.productService.getProductSummary().subscribe((summaryData) => {
      this.totalProducts = summaryData?.totalAvailableProducts || 0;
      this.totalValue = summaryData?.totalAvailableValue || 0;
    });
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      this.searchTerm = value;
      this.currentPage = 0;
      this.paginator.pageIndex = 0;
      this.getProducts();
    }, 300);
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getProducts();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.currentPage = 0;
    this.paginator.pageIndex = 0;
    this.getProducts();
  }

  toggleProductForm(): void {
    this.openProductDialog(null); 
  }

  editProduct(product: Product): void {
    this.openProductDialog(product); 
  }

  openProductDialog(product: Product | null): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '400px',
      data: { product }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (product) {
          const productId = product.id || 0;
          this.dialogService.confirmAction('Are you sure you want to update this product?', () => {
            this.productService.updateProduct(productId, result).subscribe(() => {
              this.getProducts();
              this.getSummary();
              this.snackBar.showSnackBar('Product Updated!');
            });
          });
        } else {
          this.productService.addProduct(result).subscribe(() => {
            this.getProducts();
            this.getSummary();
            this.snackBar.showSnackBar('Product Added!');
          });
        }
      }
    });
  }

  deleteProduct(id?: number): void {
    if (id !== undefined) {
      this.dialogService.confirmAction('Are you sure you want to delete this product?', () => {
        this.productService.deleteProduct(id).subscribe(() => {
          this.getProducts();
          this.getSummary();
          this.snackBar.showSnackBar('Product Deleted!');
        });
      });
    }
  }

  sort(column: string): void {
    if (this.sortBy === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortDirection = 'asc';
    }
    this.currentPage = 0;
    this.paginator.pageIndex = 0;
    this.getProducts();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.sortBy = 'id';
    this.sortDirection = 'asc';
    this.currentPage = 0;
    this.paginator.pageIndex = 0;
    this.getProducts();
  }

  logout(): void {
    this.dialogService.confirmAction('Are you sure want to Logout?', () => {
      this.authService.removeToken();
      this.snackBar.showSnackBar('User Logged out Successfully', 'Ok');
      this.router.navigate(['/']);
    });
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  reset():void{
    this.router.navigate(['/resetPassword']);
  }
}