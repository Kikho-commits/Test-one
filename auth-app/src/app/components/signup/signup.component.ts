import { Component, OnInit } from '@angular/core';
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
import { MatError } from '@angular/material/form-field';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,FormsModule,MatFormFieldModule,
    MatInputModule,MatButtonModule,MatIconModule,MatCardModule,MatError],
  providers: [AuthService],  
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ]),
    confirmPassword: new FormControl('', Validators.required)
  });

  
  
  errorMessage : string ='';


  constructor(private authService: AuthService,private router: Router,private snackBar : SnackbarService,private route : Router,private cookieService : CookieService) {}
  ngOnInit() : void{
    if(this.cookieService.check("token")){
      this.route.navigate(['/inventory']);
    }
  }

  signupUser() {
    
     const usernameControl = this.signupForm.get('username');
     if(usernameControl?.value){
      usernameControl.setValue(usernameControl.value.trim());
     } 
    
    this.errorMessage='';
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value as SignupUser).subscribe(
        (response) => {
          console.log(JSON.stringify(response.message));
          
          this.snackBar.showSnackBar('User Registered Successfully!','OK');
          this.router.navigate(['/login']);
        },
        (error) => {
          if(error.status === 400){
            this.snackBar.showSnackBar('Username already exist!');
          }
          else{
            this.snackBar.showSnackBar("An error occurred. Please try again.", 'Ok');
          }
        }
      );
    }
  }
  isPasswordMatch() {
    return this.signupForm.value.password === this.signupForm.value.confirmPassword;
  }
}


