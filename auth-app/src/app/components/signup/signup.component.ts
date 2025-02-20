  import { Component } from '@angular/core';
  import { AuthService } from '../../sevices/auth.service';  
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms';

  @Component({
    selector: 'app-signup',
    standalone: true,
    imports: [FormsModule, CommonModule],
    providers: [AuthService],  
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css'
  })
  export class SignupComponent {
    user = {
      username: '',
      email: '',
      password: ''
    };

    confirmPassword: String ='';
    
    errorMessage : String ='';


    constructor(private authService: AuthService) {}

    signupUser() {
     
      this.errorMessage='';
      if (this.user.username && this.user.email && this.user.password) {
        this.authService.signup(this.user).subscribe(
          (response) => {
            console.log('User signed up successfully:', response);
          },
          (error) => {
            this.errorMessage = JSON.stringify(error.error) || "Signup Failed!"; 
          }
        );
      }
    }
    isPasswordMatch() {
      return this.user.password === this.confirmPassword;
    }
  }
