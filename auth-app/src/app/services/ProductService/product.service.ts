import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/auth.models';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment.prod';

export interface ProductResponse {
  content: Product[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface ProductSummary {
  totalAvailableProducts: number;
  totalAvailableValue: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/api/inventory`;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  private createHeaders(): HttpHeaders {
    const token = this.cookieService.get('token');
    if (!token) {
      console.warn('No token found in cookies');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getAllProducts(
    page: number,
    size: number,
    search: string = '',
    sortBy: string = 'id',
    sortDirection: string = 'asc'
  ): Observable<ProductResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDirection', sortDirection);

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<ProductResponse>(this.apiUrl, {
      headers: this.createHeaders(),
      params: params,
    });
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product, { headers: this.createHeaders() });
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product, { headers: this.createHeaders() });
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.createHeaders() });
  }

  getProductSummary(): Observable<ProductSummary> {
    return this.http.get<ProductSummary>(`${this.apiUrl}/summary`, { headers: this.createHeaders() });
  }
}