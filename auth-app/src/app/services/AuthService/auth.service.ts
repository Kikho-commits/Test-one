import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthResponse, LoginUser, RegisterResponse, SignupUser } from '../../models/auth.models';
import { ProductService } from '../ProductService/product.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root', 
})
export class AuthService {
  private token : string = '';
  constructor(private http: HttpClient,private cookieService:CookieService,private productService : ProductService,private router : Router) {
     this.token = this.cookieService.get('token');
  }  

  signup(user: SignupUser): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>('http://localhost:8080/api/signup', user);  
  }

  login(user: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/login', user);  
  }

  setToken(token : string){
      this.cookieService.set('token',token);
      this.router.navigate(['/inventory'])
  }

  removeToken(token:string){
    this.cookieService.delete(token);
  }



  resetPassword(user : any){
    return this.http.post('http://localhost:8080/api/resetPassword', user);
  }
}
