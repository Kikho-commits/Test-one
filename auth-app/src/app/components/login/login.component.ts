import { Component } from '@angular/core';
import { AuthService } from '../../sevices/auth.service';  
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],  
  providers: [AuthService], 
  templateUrl: './login.component.html',
  styleUrl : './login.component.css'
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };  

  errorMessage : String ='';

  constructor(private authService: AuthService, private route:Router,private cookieService : CookieService) {}

  loginUser() {
    if (this.user.email && this.user.password) {
      this.authService.login(this.user).subscribe(
        (response) => {
            
          this.authService.setToken(response.token);
          this.route.navigate(['/dashboard']);
          
        },
        (error) => {
          this.errorMessage = "Invalid Credentials"
        }
      );
    }
  }
}
