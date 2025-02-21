import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root', 
})
export class AuthService {
  constructor(private http: HttpClient,private cookieService:CookieService) {}  

  signup(user: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/signup', user);  
  }

  login(user: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/login', user);  
  }

  setToken(token : string){
      this.cookieService.set('token',token);
  }

  removeToken(){
    this.cookieService.delete('token');
  }
}
