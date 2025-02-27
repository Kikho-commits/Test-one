import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { SnackbarService } from '../../services/SnackbarServices/snackbar.service';
import { AuthService } from '../../services/AuthService/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms'; 
import { LoginUser } from '../../models/auth.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCardModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService, private snackBar: SnackbarService, private cookieService: CookieService, private route : Router) {}

  ngOnInit(): void {
    if (this.cookieService.check("token")) {
      this.route.navigate(['/inventory']);
    }
  }
  
  loginUser() {
    if (this.loginForm.valid) { 
      this.authService.login(this.loginForm.value as LoginUser).subscribe(
        (response) => {
          this.authService.setToken(response.jwt);
          this.snackBar.showSnackBar("Login Successful!", 'Ok');
          this.route.navigate(['/inventory']);
        },
        (error) => {
          if (error.status === 403) {
            this.snackBar.showSnackBar("Incorrect email or password!", 'Ok');
          }else {
            this.snackBar.showSnackBar("An error occurred. Please try again.", 'Ok');
          }
        }
      );
    }
  }
}
