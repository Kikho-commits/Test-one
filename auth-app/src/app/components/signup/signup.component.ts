import { Component } from '@angular/core';
import { AuthService } from '../../services/AuthService/auth.service';  
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignupUser } from '../../models/auth.models';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { SnackbarService } from '../../services/SnackbarServices/snackbar.service';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,FormsModule,MatFormFieldModule,
    MatInputModule,MatButtonModule,MatIconModule,MatCardModule],
  providers: [AuthService],  
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm = new FormGroup({
    username : new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',Validators.required),
    confirmPassword : new FormControl('',Validators.required)
  })

  
  
  errorMessage : string ='';


  constructor(private authService: AuthService,private router: Router,private snackBar : SnackbarService) {}

  signupUser() {
   
    this.errorMessage='';
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value as SignupUser).subscribe(
        (response) => {
          console.log('User signed up successfully:', response);
          this.snackBar.showSnackBar('User Registered Successfully!','OK');
          this.router.navigate(['/login']);
        },
        (error) => {
          this.errorMessage = JSON.stringify(error.error) || "Signup Failed!"; 
        }
      );
    }
  }
  isPasswordMatch() {
    return this.signupForm.value.password === this.signupForm.value.confirmPassword;
  }
}


