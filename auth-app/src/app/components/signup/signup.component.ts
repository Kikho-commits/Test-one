import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [AuthService],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  
  user = {
    username: '', 
    email: '',
    password: '',
    confirmPassword: ''
  };

  passwordPattern = '^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%^&*(),.?":{}|<>]).{8,}$';


  errorMessage: string = ''; 

  constructor(private authService: AuthService) {}

  signupUser() {
    // Check if passwords match
    if (!this.isPasswordMatch()) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    this.errorMessage = ''; 

    if (this.user.username && this.user.email && this.user.password) {
      this.authService.signup(this.user).subscribe(
        (response) => {
          console.log('User signed up successfully:', response);
        },
        (error) => {
          this.errorMessage = 'User Already exist!';
        }
      );
    }
  }

  isPasswordMatch(): boolean {
    
    return this.user.password === this.user.confirmPassword;
  }
}
