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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule,MatFormFieldModule,
    MatInputModule,MatButtonModule,MatIconModule,MatCardModule],  
  templateUrl: './login.component.html',
  styleUrl : './login.component.css'
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };  

  errorMessage : String ='';

  constructor(private authService : AuthService, private snackBar : SnackbarService) {}

  loginUser() {
    if (this.user.email && this.user.password) {
      this.authService.login(this.user).subscribe(
        (response) => {
          this.authService.setToken(response.jwt);
          this.snackBar.showSnackBar("Login Successful!",'Ok');
        },
        (error) => {
          this.errorMessage = "Invalid Credentials"
        }
      );
    }
  }
}
