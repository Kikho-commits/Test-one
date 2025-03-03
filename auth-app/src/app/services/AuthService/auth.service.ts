import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthResponse, LoginUser, RegisterResponse, SignupUser } from '../../models/auth.models';
import { ProductService } from '../ProductService/product.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root', 
})
export class AuthService {
  private api = environment.apiUrl;
  private token : string = '';
  constructor(private http: HttpClient,private cookieService:CookieService,private productService : ProductService,private router : Router) {
     this.token = this.cookieService.get('token');
  }  

  signup(user: SignupUser): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.api}/api/signup`, user);  
  }

  //Change 1
  login(user: LoginUser): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/api/login`, user);  
  }

  setToken(token : string){
      this.cookieService.set('token',token);
      this.router.navigate(['/inventory'])
  }

  removeToken(){
    this.cookieService.delete('token');
  }

  resetPassword(user : object){
    return this.http.post(`${this.api}/api/resetPassword`, user);
  }

  isLoggedIn():boolean{
    return this.cookieService.check('token');
  }
}
