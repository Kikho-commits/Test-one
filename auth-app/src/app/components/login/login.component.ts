import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';  
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  
  errorMessage: string='';

  constructor(private authService: AuthService,private router : Router) {}

  loginUser() {
    if (this.user.email && this.user.password) {
      this.authService.login(this.user).subscribe(
        (response) => {
          console.log('User logged in successfully:', response);
          
          localStorage.setItem('token', response.token);

          this.router.navigate(['/dashboard'])
        },
        (error) => {
          this.errorMessage="Incorrect email or password.";
        }
      );
    }
  }
}
